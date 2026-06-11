import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const APP_KEY = 'csp-coach-app'

function loadApp() {
  try {
    const raw = localStorage.getItem(APP_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const useAppStore = defineStore('app', () => {
  const saved = loadApp()

  const sidebarCollapsed = ref(saved?.sidebarCollapsed ?? false)
  const darkMode = ref(saved?.darkMode ?? true)

  watch(
    [sidebarCollapsed, darkMode],
    () => {
      localStorage.setItem(
        APP_KEY,
        JSON.stringify({
          sidebarCollapsed: sidebarCollapsed.value,
          darkMode: darkMode.value,
        })
      )
    },
    { deep: true }
  )

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  function toggleDarkMode() {
    darkMode.value = !darkMode.value
  }

  return { sidebarCollapsed, darkMode, toggleSidebar, toggleDarkMode }
})
