import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils" 

/**
 * StatCard Component
 * ------------------
 * A reusable card component designed to display a single statistic or metric.
 * 
 * Props:
 * - title: string -> The label/title of the stat (e.g., "Users", "Revenue")
 * - value: string | number -> The main value or number to display
 * - icon: ReactNode -> An icon representing the stat
 * - color: string -> Tailwind color class for styling icon and background accents
 * 
 * Features:
 * - Shows a statistic with title, value, and an icon.
 * - Includes background circular highlight with subtle opacity.
 * - Interactive hover effects: shadow, scale, and background expansion.
 * - Supports dark mode.
 */

export function StatCard({ title, value, icon, color }) {
  return (
    <Card 
      className="group relative overflow-hidden border-none bg-white dark:bg-zinc-950 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
    >
      {/* Background Circle */}
      <div className={cn(
        "absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-[0.03] transition-all duration-500 group-hover:scale-150 group-hover:opacity-[0.08]",
        color.replace('text', 'bg') 
      )} />

      {/* Main Content */}
      <div className="flex items-center gap-4 p-4 sm:p-5">
        {/* Icon Section */}
        <div className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
          "bg-zinc-50 dark:bg-zinc-900 group-hover:bg-white dark:group-hover:bg-zinc-800 shadow-inner",
          color 
        )}>
          {/* Hover effect on icon */}
          <div className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        </div>

        {/* Text Content: Title & Value */}
        <div className="flex flex-col min-w-0">
          <span className="truncate text-[10px] font-bold uppercase text-primary tracking-widest">
            {title}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl tracking-tight dark:text-zinc-100 font-medium">
              {value} 
            </span>
          </div>
        </div>
      </div>

      {/* Hover Highlight Bar */}
      <div 
        className="absolute bot w-0 bg-current transition-all duration-500 group-hover:w-full opacity-50" 
        style={{ 
          color: color.includes('text-') ? `var(--${color.split('-')[1]}-500)` : 'currentColor' 
        }}
      >
        <div className={cn("h-full w-full opacity-20", color.replace('text', 'bg'))} />
      </div>
    </Card>
  )
}