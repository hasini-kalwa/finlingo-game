import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Flame, Sparkles, Crown } from "lucide-react";
import { leaderboard } from "@/lib/finlingo-data";

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

function LeaderPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "Fredoka" }}>
          🏆 Leaderboard
        </h1>
        <p className="text-muted-foreground font-semibold mt-2">Top finance learners this week</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8 items-end">
        {[1, 0, 2].map((idx) => {
          const p = leaderboard[idx];
          const heights = [1, 0, 2].map((i) => (i === 0 ? "h-44" : "h-36"));
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
        <h2 className="font-black text-xl mb-3" style={{ fontFamily: "Fredoka" }}>Badges to Unlock</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { e: "🌱", n: "Budget Beginner", d: "Earn 100 XP" },
            { e: "💰", n: "Smart Saver", d: "Reach 500 XP" },
            { e: "📈", n: "Investment Explorer", d: "Hit 2000 XP" },
            { e: "🥷", n: "Finance Ninja", d: "Hit 5000 XP" },
          ].map((b) => (
            <div key={b.n} className="glass-card rounded-2xl p-4 flex items-center gap-3">
              <div className="size-12 rounded-2xl bg-primary/10 grid place-items-center text-2xl">{b.e}</div>
              <div>
                <div className="font-extrabold">{b.n}</div>
                <div className="text-xs text-muted-foreground font-bold">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}