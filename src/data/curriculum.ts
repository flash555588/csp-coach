export interface WeekPlan {
  week: number
  phase: string
  theme: string
  hours: string
  tasks: string[]
  output: string
  criteria: string
}

export const fourWeekPlan: WeekPlan[] = [
  {
    week: 1,
    phase: '基础稳定',
    theme: '软件熟悉与大形临摹',
    hours: '5–6 小时',
    tasks: [
      '安装、笔压校准、线稿工作区',
      '10 张大形临摹',
      '5 张闭卷重画',
    ],
    output: '1 份线稿练习集 + 1 张头像临摹',
    criteria: '能独立完成保存、导出、切工作区；闭卷重画准确率明显提升',
  },
  {
    week: 2,
    phase: '基础稳定',
    theme: '线条与平涂底色',
    hours: '5–6 小时',
    tasks: [
      '每天 10 分钟线条页',
      '3 张头像/半身平涂',
      '3 套配色方案练习',
    ],
    output: '1 张干净线稿头像 + 3 套色卡',
    criteria: '50 条训练线里 40 条以上无需撤销；能说出主色与点缀色',
  },
  {
    week: 3,
    phase: '人体建立',
    theme: '人体与手部辅助',
    hours: '6–7 小时',
    tasks: [
      '20 个动态速写',
      '10 个 2 分钟人体概括',
      '10 个手部参考重画',
    ],
    output: '1 张半身角色线稿 + 1 页手部练习',
    criteria: '完成 30 个以上人体/手部小练习',
  },
  {
    week: 4,
    phase: '原创整合',
    theme: '第一张完整作品',
    hours: '6–8 小时',
    tasks: [
      '做 4–6 张构图缩略图',
      '完成 1 张带角色与 1 个背景元素的插图',
    ],
    output: '1 张完整成图',
    criteria: '作品具备主焦点、基础色彩关系和可读姿势',
  },
]

export const twelveWeekPlan: WeekPlan[] = [
  ...fourWeekPlan,
  {
    week: 5,
    phase: '人体建立',
    theme: '动态与比例深化',
    hours: '6–7 小时',
    tasks: ['30 个动态速写', '3D 人偶辅助构图', '服装褶皱基础'],
    output: '2 张半身人物',
    criteria: '能说出人体 7.5 头身比例关系',
  },
  {
    week: 6,
    phase: '人体建立',
    theme: '手部与全身站姿',
    hours: '6–7 小时',
    tasks: ['手部扫描练习', '全身站姿 3D 辅助', 'Posemaniacs 参考'],
    output: '1 张全身站姿 + 1 页手部',
    criteria: '手部结构不再完全依赖照描',
  },
  {
    week: 7,
    phase: '画面组织',
    theme: '构图基础',
    hours: '6–7 小时',
    tasks: ['6 张缩略图构图', '黑白块面分割', '主焦点训练'],
    output: '2 张带简单场景的构图稿',
    criteria: '每张成图前先有 4–6 张缩略图',
  },
  {
    week: 8,
    phase: '画面组织',
    theme: '场景与光影',
    hours: '6–8 小时',
    tasks: ['3D 场景素材使用', '自动阴影打样', '手动修光练习'],
    output: '2 张带场景插图',
    criteria: '懂得先做缩略图再进入细化',
  },
  {
    week: 9,
    phase: '画面组织',
    theme: '元素整合',
    hours: '6–8 小时',
    tasks: ['背景与人物层次', '前景/中景/后景', '视觉引导线'],
    output: '1 张完整场景插图',
    criteria: '画面有明确的前后层次',
  },
  {
    week: 10,
    phase: '原创整合',
    theme: '角色设计入门',
    hours: '7–8 小时',
    tasks: ['角色设定单', 'Mood board 收集', '配色与服装'],
    output: '1 组角色设定',
    criteria: '角色有名字、性格、配色方案和 3 个角度',
  },
  {
    week: 11,
    phase: '原创整合',
    theme: '完整成图流程',
    hours: '7–8 小时',
    tasks: ['缩略图到线稿', '平涂到光影', '收尾与导出'],
    output: '1 张原创成图',
    criteria: '能独立完成"参考—草图—上色—收尾"闭环',
  },
  {
    week: 12,
    phase: '原创整合',
    theme: '复盘与变体',
    hours: '7–8 小时',
    tasks: ['第一张图复盘', '角度/配色变体', '建立个人流程'],
    output: '1 张变体图 + 个人流程笔记',
    criteria: '能说清楚自己从起稿到导出的完整步骤',
  },
]
