<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { useProgressStore } from '@/stores/progress'
import { twelveWeekPlan } from '@/data/curriculum'
import PracticeTimer from '@/components/PracticeTimer.vue'
import CheckInCalendar from '@/components/CheckInCalendar.vue'

const app = useAppStore()
const progress = useProgressStore()
const checkInTypes = ref<string[]>([])

const currentPlan = computed(() => twelveWeekPlan.find((w) => w.week === progress.currentWeek))
const completedMilestones = progress.completedCount
const totalMilestones = progress.milestones.length

function doCheckIn() {
  progress.doCheckIn(checkInTypes.value)
}

const todayTip = computed(() => {
  const w = progress.currentWeek
  if (w <= 1) return { action: '先完成软件安装与笔压校准', why: '很多"线很抖"的问题其实是笔压没校准' }
  if (w <= 2) return { action: '今天做一页 50 条线条训练', why: '每天 10–15 分钟，比一周突击一次更有效' }
  if (w <= 3) return { action: '用 3D 人偶摆一个坐姿，截图后闭卷重画', why: '临摹不是终点，关参考重画才是关键动作' }
  if (w <= 4) return { action: '做 4 张构图缩略图，只画黑白块面', why: '先确定画面组织，再进入细化' }
  if (w <= 6) return { action: '30 秒动态速写 × 10 个', why: '速度和数量比单张精度更重要' }
  if (w <= 9) return { action: '用 3D 场景素材搭建一个背景构图', why: '背景不会画时，先借用参考建立空间' }
  return { action: '完成第一张原创成图并导出', why: '能独立完成"参考—草图—上色—收尾"闭环' }
})

function setWeek(n: number) {
  if (n >= 1 && n <= 12) progress.currentWeek = n
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">仪表盘</h1>
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1 rounded-lg border px-2 py-1"
          :class="app.darkMode ? 'border-surface-700' : 'border-surface-200'"
        >
          <button v-for="n in 12" :key="n"
            class="w-6 h-6 rounded text-xs font-medium transition"
            :class="progress.currentWeek === n
              ? 'bg-brand-500 text-white'
              : (app.darkMode ? 'text-surface-400 hover:bg-surface-800' : 'text-surface-500 hover:bg-surface-100')"
            @click="setWeek(n)"
          >{{ n }}</button>
        </div>
      </div>
    </div>

    <div class="rounded-xl border p-5 transition"
      :class="app.darkMode ? 'bg-brand-900/10 border-brand-500/30' : 'bg-brand-50 border-brand-200'"
    >
      <div class="flex items-center gap-3 mb-2">
        <span class="i-lucide-sparkles text-brand-400 text-xl" />
        <span class="font-semibold">今日推荐</span>
      </div>
      <p class="text-sm mb-1"
        :class="app.darkMode ? 'text-surface-200' : 'text-surface-800'"
      >{{ todayTip.action }}</p>
      <p class="text-xs text-surface-400 flex items-center gap-1">
        <span class="i-lucide-info" /> {{ todayTip.why }}
      </p>
    </div>
    <PracticeTimer />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4"
      :class="app.darkMode ? 'text-surface-200' : 'text-surface-800'"
    >
      <div class="lg:col-span-2"
        :class="app.darkMode ? 'text-surface-200' : 'text-surface-800'"
      >
        <CheckInCalendar v-model:selectedTypes="checkInTypes" />
        <div class="mt-3 flex items-center gap-3">
          <button
            class="px-5 py-2 rounded-lg text-sm transition flex items-center gap-2"
            :class="progress.todayCheckedIn
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-brand-500 text-white hover:bg-brand-600'"
            :disabled="progress.todayCheckedIn"
            @click="doCheckIn"
          >
            <span class="i-lucide-check" v-if="progress.todayCheckedIn" />
            {{ progress.todayCheckedIn ? '今日已打卡' : '今日打卡' }}
          </button>
          <span v-if="!progress.todayCheckedIn && checkInTypes.length === 0"
            class="text-xs text-surface-400"
          >选一种练习类型后打卡</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="rounded-xl p-5 border transition"
        :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
      >
        <div class="flex items-center gap-3 mb-2">
          <span class="i-lucide-target text-brand-400 text-xl" />
          <span class="text-sm text-surface-400">里程碑进度</span>
        </div>
        <div class="text-3xl font-bold">{{ completedMilestones }}/{{ totalMilestones }}</div>
        <div class="mt-2 h-2 rounded-full overflow-hidden"
          :class="app.darkMode ? 'bg-surface-800' : 'bg-surface-100'"
        >
          <div class="h-full bg-brand-500 rounded-full transition-all"
            :style="{ width: `${(completedMilestones / totalMilestones) * 100}%` }"
          />
        </div>
      </div>

      <div class="rounded-xl p-5 border transition"
        :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
      >
        <div class="flex items-center gap-3 mb-2">
          <span class="i-lucide-calendar text-brand-400 text-xl" />
          <span class="text-sm text-surface-400">本周主题</span>
        </div>
        <div class="text-lg font-semibold truncate">{{ currentPlan?.theme ?? '暂无' }}</div>
        <div class="text-sm text-surface-400 mt-1">预计投入 {{ currentPlan?.hours ?? '-' }}</div>
      </div>

      <div class="rounded-xl p-5 border transition"
        :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
      >
        <div class="flex items-center gap-3 mb-2">
          <span class="i-lucide-zap text-brand-400 text-xl" />
          <span class="text-sm text-surface-400">当前阶段</span>
        </div>
        <div class="text-lg font-semibold">{{ currentPlan?.phase ?? '准备中' }}</div>
        <div class="text-sm text-surface-400 mt-1">第 {{ progress.currentWeek }} 周 / 共 12 周</div>
      </div>
    </div>

    <div class="rounded-xl border p-6 transition"
      :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
    >
      <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
        <span class="i-lucide-list-checks" /> 本周任务
      </h2>
      <ul class="space-y-3">
        <li v-for="(task, i) in currentPlan?.tasks" :key="i"
          class="flex items-start gap-3 p-3 rounded-lg"
          :class="app.darkMode ? 'bg-surface-800/50' : 'bg-surface-50'"
        >
          <span class="mt-0.5 text-brand-400 i-lucide-circle-check" />
          <span class="text-sm">{{ task }}</span>
        </li>
      </ul>
    </div>

    <div class="rounded-xl border p-6 transition"
      :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
    >
      <h2 class="text-lg font-semibold mb-4 flex items-center gap-2">
        <span class="i-lucide-flag" /> 里程碑
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-for="m in progress.milestones" :key="m.id"
          class="p-4 rounded-lg border cursor-pointer transition"
          :class="[
            m.completed
              ? (app.darkMode ? 'border-brand-700 bg-brand-900/20' : 'border-brand-200 bg-brand-50')
              : (app.darkMode ? 'border-surface-700 bg-surface-800/30' : 'border-surface-200 bg-surface-50')
          ]"
          @click="progress.toggleMilestone(m.id)"
        >
          <div class="flex items-center gap-2 mb-1">
            <span class="text-lg"
              :class="m.completed ? 'i-lucide-circle-check text-brand-400' : 'i-lucide-circle text-surface-400'"
            />
            <span class="font-medium text-sm">{{ m.label }}</span>
          </div>
          <p class="text-xs text-surface-400 mb-1">{{ m.description }}</p>
          <p class="text-xs text-brand-400">标准：{{ m.criteria }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
