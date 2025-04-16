import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AdminDashboard from "@/pages/admin";
import AdminPackages from "@/pages/admin/packages";
import Login from "@/pages/login";
import Register from "@/pages/register";
import AboutUs from "@/pages/about-us";
import ContactUs from "@/pages/contact-us";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/packages" component={AdminPackages} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
