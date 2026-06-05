/** Authenticated user. */
export interface User {
  id: string;
  email: string;
  name: string;
}

/** Login request body. */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Register request body. */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

/** Authentication API response. */
export interface AuthResponse {
  user: User;
}
