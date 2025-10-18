// app/auth/signin/page.tsx
"use client";

import { getProviders, signIn, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignIn() {
  const [providers, setProviders] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    // ✅ Check if already signed in - prevent redirect loop
    getSession().then((session) => {
      if (session) {
        console.log("Already signed in, redirecting...");
        router.push(callbackUrl);
        return;
      }
    });

    // ✅ Get providers
    getProviders().then((providers) => {
      setProviders(providers);
    });
  }, [callbackUrl, router]);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl, // ✅ Use the callback URL from params
        redirect: false, // ✅ Handle redirect manually
      });

      if (result?.error) {
        console.error("Login failed:", result.error);
        alert("Login failed: " + result.error);
      } else if (result?.ok) {
        console.log("Login successful, redirecting to:", callbackUrl);
        router.push(callbackUrl); // ✅ Redirect manually
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", {
        callbackUrl, // ✅ Use the callback URL from params
      });
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* Credentials Form */}
        {providers?.credentials && (
          <form className="mt-8 space-y-6" onSubmit={handleCredentialsSubmit}>
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in with Email"}
              </button>
            </div>
          </form>
        )}

        {/* Google Provider */}
        {providers?.google && (
          <div>
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Sign in with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}