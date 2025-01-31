import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/hooks/use-toast";
import { useSignInAccountMutation } from "../../lib/tanstack-query/queriesAndMutations";
import { useNavigate } from 'react-router-dom'
import { useUserContext } from "../../context/AuthContext";

const SignInValidation = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const SignIn = () => {
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

	const {
		mutateAsync: signInAccount, // `signInAccount` funksiyasini `mutateAsync` orqali o'zgartirish.
		isLoading: isSignInAccount // Akkauntga kirish jarayoni davomida yuklanish holatini tekshirish uchun.
	} = useSignInAccountMutation(); // Tizimga kirish uchun maxsus mutation hook.

	const navigate = useNavigate()
	const { toast } = useToast();

	const form = useForm({
		resolver: zodResolver(SignInValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values) {
		console.log(values);

		try {

			// Foydalanuvchini tizimga kirish uchun `signInAccount` funksiyasini chaqiramiz.
			const session = await signInAccount({
				email: values.email, // Foydalanuvchi emaili.
				password: values.password // Foydalanuvchi paroli.
			});

			if (!session) {
				// Xato xabari foydalanuvchiga ko'rsatiladi.
				toast({
					title: "Something went wrong. Please login your new account"
				});

				// Foydalanuvchini tizimga kirish sahifasiga yo'naltirish.
				navigate("/sign-in");

				return; // Funksiyani to'xtatish.
			}

			const isLoggedIn = await checkAuthUser();

			// Agar foydalanuvchi tizimda bo'lsa, formani tozalash va bosh sahifaga yo'naltirish
			if (isLoggedIn) {
				form.reset(); // Forma qiymatlarini tozalash
				navigate('/'); // Bosh sahifaga yo'naltirish
			} else {
				// Agar foydalanuvchi tizimda bo'lmasa, xatolikni bildirish
				return toast({
					title: 'Sign up failed. Please try again' // Xatolikni bildirish
				});
			}

		} catch (error) {
			console.error('Error creating account:', error);
			toast({
				// variant: "destructive",
				title: 'An error occurred',
				description: error.message,
				status: 'error',
			});
		}
	}

	return (
		<Form {...form}>
			<div className="sm:w-420 flex-center flex-col">
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">
						<Loader /> Login
					</Button>

					<p className="text-small-regular text-light-3 text-center mt-2">
						Don't you have account
						<Link className="text-primary-500 ml-1" to="/sign-up">Sign up</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignIn;
