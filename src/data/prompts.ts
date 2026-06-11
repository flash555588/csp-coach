export interface PromptTemplate {
  id: string
  scene: string
  template: string
  tips: string
}

export const promptTemplates: PromptTemplate[] = [
  {
    id: 'line',
    scene: '线稿反馈',
    template: '不要重写我的线稿。只指出最影响观感的两处，并告诉我下一笔该怎么改。',
    tips: '聚焦 1–2 处，避免长列表式批评',
  },
  {
    id: 'color',
    scene: '配色建议',
    template: '基于这张参考图和我当前主色，给我 3 套 5 色以内的配色：稳妥版、清爽版、戏剧版。',
    tips: '每套给出主色、辅色、点缀色、阴影色、高光色',
  },
  {
    id: 'pose',
    scene: '人体辅助',
    template: '不要直接生成成图。请给我这只手的 3 个更自然的替代姿势，并说明哪个最适合当前视角。',
    tips: '要求解释选择理由，帮助理解而非依赖',
  },
  {
    id: 'composition',
    scene: '构图建议',
    template: '基于现有角色，给我 4 个缩略图方向：居中、偏左、低机位、近景。',
    tips: '限定数量和变体类型，避免无限发散',
  },
  {
    id: 'review',
    scene: '复盘',
    template: '请按构图、主次、值关系、手部可读性四项，各说一句最关键的问题。',
    tips: '只问四项，每项一句话，控制反馈量',
  },
  {
    id: 'next',
    scene: '下一步提示',
    template: '我当前处于 [阶段]，已完成 [步骤]。下一步最该做的是什么？',
    tips: '用阶段和步骤替换方括号内容',
  },
  {
    id: 'ref',
    scene: '参考拆解',
    template: '帮我把这张参考图拆成"大形 / 轮廓 / 明暗"三层观察点，每层只说 1 个关键。',
    tips: '限制每层只说 1 个，保持低认知负担',
  },
  {
    id: 'material',
    scene: '素材推荐',
    template: '我现在在练 [任务]，请只推荐 3 个最适合新手的 CSP 素材，并说明为什么。',
    tips: '限定 3 个，避免选择过载',
  },
]
