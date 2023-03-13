export interface SigninData {
  login: string
  password: string
}

export interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface User {
  id: number | null
  first_name: string | null
  second_name: string | null
  display_name: string | null
  login: string
  email: string
  phone: string
  avatar: string | null
}

export interface UserProfileData {
  first_name: string | null
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export interface UserPasswordData {
  oldPassword: string
  newPassword: string
}

export interface LeaderData {
  id: number | null,
  name: string,
  score: number,
  level: number,
}

export interface OAuthData {
  code: string,
  redirect_uri: string
}

export interface serviceIdData {
  service_id: string
}
