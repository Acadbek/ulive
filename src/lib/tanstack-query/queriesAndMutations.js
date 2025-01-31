import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery
} from '@tanstack/react-query'
// React Query kutubxonasidan `useQuery`, `useMutation`, `useQueryClient`, va `useInfiniteQuery` funksiyalari import qilinmoqda.
// - `useQuery`: Ma'lumotni olish uchun ishlatiladi.
// - `useMutation`: Ma'lumotni o'zgartirish yoki serverga post qilish uchun ishlatiladi.
// - `useQueryClient`: Query'larni boshqarish uchun ishlatiladi (masalan, cache invalidate qilish).
// - `useInfiniteQuery`: Sahifalash yoki cheksiz yuklash uchun ishlatiladi.

import { createUserAccount, signInAccount } from '../appwrite/api'
// Appwrite'dagi API funksiyalari import qilinmoqda:
// - `createUserAccount`: Yangi foydalanuvchi akkauntini yaratish uchun ishlatiladigan funksiya.
// - `signInAccount`: Foydalanuvchini tizimga kirishi uchun ishlatiladigan funksiya.

export const useCreateUserAccountMutation = () => {
  // Foydalanuvchi akkauntini yaratish uchun maxsus mutation hook.
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
    // `mutationFn`: Foydalanuvchi ma'lumotlarini (`user`) serverga yuborish uchun `createUserAccount` funksiyasini chaqiradi.
  })
}

export const useSignInAccountMutation = () => {
  // Foydalanuvchini tizimga kiritish uchun maxsus mutation hook.
  return useMutation({
    mutationFn: (user) => signInAccount(user),
    // `mutationFn`: Foydalanuvchi email va parolni serverga yuborib, tizimga kirishni amalga oshiradi.
  })
}