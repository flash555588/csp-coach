<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { resources, categories } from '@/data/resources'

const app = useAppStore()
const activeCategory = ref<string | 'all'>('all')

const filtered = computed(() => {
  if (activeCategory.value === 'all') return resources
  return resources.filter((r) => r.category === activeCategory.value)
})

const categoryLabels: Record<string, string> = {
  'all': '全部',
  '主创作层': '主创作层',
  '中文运营层': '中文运营层',
  '参考管理': '参考管理',
  '姿势参考': '姿势参考',
  '手脚参考': '手脚参考',
  '配色': '配色',
  'AI 发想': 'AI 发想',
  '移动速写': '移动速写',
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">资源库</h1>

    <div class="flex flex-wrap gap-2">
      <button v-for="cat in ['all', ...categories]" :key="cat"
        class="px-3 py-1.5 rounded-full text-xs border transition"
        :class="[
          activeCategory === cat
            ? (app.darkMode ? 'border-brand-500 bg-brand-900/20 text-brand-300' : 'border-brand-400 bg-brand-50 text-brand-700')
            : (app.darkMode ? 'border-surface-700 text-surface-400' : 'border-surface-200 text-surface-500')
        ]"
        @click="activeCategory = cat"
      >
        {{ categoryLabels[cat] || cat }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="r in filtered" :key="r.name"
        class="rounded-xl border p-5 transition"
        :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <span class="text-xs px-2 py-0.5 rounded border mb-2 inline-block"
              :class="app.darkMode ? 'border-surface-700 text-surface-400' : 'border-surface-200 text-surface-500'"
            >{{ r.category }}</span>
            <h3 class="font-semibold">{{ r.name }}</h3>
          </div>
          <a :href="r.link" target="_blank" rel="noopener"
            class="p-2 rounded-lg transition shrink-0"
            :class="app.darkMode ? 'hover:bg-surface-800 text-surface-400' : 'hover:bg-surface-100 text-surface-500'"
          >
            <span class="i-lucide-external-link" />
          </a>
        </div>

        <p class="text-sm text-surface-400 mb-3">{{ r.role }}</p>

        <div class="space-y-2 text-xs text-surface-400">
          <div class="flex items-center gap-2">
            <span class="i-lucide-monitor text-brand-400" />
            {{ r.platforms }}
          </div>
          <div class="flex items-center gap-2">
            <span class="i-lucide-wallet text-brand-400" />
            {{ r.pricing }}
          </div>
        </div>

        <div class="flex flex-wrap gap-1 mt-3">
          <span v-for="tag in r.tags" :key="tag"
            class="text-xs px-2 py-0.5 rounded-full"
            :class="app.darkMode ? 'bg-surface-800 text-surface-300' : 'bg-surface-100 text-surface-600'"
          >{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
