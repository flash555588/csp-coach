<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useProgressStore } from '@/stores/progress'
import { twelveWeekPlan } from '@/data/curriculum'

const app = useAppStore()
const progress = useProgressStore()

const currentLog = computed(() => progress.weeklyLogs.find((l) => l.week === progress.currentWeek))

const weeklyGoals = [
  { key: 'sketches' as const, label: '临摹/草图', target: 10 },
  { key: 'linePages' as const, label: '线条页', target: 7 },
  { key: 'colorSchemes' as const, label: '配色方案', target: 4 },
  { key: 'dynamicSketches' as const, label: '动态速写', target: 30 },
]

function progressPct(value: number, target: number) {
  return Math.min(100, Math.round((value / target) * 100))
}

function increment(week: number, field: 'sketches' | 'linePages' | 'colorSchemes' | 'dynamicSketches') {
  const log = progress.weeklyLogs.find((l) => l.week === week)
  if (log) log[field]++
}

function decrement(week: number, field: 'sketches' | 'linePages' | 'colorSchemes' | 'dynamicSketches') {
  const log = progress.weeklyLogs.find((l) => l.week === week)
  if (log && log[field] > 0) log[field]--
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">进度追踪</h1>

    <div class="rounded-xl border p-6 transition"
      :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
    >
      <h2 class="text-lg font-semibold mb-4">本周概览（第 {{ progress.currentWeek }} 周）</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="g in weeklyGoals" :key="g.key"
          class="p-4 rounded-lg border"
          :class="app.darkMode ? 'border-surface-800 bg-surface-800/30' : 'border-surface-200 bg-surface-50'"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium">{{ g.label }}</span>
            <span class="text-sm font-mono"
              :class="(currentLog?.[g.key] ?? 0) >= g.target ? 'text-emerald-400' : 'text-brand-400'"
            >
              {{ currentLog?.[g.key] ?? 0 }} / {{ g.target }}
            </span>
          </div>
          <div class="h-2 rounded-full overflow-hidden"
            :class="app.darkMode ? 'bg-surface-800' : 'bg-surface-100'"
          >
            <div class="h-full rounded-full transition-all"
              :class="(currentLog?.[g.key] ?? 0) >= g.target ? 'bg-emerald-500' : 'bg-brand-500'"
              :style="{ width: `${progressPct(currentLog?.[g.key] ?? 0, g.target)}%` }"
            />
          </div>
          <div class="mt-2 flex items-center gap-2">
            <button
              class="w-6 h-6 flex items-center justify-center rounded text-xs"
              :class="app.darkMode ? 'hover:bg-surface-700' : 'hover:bg-surface-200'"
              @click="decrement(progress.currentWeek, g.key)"
            >-</button>
            <button
              class="w-6 h-6 flex items-center justify-center rounded text-xs"
              :class="app.darkMode ? 'hover:bg-surface-700' : 'hover:bg-surface-200'"
              @click="increment(progress.currentWeek, g.key)"
            >+</button>
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-xl border p-6 transition"
      :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
    >
      <h2 class="text-lg font-semibold mb-4">每周练习计数</h2>
      <div class="space-y-4">
        <div v-for="log in progress.weeklyLogs" :key="log.week"
          class="rounded-lg border p-4 transition"
          :class="app.darkMode ? 'border-surface-800 bg-surface-800/30' : 'border-surface-200 bg-surface-50'"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <span class="text-sm font-bold text-brand-400">W{{ log.week }}</span>
              <span class="text-sm text-surface-400">{{ twelveWeekPlan[log.week - 1]?.theme ?? '' }}</span>
            </div>
            <button class="text-xs px-3 py-1 rounded border transition"
              :class="log.completed
                ? (app.darkMode ? 'border-emerald-500/50 text-emerald-400' : 'border-emerald-300 text-emerald-700')
                : (app.darkMode ? 'border-surface-700 text-surface-400' : 'border-surface-200 text-surface-500')"
              @click="log.completed = !log.completed"
            >
              {{ log.completed ? '已完成' : '标记完成' }}
            </button>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div v-for="field in [
              { key: 'sketches' as const, label: '临摹/草图' },
              { key: 'linePages' as const, label: '线条页' },
              { key: 'colorSchemes' as const, label: '配色方案' },
              { key: 'dynamicSketches' as const, label: '动态速写' },
            ]" :key="field.key"
              class="flex items-center justify-between p-2 rounded"
              :class="app.darkMode ? 'bg-surface-900' : 'bg-surface-0'"
            >
              <span class="text-xs text-surface-400">{{ field.label }}</span>
              <div class="flex items-center gap-2">
                <button class="w-6 h-6 flex items-center justify-center rounded text-xs"
                  :class="app.darkMode ? 'hover:bg-surface-700' : 'hover:bg-surface-200'"
                  @click="decrement(log.week, field.key)"
                >-</button>
                <span class="text-sm font-mono w-6 text-center">{{ log[field.key] }}</span>
                <button class="w-6 h-6 flex items-center justify-center rounded text-xs"
                  :class="app.darkMode ? 'hover:bg-surface-700' : 'hover:bg-surface-200'"
                  @click="increment(log.week, field.key)"
                >+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
