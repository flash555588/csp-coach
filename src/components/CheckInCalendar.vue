<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useProgressStore } from '@/stores/progress'

const app = useAppStore()
const progress = useProgressStore()

const practiceOptions = [
  { key: '临摹', icon: 'i-lucide-pencil' },
  { key: '线条', icon: 'i-lucide-minus' },
  { key: '配色', icon: 'i-lucide-palette' },
  { key: '人体', icon: 'i-lucide-person-standing' },
  { key: '构图', icon: 'i-lucide-frame' },
]

const selectedTypes = defineModel<string[]>('selectedTypes', { default: [] })

const today = computed(() => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
})

const calendar = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startOffset = firstDay.getDay()
  const days: { date: string; day: number; isCurrentMonth: boolean; isToday: boolean; checkedIn: boolean }[] = []

  for (let i = 0; i < startOffset; i++) {
    days.push({ date: '', day: 0, isCurrentMonth: false, isToday: false, checkedIn: false })
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    days.push({
      date: dateStr,
      day: d,
      isCurrentMonth: true,
      isToday: dateStr === today.value,
      checkedIn: progress.isCheckedIn(dateStr),
    })
  }

  const remainder = 7 - (days.length % 7)
  if (remainder < 7) {
    for (let i = 0; i < remainder; i++) {
      days.push({ date: '', day: 0, isCurrentMonth: false, isToday: false, checkedIn: false })
    }
  }

  return days
})

const weekLabels = ['日', '一', '二', '三', '四', '五', '六']

function toggleType(key: string) {
  const idx = selectedTypes.value.indexOf(key)
  if (idx >= 0) selectedTypes.value.splice(idx, 1)
  else selectedTypes.value.push(key)
}
</script>

<template>
  <div class="rounded-xl border p-5 transition"
    :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <span class="i-lucide-flame text-amber-400 text-xl" />
        <span class="font-semibold">每日打卡</span>
      </div>
      <div class="flex items-center gap-4 text-sm">
        <span class="text-surface-400">
          连续 <span class="text-amber-400 font-bold text-lg">{{ progress.streak }}</span> 天
        </span>
        <span class="text-surface-400">
          总计 <span class="text-brand-400 font-bold text-lg">{{ progress.totalCheckIns }}</span> 天
        </span>
      </div>
    </div>

    <div class="grid grid-cols-7 gap-1 mb-3 text-center">
      <div v-for="label in weekLabels" :key="label" class="text-xs text-surface-400 py-1">{{ label }}</div>
    </div>
    <div class="grid grid-cols-7 gap-1 text-center">
      <div v-for="(cell, i) in calendar" :key="i"
        class="aspect-square flex items-center justify-center rounded text-sm transition"
        :class="[
          !cell.isCurrentMonth ? 'opacity-0' : '',
          cell.isToday
            ? (app.darkMode ? 'ring-2 ring-brand-400' : 'ring-2 ring-brand-400')
            : '',
          cell.checkedIn
            ? (app.darkMode ? 'bg-emerald-900/40 text-emerald-400' : 'bg-emerald-50 text-emerald-700')
            : (app.darkMode ? 'bg-surface-800/50 text-surface-300' : 'bg-surface-100 text-surface-600'),
        ]"
      >
        {{ cell.day || '' }}
      </div>
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <button v-for="opt in practiceOptions" :key="opt.key"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition"
        :class="selectedTypes.includes(opt.key)
          ? (app.darkMode ? 'border-brand-500 bg-brand-900/30 text-brand-300' : 'border-brand-400 bg-brand-50 text-brand-700')
          : (app.darkMode ? 'border-surface-700 text-surface-400' : 'border-surface-200 text-surface-500')"
        @click="toggleType(opt.key)"
      >
        <span :class="opt.icon" />
        {{ opt.key }}
      </button>
    </div>
  </div>
</template>
