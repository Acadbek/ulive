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
import { useCreateUserAccountMutation, useSignInAccountMutation } from "../../lib/tanstack-query/queriesAndMutations";
import { useNavigate } from 'react-router-dom'
import { useUserContext } from "../../context/AuthContext";

const SignUpValidation = z.object({
  name: z.string().min(2, { message: "Too short" }),
  username: z.string().min(2, { message: "Too short" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const SignUp = () => {
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  // useCreateUserAccountMutation: orqali foydalanuvchi akkauntini yaratish uchun `mutateAsync` va holatni (`isLoading`) olamiz.

  const {
    mutateAsync: createUserAccount, // Foydalanuvchi akkauntini yaratish uchun ishlatiladigan funktsiya.
    isLoading: isCreatingUser, // Akkount yaratish jarayoni davom etayotganini bildiradi.
  } = useCreateUserAccountMutation();

  const {
    mutateAsync: signInAccount, // `signInAccount` funksiyasini `mutateAsync` orqali o'zgartirish.
    isLoading: isSignInAccount // Akkauntga kirish jarayoni davomida yuklanish holatini tekshirish uchun.
  } = useSignInAccountMutation(); // Tizimga kirish uchun maxsus mutation hook.

  const navigate = useNavigate()
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      // Foydalanuvchi ma'lumotlari serverga jo'natilmoqda
      const newUser = await createUserAccount(values);

      if (!newUser) {
        return toast({
          variant: 'destructive',
          title: 'Sign up failed', // Toast xabari matni.
        });
      }

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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            <Loader /> Sign up
          </Button>

          <p className="text-small-regular text-light-3 text-center mt-2">
            Already have an account?
            <Link className="text-primary-500 ml-1" to="/sign-in">Login</Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUp;
