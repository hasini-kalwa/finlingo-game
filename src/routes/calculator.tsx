import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PiggyBank, TrendingUp, Percent, Calculator as CalcIcon, Wallet, Building, Lightbulb } from "lucide-react";
import { calculatorTips } from "@/lib/finlingo-data";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Finance Tools · FinLingo" },
      { name: "description", content: "SIP, EMI, interest and budget calculators." },
    ],
  }),
  component: CalcPage,
});

const tabs = [
  { id: "savings", label: "Savings Goal", icon: PiggyBank },
  { id: "sip", label: "SIP", icon: TrendingUp },
  { id: "simple", label: "Simple Interest", icon: Percent },
  { id: "compound", label: "Compound Interest", icon: CalcIcon },
  { id: "emi", label: "EMI", icon: Building },
  { id: "budget", label: "Budget Planner", icon: Wallet },
] as const;

type TabId = (typeof tabs)[number]["id"];

function CalcPage() {
  const [tab, setTab] = useState<TabId>("savings");
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "Fredoka" }}>
          Finance Tools 🧮
        </h1>
        <p className="text-muted-foreground font-semibold mt-2">Real calculations for real life.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-2 px-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`shrink-0 px-4 py-2.5 rounded-2xl font-extrabold text-sm flex items-center gap-2 transition ${
              tab === id ? "bg-primary text-primary-foreground shadow-pop" : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            <Icon className="size-4" /> {label}
          </button>
        ))}
      </div>

      <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {tab === "savings" && <SavingsGoal />}
        {tab === "sip" && <SIP />}
        {tab === "simple" && <SimpleInterest />}
        {tab === "compound" && <CompoundInterest />}
        {tab === "emi" && <EMI />}
        {tab === "budget" && <Budget />}
        <Tips id={tab} />
      </motion.div>
    </main>
  );
}

function Tips({ id }: { id: string }) {
  const tips = calculatorTips[id] ?? [];
  if (!tips.length) return null;
  return (
    <div className="glass-card rounded-3xl p-6 mt-5">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="size-5 text-accent-foreground" />
        <h3 className="font-black text-lg" style={{ fontFamily: "Fredoka" }}>Pro tips</h3>
      </div>
      <ul className="space-y-2">
        {tips.map((t) => (
          <li key={t} className="flex gap-2 text-sm font-semibold text-muted-foreground">
            <span className="text-accent-foreground">•</span> {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Bar({ segments }: { segments: { label: string; value: number; tint: string }[] }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="h-5 rounded-full overflow-hidden flex">
        {segments.map((s) => (
          <motion.div
            key={s.label}
            initial={{ width: 0 }}
            animate={{ width: `${(s.value / total) * 100}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={s.tint}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-4 text-xs font-extrabold">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className={`size-3 rounded-sm ${s.tint}`} />
            <span className="text-muted-foreground">{s.label}</span>
            <span>{Math.round((s.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, suffix }: { label: string; value: string; onChange: (v: string) => void; suffix?: string }) {
  return (
    <label className="block">
      <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-1.5">{label}</div>
      <div className="flex items-center bg-muted rounded-2xl px-4 py-3 focus-within:ring-2 ring-primary">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="number"
          className="flex-1 bg-transparent outline-none font-extrabold text-lg"
        />
        {suffix && <span className="text-sm font-bold text-muted-foreground">{suffix}</span>}
      </div>
    </label>
  );
}

function Result({ items }: { items: { label: string; value: string; tint?: string }[] }) {
  return (
    <div className="glass-card rounded-3xl p-6 grid sm:grid-cols-3 gap-4">
      {items.map((it) => (
        <div key={it.label} className="text-center">
          <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">{it.label}</div>
          <div className={`text-2xl md:text-3xl font-black mt-1 ${it.tint ?? "text-primary"}`} style={{ fontFamily: "Fredoka" }}>
            {it.value}
          </div>
        </div>
      ))}
    </div>
  );
}

const fmt = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

function SavingsGoal() {
  const [goal, setGoal] = useState("40000");
  const [perMonth, setPerMonth] = useState("4000");
  const months = +perMonth > 0 ? Math.ceil(+goal / +perMonth) : 0;
  return (
    <div className="space-y-5">
      <div className="glass-card rounded-3xl p-6 grid sm:grid-cols-2 gap-5">
        <Field label="Goal amount" value={goal} onChange={setGoal} suffix="₹" />
        <Field label="Save per month" value={perMonth} onChange={setPerMonth} suffix="₹" />
      </div>
      <Result items={[
        { label: "Months", value: String(months) },
        { label: "Years", value: (months / 12).toFixed(1), tint: "text-secondary" },
        { label: "Total", value: fmt(+goal), tint: "text-coin" },
      ]} />
    </div>
  );
}

function SIP() {
  const [m, setM] = useState("2000");
  const [r, setR] = useState("12");
  const [y, setY] = useState("10");
  const i = +r / 100 / 12;
  const n = +y * 12;
  const fv = +m * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const invested = +m * n;
  return (
    <div className="space-y-5">
      <div className="glass-card rounded-3xl p-6 grid sm:grid-cols-3 gap-5">
        <Field label="Monthly SIP" value={m} onChange={setM} suffix="₹" />
        <Field label="Return %/yr" value={r} onChange={setR} suffix="%" />
        <Field label="Years" value={y} onChange={setY} suffix="yr" />
      </div>
      <Result items={[
        { label: "Invested", value: fmt(invested) },
        { label: "Returns", value: fmt(fv - invested), tint: "text-secondary" },
        { label: "Future Value", value: fmt(fv), tint: "text-coin" },
      ]} />
      <Bar segments={[
        { label: "Invested", value: invested, tint: "bg-primary" },
        { label: "Returns", value: Math.max(0, fv - invested), tint: "bg-secondary" },
      ]} />
    </div>
  );
}

function SimpleInterest() {
  const [p, setP] = useState("10000");
  const [r, setR] = useState("8");
  const [y, setY] = useState("3");
  const si = (+p * +r * +y) / 100;
  return (
    <div className="space-y-5">
      <div className="glass-card rounded-3xl p-6 grid sm:grid-cols-3 gap-5">
        <Field label="Principal" value={p} onChange={setP} suffix="₹" />
        <Field label="Rate" value={r} onChange={setR} suffix="%" />
        <Field label="Years" value={y} onChange={setY} suffix="yr" />
      </div>
      <Result items={[
        { label: "Interest", value: fmt(si) },
        { label: "Total", value: fmt(+p + si), tint: "text-coin" },
      ]} />
    </div>
  );
}

function CompoundInterest() {
  const [p, setP] = useState("10000");
  const [r, setR] = useState("8");
  const [y, setY] = useState("5");
  const a = +p * Math.pow(1 + +r / 100, +y);
  return (
    <div className="space-y-5">
      <div className="glass-card rounded-3xl p-6 grid sm:grid-cols-3 gap-5">
        <Field label="Principal" value={p} onChange={setP} suffix="₹" />
        <Field label="Rate" value={r} onChange={setR} suffix="%" />
        <Field label="Years" value={y} onChange={setY} suffix="yr" />
      </div>
      <Result items={[
        { label: "Interest", value: fmt(a - +p) },
        { label: "Total", value: fmt(a), tint: "text-coin" },
      ]} />
    </div>
  );
}

function EMI() {
  const [p, setP] = useState("500000");
  const [r, setR] = useState("10");
  const [y, setY] = useState("5");
  const i = +r / 100 / 12;
  const n = +y * 12;
  const emi = (+p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  return (
    <div className="space-y-5">
      <div className="glass-card rounded-3xl p-6 grid sm:grid-cols-3 gap-5">
        <Field label="Loan amount" value={p} onChange={setP} suffix="₹" />
        <Field label="Rate" value={r} onChange={setR} suffix="%" />
        <Field label="Years" value={y} onChange={setY} suffix="yr" />
      </div>
      <Result items={[
        { label: "Monthly EMI", value: fmt(emi) },
        { label: "Total Interest", value: fmt(emi * n - +p), tint: "text-secondary" },
        { label: "Total Paid", value: fmt(emi * n), tint: "text-coin" },
      ]} />
      <Bar segments={[
        { label: "Principal", value: +p, tint: "bg-primary" },
        { label: "Interest", value: Math.max(0, emi * n - +p), tint: "bg-streak" },
      ]} />
    </div>
  );
}

function Budget() {
  const [income, setIncome] = useState("30000");
  const needs = +income * 0.5;
  const wants = +income * 0.3;
  const save = +income * 0.2;
  return (
    <div className="space-y-5">
      <div className="glass-card rounded-3xl p-6">
        <Field label="Monthly income" value={income} onChange={setIncome} suffix="₹" />
        <p className="text-xs font-bold text-muted-foreground mt-3">Using the 50/30/20 rule.</p>
      </div>
      <Result items={[
        { label: "Needs (50%)", value: fmt(needs) },
        { label: "Wants (30%)", value: fmt(wants), tint: "text-secondary" },
        { label: "Save (20%)", value: fmt(save), tint: "text-coin" },
      ]} />
      <Bar segments={[
        { label: "Needs", value: needs, tint: "bg-primary" },
        { label: "Wants", value: wants, tint: "bg-secondary" },
        { label: "Save", value: save, tint: "bg-coin" },
      ]} />
    </div>
  );
}