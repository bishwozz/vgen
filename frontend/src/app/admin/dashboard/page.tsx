"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface Stats {
    active_users: number;
    total_videos_generated: number;
    revenue: number;
}

interface User {
    id: number;
    email: string;
    is_active: boolean;
    is_admin: boolean;
}

export default function AdminDashboard() {
    const { user, token, isLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState<Stats | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!isLoading) {
            if (!user || !user.is_admin) {
                router.push("/dashboard");
                return;
            }
            fetchStats();
            fetchUsers();
        }
    }, [user, isLoading, router, token]);

    const fetchStats = async () => {
        if (!token) return;
        const res = await fetch("http://localhost:8000/admin/stats", {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) setStats(await res.json());
    };

    const fetchUsers = async () => {
        if (!token) return;
        const res = await fetch("http://localhost:8000/admin/users", {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) setUsers(await res.json());
    };

    if (isLoading || !user || !user.is_admin) {
        return <div className="flex h-screen items-center justify-center bg-slate-950 text-white"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="min-h-screen bg-slate-950 p-8 text-slate-50">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
                <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
                    <h3 className="text-slate-400 text-sm font-medium">Total Users</h3>
                    <div className="text-2xl font-bold mt-2">{stats?.active_users ?? "-"}</div>
                </div>
                <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
                    <h3 className="text-slate-400 text-sm font-medium">Videos Generated</h3>
                    <div className="text-2xl font-bold mt-2">{stats?.total_videos_generated ?? "-"}</div>
                </div>
                <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50">
                    <h3 className="text-slate-400 text-sm font-medium">Revenue</h3>
                    <div className="text-2xl font-bold mt-2 text-green-500">${stats?.revenue?.toFixed(2) ?? "-"}</div>
                </div>
            </div>

            {/* Users Table */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold">Users</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950 text-slate-400">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-800/50">
                                    <td className="p-4">{u.id}</td>
                                    <td className="p-4">{u.email}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${u.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {u.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${u.is_admin ? 'bg-purple-500/10 text-purple-500' : 'bg-slate-500/10 text-slate-500'}`}>
                                            {u.is_admin ? 'Admin' : 'User'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
