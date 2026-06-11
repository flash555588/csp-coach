<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const app = useAppStore()
const route = useRoute()
const router = useRouter()

const items = [
  { name: '仪表盘', path: '/', icon: 'i-lucide-layout-dashboard' },
  { name: '学习路径', path: '/path', icon: 'i-lucide-route' },
  { name: '工作流', path: '/workflow', icon: 'i-lucide-git-branch' },
  { name: '配色方案', path: '/palette', icon: 'i-lucide-palette' },
  { name: '参考拆解', path: '/analyzer', icon: 'i-lucide-scan-eye' },
  { name: '资源库', path: '/resources', icon: 'i-lucide-library' },
  { name: '进度追踪', path: '/progress', icon: 'i-lucide-trending-up' },
  { name: '提示词', path: '/prompts', icon: 'i-lucide-message-square' },
]

const isActive = (path: string) => route.path === path

const sidebarWidth = computed(() => app.sidebarCollapsed ? 'w-16' : 'w-56')
</script>

<template>
  <aside class="flex flex-col border-r transition-all duration-300 shrink-0"
    :class="[sidebarWidth, app.darkMode ? 'border-surface-800 bg-surface-900' : 'border-surface-200 bg-surface-0']"
  >
    <div class="flex items-center justify-between px-4 h-14 border-b"
      :class="app.darkMode ? 'border-surface-800' : 'border-surface-200'"
    >
      <span v-if="!app.sidebarCollapsed" class="font-bold text-brand-400 text-lg truncate">CSP Coach</span>
      <button class="p-1 rounded hover:bg-surface-200 dark:hover:bg-surface-700 transition"
        @click="app.toggleSidebar"
      >
        <span class="i-lucide-panel-left-close text-lg" v-if="!app.sidebarCollapsed" />
        <span class="i-lucide-panel-left-open text-lg" v-else />
      </button>
    </div>

    <nav class="flex-1 py-3 space-y-1">
      <button v-for="item in items" :key="item.path"
        class="flex items-center w-full px-3 py-2.5 mx-2 rounded-lg transition text-sm font-medium"
        :class="[
          isActive(item.path)
            ? (app.darkMode ? 'bg-brand-900/40 text-brand-300' : 'bg-brand-50 text-brand-700')
            : (app.darkMode ? 'text-surface-400 hover:bg-surface-800' : 'text-surface-600 hover:bg-surface-100')
        ]"
        @click="router.push(item.path)"
      >
        <span class="text-lg" :class="item.icon" />
        <span v-if="!app.sidebarCollapsed" class="ml-3">{{ item.name }}</span>
      </button>
    </nav>

    <div class="p-3 border-t" :class="app.darkMode ? 'border-surface-800' : 'border-surface-200'">
      <button
        class="flex items-center w-full px-3 py-2 rounded-lg transition text-sm"
        :class="app.darkMode ? 'text-surface-400 hover:bg-surface-800' : 'text-surface-600 hover:bg-surface-100'"
        @click="app.toggleDarkMode"
      >
        <span class="i-lucide-moon text-lg" v-if="app.darkMode" />
        <span class="i-lucide-sun text-lg" v-else />
        <span v-if="!app.sidebarCollapsed" class="ml-3">{{ app.darkMode ? '深色' : '浅色' }}</span>
      </button>
    </div>
  </aside>
</template>
