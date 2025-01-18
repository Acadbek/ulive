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
		return newAccount;
	} catch (error) {
		console.error(error);
		return error;
	}
}