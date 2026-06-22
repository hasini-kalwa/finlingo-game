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
      { id: "mb-4", title: "Practical Challenge", xp: 25, status: "locked" },
    ],
  },
  {
    id: "budgeting",
    title: "Budgeting",
    emoji: "📊",
    color: "secondary",
    lessons: [
      { id: "bg-1", title: "50/30/20 Rule", xp: 15, status: "locked" },
      { id: "bg-2", title: "Tracking Expenses", xp: 15, status: "locked" },
      { id: "bg-3", title: "Build Your Budget", xp: 25, status: "locked" },
    ],
  },
  {
    id: "saving",
    title: "Saving Goals",
    emoji: "🐷",
    color: "accent",
    lessons: [
      { id: "sv-1", title: "Why Save?", xp: 10, status: "locked" },
      { id: "sv-2", title: "SMART Goals", xp: 15, status: "locked" },
      { id: "sv-3", title: "Savings Challenge", xp: 25, status: "locked" },
    ],
  },
  {
    id: "banking",
    title: "Banking Fundamentals",
    emoji: "🏦",
    color: "purple",
    lessons: [
      { id: "bk-1", title: "Types of Accounts", xp: 15, status: "locked" },
      { id: "bk-2", title: "Debit vs Credit", xp: 15, status: "locked" },
    ],
  },
  {
    id: "emergency",
    title: "Emergency Funds",
    emoji: "🚨",
    color: "streak",
    lessons: [
      { id: "ef-1", title: "Why It Matters", xp: 15, status: "locked" },
      { id: "ef-2", title: "How Much to Save", xp: 20, status: "locked" },
    ],
  },
  {
    id: "investing",
    title: "Investing Basics",
    emoji: "📈",
    color: "secondary",
    lessons: [
      { id: "iv-1", title: "Risk vs Reward", xp: 20, status: "locked" },
      { id: "iv-2", title: "Compounding Magic", xp: 25, status: "locked" },
    ],
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds & SIP",
    emoji: "💹",
    color: "primary",
    lessons: [
      { id: "mf-1", title: "What is SIP?", xp: 20, status: "locked" },
      { id: "mf-2", title: "SIP Calculator Challenge", xp: 30, status: "locked" },
    ],
  },
  {
    id: "credit",
    title: "Credit Cards & Loans",
    emoji: "💳",
    color: "purple",
    lessons: [
      { id: "cr-1", title: "Credit Score 101", xp: 20, status: "locked" },
      { id: "cr-2", title: "EMI Explained", xp: 25, status: "locked" },
    ],
  },
  {
    id: "taxes",
    title: "Taxes",
    emoji: "🧾",
    color: "accent",
    lessons: [
      { id: "tx-1", title: "Why We Pay Tax", xp: 15, status: "locked" },
      { id: "tx-2", title: "Tax Slabs", xp: 20, status: "locked" },
    ],
  },
  {
    id: "insurance",
    title: "Insurance",
    emoji: "🛡️",
    color: "secondary",
    lessons: [
      { id: "in-1", title: "Why Insure?", xp: 15, status: "locked" },
      { id: "in-2", title: "Premiums & Claims", xp: 20, status: "locked" },
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
  title: "Needs vs Wants",
  questions: [
    {
      prompt:
        "You receive ₹5000 pocket money every month. You spend ₹3000. How much can you save?",
      type: "choice",
      options: ["₹1000", "₹1500", "₹2000", "₹2500"],
      answer: "₹2000",
      explanation: "Savings = Income − Expense = 5000 − 3000 = ₹2000",
    },
    {
      prompt: "Which of the following is a NEED?",
      type: "choice",
      options: ["Food", "Gaming Subscription", "Movie Ticket", "Online Shopping"],
      answer: "Food",
      explanation: "Food is essential for survival — that makes it a need.",
    },
    {
      prompt:
        "You want to buy a laptop worth ₹40,000 and can save ₹4,000 per month. How many months will it take?",
      type: "input",
      answer: "10",
      explanation: "40,000 ÷ 4,000 = 10 months",
    },
    {
      prompt:
        "Save ₹500 every week. How many weeks to reach ₹5,000?",
      type: "input",
      answer: "10",
      explanation: "5,000 ÷ 500 = 10 weeks",
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