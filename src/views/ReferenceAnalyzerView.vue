<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'

const app = useAppStore()

const imageUrl = ref('')
const mode = ref<'shape' | 'outline' | 'values'>('shape')
const hasImage = computed(() => imageUrl.value.length > 0)
const fileInputRef = ref<HTMLInputElement | null>(null)

const modes = [
  { key: 'shape' as const, label: '大形', icon: 'i-lucide-circle', desc: '忽略细节，只看大块面分布' },
  { key: 'outline' as const, label: '轮廓', icon: 'i-lucide-square', desc: '提取外轮廓，忽略内部' },
  { key: 'values' as const, label: '明暗', icon: 'i-lucide-contrast', desc: '只看黑白灰关系' },
]

const modeTips: Record<string, string[]> = {
  shape: [
    '眯起眼睛看，忽略五官和细节',
    '用简单的几何形概括：圆、三角、方',
    '找出画面中最重和最轻的两个大色块',
    '问自己：这是横构图还是竖构图？',
  ],
  outline: [
    '只画外边缘，不画内部结构线',
    '注意正负形：物体轮廓之间的空白也是形状',
    '线条的疏密暗示了结构的转折',
    '检查比例：头占多少、躯干占多少',
  ],
  values: [
    '把图缩到很小，明暗关系还清晰吗？',
    '最暗的点在哪里？最亮的在哪里？',
    '中间灰区域占画面多少？',
    '光源方向是否一致？',
  ],
}

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    imageUrl.value = reader.result as string
  }
  reader.readAsDataURL(file)
}

function clearImage() {
  imageUrl.value = ''
}

const filterClass = computed(() => {
  switch (mode.value) {
    case 'shape': return 'blur-sm contrast-75 brightness-90'
    case 'outline': return 'contrast-200 grayscale brightness-110'
    case 'values': return 'grayscale contrast-125'
    default: return ''
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">参考拆解助手</h1>
      <span class="text-sm text-surface-400">上传参考图，切换三种观察模式</span>
    </div>

    <div class="rounded-xl border p-5 transition"
      :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
    >
      <div class="flex items-center gap-3 mb-3">
        <span class="i-lucide-upload text-brand-400 text-xl" />
        <span class="font-semibold">上传参考图</span>
      </div>

      <div v-if="!hasImage" class="border-2 border-dashed rounded-lg p-8 text-center transition cursor-pointer"
        @click="fileInputRef?.click()"
      >
        <span class="i-lucide-image-plus text-3xl mb-2 inline-block"
          :class="app.darkMode ? 'text-surface-600' : 'text-surface-400'"
        />
        <p class="text-sm text-surface-400">点击或拖拽上传参考图</p>
        <input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="onFileChange" />
      </div>

      <div v-else class="space-y-3">
        <div class="relative rounded-lg overflow-hidden border"
          :class="app.darkMode ? 'border-surface-800' : 'border-surface-200'"
        >
          <img :src="imageUrl" class="w-full max-h-96 object-contain transition duration-500"
            :class="filterClass"
            alt="参考图"
          />
          <button class="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition"
            @click="clearImage"
          >
            <span class="i-lucide-x" />
          </button>
        </div>

        <div class="flex flex-wrap gap-2">
          <button v-for="m in modes" :key="m.key"
            class="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition"
            :class="mode === m.key
              ? (app.darkMode ? 'border-brand-500 bg-brand-900/20 text-brand-300' : 'border-brand-400 bg-brand-50 text-brand-700')
              : (app.darkMode ? 'border-surface-700 bg-surface-900 text-surface-400' : 'border-surface-200 bg-surface-0 text-surface-600')"
            @click="mode = m.key"
          >
            <span :class="m.icon" />
            <span>{{ m.label }}</span>
          </button>
        </div>

        <p class="text-sm text-surface-400"
          :class="app.darkMode ? 'text-surface-300' : 'text-surface-600'"
        >{{ modes.find(m => m.key === mode)?.desc }}</p>
      </div>
    </div>

    <div v-if="hasImage" class="rounded-xl border p-5 transition"
      :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
    >
      <div class="flex items-center gap-3 mb-4">
        <span class="i-lucide-lightbulb text-amber-400 text-xl" />
        <span class="font-semibold">观察要点</span>
      </div>

      <ul class="space-y-2">
        <li v-for="(tip, i) in modeTips[mode]" :key="i"
          class="flex items-start gap-2 text-sm"
          :class="app.darkMode ? 'text-surface-300' : 'text-surface-700'"
        >
          <span class="mt-0.5 text-brand-400 i-lucide-arrow-right shrink-0" />
          {{ tip }}
        </li>
      </ul>
    </div>

    <div class="rounded-xl border p-5 transition"
      :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
    >
      <div class="flex items-center gap-3 mb-4">
        <span class="i-lucide-book-open text-brand-400 text-xl" />
        <span class="font-semibold">使用说明</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="m in modes" :key="m.key"
          class="p-4 rounded-lg border"
          :class="app.darkMode ? 'border-surface-800 bg-surface-800/30' : 'border-surface-200 bg-surface-50'"
        >
          <div class="flex items-center gap-2 mb-2">
            <span :class="m.icon" class="text-brand-400" />
            <span class="font-medium">{{ m.label }}模式</span>
          </div>
          <p class="text-xs text-surface-400">{{ m.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
