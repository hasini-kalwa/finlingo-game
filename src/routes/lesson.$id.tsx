import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, X, Sparkles, Coins, Check, ArrowRight } from "lucide-react";
import { sampleLesson, modules } from "@/lib/finlingo-data";

export const Route = createFileRoute("/lesson/$id")({
  head: () => ({
    meta: [
      { title: "Lesson · FinLingo" },
      { name: "description", content: "Interactive finance lesson." },
    ],
  }),
  component: LessonPage,
});

function LessonPage() {
  const { id } = Route.useParams();
  const found = modules.flatMap((m) => m.lessons.map((l) => ({ ...l, mod: m.title, emoji: m.emoji })))
    .find((l) => l.id === id);
  const lessonTitle = found?.title ?? sampleLesson.title;
  const moduleTitle = found?.mod ?? "FinLingo";
  const emoji = found?.emoji ?? "📚";
  const navigate = useNavigate();
  const questions = sampleLesson.questions;
  const [step, setStep] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [picked, setPicked] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [reveal, setReveal] = useState<null | "correct" | "wrong">(null);
  const [done, setDone] = useState(false);

  const q = questions[step];
  const total = questions.length;
  const progress = ((step + (reveal ? 1 : 0)) / total) * 100;

  useEffect(() => {
    if (done) {
      confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 } });
    }
  }, [done]);

  const check = () => {
    if (reveal) return;
    const ans = q.type === "choice" ? picked : typed.trim();
    if (!ans) return;
    const ok = ans.toLowerCase() === q.answer.toLowerCase();
    setReveal(ok ? "correct" : "wrong");
    if (ok) confetti({ particleCount: 60, spread: 55, origin: { y: 0.7 } });
    else setHearts((h) => Math.max(0, h - 1));
  };

  const next = () => {
    setReveal(null);
    setPicked(null);
    setTyped("");
    if (step + 1 >= total) setDone(true);
    else setStep((s) => s + 1);
  };

  if (hearts === 0 && !done) {
    return (
      <main className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">💔</div>
        <h1 className="text-3xl font-black mb-2" style={{ fontFamily: "Fredoka" }}>Out of hearts!</h1>
        <p className="text-muted-foreground font-semibold mb-6">Take a breath and try again.</p>
        <button
          onClick={() => { setHearts(3); setStep(0); }}
          className="btn-pop px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-extrabold"
        >
          Restart Lesson
        </button>
      </main>
    );
  }

  if (done) {
    return (
      <main className="max-w-md mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="text-8xl mb-4"
        >
          🎉
        </motion.div>
        <h1 className="text-4xl font-black mb-2" style={{ fontFamily: "Fredoka" }}>Lesson Complete!</h1>
        <p className="text-muted-foreground font-semibold mb-8">You're getting smarter by the minute.</p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-5">
            <Sparkles className="size-7 text-xp mx-auto mb-2" />
            <div className="text-3xl font-black text-xp">+10</div>
            <div className="text-xs font-bold text-muted-foreground uppercase">XP</div>
          </div>
          <div className="glass-card rounded-2xl p-5">
            <Coins className="size-7 text-coin mx-auto mb-2" />
            <div className="text-3xl font-black text-coin">+50</div>
            <div className="text-xs font-bold text-muted-foreground uppercase">Coins</div>
          </div>
        </div>
        <div className="flex gap-3 justify-center">
          <Link to="/learn" className="btn-pop-blue px-5 py-3 rounded-2xl bg-secondary text-secondary-foreground font-extrabold">
            Back to Path
          </Link>
          <Link to="/dashboard" className="btn-pop px-5 py-3 rounded-2xl bg-primary text-primary-foreground font-extrabold">
            Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate({ to: "/learn" })}
          className="size-9 grid place-items-center rounded-full bg-muted text-muted-foreground hover:bg-muted/70"
          aria-label="Exit"
        >
          <X className="size-5" />
        </button>
        <div className="flex-1 h-3.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary rounded-full"
          />
        </div>
        <div className="flex items-center gap-1 font-extrabold text-streak">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`size-5 ${i < hearts ? "fill-streak" : "fill-muted text-muted"}`}
            />
          ))}
        </div>
      </div>

      <div className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground mb-2">
        {emoji} {moduleTitle} · {lessonTitle} · Q {step + 1}/{total}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card rounded-3xl p-6 md:p-8 mb-6"
      >
        <h2 className="text-2xl md:text-3xl font-black leading-snug" style={{ fontFamily: "Fredoka" }}>
          {q.prompt}
        </h2>
      </motion.div>

      {q.type === "choice" ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {q.options!.map((opt) => {
            const isPicked = picked === opt;
            const isAnswer = opt === q.answer;
            const showState = reveal && (isPicked || (reveal === "wrong" && isAnswer));
            return (
              <button
                key={opt}
                onClick={() => !reveal && setPicked(opt)}
                disabled={!!reveal}
                className={`p-4 rounded-2xl border-2 font-extrabold text-left transition ${
                  showState
                    ? isAnswer
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-destructive bg-destructive/10 text-destructive"
                    : isPicked
                      ? "border-secondary bg-secondary/15"
                      : "border-border bg-card hover:border-secondary hover:-translate-y-0.5"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      ) : (
        <div>
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="Type your answer..."
            disabled={!!reveal}
            className="w-full text-2xl font-black px-5 py-4 rounded-2xl border-2 border-border bg-card focus:border-secondary outline-none"
          />
        </div>
      )}

      <AnimatePresence>
        {reveal && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed bottom-0 left-0 right-0 p-5 ${
              reveal === "correct" ? "bg-primary/15" : "bg-destructive/10"
            } backdrop-blur-xl border-t-2 ${
              reveal === "correct" ? "border-primary" : "border-destructive"
            }`}
          >
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`size-12 rounded-full grid place-items-center ${
                    reveal === "correct" ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"
                  }`}
                >
                  {reveal === "correct" ? <Check className="size-7" strokeWidth={3} /> : <X className="size-7" strokeWidth={3} />}
                </div>
                <div>
                  <div className="font-black text-lg">
                    {reveal === "correct" ? "Nice work!" : "Not quite — answer: " + q.answer}
                  </div>
                  {q.explanation && (
                    <div className="text-sm font-semibold text-muted-foreground">{q.explanation}</div>
                  )}
                </div>
              </div>
              <button
                onClick={next}
                className={`btn-pop px-5 py-3 rounded-2xl font-extrabold flex items-center gap-2 ${
                  reveal === "correct"
                    ? "bg-primary text-primary-foreground"
                    : "bg-destructive text-destructive-foreground"
                }`}
              >
                Continue <ArrowRight className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!reveal && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={check}
            disabled={q.type === "choice" ? !picked : !typed.trim()}
            className="btn-pop px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-extrabold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Check
          </button>
        </div>
      )}
    </main>
  );
}