export interface AdminSession {
  user: { id: string; name: string; email: string; role: "admin" };
  issuedAt: number;
  expiresAt: number;
}

export interface LoginState { error?: string }
