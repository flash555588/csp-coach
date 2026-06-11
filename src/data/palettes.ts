export interface Palette {
  id: string
  name: string
  mood: 'safe' | 'fresh' | 'dramatic'
  colors: {
    main: string
    secondary: string
    accent: string
    shadow: string
    highlight: string
  }
  notes: string
}

export const curatedPalettes: Palette[] = [
  {
    id: 'warm-safe',
    name: '暖棕稳妥',
    mood: 'safe',
    colors: {
      main: '#8B5E3C',
      secondary: '#C4A882',
      accent: '#D4A76A',
      shadow: '#5C3D2E',
      highlight: '#F0E2C9',
    },
    notes: '大地色系，容错率高，适合初学者第一张完整角色图',
  },
  {
    id: 'cool-safe',
    name: '蓝灰稳妥',
    mood: 'safe',
    colors: {
      main: '#4A6FA5',
      secondary: '#8AA4C8',
      accent: '#C9D6E8',
      shadow: '#2C3E5C',
      highlight: '#E8EDF2',
    },
    notes: '冷色调统一，阴影偏蓝不易显脏',
  },
  {
    id: 'green-fresh',
    name: '薄荷清爽',
    mood: 'fresh',
    colors: {
      main: '#5DA68A',
      secondary: '#A8D5C3',
      accent: '#E8F5EE',
      shadow: '#3D7A62',
      highlight: '#F5FBF8',
    },
    notes: '高明度、低饱和，画面透气感强',
  },
  {
    id: 'pink-fresh',
    name: '樱花清爽',
    mood: 'fresh',
    colors: {
      main: '#D4849A',
      secondary: '#F0C4D0',
      accent: '#F9E8ED',
      shadow: '#A85D73',
      highlight: '#FFF5F8',
    },
    notes: '粉白渐变，适合少女/治愈系题材',
  },
  {
    id: 'purple-dramatic',
    name: '紫橙戏剧',
    mood: 'dramatic',
    colors: {
      main: '#6B3FA0',
      secondary: '#C97B3A',
      accent: '#F0D040',
      shadow: '#3D2266',
      highlight: '#F5E8C0',
    },
    notes: '互补色冲击，适合夜晚/魔法场景',
  },
  {
    id: 'red-dramatic',
    name: '红黑戏剧',
    mood: 'dramatic',
    colors: {
      main: '#B83030',
      secondary: '#4A1E1E',
      accent: '#D4A030',
      shadow: '#2A0F0F',
      highlight: '#F0E0C0',
    },
    notes: '高对比、低饱和背景，适合战斗/热血场景',
  },
]

export const moodLabels: Record<string, string> = {
  safe: '稳妥',
  fresh: '清爽',
  dramatic: '戏剧化',
}

export const colorLabels: Record<string, string> = {
  main: '主色',
  secondary: '辅色',
  accent: '点缀',
  shadow: '阴影',
  highlight: '高光',
}

function hslToHex(h: number, s: number, l: number): string {
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

export function generateRandomPalette(): Palette {
  const baseHue = Math.floor(Math.random() * 360)
  const moodTypes: Array<'safe' | 'fresh' | 'dramatic'> = ['safe', 'fresh', 'dramatic']
  const mood = moodTypes[Math.floor(Math.random() * 3)]

  let h2: number, h3: number
  if (mood === 'safe') {
    h2 = baseHue
    h3 = baseHue
  } else if (mood === 'fresh') {
    h2 = (baseHue + 30) % 360
    h3 = (baseHue + 60) % 360
  } else {
    h2 = (baseHue + 180) % 360
    h3 = (baseHue + 30) % 360
  }

  return {
    id: `random-${Date.now()}`,
    name: '随机配色',
    mood,
    colors: {
      main: hslToHex(baseHue, 0.5, 0.45),
      secondary: hslToHex(h2, 0.35, 0.65),
      accent: hslToHex(h3, mood === 'dramatic' ? 0.7 : 0.4, 0.55),
      shadow: hslToHex(baseHue, 0.45, 0.2),
      highlight: hslToHex(baseHue, 0.15, 0.92),
    },
    notes: mood === 'safe' ? '基于单色系生成' : mood === 'fresh' ? '基于邻近色生成' : '基于互补色生成',
  }
}
