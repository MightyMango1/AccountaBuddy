export interface SignInResult { user: { email: string } }
export interface SignUpData { email: string; username: string; password: string }
export interface SignUpResult { user: { email: string; username: string } }

/**
 * For now just resolves immediately.
 * Replace these with real Supabase calls when you’re ready.
 */
export async function signIn(email: string, password: string): Promise<SignInResult> {
  // TODO: hook into supabase.auth.signInWithPassword(...)
  return Promise.resolve({ user: { email } })
}

export async function signUp(data: SignUpData): Promise<SignUpResult> {
  // TODO: hook into supabase.auth.signUp(...)
  return Promise.resolve({ user: { email: data.email, username: data.username } })
}