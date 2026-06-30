import { useAuth } from "@/_core/hooks/useAuth";
import Footer from "@/components/Footer";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] pt-[92px]">
        <Navbar />
        <main className="container flex min-h-[calc(100vh-92px)] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F7F8FA]">
        <Navbar />
        <main className="container flex flex-1 items-center justify-center pt-[92px]">
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-lg bg-[#151B23] p-8 text-center shadow-sm">
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-lg bg-white p-8 text-center shadow-sm">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to continue
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Use your Google account to access your dashboard, profile,
                progress, achievements, and certificates.
              </p>
            </div>
            <GoogleSignInButton className="w-full" size="lg" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return <>{children}</>;
}
