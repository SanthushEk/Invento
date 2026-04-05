"use client"

import { useState } from "react"
import { deleteProduct, toggleProductStatus } from "@/utils/localStorage"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { toast } from "sonner"
import { ProductViewModal } from "@/components/ProductViewModal"
import { Eye, Edit3, Trash2, Database, ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductList({ products, refreshProducts, setEditingProduct }) {
  const [viewingProduct, setViewingProduct] = useState(null)
  const [viewOpen, setViewOpen] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5
  const totalPages = Math.ceil(products.length / rowsPerPage)
  const currentRows = products.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const handleDelete = (id) => {
    try {
      deleteProduct(id)
      refreshProducts()
      toast.success("Asset purged from registry")
    } catch {
      toast.error("Database write error")
    }
  }

  return (
    <div className="w-full space-y-3">
      {/* HEADER */}
      <div className="grid grid-cols-6 px-8 py-3 text-[10px] font-black text-primary uppercase tracking-[0.2em] border-b border-black/5 dark:border-white/5">
        <span className="col-span-1">Asset</span>
        <span>Category</span>
        <span>Condition</span>
        <span>Valuation</span>
        <span>Inventory</span>
        <span className="text-right">Systems</span>
      </div>

      {/* PRODUCT ROWS */}
      <div className="space-y-1.5">
        {products.length === 0 ? (
          <div className="p-20 text-center bg-zinc-50/50 dark:bg-zinc-900/20 rounded-[2rem] border border-dashed border-zinc-200 dark:border-zinc-800">
            <Database className="w-10 h-10 mx-auto mb-4 opacity-20" />
            <p className="font-bold opacity-20 uppercase tracking-widest text-xs">Registry Empty</p>
          </div>
        ) : (
          currentRows.map(product => (
            <div key={product.id} className="group grid grid-cols-6 items-center px-6 py-2 bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-white/5 rounded-2xl hover:shadow-lg hover:shadow-black/5 hover:scale-[1.005] transition-all duration-300">
              
              {/* ASSET */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-100 dark:bg-zinc-800 p-0.5 ring-1 ring-zinc-200 dark:ring-zinc-700 overflow-hidden group-hover:rotate-3 transition-transform">
                  <img src={product.image || "/placeholder.png"} alt="" className="h-full w-full object-cover rounded-lg" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[11px] uppercase tracking-tight truncate">{product.name}</p>
                  <p className="text-[8px] font-mono text-muted-foreground opacity-50">#{product.id?.toString().slice(-4)}</p>
                </div>
              </div>

              {/* CATEGORY */}
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/30" />
                <span className="text-[10px] font-bold uppercase text-yellow-500">{product.category || "General"}</span>
              </div>

              {/* CONDITION */}
              <div>
                <button
                  onClick={() => { toggleProductStatus(product.id); refreshProducts(); }}
                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter border transition-all ${product.active ? "bg-emerald-500/5 text-emerald-600 border-emerald-500/20" : "bg-red-500/5 text-red-600 border-red-500/20"}`}
                >
                  {product.active ? "Nominal" : "Offline"}
                </button>
              </div>

              {/* VALUATION */}
              <div className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">
                ${Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>

              {/* INVENTORY */}
              <div className="text-[11px] font-black italic text-zinc-400 group-hover:text-primary transition-colors">
                {product.stock || 0} <span className="not-italic text-[9px] opacity-50 ml-0.5">PCS</span>
              </div>

              {/* SYSTEMS ACTIONS */}
              <div className="flex justify-end gap-0.5">
                <ActionButton icon={<Eye className="w-3.5 h-3.5" />} onClick={() => { setViewingProduct(product); setViewOpen(true) }} />
                <ActionButton icon={<Edit3 className="w-3.5 h-3.5" />} onClick={() => setEditingProduct(product)} />
                <ActionButton
                  icon={<Trash2 className="w-3.5 h-3.5" />}
                  onClick={() => { setDeleteTarget(product); setDeleteDialogOpen(true) }}
                  className="hover:text-red-500"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-3 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-200/50 dark:border-white/5">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
            Page {currentPage} <span className="mx-1">/</span> {totalPages}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="h-7 w-7 rounded-lg border-zinc-200 dark:border-zinc-800">
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <Button variant="outline" size="icon" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="h-7 w-7 rounded-lg border-zinc-200 dark:border-zinc-800">
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewingProduct && <ProductViewModal open={viewOpen} setOpen={setViewOpen} product={viewingProduct} />}

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="text-primary">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete <strong className="text-primary">{deleteTarget?.name}</strong> from the registry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleDelete(deleteTarget.id)
                setDeleteDialogOpen(false)
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ActionButton({ icon, onClick, className = "" }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={`h-8 w-8 rounded-lg  group-hover:opacity-100 text-primary hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all ${className}`}
    >
      {icon}
    </Button>
  )
}