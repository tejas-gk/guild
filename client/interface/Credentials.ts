export interface Credentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface UserState {
  user: User;
  loading: boolean;
  error: string;
}
