export type CaseStudy = {
  id: number;
  size: "full" | "half";
  logoSrc: string;
  logoHeight: number;
  logoAlt: string;
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
    logoSrc: "/assets/Midea.png",
    logoHeight: 33,
    logoAlt: "Midea",
    headline: "From invisible to unmissable. 40x audience growth in a single month and 63,200 new followers",
    tags: ["Macau", "1 Month", "Entertainment"],
    imageHeight: 500,
    imageSrc: "/assets/case_01.png",
    quote: "Basicware's AI solutions transformed our content strategy. The results in the first month alone exceeded everything we expected.",
    author: "— Head of Digital, Midea",
  },
  {
    id: 2,
    size: "half",
    logoSrc: "/assets/Christies.png",
    logoHeight: 14,
    logoAlt: "Christie's",
    headline: "From invisible to unmissable. 40x audience growth in a single month and 63,200 new followers",
    tags: ["Macau", "1 Month", "Gaming"],
    imageHeight: 500,
    imageSrc: "/assets/case_02.png",
    quote: "The team understood our market from day one. They didn't just deliver technology — they delivered outcomes.",
    author: "— Director of Operations, Christie's",
  },
  {
    id: 3,
    size: "half",
    logoSrc: "/assets/Christies.png",
    logoHeight: 14,
    logoAlt: "Christie's",
    headline: "From invisible to unmissable. 40x audience growth in a single month and 63,200 new followers",
    tags: ["Macau", "1 Month", "Training"],
    imageHeight: 738,
    imageSrc: "/assets/case_03.png",
    quote: "Working with Basicware gave us access to AI capabilities we couldn't have built ourselves — deployed in weeks, not years.",
    author: "— VP of Strategy, Christie's",
  },
  {
    id: 4,
    size: "half",
    logoSrc: "/assets/Midea.png",
    logoHeight: 33,
    logoAlt: "Midea",
    headline: "From invisible to unmissable. 40x audience growth in a single month and 63,200 new followers",
    tags: ["Macau", "1 Month", "Token"],
    imageHeight: 500,
    imageSrc: "/assets/case_04.png",
    quote: "Their unified API approach solved a problem we'd been struggling with for two years. Operational efficiency jumped overnight.",
    author: "— CTO, Midea Asia-Pacific",
  },
  {
    id: 5,
    size: "half",
    logoSrc: "/assets/Christies.png",
    logoHeight: 14,
    logoAlt: "Christie's",
    headline: "From invisible to unmissable. 40x audience growth in a single month and 63,200 new followers",
    tags: ["Macau", "1 Month", "FMCG"],
    imageHeight: 250,
    imageSrc: "/assets/case_05.png",
    quote: "Basicware stayed with us through every stage. Not just the build — the integration, the refinement, the results.",
    author: "— General Manager, Christie's",
  },
  {
    id: 6,
    size: "full",
    logoSrc: "/assets/Midea.png",
    logoHeight: 33,
    logoAlt: "Midea",
    headline: "From invisible to unmissable. 40x audience growth in a single month and 63,200 new followers",
    tags: ["Macau", "1 Month", "Training"],
    imageHeight: 500,
    imageSrc: "/assets/case_06.png",
    quote: "We came to Basicware for AI. We got a partner who genuinely understood our business goals and built for them.",
    author: "— Chief Digital Officer, Midea",
  },
];
