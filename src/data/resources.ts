export interface ResourceItem {
  name: string
  category: string
  platforms: string
  pricing: string
  role: string
  link: string
  tags: string[]
}

export const resources: ResourceItem[] = [
  {
    name: 'Clip Studio Paint',
    category: '主创作层',
    platforms: 'Win / macOS / iPad / Android / Chromebook',
    pricing: '订阅 / 终身版',
    role: '绘制、上色、3D 参考、素材接入',
    link: 'https://www.clipstudio.net/',
    tags: ['核心', '跨平台'],
  },
  {
    name: '优动漫 PAINT',
    category: '中文运营层',
    platforms: 'Web',
    pricing: '简中正版',
    role: '中国大陆官方正版入口、教程、素材',
    link: 'https://www.udongman.cn/',
    tags: ['中文', '正版'],
  },
  {
    name: 'PureRef',
    category: '参考管理',
    platforms: 'Win / macOS / Linux',
    pricing: '个人自定义 / 商业订阅',
    role: '大量参考图整理、常驻置顶参考窗',
    link: 'https://www.pureref.com/',
    tags: ['参考板', '桌面'],
  },
  {
    name: 'Eagle',
    category: '参考管理',
    platforms: 'Win / macOS',
    pricing: '229 元买断',
    role: '项目化管理参考图、材质、教程截图',
    link: 'https://eagle.cool/',
    tags: ['素材库', '项目管理'],
  },
  {
    name: 'Milanote',
    category: '参考管理',
    platforms: 'Web / Desktop / iOS / Android',
    pricing: '免费基础版 / Pro 订阅',
    role: '跨设备灵感板、脚本、任务与参考混排',
    link: 'https://www.milanote.com/',
    tags: ['灵感板', '跨平台'],
  },
  {
    name: 'VizRef',
    category: '参考管理',
    platforms: 'iPad / iPhone',
    pricing: 'App Store 付费',
    role: 'iPad 侧拉式参考板',
    link: 'https://apps.apple.com/',
    tags: ['iPad', '参考板'],
  },
  {
    name: 'Magic Poser',
    category: '姿势参考',
    platforms: 'iOS / Android',
    pricing: '7 天试用后月费',
    role: '双人/多人姿势、灯光、视角',
    link: 'https://magicposer.com/',
    tags: ['3D', '姿势'],
  },
  {
    name: 'Posemaniacs',
    category: '姿势参考',
    platforms: 'Web',
    pricing: '免费',
    role: '海量人体姿势参考',
    link: 'https://www.posemaniacs.com/',
    tags: ['免费', '姿势'],
  },
  {
    name: 'Handy Art Reference',
    category: '手脚参考',
    platforms: 'iPhone / iPad / Android',
    pricing: '低价买断 + 内购',
    role: '手、脚、头部与灯光参考',
    link: 'https://www.handyartreference.com/',
    tags: ['手部', '参考'],
  },
  {
    name: 'Adobe Color',
    category: '配色',
    platforms: 'Web',
    pricing: '免费',
    role: '从参考图提取色板',
    link: 'https://color.adobe.com/',
    tags: ['配色', '免费'],
  },
  {
    name: 'Coolors',
    category: '配色',
    platforms: 'Web / App',
    pricing: '免费核心 / Pro 订阅',
    role: '快速出三套以上候选配色',
    link: 'https://coolors.co/',
    tags: ['配色', '生成器'],
  },
  {
    name: 'Adobe Firefly',
    category: 'AI 发想',
    platforms: 'Web',
    pricing: '免费入口 + Adobe 方案',
    role: '服装、场景、光线、氛围方向草图',
    link: 'https://firefly.adobe.com/',
    tags: ['AI', '灵感'],
  },
  {
    name: 'Draw Things',
    category: 'AI 发想',
    platforms: 'iPhone / iPad / Mac',
    pricing: '免费，本地离线',
    role: 'Apple 生态本地 AI 小样',
    link: 'https://drawthings.ai/',
    tags: ['AI', '本地', '隐私'],
  },
  {
    name: 'Midjourney',
    category: 'AI 发想',
    platforms: 'Web / Discord',
    pricing: '订阅制',
    role: '情绪图、镜头气氛、风格方向探索',
    link: 'https://www.midjourney.com/',
    tags: ['AI', '灵感'],
  },
  {
    name: 'ibisPaint',
    category: '移动速写',
    platforms: 'Win / Mac / iOS / Android / HUAWEI',
    pricing: '免费版 + 付费版 + 会员',
    role: '手机上快速起草，CSP 可读取 IPV',
    link: 'https://ibispaint.com/',
    tags: ['移动', '草图', '接力'],
  },
]

export const categories = Array.from(new Set(resources.map((r) => r.category)))
