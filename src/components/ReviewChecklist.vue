<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'

const app = useAppStore()

const emit = defineEmits<{
  close: []
}>()

interface CheckItem {
  id: string
  category: string
  question: string
  tip: string
}

const items: CheckItem[] = [
  {
    id: 'composition',
    category: '构图',
    question: '主焦点是否在画面最有利的位置？',
    tip: '3 秒内观者能指出画面最吸引注意力的点',
  },
  {
    id: 'hierarchy',
    category: '主次',
    question: '前景/中景/后景的层次是否清晰？',
    tip: '不是每个区域都需要同等细节，主角最细，背景最虚',
  },
  {
    id: 'values',
    category: '值关系',
    question: '画面的明暗对比是否足够？',
    tip: '把图缩到很小还能看出明暗分布，说明值关系对了',
  },
  {
    id: 'hands',
    category: '手部可读性',
    question: '手部结构是否被误读？',
    tip: '手是最容易出戏的部位，检查手指数量和关节位置',
  },
]

const checked = ref<Set<string>>(new Set())

const allChecked = computed(() => checked.value.size === items.length)
const passCount = computed(() => checked.value.size)

function toggle(id: string) {
  if (checked.value.has(id)) checked.value.delete(id)
  else checked.value.add(id)
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4"
    @click.self="emit('close')"
  >
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" />

    <div class="relative w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition"
      :class="app.darkMode ? 'bg-surface-900 border-surface-700' : 'bg-surface-0 border-surface-200'"
    >
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-2">
          <span class="i-lucide-clipboard-check text-brand-400 text-xl" />
          <h3 class="text-lg font-semibold">导出前复盘</h3>
        </div>
        <button class="p-1 rounded transition"
          :class="app.darkMode ? 'hover:bg-surface-800 text-surface-400' : 'hover:bg-surface-100 text-surface-500'"
          @click="emit('close')"
        >
          <span class="i-lucide-x" />
        </button>
      </div>

      <div class="space-y-3 mb-5">
        <div v-for="item in items" :key="item.id"
          class="rounded-lg border p-4 cursor-pointer transition"
          :class="[
            checked.has(item.id)
              ? (app.darkMode ? 'border-emerald-500/40 bg-emerald-900/10' : 'border-emerald-300 bg-emerald-50')
              : (app.darkMode ? 'border-surface-700 bg-surface-800/30' : 'border-surface-200 bg-surface-50'),
          ]"
          @click="toggle(item.id)"
        >
          <div class="flex items-start gap-3">
            <span class="mt-0.5 text-lg shrink-0"
              :class="checked.has(item.id) ? 'i-lucide-check-square text-emerald-400' : 'i-lucide-square text-surface-400'"
            />
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs px-2 py-0.5 rounded border"
                  :class="app.darkMode ? 'border-brand-500/30 text-brand-400' : 'border-brand-200 text-brand-600'"
                >{{ item.category }}</span>
              </div>
              <p class="text-sm font-medium"
                :class="app.darkMode ? 'text-surface-200' : 'text-surface-800'"
              >{{ item.question }}</p>
              <p class="text-xs text-surface-400 mt-1">{{ item.tip }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-sm text-surface-400">
          {{ passCount }}/{{ items.length }} 项通过
        </span>
        <button
          class="px-5 py-2 rounded-lg text-sm transition flex items-center gap-2"
          :class="allChecked
            ? 'bg-emerald-500 text-white hover:bg-emerald-600'
            : 'bg-surface-500 text-surface-200 cursor-not-allowed'"
          :disabled="!allChecked"
          @click="emit('close')"
        >
          <span class="i-lucide-check" />
          {{ allChecked ? '确认导出' : '还有未检查项' }}
        </button>
      </div>
    </div>
  </div>
</template>
