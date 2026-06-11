<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { curatedPalettes, generateRandomPalette, moodLabels, colorLabels } from '@/data/palettes'
import type { Palette } from '@/data/palettes'

const app = useAppStore()
const activeMood = ref<'safe' | 'fresh' | 'dramatic' | 'all'>('all')
const copiedColor = ref<string | null>(null)
const randomPalette = ref<Palette | null>(null)

const palettes = computed(() => {
  const base = activeMood.value === 'all'
    ? curatedPalettes
    : curatedPalettes.filter((p) => p.mood === activeMood.value)
  return randomPalette.value ? [...base, randomPalette.value] : base
})

async function copyColor(hex: string) {
  await navigator.clipboard.writeText(hex)
  copiedColor.value = hex
  setTimeout(() => copiedColor.value = null, 1200)
}

function copyPalette(p: Palette) {
  const text = Object.entries(p.colors)
    .map(([k, v]) => `${colorLabels[k]}: ${v}`)
    .join('\n')
  navigator.clipboard.writeText(text)
}

function generateRandom() {
  randomPalette.value = generateRandomPalette()
}

const moodOptions = [
  { key: 'all' as const, label: '全部' },
  { key: 'safe' as const, label: '稳妥' },
  { key: 'fresh' as const, label: '清爽' },
  { key: 'dramatic' as const, label: '戏剧化' },
]

function moodBadgeClass(mood: string) {
  const map: Record<string, string> = {
    safe: app.darkMode ? 'bg-emerald-900/40 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200',
    fresh: app.darkMode ? 'bg-sky-900/40 text-sky-400 border-sky-500/30' : 'bg-sky-50 text-sky-700 border-sky-200',
    dramatic: app.darkMode ? 'bg-rose-900/40 text-rose-400 border-rose-500/30' : 'bg-rose-50 text-rose-700 border-rose-200',
  }
  return map[mood] || ''
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">配色方案</h1>
      <button
        class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-brand-500 text-white hover:bg-brand-600 transition"
        @click="generateRandom"
      >
        <span class="i-lucide-shuffle" /> 随机生成
      </button>
    </div>

    <div class="flex flex-wrap gap-2">
      <button v-for="opt in moodOptions" :key="opt.key"
        class="px-3 py-1.5 rounded-full text-xs border transition"
        :class="activeMood === opt.key
          ? (app.darkMode ? 'border-brand-500 bg-brand-900/20 text-brand-300' : 'border-brand-400 bg-brand-50 text-brand-700')
          : (app.darkMode ? 'border-surface-700 text-surface-400' : 'border-surface-200 text-surface-500')"
        @click="activeMood = opt.key"
      >{{ opt.label }}</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="p in palettes" :key="p.id"
        class="rounded-xl border overflow-hidden transition"
        :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
      >
        <div class="flex h-20">
          <div v-for="(hex, key) in p.colors" :key="key"
            class="flex-1 cursor-pointer transition hover:opacity-80 relative group"
            :style="{ backgroundColor: hex }"
            @click="copyColor(hex)"
          >
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <span class="text-xs font-mono font-bold px-1.5 py-0.5 rounded"
                :class="app.darkMode ? 'bg-black/60 text-white' : 'bg-white/80 text-black'"
              >
                {{ copiedColor === hex ? '已复制' : hex }}
              </span>
            </div>
          </div>
        </div>

        <div class="p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold">{{ p.name }}</h3>
              <span class="text-xs px-2 py-0.5 rounded border"
                :class="moodBadgeClass(p.mood)"
              >{{ moodLabels[p.mood] }}</span>
            </div>
            <button
              class="p-1.5 rounded transition text-xs"
              :class="app.darkMode ? 'hover:bg-surface-800 text-surface-400' : 'hover:bg-surface-100 text-surface-500'"
              @click="copyPalette(p)"
            >
              <span class="i-lucide-copy" />
            </button>
          </div>

          <p class="text-xs text-surface-400 mb-3">{{ p.notes }}</p>

          <div class="grid grid-cols-5 gap-2">
            <div v-for="(hex, key) in p.colors" :key="key"
              class="text-center"
            >
              <div class="w-8 h-8 rounded-full mx-auto mb-1 border cursor-pointer"
                :class="app.darkMode ? 'border-surface-700' : 'border-surface-200'"
                :style="{ backgroundColor: hex }"
                @click="copyColor(hex)"
              />
              <div class="text-xs text-surface-400">{{ colorLabels[key] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
