import { Button } from "@/components/ui/button"

export function ActionBtn({ icon, onClick, label, className = "" }) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={`h-9 w-9 rounded-xl transition-all duration-200 group relative ${className}`}
      onClick={onClick}
    >
      {icon}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </span>
    </Button>
  )
}