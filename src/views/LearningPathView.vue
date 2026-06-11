<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { twelveWeekPlan, fourWeekPlan } from '@/data/curriculum'
import type { WeekPlan } from '@/data/curriculum'

const app = useAppStore()
const mode = ref<'4week' | '12week'>('12week')
const selectedWeek = ref<WeekPlan | null>(null)

const plan = () => mode.value === '4week' ? fourWeekPlan : twelveWeekPlan

const phaseColor: Record<string, string> = {
  '基础稳定': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  '人体建立': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  '画面组织': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  '原创整合': 'bg-brand-500/20 text-brand-400 border-brand-500/30',
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">学习路径</h1>
      <div class="flex rounded-lg overflow-hidden border"
        :class="app.darkMode ? 'border-surface-700' : 'border-surface-300'"
      >
        <button class="px-4 py-1.5 text-sm transition"
          :class="mode === '4week' ? (app.darkMode ? 'bg-surface-700 text-white' : 'bg-surface-200 text-surface-900') : 'text-surface-400'"
          @click="mode = '4week'"
        >4 周速成</button>
        <button class="px-4 py-1.5 text-sm transition"
          :class="mode === '12week' ? (app.darkMode ? 'bg-surface-700 text-white' : 'bg-surface-200 text-surface-900') : 'text-surface-400'"
          @click="mode = '12week'"
        >12 周系统</button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div v-for="week in plan()" :key="week.week"
        class="rounded-xl border p-5 cursor-pointer transition hover:scale-[1.01]"
        :class="[
          selectedWeek?.week === week.week
            ? (app.darkMode ? 'border-brand-500 bg-brand-900/10' : 'border-brand-400 bg-brand-50')
            : (app.darkMode ? 'border-surface-800 bg-surface-900' : 'border-surface-200 bg-surface-0')
        ]"
        @click="selectedWeek = selectedWeek?.week === week.week ? null : week"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <span class="text-lg font-bold text-brand-400">W{{ week.week }}</span>
            <span class="text-xs px-2 py-0.5 rounded border"
              :class="phaseColor[week.phase] || 'bg-surface-500/20 text-surface-400'"
            >{{ week.phase }}</span>
          </div>
          <span class="text-xs text-surface-400">{{ week.hours }}</span>
        </div>

        <h3 class="font-semibold mb-2">{{ week.theme }}</h3>

        <ul class="space-y-1 mb-3">
          <li v-for="(task, i) in week.tasks" :key="i"
            class="text-sm text-surface-400 flex items-start gap-2"
          >
            <span class="i-lucide-check text-xs mt-1 text-brand-400 shrink-0" />
            {{ task }}
          </li>
        </ul>

        <div class="text-xs p-2 rounded"
          :class="app.darkMode ? 'bg-surface-800 text-surface-300' : 'bg-surface-100 text-surface-600'"
        >
          <span class="font-medium">产出：</span>{{ week.output }}
        </div>
      </div>
    </div>
  </div>
</template>
