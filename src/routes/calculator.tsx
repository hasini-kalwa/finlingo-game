import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PiggyBank, TrendingUp, Percent, Calculator as CalcIcon, Wallet, Building } from "lucide-react";

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
      </motion.div>
    </main>
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
    </div>
  );
}