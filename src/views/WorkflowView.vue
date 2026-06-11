<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useProgressStore } from '@/stores/progress'
import { workflows } from '@/data/workflows'
import type { Workflow } from '@/data/workflows'
import ReviewChecklist from '@/components/ReviewChecklist.vue'

const app = useAppStore()
const progress = useProgressStore()
const selected = ref<Workflow>(workflows[0])
const activeStep = ref(0)
const showReview = ref(false)

const wfProgress = computed(() => Math.round(progress.workflowProgress(selected.value.id, selected.value.steps.length) * 100))

function isCompleted(stepId: string) {
  return progress.isStepCompleted(selected.value.id, stepId)
}

function toggleStep(stepId: string) {
  progress.toggleStep(selected.value.id, stepId)
}

function selectWorkflow(wf: Workflow) {
  selected.value = wf
  activeStep.value = 0
  showReview.value = false
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">工作流引导</h1>

    <div class="flex flex-wrap gap-2">
      <button v-for="wf in workflows" :key="wf.id"
        class="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition"
        :class="[
          selected.id === wf.id
            ? (app.darkMode ? 'border-brand-500 bg-brand-900/20 text-brand-300' : 'border-brand-400 bg-brand-50 text-brand-700')
            : (app.darkMode ? 'border-surface-700 bg-surface-900 text-surface-400' : 'border-surface-200 bg-surface-0 text-surface-600')
        ]"
        @click="selectWorkflow(wf)"
      >
        <span :class="wf.icon" />
        <span>{{ wf.name }}</span>
        <span v-if="progress.workflowProgress(wf.id, wf.steps.length) > 0"
          class="text-xs px-1.5 py-0.5 rounded-full"
          :class="app.darkMode ? 'bg-brand-900/40 text-brand-300' : 'bg-brand-100 text-brand-700'"
        >{{ Math.round(progress.workflowProgress(wf.id, wf.steps.length) * 100) }}%</span>
      </button>
    </div>

    <div class="rounded-xl border p-6 transition"
      :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
    >
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <span class="text-2xl" :class="selected.icon" />
          <h2 class="text-xl font-semibold">{{ selected.name }}</h2>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-24 h-2 rounded-full overflow-hidden"
            :class="app.darkMode ? 'bg-surface-800' : 'bg-surface-100'"
          >
            <div class="h-full bg-emerald-500 rounded-full transition-all"
              :style="{ width: `${wfProgress}%` }"
            />
          </div>
          <span class="text-xs text-surface-400">{{ wfProgress }}%</span>
        </div>
      </div>

      <div class="space-y-4">
        <div v-for="(step, i) in selected.steps" :key="step.id"
          class="rounded-lg border p-4 transition cursor-pointer"
          :class="[
            activeStep === i
              ? (app.darkMode ? 'border-brand-500 bg-brand-900/10' : 'border-brand-400 bg-brand-50')
              : (app.darkMode ? 'border-surface-800 bg-surface-800/30' : 'border-surface-200 bg-surface-50'),
            isCompleted(step.id) ? 'opacity-60' : ''
          ]"
          @click="activeStep = i"
        >
          <div class="flex items-center gap-3 mb-2">
            <button class="flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold shrink-0 transition"
              :class="[
                isCompleted(step.id) ? 'bg-emerald-500 text-white i-lucide-check' :
                i < activeStep ? 'bg-brand-500 text-white' :
                i === activeStep ? 'bg-brand-400 text-white' :
                (app.darkMode ? 'bg-surface-700 text-surface-400' : 'bg-surface-200 text-surface-500')
              ]"
              @click.stop="toggleStep(step.id)"
            ></button>
            <h3 class="font-semibold"
              :class="isCompleted(step.id) ? 'line-through text-surface-400' : ''"
            >{{ step.title }}</h3>
          </div>

          <p class="text-sm text-surface-400 mb-2 ml-10">{{ step.description }}</p>

          <div class="ml-10 space-y-2">
            <div class="text-sm p-3 rounded"
              :class="app.darkMode ? 'bg-surface-800' : 'bg-surface-100'"
            >
              <span class="font-medium text-brand-400">操作：</span>{{ step.action }}
            </div>
            <div class="flex flex-wrap gap-1">
              <span v-for="tool in step.tools" :key="tool"
                class="text-xs px-2 py-0.5 rounded border"
                :class="app.darkMode ? 'border-surface-700 text-surface-400' : 'border-surface-200 text-surface-500'"
              >{{ tool }}</span>
            </div>
            <div class="text-xs text-surface-400 flex items-center gap-1">
              <span class="i-lucide-check-circle text-brand-400" />
              验证：{{ step.verify }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button v-if="activeStep > 0"
          class="px-4 py-2 rounded-lg text-sm border transition"
          :class="app.darkMode ? 'border-surface-700 hover:bg-surface-800' : 'border-surface-200 hover:bg-surface-100'"
          @click="activeStep--"
        >上一步</button>
        <button v-if="activeStep < selected.steps.length - 1"
          class="px-4 py-2 rounded-lg text-sm bg-brand-500 text-white hover:bg-brand-600 transition"
          @click="activeStep++"
        >下一步</button>
        <button v-else
          class="px-4 py-2 rounded-lg text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition"
          @click="toggleStep(selected.steps[activeStep].id)"
        >{{ isCompleted(selected.steps[activeStep].id) ? '取消完成' : '标记完成' }}</button>
        <button v-if="activeStep === selected.steps.length - 1 && wfProgress >= 100"
          class="px-4 py-2 rounded-lg text-sm border transition flex items-center gap-1.5"
          :class="app.darkMode ? 'border-brand-500/50 text-brand-300 hover:bg-brand-900/20' : 'border-brand-300 text-brand-700 hover:bg-brand-50'"
          @click="showReview = true"
        >
          <span class="i-lucide-clipboard-check" /> 复盘
        </button>
      </div>
    </div>

    <ReviewChecklist v-if="showReview" @close="showReview = false" />
  </div>
</template>
