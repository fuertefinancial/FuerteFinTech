// UI Sound System
class SoundSystem {
  private sounds: Map<string, HTMLAudioElement> = new Map()
  private enabled: boolean = false
  private volume: number = 0.3
  
  constructor() {
    // Initialize sound state from localStorage
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('soundEnabled')
      this.enabled = savedState === 'true'
      window.soundEnabled = this.enabled
    }
  }
  
  // Initialize sound files
  async init() {
    const soundFiles = {
      click: '/sounds/click.mp3',
      hover: '/sounds/hover.mp3',
      success: '/sounds/success.mp3',
      error: '/sounds/error.mp3',
      focus: '/sounds/focus.mp3',
      swoosh: '/sounds/swoosh.mp3',
      notification: '/sounds/notification.mp3'
    }
    
    // Preload all sounds
    for (const [name, path] of Object.entries(soundFiles)) {
      try {
        const audio = new Audio(path)
        audio.volume = this.volume
        audio.preload = 'auto'
        this.sounds.set(name, audio)
      } catch (error) {
        console.warn(`Failed to load sound: ${name}`)
      }
    }
    
    // Set up global play function
    window.playUISound = this.play.bind(this)
  }
  
  // Play a sound
  play(soundName: string) {
    if (!this.enabled) return
    
    const sound = this.sounds.get(soundName)
    if (sound) {
      // Clone and play to allow overlapping sounds
      const clone = sound.cloneNode() as HTMLAudioElement
      clone.volume = this.volume
      clone.play().catch(() => {
        // Ignore errors (e.g., autoplay policy)
      })
    }
  }
  
  // Toggle sound on/off
  toggle() {
    this.enabled = !this.enabled
    window.soundEnabled = this.enabled
    localStorage.setItem('soundEnabled', String(this.enabled))
    
    // Play feedback sound
    if (this.enabled) {
      this.play('success')
    }
    
    return this.enabled
  }
  
  // Set volume
  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume))
    this.sounds.forEach(sound => {
      sound.volume = this.volume
    })
  }
  
  // Get current state
  isEnabled() {
    return this.enabled
  }
}

// Create singleton instance
const soundSystem = new SoundSystem()

export default soundSystem 