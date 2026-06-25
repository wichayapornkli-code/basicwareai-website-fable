export type CaseStudyLocale = {
  shortHeadline: string;
  headline: string;
  tags: string[];
  quote: string;
  author: string;
};

export type CaseStudy = {
  id: number;
  size: "full" | "half";
  logoSrc: string;
  logoDarkSrc?: string;
  logoHeight: number;
  logoAlt: string;
  imageHeight: number;
  imageSrc: string;
  en: CaseStudyLocale;
  zh: CaseStudyLocale;
  zhTw: CaseStudyLocale;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    size: "full",
    logoSrc: "/assets/MGM.png",
    logoDarkSrc: "/assets/MGM_negative.png",
    logoHeight: 28,
    logoAlt: "MGM",
    imageHeight: 500,
    imageSrc: "/assets/case_01.png",
    en: {
      shortHeadline: "From invisible to unmissible.",
      headline: "From invisible to unmissible. 40x audience growth in a single month and 63,200 new followers",
      tags: ["Macau", "Entertainment"],
      quote: "Basicware's AI solutions transformed our content strategy. The results in the first month alone exceeded everything we expected.",
      author: "Head of Digital, MGM",
    },
    zh: {
      shortHeadline: "从默默无闻，到不可或缺。",
      headline: "从默默无闻，到不可或缺。单月受众规模暴涨 40 倍，新增粉丝 63200 位",
      tags: ["澳门", "娱乐行业"],
      quote: "Basicware 的 AI 解决方案彻底重塑了我们的内容运营策略，仅上线首月取得的成效就远超预期。",
      author: "数字平台主管，MGM",
    },
    zhTw: {
      shortHeadline: "從默默無聞，到不可或缺。",
      headline: "從默默無聞，到不可或缺。單月受眾規模暴漲 40 倍，新增粉絲 63200 位",
      tags: ["澳門", "娛樂行業"],
      quote: "Basicware 的 AI 解決方案徹底重塑了我們的內容運營策略，僅上線首月取得的成效就遠超預期。",
      author: "數字平台主管，MGM",
    },
  },
  {
    id: 2,
    size: "half",
    logoSrc: "/assets/Christies.png",
    logoDarkSrc: "/assets/Christies_negative.png",
    logoHeight: 14,
    logoAlt: "Christie's",
    imageHeight: 500,
    imageSrc: "/assets/case_02.png",
    en: {
      shortHeadline: "28% more high-value repeat top-ups. $4M in new revenue.",
      headline: "We assisted leading Southeast Asian game operators in collecting player behavior data across multiple devices and platforms, enabling aggregated analysis of all-channel data. We integrate behavioral data across AP, BP, PG platforms and multi-terminals to deliver full-lifecycle player journey insights. High-value customers saw a 28% increase in repeat top-ups, generating an additional USD 4 million in revenue.",
      tags: ["Southeast Asia", "Gaming"],
      quote: "The team understood our market from day one. They didn't just deliver technology — they delivered outcomes.",
      author: "Director of Operations, Christie's",
    },
    zh: {
      shortHeadline: "高增值客户重复充值增加 28%，新增营收 +USD 4M。",
      headline: "协助知名东南亚游戏商，采用多端多平台玩家行为资料采集，全渠道资料汇总分析。打通横跨 AP/BP/PG 多平台、多终端行为资料，玩家全生命周期行为路径洞察，高增值客户增加 28% 重复充值，新增营收 +USD 4M。",
      tags: ["东南亚", "游戏"],
      quote: "团队从合作之初就深谙本地市场，不止交付技术方案，更落地实实在在的业务成果。",
      author: "运营总监，Christie's",
    },
    zhTw: {
      shortHeadline: "高增值客戶重複充值增加 28%，新增營收 +USD 4M。",
      headline: "協助知名東南亞遊戲商，採用多端多平臺玩家行為資料採集，全渠道資料匯總分析。打通橫跨 AP/BP/PG 多平臺、多終端行為資料，玩家全生命週期行為路徑洞察，高增值客戶增加 28% 重複充值，新增營收 +USD 4M。",
      tags: ["東南亞", "遊戲"],
      quote: "團隊從合作之初就深諳本地市場，不止交付技術方案，更落地實實在在的業務成果。",
      author: "運營總監，Christie's",
    },
  },
  {
    id: 3,
    size: "half",
    logoSrc: "/assets/Blue%20pin.png",
    logoDarkSrc: "/assets/Blue_pin_negative.png",
    logoHeight: 28,
    logoAlt: "Bluepin",
    imageHeight: 738,
    imageSrc: "/assets/case_03.png",
    en: {
      shortHeadline: "200% more brand exposure. 70% lower marketing costs.",
      headline: "Within one month, we produced a series of high-quality promotional videos for the enterprise's global marketing campaigns, boosting the brand's product exposure by 200% and cutting its marketing costs by 70%.",
      tags: ["Hong Kong", "Hotel"],
      quote: "Partnering with Basicware cut our marketing asset production time by 80%. Our promotional materials achieved 200% more views, and most importantly, we reduced marketing costs by 70%.",
      author: "CEO of Bluepin, Gary",
    },
    zh: {
      shortHeadline: "产品曝光量提升 200%，市场营销成本降低 70%。",
      headline: "在一个月内，为企业制作高质量的系列产品宣传视频用于企业的全球市场营销活动，使企业产品曝光量提升 200%，并为企业降低 70% 的市场营销成本。",
      tags: ["香港", "酒店业"],
      quote: "与 Basicware 合作，我们把制作营销物料的时间缩短了 80%，且营销物料吸引了 200% 的观看量，更重要的是，我们的市场成本节约了 70%。",
      author: "Bluepin CEO，Gary",
    },
    zhTw: {
      shortHeadline: "產品曝光量提升 200%，市場營銷成本降低 70%。",
      headline: "在一個月內，為企業製作高質量的系列產品宣傳視頻用於企業的全球市場營銷活動，使企業產品曝光量提升 200%，並為企業降低 70% 的市場營銷成本。",
      tags: ["香港", "酒店業"],
      quote: "與 Basicware 合作，我們把製作營銷物料的時間縮短了 80%，且營銷物料吸引了 200% 的觀看量，更重要的是，我們的市場成本節約了 70%。",
      author: "Bluepin CEO，Gary",
    },
  },
  {
    id: 4,
    size: "half",
    logoSrc: "/assets/HKBAV.png",
    logoDarkSrc: "/assets/HKBAV_negative.png",
    logoHeight: 28,
    logoAlt: "HKBAV",
    imageHeight: 500,
    imageSrc: "/assets/case_04.png",
    en: {
      shortHeadline: "A culturally rich AI film for the HKBAV Gala Dinner.",
      headline: "We produced a promotional short film for the HKBAV Gala Dinner. Integrating diverse cultural elements and profound symbolism of Hong Kong, the video features professional framing and cinematography, bringing greater exposure and influence to the gala.",
      tags: ["Vietnam", "Overseas Business Association"],
      quote: "Basicware produced an exquisite cultural video for our chamber's annual gala, which showed us the outstanding power of AI content creation. I have to say, the script, concept, scenes and implied meaning of this video all exceeded my expectations.",
      author: "Chairman, HKBAV",
    },
    zh: {
      shortHeadline: "为 HKBAV Gala 晚宴打造富有文化底蕴的 AI 宣传片。",
      headline: "为越南香港商会的 GALA 晚宴制作了宣传短片，该短片融合了香港的多元文化元素与寓意，以专业的构图和拍摄手法，为晚宴赢得了更多曝光和声音。",
      tags: ["越南", "海外商业协会"],
      quote: "Basicware 为我们的商会年度晚宴制作了一条精美绝伦的文化视频，使我们看到了 AI 内容制作的优秀程度，我不得不说，这条视频在脚本、构思、场景和寓意上都超出了我的预期。",
      author: "主席，HKBAV",
    },
    zhTw: {
      shortHeadline: "為 HKBAV Gala 晚宴打造富有文化底蘊的 AI 宣傳片。",
      headline: "為越南香港商會的 GALA 晚宴製作了宣傳短片，該短片融合了香港的多元文化元素與寓意，以專業的構圖和拍攝手法，為晚宴贏得了更多曝光和聲音。",
      tags: ["越南", "海外商業協會"],
      quote: "Basicware 為我們的商會年度晚宴製作了一條精美絕倫的文化視頻，使我們看到了 AI 內容製作的優秀程度，我不得不說，這條視頻在腳本、構思、場景和寓意上都超出了我的預期。",
      author: "主席，HKBAV",
    },
  },
  {
    id: 5,
    size: "half",
    logoSrc: "/assets/Kotler.png",
    logoDarkSrc: "/assets/Kotler_negative.png",
    logoHeight: 28,
    logoAlt: "Kotler Impact",
    imageHeight: 250,
    imageSrc: "/assets/case_05.png",
    en: {
      shortHeadline: "Co-launching AI FIRST — a global AI education initiative.",
      headline: "Kotler Impact has entered into a strategic partnership with ByteDance, parent company of TikTok, and Basicware to jointly launch AI FIRST, a transformative global initiative. This program aims to build an inclusive, practical and valuable artificial intelligence education system accessible to people of all ages, backgrounds and proficiency levels around the world.",
      tags: ["Asia", "Marketing"],
      quote: "AI is no longer an optional skill – it is a fundamental requirement for the future workforce and global progress. AI FIRST is built on the belief that AI education should not be limited to technical experts. It must be accessible, practical, and meaningful for everyone: individuals, businesses, and communities across every region.",
      author: "President and Global CEO of Kotler Impact and the World Marketing Summit Group, Sadia Kibria",
    },
    zh: {
      shortHeadline: "联合发起 AI 先行计划全球 AI 教育项目。",
      headline: "Kotler Impact 与 TikTok 母公司字节跳动、Basicware 达成战略合作，联合发起全球性变革项目「AI 先行计划（AI FIRST）」。该项目旨在面向全球不同年龄、背景与专业水平的人群，打造普惠、实用且具备实际价值的人工智能教育体系。",
      tags: ["亚洲", "市场营销"],
      quote: "人工智能早已不再是可选项技能，而是未来从业者与全球发展的必备基础能力。「AI 先行计划（AI FIRST）」秉持这样的理念：人工智能教育不应仅面向技术专业人士。它应当普惠大众、实操落地、富有价值，惠及各地的个人、企业与社群。",
      author: "Kotler Impact 及世界营销峰会集团总裁兼全球 CEO，Sadia Kibria",
    },
    zhTw: {
      shortHeadline: "聯合發起 AI 先行計劃全球 AI 教育項目。",
      headline: "Kotler Impact 與 TikTok 母公司字節跳動、Basicware 達成戰略合作，聯合發起全球性變革項目「AI 先行計劃（AI FIRST）」。該項目旨在面向全球不同年齡、背景與專業水平的人群，打造普惠、實用且具備實際價值的人工智能教育體系。",
      tags: ["亞洲", "市場營銷"],
      quote: "人工智能早已不再是可選項技能，而是未來從業者與全球發展的必備基礎能力。「AI 先行計劃（AI FIRST）」秉持這樣的理念：人工智能教育不應僅面向技術專業人士。它應當普惠大眾、實操落地、富有價值，惠及各地的個人、企業與社群。",
      author: "Kotler Impact 及世界營銷峰會集團總裁兼全球 CEO，Sadia Kibria",
    },
  },
  {
    id: 6,
    size: "full",
    logoSrc: "/assets/Midea.png",
    logoDarkSrc: "/assets/Midea_negative.png",
    logoHeight: 33,
    logoAlt: "State-owned Enterprise",
    imageHeight: 500,
    imageSrc: "/assets/case_06.png",
    en: {
      shortHeadline: "AI digital employee avatars for 50+ enterprise staff.",
      headline: "We deliver end-to-end services for over 50 core staff within enterprises to build exclusive AI digital employee avatars. We help employees quickly create personalized AI digital avatars tailored to their daily workflows to boost efficiency across all work scenarios. Meanwhile, through full-cycle data monitoring and AI intelligent analytics, we accurately evaluate employees' competency to adapt to the AI era. This delivers actionable decision-making references for enterprises' subsequent large-scale AI rollout, talent management and digital transformation. We provide practical implementation solutions that cut costs, lift productivity and enable stable 24/7 business operations for enterprises.",
      tags: ["Mainland China", "Consumer Goods"],
      quote: "Basicware supported us through every single phase of the project. Beyond solution development, we also got comprehensive support for system integration, meticulous optimization and final result implementation.",
      author: "Chief Digital Officer",
    },
    zh: {
      shortHeadline: "为 50 余名企业员工打造 AI 数字员工分身。",
      headline: "为企业提供 50 余名核心人员专属 AI 数字员工分身搭建的全流程服务。帮助企业员工快速搭建适配自身工作的专属 AI 数字分身，实现全场景工作提效；同时通过全周期数据监测与 AI 智能分析，精准评估企业员工适配 AI 时代的能力，为企业后续规模化 AI 部署、人才管理及数字化转型提供可落地的决策依据。切实为企业提供降本增效与“7/24”稳定工作运营落地方案。",
      tags: ["中国大陆", "消费品"],
      quote: "Basicware 全程陪伴我们走完每一个阶段，不只是方案搭建，还包含系统对接、精细优化与最终成效落地。",
      author: "首席数字官",
    },
    zhTw: {
      shortHeadline: "為 50 餘名企業員工打造 AI 數字員工分身。",
      headline: "為企業提供 50 餘名核心人員專屬 AI 數字員工分身搭建的全流程服務。幫助企業員工快速搭建適配自身工作的專屬 AI 數字分身，實現全場景工作提效；同時通過全週期數據監測與 AI 智能分析，精準評估企業員工適配 AI 時代的能力，為企業後續規模化 AI 部署、人才管理及數字化轉型提供可落地的決策依據。切實為企業提供降本增效與“7/24”穩定工作運營落地方案。",
      tags: ["中國大陸", "消費品"],
      quote: "Basicware 全程陪伴我們走完每一個階段，不只是方案搭建，還包含系統對接、精細優化與最終成效落地。",
      author: "首席數字官",
    },
  },
];
