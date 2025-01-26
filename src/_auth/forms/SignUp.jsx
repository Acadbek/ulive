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
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/hooks/use-toast";
import { useCreateUserAccountMutation, useSignInAccountMutation } from "@/lib/tanstack-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

const SignUpValidation = z.object({
  name: z.string().min(2, { message: "Too short" }),
  username: z.string().min(2, { message: "Too short" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const SignUp = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
  const navigate = useNavigate()

  const {
    mutateAsync: createUserAccount, // Foydalanuvchi akkauntini yaratish uchun ishlatiladigan funktsiya.
    isPending: isCreatingUser, // Akkount yaratish jarayoni davom etayotganini bildiradi.
  } = useCreateUserAccountMutation();

  const {
    mutateAsync: signInAccount,
    isPending: isSignInAccount
  } = useSignInAccountMutation()

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

      // Agar foydalanuvchi yaratilmasa, muvaffaqiyatsizlik haqida xabar ko'rsatiladi.
      if (!newUser) {
        return toast({
          title: 'Sign up failed', // Toast xabari matni.
        });
      }

      // TODO: Tizimga avtomatik kirish qo'shish
      const session = await signInAccount({
        email: values.email,
        password: values.password
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account", });
        navigate("/sign-in");
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset()
        navigate('/')
      } else {
        return toast({ title: 'Sign up failed. Please try again' })
      }

    } catch (error) {
      // Xato yuz bersa, foydalanuvchiga xabar beriladi.
      console.error('Error creating account:', error);
      toast({
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
            {isCreatingUser ? <Loader /> : "Sign up"}
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
