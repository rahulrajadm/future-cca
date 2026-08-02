const SETTINGS_KEY = 'ccarf-prep:settings:v1'

export interface Settings {
  timedExam: boolean
  immediateFeedback: boolean
}

const DEFAULT_SETTINGS: Settings = {
  timedExam: true,
  immediateFeedback: false,
}

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch {
    // ignore
  }
}
