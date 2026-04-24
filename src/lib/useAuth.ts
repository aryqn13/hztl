import { useSyncExternalStore } from 'react'
import type { UserData } from './auth'

/**
 * Reactive hook that listens for auth-change events fired by auth.ts
 * and re-renders any consuming component.
 */

function subscribe(cb: () => void) {
  window.addEventListener('auth-change', cb)
  window.addEventListener('storage', cb)
  return () => {
    window.removeEventListener('auth-change', cb)
    window.removeEventListener('storage', cb)
  }
}

export function useAuth() {
  const session = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem('hztl_session'),
    () => null,
  )

  const user: UserData | null = session ? JSON.parse(session) : null
  const loggedIn = user !== null

  return { user, loggedIn }
}
