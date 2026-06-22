import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Flame, Coins, Sparkles, BookCheck, ArrowRight, Trophy, Target,
  Calendar, Zap, CheckCircle2,
} from "lucide-react";
import { weeklyXp, dailyQuests, goals } from "@/lib/finlingo-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · FinLingo" },
      { name: "description", content: "Your FinLingo progress, XP, coins, streak and today's challenge." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const xp = 450;
  const nextLevel = 1000;
  const pct = Math.round((xp / nextLevel) * 100);
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-10" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-gradient-hero grid place-items-center text-3xl shadow-pop">
              🚀
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Level</div>
              <h1 className="text-2xl md:text-3xl font-black" style={{ fontFamily: "Fredoka" }}>
                Budget Beginner
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill icon={<Sparkles className="size-4" />} label="XP" value="450" tint="bg-xp/10 text-xp" />
            <Pill icon={<Coins className="size-4" />} label="Coins" value="1200" tint="bg-coin/15 text-coin" />
            <Pill icon={<Flame className="size-4" />} label="Streak" value="7d" tint="bg-streak/10 text-streak" />
            <Pill icon={<BookCheck className="size-4" />} label="Done" value="8" tint="bg-primary/10 text-primary" />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm font-bold mb-2">
            <span>Progress to <span className="text-secondary">Smart Saver</span></span>
            <span className="text-muted-foreground">{xp} / {nextLevel} XP</span>
          </div>
          <div className="h-5 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-hero rounded-full relative"
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,oklch(1_0_0/0.4),transparent)] animate-pulse" />
            </motion.div>
          </div>
          <div className="text-right text-xs font-bold text-muted-foreground mt-1">{pct}% complete</div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 glass-card rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-accent/30 text-accent-foreground text-[10px] font-extrabold uppercase tracking-wider">
            Today's Challenge
          </div>
          <div className="flex items-start gap-4">
            <div className="size-14 rounded-2xl bg-accent/40 grid place-items-center text-3xl shrink-0 animate-float">🎯</div>
            <div>
              <h2 className="text-xl font-extrabold mb-2" style={{ fontFamily: "Fredoka" }}>Savings Sprint</h2>
              <p className="text-muted-foreground font-medium">
                Save ₹500 for a future purchase. How many weeks will it take to save ₹5,000?
              </p>
            </div>
          </div>
          <Link
            to="/lesson/$id"
            params={{ id: "mb-3" }}
            className="btn-pop mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-primary-foreground font-extrabold"
          >
            Start Challenge <ArrowRight className="size-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-3xl p-6"
        >
          <Trophy className="size-7 text-purple mb-2" />
          <h3 className="font-extrabold mb-1">Climb the Leaderboard</h3>
          <p className="text-sm text-muted-foreground font-medium mb-4">You're rank #5 — 4 spots from top 3!</p>
          <Link to="/leaderboard" className="btn-pop-blue inline-block px-4 py-2 rounded-xl bg-secondary text-secondary-foreground font-bold text-sm">
            View Leaders
          </Link>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <ActionCard
          to="/learn"
          emoji="🗺️"
          title="Continue Learning Path"
          desc="Next up: Needs vs Wants"
        />
        <ActionCard
          to="/calculator"
          emoji="🧮"
          title="Try the Finance Tools"
          desc="SIP, EMI, Budget planner & more"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <WeeklyChart />
        <DailyQuests />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <StreakCalendar />
        <Goals />
      </div>

      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="size-5 text-primary" />
          <h3 className="font-extrabold">Recent Badges</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {["🥉 First Lesson", "🔥 3-day Streak", "💰 100 Coins", "🧠 Quick Thinker"].map((b) => (
            <div key={b} className="px-4 py-2 rounded-full bg-muted font-bold text-sm">{b}</div>
          ))}
        </div>
      </div>
    </main>
  );
}

function Pill({ icon, label, value, tint }: { icon: React.ReactNode; label: string; value: string; tint: string }) {
  return (
    <div className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-extrabold ${tint}`}>
      {icon}
      <span className="text-xs uppercase tracking-wider opacity-80">{label}</span>
      <span className="text-base">{value}</span>
    </div>
  );
}

function ActionCard({ to, emoji, title, desc }: { to: string; emoji: string; title: string; desc: string }) {
  return (
    <Link to={to} className="glass-card rounded-3xl p-6 flex items-center gap-4 hover:-translate-y-0.5 transition">
      <div className="size-14 rounded-2xl bg-primary/10 grid place-items-center text-3xl">{emoji}</div>
      <div className="flex-1">
        <h3 className="font-extrabold">{title}</h3>
        <p className="text-sm text-muted-foreground font-medium">{desc}</p>
      </div>
      <ArrowRight className="size-5 text-muted-foreground" />
    </Link>
  );
}

function WeeklyChart() {
  const max = Math.max(...weeklyXp.map((d) => d.xp));
  const total = weeklyXp.reduce((s, d) => s + d.xp, 0);
  return (
    <div className="glass-card rounded-3xl p-6 lg:col-span-2">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">This week</div>
          <h3 className="font-black text-xl" style={{ fontFamily: "Fredoka" }}>{total} XP earned</h3>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-extrabold text-xs flex items-center gap-1">
          <Zap className="size-3.5" /> +18% vs last week
        </div>
      </div>
      <div className="flex items-end justify-between gap-2 h-40">
        {weeklyXp.map((d, i) => {
          const h = (d.xp / max) * 100;
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full">
              <div className="flex-1 w-full flex items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 0.6, ease: "easeOut" }}
                  className="w-full rounded-t-xl bg-gradient-hero relative group cursor-pointer"
                >
                  <div className="opacity-0 group-hover:opacity-100 transition absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-extrabold bg-foreground text-background px-2 py-0.5 rounded-md">
                    {d.xp}
                  </div>
                </motion.div>
              </div>
              <div className="text-[10px] font-extrabold uppercase text-muted-foreground">{d.day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DailyQuests() {
  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="size-5 text-accent-foreground" />
        <h3 className="font-black text-xl" style={{ fontFamily: "Fredoka" }}>Daily Quests</h3>
      </div>
      <div className="space-y-3">
        {dailyQuests.map((q) => {
          const pct = Math.min(100, (q.progress / q.target) * 100);
          const done = q.progress >= q.target;
          return (
            <div key={q.id} className="">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="text-2xl">{q.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-sm truncate">{q.title}</div>
                  <div className="text-[11px] font-bold text-muted-foreground">{q.progress} / {q.target}</div>
                </div>
                <div className={`text-xs font-extrabold flex items-center gap-1 ${done ? "text-primary" : "text-coin"}`}>
                  {done ? <CheckCircle2 className="size-4" /> : <Coins className="size-3.5" />} {q.reward}
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  className={`h-full rounded-full ${done ? "bg-primary" : "bg-gradient-coin"}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StreakCalendar() {
  // last 28 days; mark last 7 active
  const days = Array.from({ length: 28 }, (_, i) => ({ i, active: i >= 21 }));
  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="size-5 text-streak" />
        <h3 className="font-black text-xl" style={{ fontFamily: "Fredoka" }}>Streak Calendar</h3>
        <span className="ml-auto text-xs font-extrabold text-streak flex items-center gap-1">
          <Flame className="size-4" /> 7 days
        </span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d) => (
          <div
            key={d.i}
            className={`aspect-square rounded-lg ${
              d.active ? "bg-streak text-white" : "bg-muted text-muted-foreground"
            } grid place-items-center text-[10px] font-extrabold`}
          >
            {d.active ? "🔥" : ""}
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground font-bold mt-3">
        Don't break the chain — practice tomorrow!
      </p>
    </div>
  );
}

function Goals() {
  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="size-5 text-secondary" />
        <h3 className="font-black text-xl" style={{ fontFamily: "Fredoka" }}>Savings Goals</h3>
      </div>
      <div className="space-y-4">
        {goals.map((g) => {
          const pct = Math.round((g.saved / g.target) * 100);
          return (
            <div key={g.id}>
              <div className="flex items-center gap-3 mb-1.5">
                <div className="text-2xl">{g.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-extrabold text-sm truncate">{g.title}</div>
                  <div className="text-[11px] font-bold text-muted-foreground">
                    ₹{g.saved.toLocaleString("en-IN")} / ₹{g.target.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="text-sm font-black text-secondary">{pct}%</div>
              </div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  className="h-full bg-secondary rounded-full"
                />
              </div>
            </div>
          );
        })}
        <button className="btn-pop-blue w-full px-4 py-2.5 rounded-2xl bg-secondary text-secondary-foreground font-extrabold text-sm">
          + Add a goal
        </button>
      </div>
    </div>
  );
}