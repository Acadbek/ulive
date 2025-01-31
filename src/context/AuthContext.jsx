import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../lib/appwrite/api';

// Dastlabki foydalanuvchi holati (bo'sh qiymatlar bilan).
export const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: ''
};

const INITIAL_STATE = {
  user: INITIAL_USER, // Foydalanuvchi ma'lumotlari.
  isLoading: false, // Yuklanish jarayonini kuzatish uchun.
  isAuthenticated: false, // Foydalanuvchi tizimga kirgan yoki yo'qligini ko'rsatadi.
  setUser: () => { }, // Foydalanuvchini yangilash uchun funksiya.
  setIsAuthenticated: () => { }, // Tizimga kirganlik holatini o'zgartirish uchun.
  checkAuthUser: async () => false // Foydalanuvchi tizimga kirganini tekshirish uchun funksiya.
};

// AuthContext yaratish.
const AuthContext = React.createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(INITIAL_USER); // Foydalanuvchi ma'lumotlari uchun state.
  const [isLoading, setIsLoading] = React.useState(false); // Yuklanish holati uchun state.
  const [isAuthenticated, setIsAuthenticated] = React.useState(false); // Tizimga kirgan holati uchun state.
  const [accountId, setAccountId] = React.useState('')

  const navigate = useNavigate(); // Sahifalar o'rtasida navigatsiya qilish uchun hook.

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser(); // Hozirgi foydalanuvchini olish.

      if (currentAccount) {
        // Agar foydalanuvchi ma'lumotlari mavjud bo'lsa, state yangilanadi.
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio
        });

        setAccountId(currentAccount.$id)
        setIsAuthenticated(true); // Foydalanuvchi tizimga kirgan deb belgilanadi.
        return true;
      }
      return false; // Foydalanuvchi tizimga kirmagan bo'lsa.

    } catch (error) {
      console.log(error); // Xatolikni konsolga chiqarish.
      return false;
    } finally {
      setIsLoading(false); // Yuklanish jarayoni tugatilganini belgilang.
    }
  }

  // Komponent yuklanganda ishlaydigan effekt.
  React.useEffect(() => {
    if (localStorage.getItem('cookieFallback') === '[]') {
      navigate('/sign-in'); // Agar cookie bo'sh bo'lsa, foydalanuvchini kirish sahifasiga yo'naltirish.
    }
    console.log("accountId: ", accountId);

    checkAuthUser(); // Foydalanuvchini tekshirish.
  }, []);

  // Kontekst qiymatlarini taqdim etish.
  const value = {
    user, // Foydalanuvchi ma'lumotlari.
    setUser, // Foydalanuvchini o'zgartirish funksiyasi.
    isLoading, // Yuklanish holati.
    isAuthenticated, // Tizimga kirganligini tekshirish.
    setIsAuthenticated, // Tizimga kirish holatini o'zgartirish.
    checkAuthUser, // Foydalanuvchini autentifikatsiya qilish funksiyasi.
    accountId
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export const useUserContext = () => React.useContext(AuthContext);