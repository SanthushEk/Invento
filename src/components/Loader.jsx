// src/components/Loader.jsx
"use client"

import Image from "next/image"

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center  overflow-hidden">

      {/* CONTENT CONTAINER */}
      <div className="relative flex flex-col items-center">
        {/* LOGO BOX */}
        <div className="relative h-24 w-24 mb-8">
          {/* Outer Rotating Ring */}
          <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-primary/30 animate-[spin_8s_linear_infinite]" />
          
          {/* Inner Logo Shield */}
          <div className="absolute inset-2 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/10">
            {/* INNER LOGO IMAGE TAG */}
            <Image 
              src="/Logos/bgremoveLogo.png" 
              alt="Invento" 
              width={40} 
              height={40} 
              className="animate-pulse"
            />
            
            {/* THE "SCANNER" LINE EFFECT */}
            <div className="absolute inset-x-0  bg-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.5)] animate-[scan_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* LOADING TEXT */}
        <div className="space-y-2 text-center">
          <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary animate-pulse">
            System Initializing
          </h3>
          <div className="flex gap-1 justify-center">
            <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700 animate-bounce [animation-delay:-0.15s]" />
            <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700 animate-bounce" />
          </div>
        </div>

        {/* TERMINAL DECO */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 opacity-20 hidden md:block">
           <p className="text-[8px] font-mono uppercase tracking-widest text-center leading-relaxed">
             Welcome <br />
             Redirect to Dashboard<br />
           </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          50% { top: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  )
}