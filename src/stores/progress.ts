import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'csp-coach-progress'

export interface Milestone {
  id: string
  label: string
  description: string
  criteria: string
  completed: boolean
}

export interface WeeklyLog {
  week: number
  sketches: number
  linePages: number
  colorSchemes: number
  dynamicSketches: number
  completed: boolean
}

export interface WorkflowStepState {
  workflowId: string
  completedSteps: string[]
}

export interface CheckInRecord {
  date: string
  practiceTypes: string[]
  durationMinutes: number
}

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function yesterdayStr(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00')
  const db = new Date(b + 'T00:00:00')
  return Math.round((db.getTime() - da.getTime()) / (1000 * 60 * 60 * 24))
}

export const useProgressStore = defineStore('progress', () => {
  const saved = loadSaved()

  const currentWeek = ref(saved?.currentWeek ?? 1)
  const currentTask = ref(saved?.currentTask ?? '临摹与辅助起稿')

  const milestones = ref<Milestone[]>(
    saved?.milestones ?? [
      { id: 'setup', label: '起步稳定', description: '会打开软件、切工作区、校准笔压、保存与导出', criteria: '能独立完成 1 张临摹草稿并正确导出 PNG', completed: false },
      { id: 'line', label: '线稿可读', description: '线条开始有主次、轮廓不再发抖得无法辨认', criteria: '连续 3 张半身练习图，脸部与头发结构能被他人读懂', completed: false },
      { id: 'color', label: '配色可控', description: '不再"全图都一个灰脏味"', criteria: '能给同一张线稿做出至少 3 套可区分的配色方案', completed: false },
      { id: 'body', label: '人体可用', description: '能借助 3D 和姿势库完成半身/全身人物', criteria: '完成 1 张半身角色图和 1 张全身站姿图', completed: false },
      { id: 'original', label: '第一张原创图', description: '能把参考、起稿、上色、收尾串起来', criteria: '完成 1 张带至少 1 个场景元素的角色插图', completed: false },
    ]
  )

  const weeklyLogs = ref<WeeklyLog[]>(
    saved?.weeklyLogs ??
    Array.from({ length: 12 }, (_, i) => ({
      week: i + 1, sketches: 0, linePages: 0, colorSchemes: 0, dynamicSketches: 0, completed: false,
    }))
  )

  const workflowStates = ref<WorkflowStepState[]>(
    saved?.workflowStates ?? []
  )

  const checkIns = ref<CheckInRecord[]>(saved?.checkIns ?? [])

  watch(
    [currentWeek, currentTask, milestones, weeklyLogs, workflowStates, checkIns],
    () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentWeek: currentWeek.value,
          currentTask: currentTask.value,
          milestones: milestones.value,
          weeklyLogs: weeklyLogs.value,
          workflowStates: workflowStates.value,
          checkIns: checkIns.value,
        })
      )
    },
    { deep: true }
  )

  const completedCount = computed(() => milestones.value.filter((m) => m.completed).length)

  const streak = computed(() => {
    if (checkIns.value.length === 0) return 0
    const dates = [...checkIns.value.map((c) => c.date)].sort()
    const last = dates[dates.length - 1]
    const today = todayStr()
    const yesterday = yesterdayStr()
    if (last !== today && last !== yesterday) return 0
    let count = 1
    for (let i = dates.length - 2; i >= 0; i--) {
      if (daysBetween(dates[i], dates[i + 1]) === 1) count++
      else break
    }
    return count
  })

  const todayCheckedIn = computed(() => {
    return checkIns.value.some((c) => c.date === todayStr())
  })

  const totalCheckIns = computed(() => checkIns.value.length)

  function toggleMilestone(id: string) {
    const m = milestones.value.find((x) => x.id === id)
    if (m) m.completed = !m.completed
  }

  function updateLog(week: number, patch: Partial<WeeklyLog>) {
    const log = weeklyLogs.value.find((l) => l.week === week)
    if (log) Object.assign(log, patch)
  }

  function isStepCompleted(workflowId: string, stepId: string) {
    const ws = workflowStates.value.find((s) => s.workflowId === workflowId)
    return ws ? ws.completedSteps.includes(stepId) : false
  }

  function toggleStep(workflowId: string, stepId: string) {
    let ws = workflowStates.value.find((s) => s.workflowId === workflowId)
    if (!ws) {
      ws = { workflowId, completedSteps: [] }
      workflowStates.value.push(ws)
    }
    const idx = ws.completedSteps.indexOf(stepId)
    if (idx >= 0) ws.completedSteps.splice(idx, 1)
    else ws.completedSteps.push(stepId)
  }

  function workflowProgress(workflowId: string, totalSteps: number) {
    const ws = workflowStates.value.find((s) => s.workflowId === workflowId)
    return ws ? ws.completedSteps.length / totalSteps : 0
  }

  function doCheckIn(practiceTypes: string[] = [], durationMinutes = 0) {
    const today = todayStr()
    const existing = checkIns.value.find((c) => c.date === today)
    if (existing) {
      const set = new Set([...existing.practiceTypes, ...practiceTypes])
      existing.practiceTypes = Array.from(set)
      existing.durationMinutes += durationMinutes
    } else {
      checkIns.value.push({ date: today, practiceTypes, durationMinutes })
    }
  }

  function isCheckedIn(date: string) {
    return checkIns.value.some((c) => c.date === date)
  }

  return {
    currentWeek, currentTask, milestones, weeklyLogs, workflowStates, checkIns,
    completedCount, streak, todayCheckedIn, totalCheckIns,
    toggleMilestone, updateLog,
    isStepCompleted, toggleStep, workflowProgress,
    doCheckIn, isCheckedIn,
  }
})
