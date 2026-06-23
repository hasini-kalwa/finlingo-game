export type LessonStatus = "completed" | "current" | "locked";

export interface Lesson {
  id: string;
  title: string;
  xp: number;
  status: LessonStatus;
}

export interface Module {
  id: string;
  title: string;
  emoji: string;
  color: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: "money-basics",
    title: "Money Basics",
    emoji: "💵",
    color: "primary",
    lessons: [
      { id: "mb-1", title: "What is Money?", xp: 10, status: "completed" },
      { id: "mb-2", title: "Income vs Expense", xp: 10, status: "completed" },
      { id: "mb-3", title: "Needs vs Wants", xp: 15, status: "current" },
      { id: "mb-4", title: "Practical Challenge", xp: 25, status: "current" },
    ],
  },
  {
    id: "budgeting",
    title: "Budgeting",
    emoji: "📊",
    color: "secondary",
    lessons: [
      { id: "bg-1", title: "50/30/20 Rule", xp: 15, status: "current" },
      { id: "bg-2", title: "Tracking Expenses", xp: 15, status: "current" },
      { id: "bg-3", title: "Build Your Budget", xp: 25, status: "current" },
    ],
  },
  {
    id: "saving",
    title: "Saving Goals",
    emoji: "🐷",
    color: "accent",
    lessons: [
      { id: "sv-1", title: "Why Save?", xp: 10, status: "current" },
      { id: "sv-2", title: "SMART Goals", xp: 15, status: "current" },
      { id: "sv-3", title: "Savings Challenge", xp: 25, status: "current" },
    ],
  },
  {
    id: "banking",
    title: "Banking Fundamentals",
    emoji: "🏦",
    color: "purple",
    lessons: [
      { id: "bk-1", title: "Types of Accounts", xp: 15, status: "current" },
      { id: "bk-2", title: "Debit vs Credit", xp: 15, status: "current" },
    ],
  },
  {
    id: "emergency",
    title: "Emergency Funds",
    emoji: "🚨",
    color: "streak",
    lessons: [
      { id: "ef-1", title: "Why It Matters", xp: 15, status: "current" },
      { id: "ef-2", title: "How Much to Save", xp: 20, status: "current" },
    ],
  },
  {
    id: "investing",
    title: "Investing Basics",
    emoji: "📈",
    color: "secondary",
    lessons: [
      { id: "iv-1", title: "Risk vs Reward", xp: 20, status: "current" },
      { id: "iv-2", title: "Compounding Magic", xp: 25, status: "current" },
    ],
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds & SIP",
    emoji: "💹",
    color: "primary",
    lessons: [
      { id: "mf-1", title: "What is SIP?", xp: 20, status: "current" },
      { id: "mf-2", title: "SIP Calculator Challenge", xp: 30, status: "current" },
    ],
  },
  {
    id: "credit",
    title: "Credit Cards & Loans",
    emoji: "💳",
    color: "purple",
    lessons: [
      { id: "cr-1", title: "Credit Score 101", xp: 20, status: "current" },
      { id: "cr-2", title: "EMI Explained", xp: 25, status: "current" },
    ],
  },
  {
    id: "taxes",
    title: "Taxes",
    emoji: "🧾",
    color: "accent",
    lessons: [
      { id: "tx-1", title: "Why We Pay Tax", xp: 15, status: "current" },
      { id: "tx-2", title: "Tax Slabs", xp: 20, status: "current" },
    ],
  },
  {
    id: "insurance",
    title: "Insurance",
    emoji: "🛡️",
    color: "secondary",
    lessons: [
      { id: "in-1", title: "Why Insure?", xp: 15, status: "current" },
      { id: "in-2", title: "Premiums & Claims", xp: 20, status: "current" },
    ],
  },
];

export interface Question {
  prompt: string;
  type: "choice" | "input";
  options?: string[];
  answer: string;
  explanation?: string;
}

export const sampleLesson: { title: string; questions: Question[] } = {
  title: "Money Mastery Challenge",
  questions: [
    {
      prompt:
        "Inflation is 6% per year. Your savings account pays 4% interest. What's your REAL return after 1 year?",
      type: "choice",
      options: ["+4%", "+2%", "−2%", "−6%"],
      answer: "−2%",
      explanation:
        "Real return ≈ Nominal − Inflation = 4% − 6% = −2%. You're losing purchasing power even though the balance grew.",
    },
    {
      prompt:
        "You invest ₹10,000 at 12% compounded annually. Using the Rule of 72, how many years to roughly DOUBLE?",
      type: "input",
      answer: "6",
      explanation: "Rule of 72: 72 ÷ 12 = 6 years. A quick mental shortcut for compounding.",
    },
    {
      prompt:
        "Credit card outstanding: ₹20,000. APR: 36%. You only pay the 5% minimum due. What mainly happens?",
      type: "choice",
      options: [
        "Debt clears in ~2 years",
        "Interest stops accruing on the rest",
        "Interest keeps stacking — debt can balloon",
        "Your credit score improves fast",
      ],
      answer: "Interest keeps stacking — debt can balloon",
      explanation:
        "Minimum due barely covers interest. 36% APR means ~3% per month compounds on the unpaid balance.",
    },
    {
      prompt:
        "Following the 50/30/20 rule on a ₹40,000 monthly income, how much should go to SAVINGS & investing?",
      type: "input",
      answer: "8000",
      explanation: "20% of ₹40,000 = ₹8,000. Needs 50% (₹20k), Wants 30% (₹12k), Save/Invest 20% (₹8k).",
    },
    {
      prompt:
        "An emergency fund should typically cover how many months of essential expenses?",
      type: "choice",
      options: ["1 month", "2 months", "3–6 months", "12+ months"],
      answer: "3–6 months",
      explanation:
        "Standard guidance: 3–6 months of essentials in a liquid, low-risk account (savings / liquid fund).",
    },
    {
      prompt:
        "Equity mutual fund SIP of ₹5,000/month for 10 years at 12% avg return ≈ ₹11.6 lakh. Total amount YOU invested?",
      type: "input",
      answer: "600000",
      explanation:
        "₹5,000 × 12 months × 10 years = ₹6,00,000 invested. The remaining ~₹5.6 lakh is compounding gains.",
    },
    {
      prompt:
        "Under India's new tax regime (FY 2024-25), income up to which amount has effectively ZERO tax (after rebate)?",
      type: "choice",
      options: ["₹2.5 lakh", "₹5 lakh", "₹7 lakh", "₹10 lakh"],
      answer: "₹7 lakh",
      explanation:
        "Section 87A rebate makes tax effectively zero up to ₹7 lakh taxable income under the new regime.",
    },
    {
      prompt:
        "Which usually has the BIGGEST positive impact on your credit score?",
      type: "choice",
      options: [
        "Closing old credit cards",
        "Paying every EMI & bill on time",
        "Using 90%+ of your credit limit",
        "Applying for many loans at once",
      ],
      answer: "Paying every EMI & bill on time",
      explanation:
        "Payment history is ~35% of your score — the single largest factor. Keep utilisation under 30% too.",
    },
  ],
};

export const leaderboard = [
  { rank: 1, name: "Aarav S.", xp: 4820, streak: 42, badge: "Finance Ninja", avatar: "🥷" },
  { rank: 2, name: "Priya M.", xp: 4310, streak: 31, badge: "Investment Explorer", avatar: "🦊" },
  { rank: 3, name: "Rohan K.", xp: 3990, streak: 28, badge: "Money Manager", avatar: "🐯" },
  { rank: 4, name: "Sara J.", xp: 3540, streak: 19, badge: "Smart Saver", avatar: "🐼" },
  { rank: 5, name: "You", xp: 450, streak: 7, badge: "Budget Beginner", avatar: "🚀" },
  { rank: 6, name: "Vikram T.", xp: 410, streak: 5, badge: "Budget Beginner", avatar: "🦁" },
  { rank: 7, name: "Anya R.", xp: 380, streak: 4, badge: "Budget Beginner", avatar: "🐱" },
];

export const weeklyXp = [
  { day: "Mon", xp: 40 },
  { day: "Tue", xp: 80 },
  { day: "Wed", xp: 65 },
  { day: "Thu", xp: 110 },
  { day: "Fri", xp: 50 },
  { day: "Sat", xp: 90 },
  { day: "Sun", xp: 25 },
];

export const dailyQuests = [
  { id: "q1", title: "Complete 1 lesson", reward: 20, progress: 1, target: 1, emoji: "📚" },
  { id: "q2", title: "Earn 50 XP", reward: 30, progress: 35, target: 50, emoji: "✨" },
  { id: "q3", title: "Try a calculator", reward: 25, progress: 0, target: 1, emoji: "🧮" },
];

export const goals = [
  { id: "g1", title: "New Laptop", target: 40000, saved: 12000, emoji: "💻" },
  { id: "g2", title: "Bike Trip", target: 15000, saved: 9500, emoji: "🏍️" },
];

export const allBadges = [
  { e: "🥉", n: "First Lesson", d: "Finish your first lesson", earned: true },
  { e: "🔥", n: "3-day Streak", d: "Practice 3 days in a row", earned: true },
  { e: "💰", n: "100 Coins", d: "Collect 100 coins", earned: true },
  { e: "🧠", n: "Quick Thinker", d: "Answer 5 in a row", earned: true },
  { e: "🌱", n: "Budget Beginner", d: "Earn 100 XP", earned: true },
  { e: "💸", n: "Smart Saver", d: "Reach 500 XP", earned: false },
  { e: "📈", n: "Investment Explorer", d: "Hit 2,000 XP", earned: false },
  { e: "🥷", n: "Finance Ninja", d: "Hit 5,000 XP", earned: false },
  { e: "🦉", n: "Wise Owl", d: "30-day streak", earned: false },
];

export const calculatorTips: Record<string, string[]> = {
  savings: [
    "Pay yourself first — auto-transfer on payday.",
    "Round up purchases and save the change.",
    "Cut 1 subscription you forgot you had.",
  ],
  sip: [
    "Even ₹500/month compounds into lakhs over 20+ years.",
    "Stay invested through dips — don't time the market.",
    "Step up your SIP yearly with income.",
  ],
  simple: ["Used by short-term loans and FDs (sometimes).", "Interest doesn't compound here."],
  compound: [
    "Albert Einstein called this the 8th wonder of the world.",
    "Time matters more than amount — start early!",
  ],
  emi: [
    "A higher tenure = lower EMI but more interest paid.",
    "Never let EMIs cross 40% of your monthly income.",
  ],
  budget: [
    "50% Needs · 30% Wants · 20% Save & invest.",
    "Track weekly — small leaks sink big budgets.",
  ],
};