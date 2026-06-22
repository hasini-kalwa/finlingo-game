import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Sparkles } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const SUGGESTIONS = [
  "Explain SIP like I'm 16",
  "What is an emergency fund?",
  "Give me 5 budgeting questions",
];

const KB: { match: RegExp; reply: string }[] = [
  {
    match: /sip/i,
    reply:
      "SIP = Systematic Investment Plan. You invest a fixed amount (say ₹500) every month into a mutual fund. Over time, small amounts grow big thanks to compounding. Think of it like watering a plant 🌱 a little each week — eventually it's a tree!",
  },
  {
    match: /emergency/i,
    reply:
      "An emergency fund is money you keep aside for surprises 🚨 — like a phone breaking or a sudden trip. Aim for 3–6 months of expenses, parked in a savings account so it's easy to grab.",
  },
  {
    match: /budget/i,
    reply:
      "Here are 5 quick budgeting Qs:\n1) What's the 50/30/20 rule?\n2) Name a fixed expense.\n3) Need or Want: Netflix?\n4) Income ₹6000, expense ₹4500 — savings?\n5) Why track expenses daily?",
  },
  {
    match: /compound|interest/i,
    reply:
      "Compound interest = interest on your interest 💸. ₹1000 at 10% becomes ₹1100 next year, then ₹1210, then ₹1331… The longer you stay, the faster it snowballs ❄️.",
  },
  {
    match: /tax/i,
    reply:
      "Taxes are money citizens pay the government to fund roads, schools, hospitals 🏥. In India, income tax is based on slabs — earn more, pay a higher % on the extra.",
  },
  {
    match: /credit|loan|emi/i,
    reply:
      "A loan gives you money now that you repay later — usually with interest. EMI = Equal Monthly Instalment. Always check the interest rate before borrowing! 💳",
  },
];

function answer(q: string): string {
  for (const { match, reply } of KB) if (match.test(q)) return reply;
  return "Great question! Try lessons in the Learning Path 📚 — or ask me about SIP, budgeting, emergency funds, taxes, or EMI.";
}

export function FinBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hey! I'm FinBot 🤖 — your AI finance buddy. Ask me anything about money!" },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }, { role: "bot", text: answer(text) }]);
    setInput("");
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 size-16 rounded-full bg-gradient-hero text-white grid place-items-center shadow-pop animate-pulse-ring"
        aria-label="Open FinBot"
      >
        {open ? <X className="size-7" /> : <MessageCircle className="size-7" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-5 z-50 w-[min(380px,calc(100vw-2.5rem))] h-[520px] glass-card rounded-3xl flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-hero text-white p-4 flex items-center gap-3">
              <div className="size-10 rounded-2xl bg-white/20 grid place-items-center text-xl">🤖</div>
              <div>
                <div className="font-extrabold flex items-center gap-1">
                  FinBot <Sparkles className="size-4" />
                </div>
                <div className="text-xs opacity-90">AI Finance Tutor</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/50">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-sm whitespace-pre-line font-medium ${
                      m.role === "user"
                        ? "bg-secondary text-secondary-foreground rounded-br-sm"
                        : "bg-card text-card-foreground border border-border rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
              {msgs.length <= 1 && (
                <div className="space-y-1.5 pt-2">
                  <div className="text-xs font-bold text-muted-foreground">Try asking:</div>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="block w-full text-left text-xs px-3 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="p-3 border-t border-border flex gap-2 bg-card"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask FinBot..."
                className="flex-1 px-4 py-2 rounded-full bg-muted text-sm font-medium outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="size-10 rounded-full bg-primary text-primary-foreground grid place-items-center btn-pop"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}