import { GoogleGenAI, Type, Modality } from "@google/genai";
import { PartData, Rarity, PartType, Part } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const partDataSchema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: '아이템의 테마와 희귀도에 어울리는 창의적이고 시적인 이름.'
    },
    description: {
      type: Type.STRING,
      description: '아이템의 설정, 외형, 핵심을 설명하는 흥미로운 글. 최대 2문장.'
    },
    stats: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '"공격력 +250" 또는 "화염 저항 +30%"와 같은 1~4개의 게임플레이 능력치 목록. 희귀도가 높을수록 더 강력한 능력치.'
    },
    skill: {
      type: Type.STRING,
      description: '아이템이 부여하는 고유 스킬의 이름. 스킬이 없는 경우(일반/고급 아이템) "없음"을 사용.'
    },
  },
  required: ['name', 'description', 'stats', 'skill']
};

export const generatePartData = async (prompt: string, rarity: Rarity, partType: PartType): Promise<PartData> => {
  try {
    const systemInstruction = `당신은 '용병 키우기: AI 연대기' 게임의 게임 마스터 AI입니다. 당신의 임무는 플레이어의 텍스트 프롬프트와 미리 정해진 희귀도를 기반으로 판타지/SF 아이템 파츠를 한국어로 생성하는 것입니다. 당신은 제공된 JSON 스키마를 반드시 준수해야 합니다.

    게임 컨텍스트:
    - 플레이어는 마법 재료와 텍스트 프롬프트를 결합하여 파츠를 만듭니다.
    - 파츠 종류: 투구(머리), 갑옷(몸통과 팔), 다리(그리브, 부츠), 무기, 방패. 생성하는 파츠는 지정된 종류에 맞아야 합니다.
    - 키워드는 능력치에 영향을 줍니다. 예시:
      - '불', '화염', '용암' -> 화염 속성, 지속 피해.
      - '얼음', '서리', '빙하' -> 빙결 속성, 이동 속도 감소.
      - '강철', '티타늄', '기계' -> 높은 방어력, 물리 피해.
      - '유기체', '가시', '촉수' -> 생명력 흡수, 독 피해.
    - 희귀도는 파워 레벨을 결정합니다: Common, Uncommon, Rare, Epic, Legendary.
    - 생성된 능력치와 스킬은 요청된 아이템과 그 희귀도에 논리적으로 부합해야 합니다.

    당신의 응답은 제공된 스키마와 일치하는 단일 한국어 JSON 객체여야 합니다. JSON 앞뒤에 어떤 텍스트, 마크다운, 또는 주석도 추가하지 마세요.`;

    const fullPrompt = `희귀도 '${rarity}', 파츠 종류 '${partType}'으로 다음 플레이어 아이디어를 기반으로 게임 아이템을 생성하세요: "${prompt}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: partDataSchema,
        temperature: 0.9,
      }
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    if (!parsedData.name || !parsedData.description || !Array.isArray(parsedData.stats)) {
        throw new Error("Generated data is missing required fields.");
    }

    return parsedData as PartData;

  } catch (error) {
    console.error("Error generating part data:", error);
    throw new Error("AI로부터 아이템 속성을 생성하는 데 실패했습니다. 다른 프롬프트를 시도해 주세요.");
  }
};

export const generatePartImage = async (name: string, description: string, partType: PartType): Promise<string> => {
    try {
        const imagePrompt = `고품질 2D 판타지 RPG 아이템 아이콘, 게임 스프라이트. 아이템은 서사적이고 상세해야 합니다. 아이템은 깔끔한 단색 검은색 배경의 중앙에 위치해야 합니다. 아이템 종류: '${partType}'. 아이템 이름: "${name}". 설명: "${description}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts: [{ text: imagePrompt }] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64ImageBytes: string = part.inlineData.data;
              return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
        throw new Error("No image was generated.");

    } catch (error) {
        console.error("Error generating part image:", error);
        throw new Error("아이템 이미지를 생성하는 데 실패했습니다. AI가 컨셉을 시각화하는 데 어려움을 겪고 있을 수 있습니다.");
    }
};

const getBase64FromUrl = (url: string) => {
    const regex = /^data:image\/(png|jpeg|jpg);base64,(.*)$/;
    const match = url.match(regex);
    if (match && match[2]) {
        return { mimeType: `image/${match[1]}`, data: match[2] };
    }
    throw new Error("Invalid base64 image URL");
};

export const generateCharacterImage = async (parts: Partial<Record<PartType, Part>>): Promise<string> => {
    try {
        let descriptionBuilder = "다음 장비 이미지를 참조하여, 이 모든 장비를 착용한 판타지 캐릭터의 일관된 1:1 비율의 정사각형 2D 전신 초상화를 생성해 주세요. 최종 캐릭터 아트는 일관된 스타일이어야 하며 깔끔한 검은색 배경 위에 그려져야 합니다. 캐릭터 설명: ";
        const equippedParts = Object.values(parts).filter(p => p) as Part[];

        if (equippedParts.length === 0) {
            throw new Error("캐릭터를 생성하려면 최소 하나의 파츠가 필요합니다.");
        }
        
        const contentParts: any[] = [];

        equippedParts.forEach(part => {
            descriptionBuilder += `[${part.partType}: ${part.name} - ${part.description}] `;
            const { mimeType, data } = getBase64FromUrl(part.imageUrl);
            contentParts.push({ inlineData: { mimeType, data } });
        });
        
        contentParts.unshift({ text: descriptionBuilder.trim() });

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts: contentParts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
        throw new Error("No image was generated.");

    } catch (error) {
        console.error("Error generating character image:", error);
        throw new Error("강화실패!!!!");
    }
};