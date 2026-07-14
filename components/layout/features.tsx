import { Users, TrendingUp, Zap, Network } from "lucide-react";

export default function Features() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-background relative overflow-hidden">
      {/* Subtle amber background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-20">
          <div className="rounded-full bg-zinc-100 dark:bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none">
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 text-balance leading-tight">
            Everything you need,<br />
            built for <span className="text-amber-500">developers</span>
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl text-balance mt-4">
            Powerful features to help you learn, build, and grow faster.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Empower Teams (Small) */}
          <div className="md:col-span-5 bg-white dark:bg-zinc-900/50 rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none p-8 flex flex-col justify-between group hover:shadow-md transition-all duration-300">
            <div className="h-40 w-full mb-8 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 dark:from-amber-900/20 to-transparent rounded-2xl border border-amber-100/50 dark:border-amber-900/30" />
              <div className="h-20 w-20 rounded-full bg-white dark:bg-zinc-900 shadow-xl shadow-amber-500/10 dark:shadow-amber-500/5 flex items-center justify-center border border-amber-50 dark:border-amber-900/50 relative z-10 group-hover:scale-110 transition-transform duration-500">
                <Users className="w-8 h-8 text-amber-500" />
              </div>
              <div className="absolute h-32 w-32 rounded-full border border-amber-200/40 dark:border-amber-700/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute h-44 w-44 rounded-full border border-amber-200/20 dark:border-amber-700/10 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 delay-100" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Empower Teams</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
                Collaborate in real-time, share ideas, and build better together.
              </p>
            </div>
          </div>

          {/* Card 2: Track Progress (Large) */}
          <div className="md:col-span-7 bg-white dark:bg-zinc-900/50 rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none p-8 flex flex-col justify-between group hover:shadow-md transition-all duration-300">
            <div className="h-40 w-full mb-8 flex items-center justify-center relative overflow-hidden rounded-2xl bg-gradient-to-r from-transparent via-amber-50/30 dark:via-amber-900/10 to-transparent">
              <div className="absolute w-full h-[2px] bg-amber-100 dark:bg-amber-900/50 top-1/2 -translate-y-1/2" />
              <div className="absolute left-1/4 h-3 w-3 rounded-full bg-amber-300 dark:bg-amber-600 top-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(252,211,77,0.8)] dark:shadow-none" />
              <div className="absolute left-2/4 h-4 w-4 rounded-full bg-amber-400 dark:bg-amber-500 top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(251,191,36,0.8)] dark:shadow-none" />
              <div className="absolute left-3/4 h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600 top-1/2 -translate-y-1/2 flex items-center justify-center shadow-lg shadow-amber-500/30 dark:shadow-amber-900/50 group-hover:-translate-y-2 transition-transform duration-500">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Track Progress</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
                Set milestones, track progress, and achieve your goals.
              </p>
            </div>
          </div>

          {/* Card 3: Grow Faster (Large) */}
          <div className="md:col-span-7 bg-white dark:bg-zinc-900/50 rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none p-8 flex flex-col justify-between group hover:shadow-md transition-all duration-300">
            <div className="h-40 w-full mb-8 flex items-end justify-center relative gap-3 pb-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-t-xl group-hover:h-16 transition-all duration-500" />
              <div className="w-12 h-20 bg-amber-200 dark:bg-amber-800/50 rounded-t-xl group-hover:h-24 transition-all duration-500 delay-75" />
              <div className="w-12 h-28 bg-amber-300 dark:bg-amber-700/60 rounded-t-xl group-hover:h-32 transition-all duration-500 delay-150" />
              <div className="w-12 h-36 bg-gradient-to-t from-amber-500 to-amber-400 dark:from-amber-600 dark:to-amber-500 rounded-t-xl flex items-start justify-center pt-4 shadow-lg shadow-amber-500/20 dark:shadow-amber-900/40 group-hover:h-40 transition-all duration-500 delay-200">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="absolute top-4 left-4 text-amber-500/10 dark:text-amber-500/5 font-bold text-6xl">
                %
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Grow Faster</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
                Boost your productivity with insights that help you scale.
              </p>
            </div>
          </div>

          {/* Card 4: Simplify with AI (Small) */}
          <div className="md:col-span-5 bg-white dark:bg-zinc-900/50 rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none p-8 flex flex-col justify-between group hover:shadow-md transition-all duration-300">
            <div className="h-40 w-full mb-8 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-[200px] flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent to-amber-300 dark:to-amber-700 border-t border-dashed border-amber-400 dark:border-amber-600" />
                  <div className="w-1/3 h-[1px] bg-gradient-to-l from-transparent to-amber-300 dark:to-amber-700 border-t border-dashed border-amber-400 dark:border-amber-600" />
                </div>
              </div>
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 shadow-lg shadow-amber-500/30 dark:shadow-amber-900/50 flex items-center justify-center relative z-10 group-hover:rotate-12 transition-transform duration-500">
                <Network className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Simplify with AI</h3>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
                Automate repetitive tasks and get smarter suggestions instantly.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
