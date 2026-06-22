import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Lock, Star, Sparkles } from "lucide-react";
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
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "Fredoka" }}>
          Your Learning Path
        </h1>
        <p className="text-muted-foreground font-semibold mt-2">10 modules · From basics to investing pro</p>
      </div>

      <div className="space-y-12">
        {modules.map((mod, mi) => (
          <section key={mod.id}>
            <div className="glass-card rounded-3xl p-5 mb-6 flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-primary/10 grid place-items-center text-3xl">{mod.emoji}</div>
              <div className="flex-1">
                <div className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
                  Module {mi + 1}
                </div>
                <h2 className="text-xl font-black" style={{ fontFamily: "Fredoka" }}>{mod.title}</h2>
              </div>
              <div className="text-sm font-bold text-muted-foreground">{mod.lessons.length} lessons</div>
            </div>

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