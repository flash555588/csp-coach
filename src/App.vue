<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'
import SidebarNav from '@/components/SidebarNav.vue'

const app = useAppStore()
const appClass = computed(() => ({
  'dark': app.darkMode,
  'bg-surface-950 text-surface-100': app.darkMode,
  'bg-surface-50 text-surface-900': !app.darkMode,
}))
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="appClass">
    <div class="flex h-screen overflow-hidden">
      <SidebarNav />
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>
