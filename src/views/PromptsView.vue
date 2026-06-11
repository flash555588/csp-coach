<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { promptTemplates } from '@/data/prompts'

const app = useAppStore()
const copied = ref<string | null>(null)

async function copy(text: string, id: string) {
  await navigator.clipboard.writeText(text)
  copied.value = id
  setTimeout(() => copied.value = null, 1500)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">提示词模板</h1>
      <span class="text-sm text-surface-400">点击卡片复制到剪贴板</span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div v-for="p in promptTemplates" :key="p.id"
        class="rounded-xl border p-5 cursor-pointer transition hover:scale-[1.01] relative group"
        :class="app.darkMode ? 'bg-surface-900 border-surface-800' : 'bg-surface-0 border-surface-200'"
        @click="copy(p.template, p.id)"
      >
        <div class="flex items-center gap-2 mb-3">
          <span class="text-xs px-2 py-0.5 rounded border"
            :class="app.darkMode ? 'border-brand-500/30 text-brand-400' : 'border-brand-200 text-brand-600'"
          >{{ p.scene }}</span>
          <span v-if="copied === p.id"
            class="text-xs text-emerald-400 flex items-center gap-1"
          >
            <span class="i-lucide-check" /> 已复制
          </span>
        </div>

        <p class="text-sm leading-relaxed mb-3 font-medium"
          :class="app.darkMode ? 'text-surface-200' : 'text-surface-800'"
        >"{{ p.template }}"</p>

        <div class="flex items-start gap-2 text-xs text-surface-400">
          <span class="i-lucide-lightbulb text-amber-400 mt-0.5 shrink-0" />
          {{ p.tips }}
        </div>
      </div>
    </div>
  </div>
</template>
