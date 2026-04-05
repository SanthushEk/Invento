"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Loader from "@/components/Loader";

export default function WelcomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loader state

  const handleStart = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      router.push("/home"); // Redirect after loader appears
    }, 500); // Optional: small delay to show loader animation
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Show loader overlay if loading
  if (loading) return <Loader />;

  return (
    <div 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans bg-slate-950"
      style={{
        backgroundImage: "url('/Logos/wallpaper.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/90 z-0" />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl w-full text-center flex-1 flex flex-col justify-center text-slate-50 px-6"
      >
        {/* Brand Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-10">
          <motion.div
            whileHover={{ rotate: -5, scale: 1.1 }}
            className="p-1.5 from-white/20 to-white/5 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl"
          >
            <Image
              src="/Logos/bgremoveLogo.png" 
              alt="Invento Logo"
              width={50}
              height={50}
              className="rounded-lg object-contain"
              priority
            />
          </motion.div>
          <span className="text-3xl font-bold text-white">
            <span className="text-primary">i</span>NVENTO
          </span>
        </motion.div>

        {/* Hero Text */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-6xl font-bold tracking-tight mb-6 text-white"
        >
          Smart Inventory <br /> 
          <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,#5ce1e6,#3b82f6,#5ce1e6)] animate-gradient-x">
            Perfectly Synced..
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Experience the sleekest way to track products. No database overhead—just 
          fast, secure, local management for the modern curator.
        </motion.p>

        {/* Feature Tags */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
            <Zap size={14} className="text-[#5ce1e6]" /> Ultra-Fast
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
            <ShieldCheck size={14} className="text-[#5ce1e6]" /> Private Data
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(92, 225, 230, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-black bg-[#5ce1e6] rounded-full overflow-hidden transition-all duration-300"
        >
          <span className="relative z-10 flex items-center">
            Open Dashboard
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
          <div className="absolute inset-0 from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine transition-none" />
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 pb-8 w-full text-center px-6"
      >
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">
          Developed by <span className="text-white">SanthushEk</span> 
          <span className="mx-2 text-[#5ce1e6]">•</span> 2026 All Rights Reserved
        </p>
      </motion.footer>
    </div>
  );
}