import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const registerSchema = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setLoading(true);
    try {
      // This is where you would normally call your API for registration
      // For now we'll just simulate a successful registration
      console.log(values);

      // Show success message
      toast({
        title: "Success!",
        description: "Account created successfully. You can now login.",
      });

      // Redirect to login page
      setTimeout(() => setLocation("/login"), 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>

            <Tabs defaultValue="register" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" onClick={() => setLocation("/login")}>
                  Login
                </TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="register">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe" {...field} />
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
                            <Input
                              type="email"
                              placeholder="john.doe@example.com"
                              {...field}
                            />
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
                            <Input type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="******" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                    <div className="text-center text-sm mt-4">
                      <p>
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline">
                          Login now
                        </Link>
                      </p>
                    </div>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>

          <div className="hidden md:block rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary/80 to-primary p-8 h-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Join Our Travel Community
              </h2>
              <p className="text-white/90 mb-6">
                Register to unlock a world of exclusive travel experiences across
                the beautiful Middle East. Create your account in minutes and
                start planning your dream vacation today.
              </p>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Personalized travel recommendations
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Early access to special promotions
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save and compare vacation packages
                </li>
                <li className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  24/7 premium customer support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}