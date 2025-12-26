"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            const response = await fetch("http://localhost:8000/token", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                login(data.access_token);
                router.push("/dashboard");
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
            <div className="w-full max-w-sm space-y-6 rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tighter text-white">Welcome Back</h1>
                    <p className="text-slate-400">Enter your credentials to access your account</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Email</label>
                        <input
                            type="email"
                            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Password</label>
                        <input
                            type="password"
                            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700" type="submit">
                        Sign In
                    </Button>
                </form>
                <div className="text-center text-sm text-slate-500">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-indigo-400 hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
