import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Lock, Star, Sparkles, Trophy } from "lucide-react";
import { modules } from "@/lib/finlingo-data";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learning Path · FinLingo" },
      { name: "description", content: "Your Duolingo-style path to financial literacy." },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const done = modules.reduce(
    (s, m) => s + m.lessons.filter((l) => l.status === "completed").length,
    0,
  );
  const totalXp = modules.reduce(
    (s, m) => s + m.lessons.filter((l) => l.status === "completed").reduce((a, l) => a + l.xp, 0),
    0,
  );
  const overall = Math.round((done / totalLessons) * 100);

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "Fredoka" }}>
          Your Learning Path
        </h1>
        <p className="text-muted-foreground font-semibold mt-2">10 modules · From basics to investing pro</p>
      </div>

      <div className="glass-card rounded-3xl p-6 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">Overall progress</div>
            <div className="text-3xl font-black" style={{ fontFamily: "Fredoka" }}>
              {done} / {totalLessons} <span className="text-base text-muted-foreground">lessons</span>
            </div>
          </div>
          <div className="flex gap-2 text-sm font-extrabold">
            <span className="px-3 py-1.5 rounded-full bg-xp/10 text-xp flex items-center gap-1">
              <Sparkles className="size-3.5" /> {totalXp} XP
            </span>
            <span className="px-3 py-1.5 rounded-full bg-purple/10 text-purple flex items-center gap-1">
              <Trophy className="size-3.5" /> {overall}%
            </span>
          </div>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overall}%` }}
            className="h-full bg-gradient-hero rounded-full"
          />
        </div>
      </div>

      <div className="space-y-12">
        {modules.map((mod, mi) => (
          <section key={mod.id}>
            <ModuleHeader mod={mod} index={mi} />

            <div className="relative flex flex-col items-center gap-6">
              {mod.lessons.map((l, i) => (
                <LessonNode key={l.id} lesson={l} index={i} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function ModuleHeader({ mod, index }: { mod: (typeof modules)[number]; index: number }) {
  const done = mod.lessons.filter((l) => l.status === "completed").length;
  const pct = Math.round((done / mod.lessons.length) * 100);
  const status = done === mod.lessons.length ? "done" : mod.lessons.some((l) => l.status === "current") ? "active" : pct > 0 ? "active" : "locked";
  return (
    <div className={`glass-card rounded-3xl p-5 mb-6 ${status === "locked" ? "opacity-70" : ""}`}>
      <div className="flex items-center gap-4">
        <div className={`size-14 rounded-2xl grid place-items-center text-3xl ${
          status === "done" ? "bg-primary text-primary-foreground" : status === "active" ? "bg-gradient-hero text-white" : "bg-muted"
        }`}>
          {mod.emoji}
        </div>
        <div className="flex-1">
          <div className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
            Module {index + 1} {status === "locked" && "· Locked"}
          </div>
          <h2 className="text-xl font-black" style={{ fontFamily: "Fredoka" }}>{mod.title}</h2>
        </div>
        <div className="text-right">
          <div className="text-sm font-extrabold">{done}/{mod.lessons.length}</div>
          <div className="text-[11px] font-bold text-muted-foreground">lessons</div>
        </div>
      </div>
      <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          className="h-full bg-primary rounded-full"
        />
      </div>
    </div>
  );
}

function LessonNode({
  lesson,
  index,
}: {
  lesson: { id: string; title: string; xp: number; status: "completed" | "current" | "locked" };
  index: number;
}) {
  const offset = [0, 60, 0, -60][index % 4];
  const { status } = lesson;

  const node = (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring" }}
      style={{ marginLeft: offset }}
      className="relative group"
    >
      <div
        className={`size-20 rounded-full grid place-items-center text-3xl font-black shadow-pop transition-transform group-hover:scale-105 ${
          status === "completed"
            ? "bg-primary text-primary-foreground"
            : status === "current"
              ? "bg-gradient-hero text-white animate-pulse-ring"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {status === "completed" ? (
          <Check className="size-9" strokeWidth={3} />
        ) : status === "locked" ? (
          <Lock className="size-7" />
        ) : (
          <Star className="size-9" strokeWidth={2.5} />
        )}
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap text-center">
        <div className="font-extrabold text-sm">{lesson.title}</div>
        <div className="text-xs text-muted-foreground font-bold flex items-center justify-center gap-1 mt-0.5">
          <Sparkles className="size-3 text-xp" /> +{lesson.xp} XP
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="pb-12">
      {status === "locked" ? (
        <div className="cursor-not-allowed opacity-90">{node}</div>
      ) : (
        <Link to="/lesson/$id" params={{ id: lesson.id }}>{node}</Link>
      )}
    </div>
  );
}