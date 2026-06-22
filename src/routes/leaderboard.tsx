import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Sparkles, Crown, TrendingUp, ArrowUp } from "lucide-react";
import { leaderboard, allBadges } from "@/lib/finlingo-data";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard · FinLingo" },
      { name: "description", content: "See top learners and climb the ranks." },
    ],
  }),
  component: LeaderPage,
});

const podiumStyle = ["text-coin", "text-muted-foreground", "text-streak"];

const periods = ["Weekly", "Monthly", "All-time"] as const;

function LeaderPage() {
  const [period, setPeriod] = useState<(typeof periods)[number]>("Weekly");
  const you = leaderboard.find((p) => p.name === "You")!;
  const aboveYou = leaderboard.find((p) => p.rank === you.rank - 1);
  const gap = aboveYou ? aboveYou.xp - you.xp : 0;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "Fredoka" }}>
          🏆 Leaderboard
        </h1>
        <p className="text-muted-foreground font-semibold mt-2">Top finance learners this week</p>
      </div>

      <div className="flex gap-2 justify-center mb-6">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-full font-extrabold text-sm transition ${
              period === p ? "bg-primary text-primary-foreground shadow-pop" : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-5 mb-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-10" />
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-2xl bg-gradient-hero text-white grid place-items-center text-3xl">
            {you.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Your rank</div>
            <div className="text-2xl font-black" style={{ fontFamily: "Fredoka" }}>#{you.rank} · {you.badge}</div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-primary font-extrabold text-sm justify-end">
              <ArrowUp className="size-4" /> {gap} XP to #{you.rank - 1}
            </div>
            <div className="text-xs font-bold text-muted-foreground">Keep going!</div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-3 mb-8 items-end">
        {[1, 0, 2].map((idx) => {
          const p = leaderboard[idx];
          const h = idx === 0 ? "h-48" : idx === 1 ? "h-40" : "h-32";
          return (
            <motion.div
              key={p.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className={`glass-card rounded-3xl p-4 flex flex-col items-center justify-end ${h}`}
            >
              <Crown className={`size-6 ${podiumStyle[idx]} mb-1`} />
              <div className="text-4xl mb-1">{p.avatar}</div>
              <div className="font-extrabold text-sm">{p.name}</div>
              <div className="text-xs font-bold text-xp flex items-center gap-1">
                <Sparkles className="size-3" /> {p.xp}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        {leaderboard.map((p, i) => {
          const isYou = p.name === "You";
          return (
            <motion.div
              key={p.rank}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`flex items-center gap-3 p-4 ${i !== leaderboard.length - 1 ? "border-b border-border/60" : ""} ${
                isYou ? "bg-primary/10" : ""
              }`}
            >
              <div className={`size-9 rounded-xl grid place-items-center font-black text-sm ${
                p.rank <= 3 ? "bg-gradient-hero text-white" : "bg-muted text-muted-foreground"
              }`}>
                {p.rank}
              </div>
              <div className="text-3xl">{p.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold truncate">{p.name} {isYou && <span className="text-xs text-primary">(you)</span>}</div>
                <div className="text-xs font-bold text-muted-foreground">{p.badge}</div>
              </div>
              <div className="flex items-center gap-1 font-extrabold text-streak text-sm">
                <Flame className="size-4" /> {p.streak}
              </div>
              <div className="flex items-center gap-1 font-extrabold text-xp text-sm min-w-[70px] justify-end">
                <Sparkles className="size-4" /> {p.xp}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="size-5 text-purple" />
          <h2 className="font-black text-xl" style={{ fontFamily: "Fredoka" }}>Badges & Achievements</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {allBadges.map((b) => (
            <div
              key={b.n}
              className={`glass-card rounded-2xl p-4 flex items-center gap-3 ${b.earned ? "" : "opacity-60 grayscale"}`}
            >
              <div className={`size-12 rounded-2xl grid place-items-center text-2xl ${
                b.earned ? "bg-primary/10" : "bg-muted"
              }`}>{b.e}</div>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold truncate">{b.n}</div>
                <div className="text-xs text-muted-foreground font-bold">{b.d}</div>
              </div>
              {b.earned && (
                <span className="text-[10px] font-extrabold uppercase px-2 py-1 rounded-full bg-primary/15 text-primary">
                  Earned
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}