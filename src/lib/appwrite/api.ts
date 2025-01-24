import { ID, Query } from "appwrite";
import { appwriteConfig, account, databases, storage, avatars } from "./config";
import { IUpdatePost, INewPost, INewUser, IUpdateUser } from "@/types";

export const createUserAccount = async (user: INewUser) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			user.email,
			user.password,
			user.name
		)

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(user.name)

		const newUser = await saveUserToDB({
			accountId: newAccount.$id,
			name: newAccount.name,
			email: newAccount.email,
			username: user.username,
			imageUrl: avatarUrl
		})

		return newUser;

	} catch (error) {
		console.error(error);
		return error;
	}
}

async function saveUserToDB(user: {
	accountId: string,
	email: string,
	name: string,
	avatar: string,
	imageUrl: URL,
	username?: string
}) {
	try {
		const newUser = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			user
		)
		return newUser;

	} catch (error) {
		console.log(error);
	}
} 