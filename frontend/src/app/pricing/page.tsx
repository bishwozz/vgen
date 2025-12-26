import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
            <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-800 backdrop-blur-sm fixed w-full z-10 top-0">
                <Link className="flex items-center justify-center gap-2" href="/">
                    <span className="font-bold text-xl tracking-tight">VidioAI</span>
                </Link>
            </header>
            <main className="flex-1 w-full pt-16 flex flex-col items-center">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple Pricing</h1>
                                <p className="max-w-[900px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Choose the plan that fits your creative needs. Cancel anytime.
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:gap-12 max-w-4xl mx-auto mt-12 text-left">
                            <div className="flex flex-col p-6 rounded-2xl border border-slate-800 bg-slate-950/50 shadow-xl">
                                <div className="space-y-2">
                                    <h3 className="font-bold text-2xl">Free</h3>
                                    <p className="text-slate-400">For trying things out</p>
                                    <span className="text-4xl font-bold">$0<span className="text-base font-normal text-slate-500">/mo</span></span>
                                </div>
                                <ul className="grid gap-4 my-8">
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> 1 Video per day</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Standard Quality (720p)</li>
                                    <li className="flex items-center gap-2 text-slate-500"><Check className="h-4 w-4" /> Watermarked</li>
                                </ul>
                                <Button className="mt-auto w-full bg-slate-800 hover:bg-slate-700">Get Started</Button>
                            </div>
                            <div className="flex flex-col p-6 rounded-2xl border border-indigo-500/50 bg-slate-900/50 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-3 bg-indigo-600 rounded-bl-xl text-xs font-bold text-white">POPULAR</div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-2xl text-indigo-400">Pro</h3>
                                    <p className="text-slate-400">For serious creators</p>
                                    <span className="text-4xl font-bold">$29<span className="text-base font-normal text-slate-500">/mo</span></span>
                                </div>
                                <ul className="grid gap-4 my-8">
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> Unlimited Videos</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> HD Quality (1080p/4K)</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> No Watermarks</li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> Priority Generation</li>
                                </ul>
                                <Button className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700">Subscribe Now</Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
