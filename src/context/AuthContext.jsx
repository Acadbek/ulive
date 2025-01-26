import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from '../lib/appwrite/api'
import { useNavigate } from 'react-router-dom'

export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: ''
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => { },
  setIsAuthenticated: () => { },
  checkAuthUser: async () => false
}

const AuthContext = React.createContext(INITIAL_STATE)

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const navigate = useNavigate()

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser()

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio
        })

        setIsAuthenticated(true)

        return true
      }

      return false

    } catch (error) {
      console.log(error);
      return false
    }
    finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem('cookieFallback') === '[]')
      navigate('/sign-in')

    checkAuthUser();
  }, [])

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
export const useUserContext = () => React.useContext(AuthContext)