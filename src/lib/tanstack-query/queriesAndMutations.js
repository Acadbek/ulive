import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery
} from '@tanstack/react-query'
import { createUserAccount } from '../appwrite/api'
import { signInAccount } from '../appwrite/api'

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user)
  })
}

export const useSignInAccountMutation = () => {
  return useMutation({
    mutationFn: (user) => signInAccount(user)
  })
}