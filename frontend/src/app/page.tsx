import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-800 backdrop-blur-sm fixed w-full z-10 top-0">
        <Link className="flex items-center justify-center gap-2" href="#">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Play className="h-4 w-4 text-white fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tight">VidioAI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-indigo-400 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-indigo-400 transition-colors" href="/pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-indigo-400 transition-colors" href="/signin">
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1 pt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 -z-10"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                  Turn Text into Cinematic Videos
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl">
                  Unleash your creativity with our state-of-the-art AI video generation platform. description to reality in seconds.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20" size="lg">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" className="border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200" size="lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-slate-900/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose VidioAI?</h2>
              <p className="text-slate-400 mt-4">We provide the best tools for content creators.</p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border border-slate-800 p-6 rounded-xl bg-slate-950/50 hover:border-indigo-500/50 transition-colors">
                <div className="p-3 bg-indigo-500/10 rounded-full">
                  <Play className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold">Fast Generation</h3>
                <p className="text-sm text-slate-400 text-center">
                  Get your videos in seconds, not hours. Optimized for speed and quality.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border border-slate-800 p-6 rounded-xl bg-slate-950/50 hover:border-indigo-500/50 transition-colors">
                <div className="p-3 bg-indigo-500/10 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold">High Quality</h3>
                <p className="text-sm text-slate-400 text-center">
                  Generate up to 4K resolution videos with stunning detail.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border border-slate-800 p-6 rounded-xl bg-slate-950/50 hover:border-indigo-500/50 transition-colors">
                <div className="p-3 bg-indigo-500/10 rounded-full">
                  <ArrowRight className="h-6 w-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold">Easy Sharing</h3>
                <p className="text-sm text-slate-400 text-center">
                  Share directly to social media or download in any format.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-800">
        <p className="text-xs text-slate-500">© 2024 VidioAI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-slate-500 hover:text-indigo-400" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-slate-500 hover:text-indigo-400" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
