import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth";
import Header from "@/components/layout/header";
import Home from "@/pages/Home";
import Jobs from "@/pages/Jobs";
import Login from "@/pages/login";
import SignUp from "@/pages/signup";
import NotFound from "@/pages/not-found";
import About from "@/pages/about";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <AuthProvider>
          <Header />
          <Router />
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
