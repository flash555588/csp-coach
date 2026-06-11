export interface WorkflowStep {
  id: string
  title: string
  description: string
  action: string
  tools: string[]
  verify: string
}

export interface Workflow {
  id: string
  name: string
  icon: string
  steps: WorkflowStep[]
}

export const workflows: Workflow[] = [
  {
    id: 'sketch',
    name: '临摹与辅助起稿',
    icon: 'i-lucide-pencil',
    steps: [
      {
        id: 'ref',
        title: '收集参考',
        description: '选 1 张参考图或 1 个 3D 姿势',
        action: '用 PureRef/Eagle 整理参考，或拖拽 3D 人偶到画布',
        tools: ['PureRef', 'Eagle', 'CSP 3D 人偶'],
        verify: '参考图已放入子视图或参考面板',
      },
      {
        id: 'shape',
        title: '拆大形',
        description: '只抓头、躯干、四肢的大形，不画细节',
        action: '用直线和椭圆概括，限时 2 分钟',
        tools: ['基础线稿笔', '导航器面板'],
        verify: '大形能被他人认出是人物/物件',
      },
      {
        id: 'assist',
        title: '辅助起稿',
        description: '借助 3D 人偶或姿势素材摆正结构',
        action: '把姿势素材拖到 3D 人偶上，调整到目标角度',
        tools: ['3D 人偶', '姿势素材'],
        verify: '人体比例没有明显失调',
      },
      {
        id: 'redraw',
        title: '关参考重画',
        description: '关掉参考，凭记忆重画一遍',
        action: '隐藏参考层，在新图层上重画',
        tools: ['图层面板'],
        verify: '不借助参考完成线稿大形',
      },
      {
        id: 'variant',
        title: '做变体',
        description: '改变角度或服饰，画一张变体',
        action: '只改一个变量：角度、服装或表情',
        tools: ['基础线稿笔'],
        verify: '变体与原作有明显区分但能看出同源',
      },
    ],
  },
  {
    id: 'color',
    name: '配色建议与快速上色',
    icon: 'i-lucide-palette',
    steps: [
      {
        id: 'extract',
        title: '提取配色',
        description: '从参考图提取 3–5 色',
        action: '用 Adobe Color 或 Coolors 取色',
        tools: ['Adobe Color', 'Coolors'],
        verify: '已记录主色、辅色、点缀色的 HEX',
      },
      {
        id: 'flat',
        title: '平涂底色',
        description: '用油漆桶或笔刷铺满底色',
        action: '每个部位一个图层，只填色不画细节',
        tools: ['油漆桶', '选择笔'],
        verify: '底色闭合无漏白',
      },
      {
        id: 'shadow',
        title: '自动阴影打样',
        description: '用自动动作快速得到影色雏形',
        action: '执行"自动创建阴影颜色"自动动作',
        tools: ['自动动作面板', '渐变映射'],
        verify: '画面已有明暗区分',
      },
      {
        id: 'manual',
        title: '手动修光影',
        description: '改阴影冷暖、加边缘光和强调色',
        action: '在阴影层上新建图层手动修正',
        tools: ['水彩笔', '喷枪'],
        verify: '阴影有冷暖变化，高光位置准确',
      },
    ],
  },
  {
    id: 'line',
    name: '线条训练',
    icon: 'i-lucide-minus',
    steps: [
      {
        id: 'warmup',
        title: '热身线条页',
        description: '直线、弧线、S 线、椭圆、轮廓包裹各 10 条',
        action: '一页纸完成 50 条训练线',
        tools: ['基础线稿笔'],
        verify: '50 条中 40 条以上不需要撤销',
      },
      {
        id: 'contour',
        title: '轮廓包裹',
        description: '选一个简单物件，只用线条包裹外形',
        action: '不看内部结构，只看外轮廓',
        tools: ['基础线稿笔'],
        verify: '他人能认出画的是什么',
      },
    ],
  },
  {
    id: 'composition',
    name: '元素与构图',
    icon: 'i-lucide-frame',
    steps: [
      {
        id: 'thumb',
        title: '缩略图',
        description: '做 6 个黑白块面缩略图',
        action: '每个 30 秒，只考虑块面分布',
        tools: ['基础线稿笔', '填充工具'],
        verify: '6 张中有明显不同的构图方案',
      },
      {
        id: 'focus',
        title: '确定主焦点',
        description: '选 1 个缩略图深化',
        action: '把人物/物件/背景放入构图',
        tools: ['3D 场景素材'],
        verify: '主焦点在 3 秒内可被指出',
      },
    ],
  },
  {
    id: 'figure',
    name: '人物与动态',
    icon: 'i-lucide-person-standing',
    steps: [
      {
        id: 'gesture',
        title: '动态速写',
        description: '30–60 秒快速捕捉动态',
        action: '用 Posemaniacs 或 Magic Poser 做参考',
        tools: ['Posemaniacs', 'Magic Poser'],
        verify: '2 周内完成 50 个动态速写',
      },
      {
        id: 'structure',
        title: '大形概括',
        description: '2–3 分钟概括人体',
        action: '用火柴人+体块法',
        tools: ['基础线稿笔', '3D 人偶'],
        verify: '头身比例正确',
      },
      {
        id: 'hand',
        title: '手部单练',
        description: '手部单独训练，不与整图混学',
        action: '用手部扫描或 Handy App',
        tools: ['手部扫描', 'Handy'],
        verify: '2 周内完成 10 个手部单练',
      },
    ],
  },
]
