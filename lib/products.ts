export type ProductLocale = {
  headline: string
  problemStatement: string
  howItWorks: string
  features: { title: string; description: string }[]
  whoFor: string[]
  cta: string
  faqs: { question: string; answer: string }[]
}

export type Product = {
  id: string
  name: string
  brandName: string
  heroImageSrc: string // TODO: replace each with a dedicated product hero photo
  heroColor: string
  imageSrc: string
  en: ProductLocale
  zh: ProductLocale
  zhTw: ProductLocale
}

export const PRODUCTS: Product[] = [
  {
    id: 'token',
    name: 'Centralized Token Control',
    brandName: 'BasicRouter',
    heroImageSrc: '/assets/2_practice_01.avif',
    heroColor: '#0148ae',
    imageSrc: '/assets/2_practice_01.avif',
    en: {
      headline: 'One API. Every leading AI model. Zero vendor lock-in.',
      problemStatement:
        'Managing multiple AI vendors means juggling contracts, integrations, billing systems, and security reviews for every new model you want to try. When the AI landscape shifts overnight, your team is stuck waiting for procurement. Businesses lose weeks to vendor overhead instead of shipping products.',
      howItWorks:
        "BasicRouter is Basicware's unified AI gateway. Connect your application once to a single API and gain instant access to 10+ of the world's top models — including GPT, Claude, Gemini, DeepSeek, Doubao, Qwen, Kimi, GLM, and MiniMax. Switch between models with a single parameter change, no reintegration needed. Every request is routed securely end-to-end, with full encryption, role-based permissions, and a complete audit trail for compliance. A centralized billing dashboard tracks usage and cost across your entire team in real time, so you always know where your AI spend is going — and why it's worth it.",
      features: [
        {
          title: 'One Connection, Every Model',
          description:
            'Connect once and access 10+ leading global AI models instantly — no separate contracts, integrations, or onboarding required for each provider.',
        },
        {
          title: 'Switch Models Without Rewriting Code',
          description:
            'Swap between GPT, Claude, Gemini, DeepSeek, and more with a single parameter. Your codebase stays clean and your velocity stays high.',
        },
        {
          title: 'End-to-End Security Built In',
          description:
            'Every request is encrypted end-to-end with tiered role permissions, a full audit trail, and zero data retention from your conversations.',
        },
        {
          title: 'Real-Time Billing Across Your Whole Team',
          description:
            'Track every token by model, team, and project. One dashboard replaces multiple vendor invoices and makes AI spend transparent and predictable.',
        },
      ],
      whoFor: [
        'Enterprise engineering teams integrating AI into products at scale',
        'Procurement and finance teams managing AI vendor costs across departments',
        'CTOs and platform leads who need the flexibility to adopt new models as they emerge',
      ],
      cta: 'Get API access',
      faqs: [
        {
          question: 'Which AI models does BasicRouter support?',
          answer:
            'BasicRouter currently supports 10+ leading models including GPT-4o, Claude 3.5, Gemini 1.5 Pro, DeepSeek, Doubao, Qwen, Kimi, GLM, and MiniMax. New models are added as they reach production-grade quality. You access them all through a single endpoint.',
        },
        {
          question: 'Is our data safe when routed through BasicRouter?',
          answer:
            'BasicRouter operates as a direct conduit to each cloud provider — we do not log, store, or train on your conversation data. All traffic is encrypted in transit and you retain full data sovereignty. Enterprise compliance documentation is available on request.',
        },
        {
          question: 'Can we use BasicRouter with our existing codebase?',
          answer:
            'Yes. BasicRouter uses an OpenAI-compatible API format, meaning most applications can switch by changing a single base URL and API key — no other code changes required. Our team can also provide technical onboarding support.',
        },
      ],
    },
    zh: {
      headline: '一个 API，连接全球顶尖 AI 模型，彻底摆脱厂商绑定。',
      problemStatement:
        '企业每接入一个新的 AI 供应商，就要重新谈合同、调整集成方案、对齐账单系统，还要重做安全审查。AI 模型迭代速度极快，但团队却被采购流程拖住脚步，白白浪费数周时间，而竞争对手早已跑到了前面。',
      howItWorks:
        'BasicRouter 是 Basicware 的统一 AI 网关。应用程序只需接入一次，即可立即调用全球 10+ 顶尖模型，包括 GPT、Claude、Gemini、DeepSeek、豆包、通义千问、Kimi、智谱 GLM 及 MiniMax。只需修改一个参数即可切换模型，无需重新集成。每条请求均经过端到端安全路由，支持全程加密、角色权限分级与完整合规审计日志。集中式计费仪表盘实时追踪全团队的使用量与成本，让 AI 支出一目了然、可控可预测。',
      features: [
        {
          title: '一次接入，覆盖全部模型',
          description: '一次接入即可访问全球 10+ 顶尖 AI 模型，无需逐一签约、集成或完成繁琐的供应商入驻流程。',
        },
        {
          title: '切换模型，无需改动代码',
          description:
            '只需修改一个参数，即可在 GPT、Claude、Gemini、DeepSeek 等模型之间自由切换，代码库保持整洁，研发节奏不受影响。',
        },
        {
          title: '全程加密，安全合规开箱即用',
          description:
            '每一条请求均经过端到端加密处理，支持角色权限分级、完整审计日志，对话内容零留存，企业数据安全有保障。',
        },
        {
          title: '全团队 AI 费用，实时统一管控',
          description:
            '按模型、团队、项目维度追踪每一个 token 的使用情况，一个控制台取代多张供应商账单，让 AI 成本一目了然。',
        },
      ],
      whoFor: [
        '正在将 AI 能力规模化集成到产品中的大型工程团队',
        '负责跨部门管理 AI 采购成本的财务与采购团队',
        '希望灵活跟进最新 AI 模型的 CTO 及平台负责人',
      ],
      cta: '申请 API 接入',
      faqs: [
        {
          question: 'BasicRouter 支持哪些 AI 模型？',
          answer:
            'BasicRouter 目前支持 10+ 主流模型，包括 GPT-4o、Claude 3.5、Gemini 1.5 Pro、DeepSeek、豆包、通义千问、Kimi、智谱 GLM 及 MiniMax，并持续接入达到量产质量标准的最新模型。所有模型均通过统一接口调用。',
        },
        {
          question: '通过 BasicRouter 路由的数据安全吗？',
          answer:
            'BasicRouter 作为直连通道将请求路由至各云服务商，我们不记录、存储您的对话数据，也不用于任何模型训练。所有传输数据均经过加密处理，您完全掌握数据主权。企业合规文档可按需提供。',
        },
        {
          question: 'BasicRouter 能否与我们现有的代码库集成？',
          answer:
            '可以。BasicRouter 采用与 OpenAI 兼容的 API 格式，大多数应用只需更改 base URL 和 API 密钥即可完成迁移，无需改动其他代码。我们的技术团队也可提供接入支持。',
        },
      ],
    },
    zhTw: {
      headline: '一個 API，連接全球頂尖 AI 模型，徹底擺脫廠商綁定。',
      problemStatement:
        '企業每接入一個新的 AI 供應商，就要重新談合同、調整集成方案、對齊賬單系統，還要重做安全審查。AI 模型迭代速度極快，但團隊卻被採購流程拖住腳步，白白浪費數週時間，而競爭對手早已跑到了前面。',
      howItWorks:
        'BasicRouter 是 Basicware 的統一 AI 網關。應用程序只需接入一次，即可立即調用全球 10+ 頂尖模型，包括 GPT、Claude、Gemini、DeepSeek、豆包、通義千問、Kimi、智譜 GLM 及 MiniMax。只需修改一個參數即可切換模型，無需重新集成。每條請求均經過端到端安全路由，支持全程加密、角色權限分級與完整合規審計日誌。集中式計費儀表盤實時追蹤全團隊的使用量與成本，讓 AI 支出一目了然、可控可預測。',
      features: [
        {
          title: '一次接入，覆蓋全部模型',
          description: '一次接入即可訪問全球 10+ 頂尖 AI 模型，無需逐一簽約、集成或完成繁瑣的供應商入駐流程。',
        },
        {
          title: '切換模型，無需改動代碼',
          description:
            '只需修改一個參數，即可在 GPT、Claude、Gemini、DeepSeek 等模型之間自由切換，代碼庫保持整潔，研發節奏不受影響。',
        },
        {
          title: '全程加密，安全合規開箱即用',
          description:
            '每一條請求均經過端到端加密處理，支持角色權限分級、完整審計日誌，對話內容零留存，企業數據安全有保障。',
        },
        {
          title: '全團隊 AI 費用，實時統一管控',
          description:
            '按模型、團隊、項目維度追蹤每一個 token 的使用情況，一個控制台取代多張供應商賬單，讓 AI 成本一目了然。',
        },
      ],
      whoFor: [
        '正在將 AI 能力規模化集成到產品中的大型工程團隊',
        '負責跨部門管理 AI 採購成本的財務與採購團隊',
        '希望靈活跟進最新 AI 模型的 CTO 及平台負責人',
      ],
      cta: '申請 API 接入',
      faqs: [
        {
          question: 'BasicRouter 支持哪些 AI 模型？',
          answer:
            'BasicRouter 目前支持 10+ 主流模型，包括 GPT-4o、Claude 3.5、Gemini 1.5 Pro、DeepSeek、豆包、通義千問、Kimi、智譜 GLM 及 MiniMax，並持續接入達到量產質量標準的最新模型。所有模型均通過統一接口調用。',
        },
        {
          question: '通過 BasicRouter 路由的數據安全嗎？',
          answer:
            'BasicRouter 作為直連通道將請求路由至各雲服務商，我們不記錄、存儲您的對話數據，也不用於任何模型訓練。所有傳輸數據均經過加密處理，您完全掌握數據主權。企業合規文檔可按需提供。',
        },
        {
          question: 'BasicRouter 能否與我們現有的代碼庫集成？',
          answer:
            '可以。BasicRouter 採用與 OpenAI 兼容的 API 格式，大多數應用只需更改 base URL 和 API 密鑰即可完成遷移，無需改動其他代碼。我們的技術團隊也可提供接入支持。',
        },
      ],
    },
  },
  {
    id: 'employees',
    name: 'AI Digital Employees',
    brandName: 'OpenClaw',
    heroImageSrc: '/assets/2_practice_02.avif',
    heroColor: '#0c2340',
    imageSrc: '/assets/2_practice_02.avif',
    en: {
      headline: 'Your AI workforce. Deployed overnight. Running 24/7 across every function.',
      problemStatement:
        'Your best people are buried in repetitive, low-value tasks — responding to the same support tickets, chasing the same approvals, generating the same reports. Headcount constraints mean work piles up and talent burns out. Meanwhile, competitors are deploying AI workers that never sleep and never slow down.',
      howItWorks:
        'OpenClaw deploys purpose-built AI agents trained to operate within your existing tools — your CRM, help desk, HR system, ERP, or communication platforms. Each agent is configured to your workflows, tone, and escalation rules, then activated to run autonomously around the clock. They handle intake, routing, responses, and reporting across customer support, sales, HR, finance, and operations. When a task falls outside their scope, they hand off to your human team with full context intact. You get the productivity of a full department without the hiring timeline — and the ability to scale up or down in days, not quarters.',
      features: [
        {
          title: 'Pre-Built Roles, Ready to Deploy',
          description:
            'Choose from AI agents pre-trained for customer support, sales, HR, finance, operations, and brand marketing — each configured to your specific workflows.',
        },
        {
          title: 'Works Inside Your Existing Stack',
          description:
            'OpenClaw integrates with the tools your team already uses — Slack, HubSpot, Salesforce, Zendesk, SAP, and more — with no rip-and-replace required.',
        },
        {
          title: 'Multilingual, Around the Clock',
          description:
            'AI employees respond in the language of each customer or colleague, across time zones, with no overnight delays and no language-support overhead.',
        },
        {
          title: 'Smart Escalation to Human Teams',
          description:
            'When a task exceeds scope, OpenClaw hands off to the right human with full context — so nothing is lost and no one starts from scratch.',
        },
      ],
      whoFor: [
        'Customer-facing teams overwhelmed by ticket volume and response time expectations',
        'Operations leaders looking to reduce headcount costs without reducing output',
        'HR and finance teams spending hours on documentation, data entry, and routine queries',
      ],
      cta: 'Deploy your first AI employee',
      faqs: [
        {
          question: 'How long does it take to deploy an AI employee?',
          answer:
            'Most AI employees are operational within one to two weeks. That includes integration with your existing tools, configuration of your workflows and escalation rules, and a testing phase to validate responses before going live. Larger enterprise deployments are scoped during onboarding.',
        },
        {
          question: 'Can AI employees be customized to match our brand voice?',
          answer:
            'Yes. Each agent is trained on your brand guidelines, communication standards, and product knowledge base before deployment. You can define tone, vocabulary, and response formats across every channel the agent operates on.',
        },
        {
          question: "What happens when the AI can't handle a request?",
          answer:
            "OpenClaw is built with configurable escalation logic. When a task falls outside the agent's defined scope — due to complexity, sentiment, or explicit user request — it transfers to a human team member with the full conversation history and context attached.",
        },
      ],
    },
    zh: {
      headline: '您的 AI 员工团队——一夜部署，全职能全天候运转。',
      problemStatement:
        '优秀人才每天深陷重复性低价值事务——回复相同的工单、催进相同的审批、生成相同的报告。人员编制的限制让工作积压，人才不断流失。与此同时，竞争对手已经在部署永不下班、永不减速的 AI 员工。',
      howItWorks:
        'OpenClaw 部署专为您现有工具体系量身定制的 AI 智能体——无论是 CRM、工单系统、HR 平台、ERP 还是即时通讯工具，均可无缝接入。每个智能体根据您的业务流程、沟通风格和升级规则完成配置后，即可全天候自主运行。从客服响应、销售跟进、人事办理到财务对账、运营监控，全面覆盖。超出处理范围时，AI 员工将携带完整上下文无缝移交人工团队。您将获得相当于完整部门的生产力，无需经历漫长的招聘周期，且可按需在数天内完成规模调整。',
      features: [
        {
          title: '预置岗位角色，开箱即用',
          description:
            '从客服、销售、人事、财务、运营到品牌营销，预置岗位角色均经过专项训练，可根据您的具体业务流程快速配置上线。',
        },
        {
          title: '无缝集成现有工具体系',
          description:
            'OpenClaw 与您团队已在使用的工具无缝集成——Slack、HubSpot、Salesforce、Zendesk、SAP 等均支持，无需替换现有系统。',
        },
        {
          title: '多语言，全天候',
          description:
            'AI 员工以客户或同事使用的语言进行响应，跨越时区限制，无需等待夜班支持，彻底消除多语言运营成本。',
        },
        {
          title: '智能升级，无缝移交人工',
          description:
            '当任务超出 AI 处理范围时，OpenClaw 携带完整上下文自动移交给合适的人工团队成员，确保信息无缝传递，无需从头重复沟通。',
        },
      ],
      whoFor: [
        '工单量庞大、响应时效压力沉重的客户服务团队',
        '希望在不降低产出的前提下控制人力成本的运营负责人',
        '每天耗费大量时间处理文档、数据录入和常规查询的人事与财务团队',
      ],
      cta: '部署您的首位 AI 员工',
      faqs: [
        {
          question: '部署一位 AI 员工需要多长时间？',
          answer:
            '大多数 AI 员工可在一至两周内投入运行，涵盖工具集成、业务流程与升级规则配置，以及上线前的响应测试验证阶段。大型企业部署的时间规划将在入驻阶段单独制定。',
        },
        {
          question: 'AI 员工能否按照我们的品牌风格进行定制？',
          answer:
            '可以。每位 AI 员工在部署前均基于您的品牌指南、沟通规范和产品知识库进行专项训练。您可以为其在各渠道的沟通定义语气、用词偏好和响应格式。',
        },
        {
          question: '当 AI 无法处理某个请求时会怎样？',
          answer:
            'OpenClaw 内置可配置的升级逻辑。当任务因复杂程度、情绪因素或用户明确要求而超出 AI 处理范围时，系统将携带完整对话记录与上下文自动移交人工团队处理。',
        },
      ],
    },
    zhTw: {
      headline: '您的 AI 員工團隊——一夜部署，全職能全天候運轉。',
      problemStatement:
        '優秀人才每天深陷重複性低價值事務——回覆相同的工單、催進相同的審批、生成相同的報告。人員編制的限制讓工作積壓，人才不斷流失。與此同時，競爭對手已經在部署永不下班、永不減速的 AI 員工。',
      howItWorks:
        'OpenClaw 部署專為您現有工具體系量身定制的 AI 智能體——無論是 CRM、工單系統、HR 平台、ERP 還是即時通訊工具，均可無縫接入。每個智能體根據您的業務流程、溝通風格和升級規則完成配置後，即可全天候自主運行。從客服響應、銷售跟進、人事辦理到財務對賬、運營監控，全面覆蓋。超出處理範圍時，AI 員工將攜帶完整上下文無縫移交人工團隊。您將獲得相當於完整部門的生產力，無需經歷漫長的招聘週期，且可按需在數天內完成規模調整。',
      features: [
        {
          title: '預置崗位角色，開箱即用',
          description:
            '從客服、銷售、人事、財務、運營到品牌營銷，預置崗位角色均經過專項訓練，可根據您的具體業務流程快速配置上線。',
        },
        {
          title: '無縫集成現有工具體系',
          description:
            'OpenClaw 與您團隊已在使用的工具無縫集成——Slack、HubSpot、Salesforce、Zendesk、SAP 等均支持，無需替換現有系統。',
        },
        {
          title: '多語言，全天候',
          description:
            'AI 員工以客戶或同事使用的語言進行響應，跨越時區限制，無需等待夜班支持，徹底消除多語言運營成本。',
        },
        {
          title: '智能升級，無縫移交人工',
          description:
            '當任務超出 AI 處理範圍時，OpenClaw 攜帶完整上下文自動移交給合適的人工團隊成員，確保信息無縫傳遞，無需從頭重複溝通。',
        },
      ],
      whoFor: [
        '工單量龐大、響應時效壓力沉重的客戶服務團隊',
        '希望在不降低產出的前提下控制人力成本的運營負責人',
        '每天耗費大量時間處理文檔、數據錄入和常規查詢的人事與財務團隊',
      ],
      cta: '部署您的首位 AI 員工',
      faqs: [
        {
          question: '部署一位 AI 員工需要多長時間？',
          answer:
            '大多數 AI 員工可在一至兩週內投入運行，涵蓋工具集成、業務流程與升級規則配置，以及上線前的響應測試驗證階段。大型企業部署的時間規劃將在入駐階段單獨制定。',
        },
        {
          question: 'AI 員工能否按照我們的品牌風格進行定制？',
          answer:
            '可以。每位 AI 員工在部署前均基於您的品牌指南、溝通規範和產品知識庫進行專項訓練。您可以為其在各渠道的溝通定義語氣、用詞偏好和響應格式。',
        },
        {
          question: '當 AI 無法處理某個請求時會怎樣？',
          answer:
            'OpenClaw 內置可配置的升級邏輯。當任務因複雜程度、情緒因素或用戶明確要求而超出 AI 處理範圍時，系統將攜帶完整對話記錄與上下文自動移交人工團隊處理。',
        },
      ],
    },
  },
  {
    id: 'content',
    name: 'AI Content & Growth',
    brandName: 'AI Content & Growth',
    heroImageSrc: '/assets/2_practice_03.avif',
    heroColor: '#0d2b1d',
    imageSrc: '/assets/2_practice_03.avif',
    en: {
      headline: 'Produce more content, in less time, across every channel.',
      problemStatement:
        "Creating content across social, video, e-commerce, and brand channels takes a team of specialists, weeks of production time, and budgets that keep growing. Most brands can't produce fast enough to stay relevant — and when they do, quality suffers. The gap between what you need and what you can produce keeps widening.",
      howItWorks:
        'Basicware rebuilds your content engine with AI at every stage of production. We start by understanding your brand voice, target markets, and channel mix, then deploy a combination of AI copywriting, image generation, video production, and digital avatar technology tuned to your output goals. For brands targeting Chinese-speaking audiences, our team runs end-to-end TikTok and Douyin growth strategies — from content ideation and production to publishing cadence and algorithm optimization. The result is a scalable, always-on content operation that produces brand-consistent material across formats and languages, in a fraction of the time and without a fraction of the headcount.',
      features: [
        {
          title: 'AI Copywriting at Scale',
          description:
            'Generate on-brand marketing copy, social captions, ad headlines, and product descriptions across languages — in the time it used to take for one version.',
        },
        {
          title: 'AI Image & Creative Generation',
          description:
            'Produce ad creatives, brand visuals, and campaign imagery with AI — on brief, on brand, and on a timeline that replaces weeks with hours.',
        },
        {
          title: 'Digital Avatar Broadcasting',
          description:
            "Deploy virtual presenters that speak your brand's language — literally. Multi-language digital avatars produce video content at scale with no studio and no talent fees.",
        },
        {
          title: 'TikTok & Douyin Growth Strategy',
          description:
            'From account setup and content strategy to short-video production and algorithm optimization — the full playbook for high-growth social presence in Asia and beyond.',
        },
      ],
      whoFor: [
        'Marketing teams under pressure to increase content output without increasing headcount',
        'Brands expanding into Chinese-speaking markets who need localized content at speed',
        'E-commerce and retail brands looking to dominate social commerce channels',
      ],
      cta: 'Build your content engine',
      faqs: [
        {
          question: 'How quickly can you get our content operation running?',
          answer:
            'For most clients, the first AI-produced content is ready within two to three weeks of kickoff. The onboarding phase covers brand voice calibration, template creation, and channel setup. Full-scale production typically reaches operational speed within the first month.',
        },
        {
          question: 'Does the content match our brand guidelines?',
          answer:
            'Yes. We train our AI systems on your brand guidelines, visual identity, tone of voice, and audience profiles before generating any content. All output goes through a defined review and approval workflow before it reaches your channels.',
        },
        {
          question: 'Can you manage our TikTok and Douyin accounts directly?',
          answer:
            'Yes. Our growth team can operate as your full-service TikTok and Douyin agency — handling content production, publishing, community management, paid promotion, and performance reporting. We also offer a co-pilot model to support your in-house team.',
        },
      ],
    },
    zh: {
      headline: '更少时间，更多内容，全渠道同步爆发。',
      problemStatement:
        '在社交媒体、视频平台、电商和品牌渠道全面输出内容，需要专业团队、数周制作周期和持续攀升的预算。大多数品牌的内容生产速度跟不上市场节奏——强行追赶时，质量又难以保证。内容产能缺口正在不断扩大。',
      howItWorks:
        'Basicware 在内容生产的每个环节引入 AI 能力，从根本上重构您的内容引擎。我们首先深入理解您的品牌调性、目标市场和渠道矩阵，再综合部署 AI 文案、图像生成、视频制作与数字人技术，精准匹配您的产出目标。针对中文市场的品牌，我们团队提供抖音与 TikTok 全链路增长服务——从内容策划、制作到发布节奏与算法优化，全程覆盖。最终交付的是一套始终在线、持续扩展、跨格式跨语言保持品牌一致性的内容生产体系。',
      features: [
        {
          title: '规模化 AI 文案创作',
          description:
            '跨语言批量生成符合品牌调性的营销文案、社交帖文、广告标题与产品描述——原先一版的时间，现在可产出数十版。',
        },
        {
          title: 'AI 图像与创意素材生成',
          description:
            '利用 AI 批量生成广告素材、品牌视觉与活动图像——符合创意 Brief，贴合品牌风格，将数周制作周期压缩至数小时。',
        },
        {
          title: '数字人视频播报',
          description: '部署能够「开口说话」的虚拟主播。多语言数字人大规模产出视频内容，无需摄影棚，无需出镜费用。',
        },
        {
          title: 'TikTok 与抖音增长策略',
          description:
            '从账号搭建、内容策划到短视频制作与算法优化，执行完整增长打法，助您在亚洲及全球市场快速建立高影响力社交阵地。',
        },
      ],
      whoFor: [
        '面临提升内容产能但无法扩招压力的营销团队',
        '正在进入中文市场、需要快速产出本土化内容的品牌',
        '希望在社交电商渠道建立竞争优势的电商与零售品牌',
      ],
      cta: '构建您的内容引擎',
      faqs: [
        {
          question: '多久可以让我们的内容体系运转起来？',
          answer:
            '对大多数客户而言，首批 AI 产出内容通常在项目启动后两至三周内交付。入驻阶段涵盖品牌调性校准、模板创建与渠道配置。完整规模的内容生产通常在第一个月内达到稳定运转状态。',
        },
        {
          question: '产出内容是否符合我们的品牌规范？',
          answer:
            '是的。在生成任何内容之前，我们会基于您的品牌规范、视觉识别系统、语言风格和受众画像对 AI 系统进行专项训练。所有产出内容均经过既定审核与审批流程后方可发布至您的渠道。',
        },
        {
          question: '你们可以直接管理我们的 TikTok 和抖音账号吗？',
          answer:
            '可以。我们的增长团队可作为您的 TikTok 和抖音全托管服务方，全面负责内容制作、发布排期、社区运营、付费推广与效果汇报。我们也提供协作模式，为您的内部团队提供支撑。',
        },
      ],
    },
    zhTw: {
      headline: '更少時間，更多內容，全渠道同步爆發。',
      problemStatement:
        '在社交媒體、視頻平台、電商和品牌渠道全面輸出內容，需要專業團隊、數週製作週期和持續攀升的預算。大多數品牌的內容生產速度跟不上市場節奏——強行追趕時，質量又難以保證。內容產能缺口正在不斷擴大。',
      howItWorks:
        'Basicware 在內容生產的每個環節引入 AI 能力，從根本上重構您的內容引擎。我們首先深入理解您的品牌調性、目標市場和渠道矩陣，再綜合部署 AI 文案、圖像生成、視頻製作與數字人技術，精準匹配您的產出目標。針對中文市場的品牌，我們團隊提供抖音與 TikTok 全鏈路增長服務——從內容策劃、製作到發布節奏與算法優化，全程覆蓋。最終交付的是一套始終在線、持續擴展、跨格式跨語言保持品牌一致性的內容生產體系。',
      features: [
        {
          title: '規模化 AI 文案創作',
          description:
            '跨語言批量生成符合品牌調性的營銷文案、社交帖文、廣告標題與產品描述——原先一版的時間，現在可產出數十版。',
        },
        {
          title: 'AI 圖像與創意素材生成',
          description:
            '利用 AI 批量生成廣告素材、品牌視覺與活動圖像——符合創意 Brief，貼合品牌風格，將數週製作週期壓縮至數小時。',
        },
        {
          title: '數字人視頻播報',
          description: '部署能夠「開口說話」的虛擬主播。多語言數字人大規模產出視頻內容，無需攝影棚，無需出鏡費用。',
        },
        {
          title: 'TikTok 與抖音增長策略',
          description:
            '從賬號搭建、內容策劃到短視頻製作與算法優化，執行完整增長打法，助您在亞洲及全球市場快速建立高影響力社交陣地。',
        },
      ],
      whoFor: [
        '面臨提升內容產能但無法擴招壓力的營銷團隊',
        '正在進入中文市場、需要快速產出本土化內容的品牌',
        '希望在社交電商渠道建立競爭優勢的電商與零售品牌',
      ],
      cta: '構建您的內容引擎',
      faqs: [
        {
          question: '多久可以讓我們的內容體系運轉起來？',
          answer:
            '對大多數客戶而言，首批 AI 產出內容通常在項目啟動後兩至三週內交付。入駐階段涵蓋品牌調性校準、模板創建與渠道配置。完整規模的內容生產通常在第一個月內達到穩定運轉狀態。',
        },
        {
          question: '產出內容是否符合我們的品牌規範？',
          answer:
            '是的。在生成任何內容之前，我們會基於您的品牌規範、視覺識別系統、語言風格和受眾畫像對 AI 系統進行專項訓練。所有產出內容均經過既定審核與審批流程後方可發布至您的渠道。',
        },
        {
          question: '你們可以直接管理我們的 TikTok 和抖音賬號嗎？',
          answer:
            '可以。我們的增長團隊可作為您的 TikTok 和抖音全託管服務方，全面負責內容製作、發布排期、社區運營、付費推廣與效果匯報。我們也提供協作模式，為您的內部團隊提供支撐。',
        },
      ],
    },
  },
  {
    id: 'education',
    name: 'AI Education',
    brandName: 'AI Education',
    heroImageSrc: '/assets/2_practice_04.avif',
    heroColor: '#1c0a3d',
    imageSrc: '/assets/2_practice_04.avif',
    en: {
      headline: 'Turn your people into confident, certified AI practitioners.',
      problemStatement:
        "Most organizations have invested in AI tools but haven't invested in their people. The result is underutilized technology, low adoption, and a workforce that treats AI as a risk rather than an advantage. Without structured training, the gap between what AI can do and what your team actually does with it keeps growing.",
      howItWorks:
        "Basicware's AI Education programs combine structured online learning, regional offline instruction, and globally recognized certification to build AI capability across your organization. Our curriculum is designed for professionals, not academics — practical, role-specific, and built around the AI tools and workflows your teams actually encounter. Certification tracks are co-certified by TikTok and Pearson, recognized by governments and enterprise clients across the region, and designed to demonstrate real competency rather than just course completion. We partner with educational institutions and corporate training departments to deliver at scale — from individual upskilling to workforce-wide AI transformation.",
      features: [
        {
          title: 'Online Courses for Distributed Teams',
          description:
            'Flexible, self-paced AI training accessible from anywhere — designed for professionals who need practical skills they can apply immediately, not theory.',
        },
        {
          title: 'Offline Instruction & Regional Delivery',
          description:
            'In-person AI training delivered through regional education partners — with structured assessments, group workshops, and real-world case studies tailored to local market contexts.',
        },
        {
          title: 'TikTok & Pearson Co-Certified Credentials',
          description:
            'Earn a globally recognized AI engineering certification co-certified by TikTok and Pearson — acknowledged by enterprises and governments across the APAC region and beyond.',
        },
        {
          title: 'Curriculum Built for Professionals',
          description:
            'Role-specific learning tracks for marketers, engineers, HR professionals, executives, and operations teams — so every participant builds skills relevant to their actual job.',
        },
      ],
      whoFor: [
        'HR and L&D teams building organization-wide AI capability programs',
        'Universities and vocational institutions looking to add AI certification to their curriculum',
        'Individual professionals seeking a globally recognized credential to advance their AI career',
      ],
      cta: 'Explore programs',
      faqs: [
        {
          question: 'Who recognizes the certifications?',
          answer:
            'The AI Engineer Certification is co-certified by TikTok and Pearson Education — two of the most recognized names in technology and global credentialing. It is acknowledged by enterprise employers and government agencies across the APAC region, making it a meaningful qualification for career advancement.',
        },
        {
          question: 'Can we run a program for our entire company?',
          answer:
            "Yes. We design and deliver enterprise-scale AI training programs — from cohort-based online courses to facilitated in-person workshops — tailored to your organization's roles, maturity level, and transformation goals. Contact us to scope a program for your team.",
        },
        {
          question: 'Is there a certification exam, and how difficult is it?',
          answer:
            'Yes. The certification includes a structured assessment designed to test practical AI application, not memorization. The difficulty is benchmarked for working professionals — rigorous enough to be meaningful, and accessible enough for motivated learners with no prior AI background to pass with preparation.',
        },
      ],
    },
    zh: {
      headline: '让您的团队成为自信、持证的 AI 实践者。',
      problemStatement:
        '大多数企业在 AI 工具上有所投入，却忽视了对人的培养。结果是技术闲置、采用率低迷，员工将 AI 视为风险而非优势。缺乏体系化培训，AI 的能力与团队实际使用率之间的鸿沟只会越来越深。',
      howItWorks:
        'Basicware 的 AI 教育项目将系统化在线课程、区域线下教学与全球认可的认证资质融为一体，在组织内部全面构建 AI 能力。我们的课程专为职场人士设计——实践导向、岗位定制，围绕团队实际面对的 AI 工具与工作流程展开，而非学术理论。认证课程由 TikTok 和 Pearson 联合认证，获得区域内政府机构与企业客户的广泛认可，着重考察真实能力而非课程完成度。我们与教育机构及企业培训部门深度合作，从个人技能提升到全员 AI 转型项目，均可规模化交付。',
      features: [
        {
          title: '面向分布式团队的在线课程',
          description:
            '灵活、自主节奏的 AI 培训课程，随时随地可学——专为需要立即可用的实战技能而非理论知识的职场人士设计。',
        },
        {
          title: '线下教学与区域合作授课',
          description:
            '通过区域教育合作机构开展面对面 AI 培训——配有结构化评估、小组工作坊，以及结合本地市场情境的真实案例分析。',
        },
        {
          title: 'TikTok 与 Pearson 联合认证资质',
          description:
            '获得由 TikTok 与 Pearson 联合认证的 AI 工程师资质——被亚太地区及全球企业客户与政府机构广泛认可。',
        },
        {
          title: '专为职场人士量身定制的课程体系',
          description:
            '针对市场营销、工程技术、人力资源、管理层及运营团队的差异化学习路径——确保每位学员掌握与自身岗位直接相关的实用技能。',
        },
      ],
      whoFor: [
        '正在构建全组织 AI 能力体系的人力资源与学习发展团队',
        '希望将 AI 认证课程纳入教学体系的高校与职业培训机构',
        '希望通过国际认可资质推进 AI 职业发展的个人从业者',
      ],
      cta: '探索课程项目',
      faqs: [
        {
          question: '认证资质获得哪些机构的认可？',
          answer:
            'AI 工程师认证由 TikTok 与培生教育（Pearson Education）联合认证，两者均是科技与全球学历认证领域最具公信力的机构。该认证获得亚太地区企业雇主与政府机构的广泛认可，是推动职业发展的有效资质证明。',
        },
        {
          question: '我们可以为整个公司定制培训项目吗？',
          answer:
            '可以。我们为企业设计并交付规模化 AI 培训项目——从批次制在线课程到引导式线下工作坊，均可根据您组织的岗位结构、AI 成熟度与转型目标量身定制。欢迎联系我们为您的团队制定专属方案。',
        },
        {
          question: '认证是否需要考试？难度如何？',
          answer:
            '是的。认证包含结构化考核环节，考查 AI 实际应用能力而非死记硬背。难度针对职场专业人士校准——严格程度足以体现资质含金量，同时对于备考充分的零基础学习者而言同样可以通过。',
        },
      ],
    },
    zhTw: {
      headline: '讓您的團隊成為自信、持證的 AI 實踐者。',
      problemStatement:
        '大多數企業在 AI 工具上有所投入，卻忽視了對人的培養。結果是技術閒置、採用率低迷，員工將 AI 視為風險而非優勢。缺乏體系化培訓，AI 的能力與團隊實際使用率之間的鴻溝只會越來越深。',
      howItWorks:
        'Basicware 的 AI 教育項目將系統化在線課程、區域線下教學與全球認可的認證資質融為一體，在組織內部全面構建 AI 能力。我們的課程專為職場人士設計——實踐導向、崗位定制，圍繞團隊實際面對的 AI 工具與工作流程展開，而非學術理論。認證課程由 TikTok 和 Pearson 聯合認證，獲得區域內政府機構與企業客戶的廣泛認可，著重考察真實能力而非課程完成度。我們與教育機構及企業培訓部門深度合作，從個人技能提升到全員 AI 轉型項目，均可規模化交付。',
      features: [
        {
          title: '面向分佈式團隊的在線課程',
          description:
            '靈活、自主節奏的 AI 培訓課程，隨時隨地可學——專為需要立即可用的實戰技能而非理論知識的職場人士設計。',
        },
        {
          title: '線下教學與區域合作授課',
          description:
            '通過區域教育合作機構開展面對面 AI 培訓——配有結構化評估、小組工作坊，以及結合本地市場情境的真實案例分析。',
        },
        {
          title: 'TikTok 與 Pearson 聯合認證資質',
          description:
            '獲得由 TikTok 與 Pearson 聯合認證的 AI 工程師資質——被亞太地區及全球企業客戶與政府機構廣泛認可。',
        },
        {
          title: '專為職場人士量身定制的課程體系',
          description:
            '針對市場營銷、工程技術、人力資源、管理層及運營團隊的差異化學習路徑——確保每位學員掌握與自身崗位直接相關的實用技能。',
        },
      ],
      whoFor: [
        '正在構建全組織 AI 能力體系的人力資源與學習發展團隊',
        '希望將 AI 認證課程納入教學體系的高校與職業培訓機構',
        '希望通過國際認可資質推進 AI 職業發展的個人從業者',
      ],
      cta: '探索課程項目',
      faqs: [
        {
          question: '認證資質獲得哪些機構的認可？',
          answer:
            'AI 工程師認證由 TikTok 與培生教育（Pearson Education）聯合認證，兩者均是科技與全球學歷認證領域最具公信力的機構。該認證獲得亞太地區企業僱主與政府機構的廣泛認可，是推動職業發展的有效資質證明。',
        },
        {
          question: '我們可以為整個公司定制培訓項目嗎？',
          answer:
            '可以。我們為企業設計並交付規模化 AI 培訓項目——從批次制在線課程到引導式線下工作坊，均可根據您組織的崗位結構、AI 成熟度與轉型目標量身定制。歡迎聯繫我們為您的團隊制定專屬方案。',
        },
        {
          question: '認證是否需要考試？難度如何？',
          answer:
            '是的。認證包含結構化考核環節，考查 AI 實際應用能力而非死記硬背。難度針對職場專業人士校準——嚴格程度足以體現資質含金量，同時對於備考充分的零基礎學習者而言同樣可以通過。',
        },
      ],
    },
  },
]
