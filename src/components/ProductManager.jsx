"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { toast } from "sonner"

// Utils
import { getProducts } from "@/utils/localStorage"

// Components
import { StatCard } from "@/components/StatCard"
import { ProductForm } from "@/components/ProductForm"
import { ProductViewModal } from "@/components/ProductViewModal"
import { ThemeToggle } from "@/components/theme-toggle"
import ProductList from "@/components/ProductList"

// Icons
import { Plus, Box, TrendingUp, DollarSign, AlertCircle, Search, SlidersHorizontal, Cpu } from "lucide-react"

// UI Components
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function ProductManager() {
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)
  const [viewingProduct, setViewingProduct] = useState(null)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [formOpen, setFormOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)

  const refresh = () => setProducts(getProducts())

  useEffect(() => { refresh() }, [])

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))],
    [products]
  )

  const filteredProducts = useMemo(
    () => products.filter(p => {
      const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase()) ||
                            p.description?.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = categoryFilter === "all" || p.category === categoryFilter
      return matchesSearch && matchesCategory
    }),
    [products, search, categoryFilter]
  )

  const totalValue = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0)

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-foreground font-sans antialiased selection:bg-primary/10 flex flex-col">
      
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 w-full border-b border-black/5 dark:border-white/5 bg-white/70 dark:bg-black/70 backdrop-blur-xl">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Image src="/Logos/bgremoveLogo.png" alt="Logo" width={20} height={20} className="brightness-0 invert" priority />
            </div>
            <span className="text-sm font-black"> <span className="text-primary">i</span>NVENTO</span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <main className="grow mx-auto w-full  p-4 sm:p-6 lg:p-8 space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter sm:text-4xl">Home <span className="text-muted-foreground/50 text-3xl font-light">/</span> Inventory</h2>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest opacity-70">Welcome To <span className="text-primary">invento</span></p>
          </div>

          <Button 
            size="lg" 
            className="rounded-2xl px-8 h-14 bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all font-bold uppercase tracking-widest text-xs gap-3" 
            onClick={() => { setEditing(null); setFormOpen(true); }}
          >
            <Plus className="w-5 h-5" />Add Product
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Global SKUs" value={products.length} icon={<Box className="w-4 h-4" />} color="text-zinc-500" />
          <StatCard title="Active Flux" value={products.filter(p=>p.active).length} icon={<TrendingUp className="w-4 h-4" />} color="text-emerald-500" />
          <StatCard title="Total Valuation" value={`$${totalValue.toLocaleString()}`} icon={<DollarSign className="w-4 h-4" />} color="text-blue-500" />
          <StatCard title="Core Status" value="Nominal" icon={<Cpu className="w-4 h-4" />} color="text-orange-500" />
        </div>

        {/* Filter & Search Section */}
        <div className="relative group">
          <div className="absolute -inset-1  from-primary/5 via-transparent to-primary/5 rounded-[2rem] blur-xl opacity-50" />
          <div className="relative flex flex-col lg:flex-row items-center gap-3 p-2 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-black/5 dark:border-white/5 rounded-[1.5rem] shadow-sm">
            
            {/* Search Input */}
            <div className="relative w-full group/search">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/search:text-primary transition-colors" />
              <Input 
                placeholder="Query asset registry..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="h-12 pl-12 bg-transparent border-none focus-visible:ring-0 text-base font-medium placeholder:text-muted-foreground/40"
              />
            </div>

            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden lg:block" />

            {/* Category Filter */}
            <div className="flex items-center gap-2 w-full lg:w-auto pr-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground ml-3 hidden lg:block" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-10 w-full lg:w-sm bg-zinc-100 dark:bg-zinc-800/50 border-none rounded-xl font-bold text-[10px] uppercase tracking-widest">
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-black/5 dark:border-white/10">
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="text-[10px] uppercase font-bold tracking-widest py-3">
                      {cat === "all" ? "All Sectors" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="mt-4">
          <ProductList 
            products={filteredProducts} 
            refreshProducts={refresh} 
            setEditingProduct={(p) => { setEditing(p); setFormOpen(true); }} 
          />
        </div>

        <ProductForm open={formOpen} setOpen={setFormOpen} editing={editing} setEditing={setEditing} refresh={refresh} />
        <ProductViewModal open={viewOpen} setOpen={setViewOpen} product={viewingProduct} />
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-8 w-full text-center px-6">
        <div className="h-2 w-24  from-transparent via-white/20 to-transparent mx-auto mb-4" />
        <p className="text-[10px] md:text-xs   text-slate-400 font-medium">
          Developed by <span className="text-white">SanthushEk</span> 
          <span className="mx-2 text-[#5ce1e6]">•</span> 2026 All Rights Reserved
        </p>
      </footer>
    </div>
  )
}