import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  Coins,
  Flame,
  Trophy,
  Brain,
  Calculator,
  Zap,
  BookOpen,
  PiggyBank,
  TrendingUp,
  Wallet,
  BadgeCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FinLingo — Learn Money Skills Like a Game" },
      {
        name: "description",
        content:
          "Master budgeting, saving, investing, taxes and more through bite-sized lessons, challenges, and real-world calculations.",
      },
      { property: "og:title", content: "FinLingo — Learn Money Skills Like a Game" },
      {
        property: "og:description",
        content: "Gamified financial literacy for teens & students. XP, streaks, and a finance AI tutor.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FAQ />
      <CtaFooter />
    </main>
  );
}

const floatIcons = [
  { Icon: Coins, x: "6%", y: "22%", delay: 0, tint: "text-coin" },
  { Icon: PiggyBank, x: "88%", y: "20%", delay: 0.6, tint: "text-primary" },
  { Icon: Wallet, x: "8%", y: "72%", delay: 1.1, tint: "text-secondary" },
  { Icon: TrendingUp, x: "88%", y: "70%", delay: 0.3, tint: "text-purple" },
];

function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 pt-12 pb-20">
      <div className="absolute inset-0 -z-10 opacity-20 bg-gradient-hero" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(0.99_0.01_130)_0%,transparent_60%)]" />
      {floatIcons.map(({ Icon, x, y, delay, tint }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, type: "spring" }}
          className="absolute hidden lg:block"
          style={{ left: x, top: y }}
        >
          <div className={`size-14 rounded-2xl glass-card grid place-items-center animate-float ${tint}`}>
            <Icon className="size-7" />
          </div>
        </motion.div>
      ))}
      <div className="max-w-3xl text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6"
        >
          <Sparkles className="size-4" /> Gamified financial literacy
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]"
          style={{ fontFamily: "Fredoka, Nunito" }}
        >
          Learn Money Skills{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(135deg, oklch(0.72 0.21 142) 0%, oklch(0.7 0.17 250) 50%, oklch(0.62 0.22 300) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Like a Game
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground font-semibold max-w-2xl mx-auto"
        >
          Master budgeting, saving, investing, taxes, insurance, and more through bite-sized
          lessons, challenges, and real-world calculations.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/dashboard"
            className="btn-pop px-7 py-4 rounded-2xl bg-primary text-primary-foreground font-extrabold uppercase tracking-wider text-sm shadow-pop"
          >
            Start Learning
          </Link>
          <Link
            to="/learn"
            className="btn-pop-blue px-7 py-4 rounded-2xl bg-secondary text-secondary-foreground font-extrabold uppercase tracking-wider text-sm"
          >
            View Learning Path
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-6 text-sm font-bold text-muted-foreground"
        >
          <div className="flex items-center gap-1.5"><Flame className="size-4 text-streak" /> 7-day streak</div>
          <div className="flex items-center gap-1.5"><Coins className="size-4 text-coin" /> Earn coins</div>
          <div className="flex items-center gap-1.5"><Trophy className="size-4 text-purple" /> Compete</div>
        </motion.div>
      </div>
    </section>
  );
}

const features = [
  { Icon: Brain, title: "Interactive Quizzes", desc: "Learn through play, not lectures.", tint: "bg-primary/10 text-primary" },
  { Icon: Sparkles, title: "Earn XP & Coins", desc: "Get rewarded for every win.", tint: "bg-xp/10 text-xp" },
  { Icon: Flame, title: "Daily Streaks", desc: "Build habits that stick.", tint: "bg-streak/10 text-streak" },
  { Icon: Trophy, title: "Leaderboards", desc: "Race friends to the top.", tint: "bg-purple/10 text-purple" },
  { Icon: Calculator, title: "Real Calculations", desc: "Practice SIPs, EMIs, budgets.", tint: "bg-coin/15 text-coin" },
  { Icon: BookOpen, title: "AI Finance Tutor", desc: "FinBot explains in plain English.", tint: "bg-secondary/10 text-secondary" },
];

function Features() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-3" style={{ fontFamily: "Fredoka" }}>
        Why FinLingo?
      </h2>
      <p className="text-center text-muted-foreground font-semibold mb-12">Money lessons that don't feel like homework.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map(({ Icon, title, desc, tint }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="glass-card rounded-3xl p-6"
          >
            <div className={`size-14 rounded-2xl grid place-items-center mb-4 ${tint}`}>
              <Icon className="size-7" />
            </div>
            <h3 className="font-extrabold text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground font-medium">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { n: 1, title: "Complete Lessons", emoji: "📚", desc: "Bite-sized & interactive" },
  { n: 2, title: "Solve Challenges", emoji: "🧠", desc: "Real-world finance math" },
  { n: 3, title: "Earn Rewards", emoji: "🏆", desc: "XP, coins, badges" },
  { n: 4, title: "Get Money Smart", emoji: "🚀", desc: "Level up in life" },
];

function HowItWorks() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12" style={{ fontFamily: "Fredoka" }}>
        How It Works
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, type: "spring" }}
            className="relative glass-card rounded-3xl p-6 text-center"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 size-8 rounded-full bg-gradient-hero text-white font-black grid place-items-center text-sm">
              {s.n}
            </div>
            <div className="text-5xl mt-2 mb-3">{s.emoji}</div>
            <h3 className="font-extrabold mb-1">{s.title}</h3>
            <p className="text-sm text-muted-foreground font-medium">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const stats = [
  { v: "10", l: "Learning Modules", tint: "text-primary" },
  { v: "100+", l: "Challenges", tint: "text-secondary" },
  { v: "Daily", l: "Streak System", tint: "text-streak" },
  { v: "AI", l: "Powered Tutor", tint: "text-purple" },
];

function Stats() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="glass-card rounded-3xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="text-center"
          >
            <div className={`text-4xl md:text-5xl font-black ${s.tint}`} style={{ fontFamily: "Fredoka" }}>
              {s.v}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground font-bold uppercase mt-1 tracking-wider">
              {s.l}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CtaFooter() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center glass-card rounded-3xl p-10 md:p-14 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-hero opacity-15" />
        <div className="text-6xl mb-4 inline-block animate-float">🦉</div>
        <h2 className="text-3xl md:text-5xl font-black mb-3" style={{ fontFamily: "Fredoka" }}>
          Ready to get money-smart?
        </h2>
        <p className="text-muted-foreground font-semibold mb-8">Your future self will thank you. Promise.</p>
        <Link
          to="/dashboard"
          className="btn-pop inline-block px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-extrabold uppercase tracking-wider"
        >
          <Zap className="inline size-5 mr-2 -mt-1" />Start free
        </Link>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-8 font-bold">
        © 2026 FinLingo · Made for the next generation of money pros
      </p>
    </section>
  );
}

const testimonials = [
  { name: "Ishita, 17", quote: "I finally get what SIP means. Made one yesterday!", emoji: "🎓" },
  { name: "Karan, 19", quote: "It's literally Duolingo for money. So addictive.", emoji: "🔥" },
  { name: "Meera, 16", quote: "The 50/30/20 quest helped me stop overspending.", emoji: "💸" },
];

function Testimonials() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-12" style={{ fontFamily: "Fredoka" }}>
        Loved by students 💚
      </h2>
      <div className="grid sm:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="glass-card rounded-3xl p-6"
          >
            <div className="text-4xl mb-3">{t.emoji}</div>
            <p className="font-bold mb-4">"{t.quote}"</p>
            <div className="text-sm font-extrabold text-muted-foreground">— {t.name}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const faqs = [
  { q: "Is FinLingo free?", a: "Yes — all core lessons, calculators, and the AI tutor are free." },
  { q: "Who is it for?", a: "Teens and college students (15–20) who want to learn money skills the fun way." },
  { q: "Do I need any finance background?", a: "Nope. We start from zero — what money is, how to save it, how it grows." },
  { q: "What's the AI tutor?", a: "FinBot — a chat buddy that explains concepts and quizzes you on demand." },
];

function FAQ() {
  return (
    <section className="py-20 px-4 max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-black text-center mb-10" style={{ fontFamily: "Fredoka" }}>
        Quick answers
      </h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <motion.details
            key={f.q}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-5 group"
          >
            <summary className="font-extrabold cursor-pointer flex items-center justify-between">
              {f.q}
              <span className="size-7 rounded-full bg-primary/10 text-primary grid place-items-center text-lg group-open:rotate-45 transition">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground font-semibold">{f.a}</p>
          </motion.details>
        ))}
      </div>
    </section>
  );
}
