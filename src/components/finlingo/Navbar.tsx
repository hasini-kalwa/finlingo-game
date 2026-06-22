import { Link, useRouterState } from "@tanstack/react-router";
import { Flame, Coins, Sparkles, Home, Map, Calculator, Trophy } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/dashboard", label: "Dashboard", icon: Sparkles },
  { to: "/learn", label: "Learn", icon: Map },
  { to: "/calculator", label: "Tools", icon: Calculator },
  { to: "/leaderboard", label: "Leaders", icon: Trophy },
] as const;

export function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="size-9 rounded-2xl bg-gradient-hero grid place-items-center text-xl shadow-pop">
            🦉
          </div>
          <span className="font-extrabold text-xl tracking-tight" style={{ fontFamily: "Fredoka, Nunito" }}>
            Fin<span className="text-primary">Lingo</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? path === "/" : path.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
                  active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Stat icon={<Flame className="size-4" />} value="7" tint="streak" />
          <Stat icon={<Coins className="size-4" />} value="1200" tint="coin" />
          <Stat icon={<Sparkles className="size-4" />} value="450" tint="xp" />
        </div>
      </div>
      <nav className="md:hidden flex items-center justify-around border-t border-border/60 py-1.5">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-bold ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

function Stat({ icon, value, tint }: { icon: React.ReactNode; value: string; tint: "streak" | "coin" | "xp" }) {
  const map = {
    streak: "text-streak bg-streak/10",
    coin: "text-coin bg-coin/15",
    xp: "text-xp bg-xp/10",
  } as const;
  return (
    <div className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full font-extrabold text-sm ${map[tint]}`}>
      {icon}
      {value}
    </div>
  );
}