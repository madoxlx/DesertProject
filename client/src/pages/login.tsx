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

const loginSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [_, setLocation] = useLocation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    try {
      // This is where you would normally call your API for login
      // For now we'll just simulate a successful login
      console.log(values);

      // Show success message
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });

      // Redirect to home page
      setTimeout(() => setLocation("/"), 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
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
            <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register" onClick={() => setLocation("/register")}>
                  Register
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                    <div className="text-center text-sm mt-4">
                      <p>
                        Don't have an account?{" "}
                        <Link href="/register" className="text-primary hover:underline">
                          Register now
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
                Discover the Beauty of the Middle East
              </h2>
              <p className="text-white/90 mb-6">
                Login to access exclusive travel packages, personalized
                recommendations, and special deals tailored just for you.
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
                  Access your booking history
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
                  Save your favorite destinations
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
                  Receive exclusive travel deals
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
                  Fast and secure checkout
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