export interface LoginUser {
  username: string;
  password: string;
}

export interface LoginData {
  token: string;
  user: LoginUser;
}
