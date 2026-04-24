/**
 * localStorage-based auth system.
 * Keys:
 *   hztl_users   — JSON array of registered user objects
 *   hztl_session — JSON of the currently logged-in user (null = logged out)
 */

export interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  role: string
  password: string
}

const USERS_KEY = 'hztl_users'
const SESSION_KEY = 'hztl_session'

/* ── helpers ─────────────────────────────────────────── */

function getUsers(): UserData[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveUsers(users: UserData[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

/* ── public API ──────────────────────────────────────── */

export function register(data: UserData): { ok: boolean; error?: string } {
  const users = getUsers()
  if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
    return { ok: false, error: 'Email already associated with a Horizontal portal account.' }
  }
  users.push(data)
  saveUsers(users)
  return { ok: true }
}

export function login(email: string, password: string): { ok: boolean; user?: UserData; error?: string } {
  const users = getUsers()
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  )
  if (!user) return { ok: false, error: 'You have entered invalid credentials. Please try again.' }
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  window.dispatchEvent(new Event('auth-change'))
  return { ok: true, user }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
  window.dispatchEvent(new Event('auth-change'))
}

export function getSession(): UserData | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function isLoggedIn(): boolean {
  return getSession() !== null
}

export function updateProfile(updated: Partial<UserData>) {
  const session = getSession()
  if (!session) return
  const users = getUsers()
  const idx = users.findIndex((u) => u.email.toLowerCase() === session.email.toLowerCase())
  if (idx === -1) return
  const merged = { ...users[idx], ...updated }
  users[idx] = merged
  saveUsers(users)
  localStorage.setItem(SESSION_KEY, JSON.stringify(merged))
  window.dispatchEvent(new Event('auth-change'))
}

export function changePassword(currentPw: string, newPw: string): { ok: boolean; error?: string } {
  const session = getSession()
  if (!session) return { ok: false, error: 'Not logged in.' }
  if (session.password !== currentPw) return { ok: false, error: 'Current password is incorrect.' }
  updateProfile({ password: newPw })
  return { ok: true }
}
