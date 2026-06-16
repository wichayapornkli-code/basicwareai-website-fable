export type CaseStudy = {
  id: number;
  size: "full" | "half";
  logoSrc: string;
  logoHeight: number;
  logoAlt: string;
  shortHeadline: string;
  headline: string;
  tags: string[];
  imageHeight: number;
  imageSrc: string;
  quote: string;
  author: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    size: "full",
    logoSrc: "/assets/MGM.png",
    logoHeight: 28,
    logoAlt: "MGM",
    shortHeadline: "From invisible to unmissible.",
    headline: "From invisible to unmissible. 40x audience growth in a single month and 63,200 new followers",
    tags: ["Macau", "Entertainment"],
    imageHeight: 500,
    imageSrc: "/assets/case_01.png",
    quote: "Basicware's AI solutions transformed our content strategy. The results in the first month alone exceeded everything we expected.",
    author: "— Head of Digital, MGM",
  },
  {
    id: 2,
    size: "half",
    logoSrc: "/assets/Christies.png",
    logoHeight: 14,
    logoAlt: "Christie's",
    shortHeadline: "28% more high-value repeat top-ups. $4M in new revenue.",
    headline: "We assisted leading Southeast Asian game operators in collecting player behavior data across multiple devices and platforms, enabling aggregated analysis of all-channel data. High-value customers saw a 28% increase in repeat top-ups, generating an additional USD 4 million in revenue.",
    tags: ["Southeast Asia", "Gaming"],
    imageHeight: 500,
    imageSrc: "/assets/case_02.png",
    quote: "The team understood our market from day one. They didn't just deliver technology — they delivered outcomes.",
    author: "— Director of Operations, Christie's",
  },
  {
    id: 3,
    size: "half",
    logoSrc: "/assets/Blue%20pin.png",
    logoHeight: 28,
    logoAlt: "Bluepin",
    shortHeadline: "200% more brand exposure. 70% lower marketing costs.",
    headline: "Within one month, we produced a series of high-quality promotional videos for the enterprise's global marketing campaigns, boosting the brand's product exposure by 200% and cutting its marketing costs by 70%.",
    tags: ["Hong Kong", "Hotel"],
    imageHeight: 738,
    imageSrc: "/assets/case_03.png",
    quote: "Partnering with Basicware cut our marketing asset production time by 80%. Our promotional materials achieved 200% more views, and most importantly, we reduced marketing costs by 70%.",
    author: "— CEO of Bluepin, Gary",
  },
  {
    id: 4,
    size: "half",
    logoSrc: "/assets/HKBAV.png",
    logoHeight: 28,
    logoAlt: "HKBAV",
    shortHeadline: "A culturally rich AI film for the HKBAV Gala Dinner.",
    headline: "We produced a promotional short film for the HKBAV Gala Dinner. Integrating diverse cultural elements and profound symbolism of Hong Kong, the video features professional framing and cinematography, bringing greater exposure and influence to the gala.",
    tags: ["Vietnam", "Overseas Business Association"],
    imageHeight: 500,
    imageSrc: "/assets/case_04.png",
    quote: "Basicware produced an exquisite cultural video for our chamber's annual gala, which showed us the outstanding power of AI content creation. The script, concept, scenes and implied meaning of this video all exceeded my expectations.",
    author: "— Chairman, HKBAV",
  },
  {
    id: 5,
    size: "half",
    logoSrc: "/assets/Kotler.png",
    logoHeight: 28,
    logoAlt: "Kotler Impact",
    shortHeadline: "Co-launching AI FIRST — a global AI education initiative.",
    headline: "Kotler Impact has entered into a strategic partnership with ByteDance and Basicware to jointly launch AI FIRST, a transformative global initiative aimed at building an inclusive, practical and valuable AI education system accessible to people of all ages and backgrounds worldwide.",
    tags: ["Asia", "Marketing"],
    imageHeight: 250,
    imageSrc: "/assets/case_05.png",
    quote: "AI is no longer an optional skill — it is a fundamental requirement for the future workforce and global progress. AI FIRST is built on the belief that AI education should not be limited to technical experts. It must be accessible, practical, and meaningful for everyone.",
    author: "— President and Global CEO of Kotler Impact, Sadia Kibria",
  },
  {
    id: 6,
    size: "full",
    logoSrc: "/assets/Midea.png",
    logoHeight: 33,
    logoAlt: "State-owned Enterprise",
    shortHeadline: "AI digital employee avatars for 50+ enterprise staff.",
    headline: "We deliver end-to-end services for over 50 core staff within enterprises to build exclusive AI digital employee avatars. Through full-cycle data monitoring and AI intelligent analytics, we accurately evaluate employees' competency to adapt to the AI era, delivering actionable decision-making references for large-scale AI rollout, talent management and digital transformation.",
    tags: ["Mainland China", "Consumer Goods"],
    imageHeight: 500,
    imageSrc: "/assets/case_06.png",
    quote: "Basicware supported us through every single phase of the project. Beyond solution development, we also got comprehensive support for system integration, meticulous optimization and final result implementation.",
    author: "— Chief Digital Officer",
  },
];
