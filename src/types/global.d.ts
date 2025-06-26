declare global {
  interface Window {
    soundEnabled: boolean
    playUISound?: (type: string) => void
  }
}

export {} 