import { createContext, useContext, ReactNode } from 'react'
import { AxiosResponse } from 'axios'
import { useMutation, useQuery, UseMutateFunction } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { AuthAPI } from '../api/AuthApi'
import { SigninData, SignupData, User } from '../api/types'

interface AuthData<T> {
  data: T
  isLoading: boolean
  error: any
}

interface AuthAction<T> {
  action: UseMutateFunction<AxiosResponse<User, any>, unknown, T, unknown>
  isLoading: boolean
  error: any
}

interface Context {
  user: AuthData<User | undefined>
  signin: AuthAction<SigninData>
  signup: AuthAction<SignupData>
  logout: AuthAction<void>
  signInWithYandex: AuthAction<void>
}

const AuthContext = createContext<Context>({} as Context)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const {
    data,
    error: userError,
    isFetching: userIsFetching,
    refetch,
  } = useQuery(['user'], AuthAPI.read, {
    refetchOnWindowFocus: false,
    retry: 0,
    onError: () => {
      return
    },
  })

  const {
    mutate: signin,
    isLoading: signinIsLoading,
    error: signinError,
  } = useMutation(AuthAPI.signin, {
    onSuccess: () => {
      refetch()
      navigate('/')
    },
  })

  const {
    mutate: signup,
    isLoading: signupIsLoading,
    error: signupError,
  } = useMutation(AuthAPI.signup, {
    onSuccess: () => {
      refetch()
      navigate('/')
    },
  })

  const {
    mutate: logout,
    isLoading: logoutIsLoading,
    error: logoutError,
  } = useMutation(AuthAPI.logout, {
    onSuccess: () => {
      refetch()
    },
  })

  const {
    mutate: signInWithYandex,
    isLoading: signInWithYandexIsLoading,
    error: signInWithYandexError,
  } = useMutation(AuthAPI.read, {
    onSuccess: () => {
      refetch()
      navigate('/game')
    },
  })

  const value = {
    user: {
      data: !userError ? data?.data : undefined,
      isLoading: userIsFetching,
      error: userError,
    },
    signin: {
      action: signin,
      isLoading: signinIsLoading,
      error: signinError,
    },
    signup: { action: signup, isLoading: signupIsLoading, error: signupError },
    logout: { action: logout, isLoading: logoutIsLoading, error: logoutError },
    signInWithYandex: {
      action: signInWithYandex,
      isLoading: signInWithYandexIsLoading,
      error: signInWithYandexError
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
