<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { useProgressStore } from '@/stores/progress'

const app = useAppStore()
const progress = useProgressStore()

const presets = [
  { label: '15分', seconds: 15 * 60 },
  { label: '30分', seconds: 30 * 60 },
  { label: '45分', seconds: 45 * 60 },
  { label: '60分', seconds: 60 * 60 },
]

const selectedPreset = ref(presets[1].seconds)
const timeLeft = ref(selectedPreset.value)
const isRunning = ref(false)
const isFinished = ref(false)
const timerId = ref<number | null>(null)

const logType = ref<'linePages' | 'sketches' | 'colorSchemes' | 'dynamicSketches'>('linePages')
const logLabels: Record<string, string> = {
  linePages: '线条页',
  sketches: '临摹/草图',
  colorSchemes: '配色方案',
  dynamicSketches: '动态速写',
}

const totalSeconds = computed(() => selectedPreset.value)
const progressPercent = computed(() => 100 - (timeLeft.value / totalSeconds.value) * 100)

const minutes = computed(() => Math.floor(timeLeft.value / 60))
const seconds = computed(() => timeLeft.value % 60)

function start() {
  if (isRunning.value) return
  isRunning.value = true
  isFinished.value = false
  timerId.value = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      finish()
    }
  }, 1000)
}

function pause() {
  isRunning.value = false
  if (timerId.value) {
    clearInterval(timerId.value)
    timerId.value = null
  }
}

function reset() {
  pause()
  timeLeft.value = selectedPreset.value
  isFinished.value = false
}

function finish() {
  pause()
  isFinished.value = true
}

function logPractice() {
  const log = progress.weeklyLogs.find((l) => l.week === progress.currentWeek)
  if (log) log[logType.value]++
  reset()
}

function choosePreset(sec: number) {
  pause()
  selectedPreset.value = sec
  timeLeft.value = sec
}

onUnmounted(() => {
  if (timerId.value) clearInterval(timerId.value)
})
</script>

<template>
  <div class="rounded-xl border p-5 transition"
    :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
  >
    <div class="flex items-center gap-3 mb-4">
      <span class="i-lucide-timer text-brand-400 text-xl" />
      <span class="font-semibold">练习计时器</span>
    </div>

    <div class="flex justify-center gap-2 mb-4">
      <button v-for="p in presets" :key="p.seconds"
        class="px-3 py-1 rounded text-xs border transition"
        :class="selectedPreset === p.seconds
          ? (app.darkMode ? 'border-brand-500 bg-brand-900/30 text-brand-300' : 'border-brand-400 bg-brand-50 text-brand-700')
          : (app.darkMode ? 'border-surface-700 text-surface-400' : 'border-surface-200 text-surface-500')"
        @click="choosePreset(p.seconds)"
      >{{ p.label }}</button>
    </div>

    <div class="text-center mb-4">
      <div class="text-5xl font-mono font-bold tracking-wider mb-2"
        :class="timeLeft <= 60 ? 'text-red-400' : 'text-brand-400'"
      >
        {{ String(minutes).padStart(2, '0') }}:{{ String(seconds).padStart(2, '0') }}
      </div>
      <div class="h-2 rounded-full overflow-hidden mx-auto max-w-xs"
        :class="app.darkMode ? 'bg-surface-800' : 'bg-surface-100'"
      >
        <div class="h-full rounded-full transition-all"
          :class="timeLeft <= 60 ? 'bg-red-400' : 'bg-brand-500'"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>
    </div>

    <div v-if="!isFinished" class="flex justify-center gap-3">
      <button v-if="!isRunning"
        class="flex items-center gap-2 px-5 py-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600 transition"
        @click="start"
      >
        <span class="i-lucide-play" /> 开始
      </button>
      <button v-else
        class="flex items-center gap-2 px-5 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition"
        @click="pause"
      >
        <span class="i-lucide-pause" /> 暂停
      </button>
      <button
        class="flex items-center gap-2 px-5 py-2 rounded-lg border transition"
        :class="app.darkMode ? 'border-surface-700 hover:bg-surface-800' : 'border-surface-200 hover:bg-surface-100'"
        @click="reset"
      >
        <span class="i-lucide-rotate-ccw" /> 重置
      </button>
    </div>

    <div v-else class="space-y-3">
      <div class="text-center text-emerald-400 font-semibold flex items-center justify-center gap-2">
        <span class="i-lucide-party-popper" /> 练习完成！
      </div>

      <div class="flex justify-center gap-2">
        <button v-for="(label, key) in logLabels" :key="key"
          class="px-3 py-1.5 rounded text-xs border transition"
          :class="logType === key
            ? (app.darkMode ? 'border-brand-500 bg-brand-900/30 text-brand-300' : 'border-brand-400 bg-brand-50 text-brand-700')
            : (app.darkMode ? 'border-surface-700 text-surface-400' : 'border-surface-200 text-surface-500')"
          @click="logType = key as any"
        >{{ label }}</button>
      </div>

      <div class="flex justify-center gap-2">
        <button
          class="px-5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
          @click="logPractice"
        >
          记录到第 {{ progress.currentWeek }} 周
        </button>
        <button
          class="px-5 py-2 rounded-lg border transition"
          :class="app.darkMode ? 'border-surface-700 hover:bg-surface-800' : 'border-surface-200 hover:bg-surface-100'"
          @click="reset"
        >
          放弃
        </button>
      </div>
    </div>
  </div>
</template>
