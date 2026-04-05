"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Package, Tag, Info } from "lucide-react"

export function ProductViewModal({ open, setOpen, product }) {
  if (!product) return null

  // Logic for stock status color
  const stockCount = Number(product.stock) || 0
  const isLowStock = stockCount > 0 && stockCount < 10
  const isOutOfStock = stockCount === 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-none shadow-2xl">
        {/* Visual Accent Header */}
        <div className="h-2  from-emerald-500 via-teal-500 to-blue-500" />
        
        <div className="p-6">
          <DialogHeader className="mb-6">
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Info className="w-5 h-5 text-zinc-400" />
                Item Specifications
              </DialogTitle>
              <Badge 
                variant={isOutOfStock ? "destructive" : "secondary"}
                className={`${!isOutOfStock && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'} border-none px-3 py-1`}
              >
                {isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : "In Stock"}
              </Badge>
            </div>
          </DialogHeader>

          <div className="grid gap-8">
            {/* Image Section */}
            <div className="relative group">
              <div className="aspect-square w-full rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-6 transition-all group-hover:shadow-md">
                <img 
                  src={product.image || "/placeholder.png"} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" 
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {product.category || "General Inventory"}
                  </p>
                  <h4 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {product.name}
                  </h4>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-500 font-medium mb-1">Unit Price</p>
                  <div className="text-3xl font-bold text-zinc-900 dark:text-emerald-500">
                    ${Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs font-medium text-zinc-500 uppercase mb-1 flex items-center gap-1">
                    <Package className="w-3 h-3" /> Current Stock
                  </p>
                  <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {stockCount} <span className="text-sm font-normal text-zinc-500 ml-1">units</span>
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <p className="text-xs font-medium text-zinc-500 uppercase mb-1">Status</p>
                  <p className={`text-xl font-bold ${isOutOfStock ? 'text-red-500' : 'text-emerald-500'}`}>
                    {isOutOfStock ? 'Inactive' : 'Available'}
                  </p>
                </div>
              </div>

              {/* Description Section */}
              <div className="relative">
                <div className="absolute -left-3 top-0 bottom-0 w-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-4">
                  {product.description || "No formal description provided for this catalog item."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}