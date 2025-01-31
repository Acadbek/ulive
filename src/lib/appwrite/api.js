import { ID, Query } from "appwrite";
// Appwrite'dan ID generator import qilinmoqda (yangi ma'lumotlar uchun unikal ID yaratish uchun ishlatiladi).

import { appwriteConfig, account, databases, avatars } from "./config";
// Appwrite konfiguratsiya faylidan quyidagi narsalar import qilinmoqda:
// - `appwriteConfig`: Konfiguratsiya ma'lumotlari (masalan, database ID).
// - `account`: Appwrite akkauntlarini boshqarish uchun.
// - `databases`: Ma'lumotlar bazasi bilan ishlash uchun.
// - `avatars`: Foydalanuvchi avatarini yaratish uchun.

export const createUserAccount = async (user) => {
	try {
		// Appwrite akkaunt yaratish uchun `account.create` funksiyasini chaqiramiz.
		const newAccount = await account.create(
			ID.unique(), // Yangi unikal ID yaratadi.
			user.email,  // Foydalanuvchi emaili.
			user.password, // Foydalanuvchi paroli.
			user.name // Foydalanuvchi ismi.
		);

		if (!newAccount) throw Error; // Agar akkaunt yaratilmasa, xato tashlanadi.

		// Foydalanuvchi ismidan foydalanib avatar URL yaratish.
		const avatarUrl = avatars.getInitials(user.name);

		// Yangi foydalanuvchini ma'lumotlar bazasiga saqlash.
		const newUser = await saveUserToDB({
			accountId: newAccount.$id, // Yaratilgan akkaunt ID'si.
			name: newAccount.name, // Foydalanuvchi ismi.
			email: newAccount.email, // Foydalanuvchi emaili.
			username: user.username, // Foydalanuvchi nomi.
			imageUrl: avatarUrl, // Yaratilgan avatar URL.
		});

		return newUser;

	} catch (error) {
		console.log(error);
	}
}

// lib/appwrite/api.js

async function saveUserToDB(user) {
	// Foydalanuvchi ma'lumotlarini ma'lumotlar bazasiga saqlash funksiyasi.
	try {
		const newUser = await databases.createDocument(
			appwriteConfig.databaseId, // Ma'lumotlar bazasi ID'si.
			appwriteConfig.userCollectionId, // Foydalanuvchi kolleksiyasi ID'si.
			ID.unique(), // Yangi hujjat uchun unikal ID.
			user // Foydalanuvchi ma'lumotlari.
		);
		return newUser; // Saqlangan hujjatni qaytaradi.
	} catch (error) {
		console.log(error); // Xatolikni konsolga yozadi.
	}
}

export const signInAccount = async (user) => {
	// Foydalanuvchini tizimga kiritish funksiyasi.
	try {
		const session = await account.createEmailPasswordSession(
			user.email, // Foydalanuvchi emaili.
			user.password // Foydalanuvchi paroli.
		);
		return session; // Sessiyani qaytaradi (tizimga kirganligini bildiradi).
	} catch (error) {
		console.log(error); // Xatolikni konsolga yozadi.
	}
};

export const getCurrentUser = async () => {
	try {
		// Appwrite hisob qaydnomasini olish.
		const currentAccount = await account.get();

		// Agar hisob qaydnomasini olishda xatolik yuz bersa, xato tashlanadi.
		if (!currentAccount) throw Error;

		// Foydalanuvchi ma'lumotlarini olish uchun Appwrite bazasida qidiruv o'tkaziladi.
		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId, // Ma'lumotlar bazasi ID.
			appwriteConfig.userCollectionId, // Foydalanuvchilar kolleksiyasi ID.
			[Query.equal('accountId', currentAccount.$id)] // Hisob qaydnomasi ID'si bo'yicha qidiruv.
		);

		// Foydalanuvchining birinchi hujjatini qaytarish.
		return currentUser.documents[0];

	} catch (error) {
		// Xatolikni konsolga chiqarish.
		console.log(error);
	}
};
