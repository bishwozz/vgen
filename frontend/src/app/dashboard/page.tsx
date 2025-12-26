"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Play, Download, Wand2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

interface HistoryItem {
    id: number;
    url: string;
    prompt: string;
    date: string;
}

export default function DashboardPage() {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const { user, token, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        } else if (token) {
            fetchHistory();
        }
    }, [user, isLoading, router, token]);

    const fetchHistory = async () => {
        if (!token) return;
        try {
            const res = await fetch("http://localhost:8000/video/history", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) setHistory(await res.json());
        } catch (e) {
            console.error("Failed to fetch history");
        }
    };

    const handleGenerate = async () => {
        if (!prompt || !token) return;
        setIsGenerating(true);
        setGeneratedVideo(null);

        try {
            const response = await fetch("http://localhost:8000/video/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (response.ok) {
                setGeneratedVideo(data.video_url);
                fetchHistory(); // Refresh history
            } else {
                console.error("Failed to generate video");
            }
        } catch (error) {
            console.error("Error generating video:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    if (isLoading || !user) {
        return null; // Or a loading spinner
    }

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-50">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 p-6 hidden md:block">
                <div className="font-bold text-xl mb-8 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div> VidioAI
                </div>
                <nav className="space-y-4">
                    <a href="#" className="block px-4 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">Create</a>
                    {user.is_admin && (
                        <a href="/admin/dashboard" className="block px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors text-purple-400">Admin Panel</a>
                    )}
                </nav>

                <div className="mt-12">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Recent History</h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                        {history.map(item => (
                            <li key={item.id} className="truncate hover:text-white cursor-pointer px-2 py-1 rounded hover:bg-slate-900">
                                {item.prompt}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 flex flex-col max-w-5xl mx-auto w-full">
                <header className="mb-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Create New Video</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-slate-400">{user.email}</div>
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold">
                            {user.email[0].toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* ... Rest of the UI (Input & Preview) ... */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    {/* Input Section */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Describe your video</label>
                            <textarea
                                className="w-full h-40 bg-slate-900 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                                placeholder="A futuristic city with flying cars in a cyberpunk style..."
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>
                        {/* ... Selects ... */}
                        <div className="flex gap-4">
                            <select className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 text-sm w-full">
                                <option>16:9 Landscape</option>
                                <option>9:16 Portrait</option>
                                <option>1:1 Square</option>
                            </select>
                            <select className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-slate-100 text-sm w-full">
                                <option>Realistic</option>
                                <option>Anime</option>
                                <option>3D Animation</option>
                            </select>
                        </div>

                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-lg shadow-lg shadow-indigo-500/20"
                            onClick={handleGenerate}
                            disabled={isGenerating || !prompt}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-5 w-5" /> Generate Video
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Preview Section */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl flex items-center justify-center min-h-[400px] relative overflow-hidden group">
                        {generatedVideo ? (
                            <div className="relative w-full h-full">
                                <video
                                    src={generatedVideo}
                                    controls
                                    autoPlay
                                    loop
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="secondary" className="rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-4 p-8">
                                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
                                    <Play className="h-8 w-8 text-slate-600" />
                                </div>
                                <p className="text-slate-500">Your generated video will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
