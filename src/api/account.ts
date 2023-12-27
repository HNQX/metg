import { UserState } from '@/store/modules/user/types'
import axios from 'axios'

export interface LoginData {
  username: string
  password: string
}

export interface LoginRes {
  token: string
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data)
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout')
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info')
}

export function getUrl(data: { username: string }) {
  return axios.post('api_url/v1/short/getCodeWithUser', data)
}
