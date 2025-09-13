import React from 'react';

export const HeadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z" />
        <path d="M12 11c-1.66 0-3 1.34-3 3v5h6v-5c0-1.66-1.34-3-3-3Z" />
    </svg>
);

export const ArmorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M4 21a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4Z" />
        <path d="M4 11V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
        <path d="M12 7V3" />
    </svg>
);

export const LegsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M6 22h4" />
        <path d="M6 18v-6" />
        <path d="M14 22h4" />
        <path d="M14 18v-6" />
        <path d="M6 12h8" />
        <path d="M6 12V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6" />
    </svg>
);


export const WeaponIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m2 2 20 20" />
        <path d="M10.5 6.5 17.5 13.5" />
        <path d="m5 12 1.5 1.5" />
        <path d="m8 15 1.5 1.5" />
        <path d="M13 3 6 10" />
        <path d="M14 4 7 11" />
        <path d="M19 9 12 16" />
    </svg>
);

export const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
);