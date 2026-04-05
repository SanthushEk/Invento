"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload, Package, AlertCircle, X, BadgeDollarSign, Tag } from "lucide-react"
import { addProduct, updateProduct } from "@/utils/localStorage"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// ProductForm: modal form to add or edit a product/asset
export function ProductForm({ open, setOpen, editing, setEditing, refresh }) {
  // State to store form inputs
  const [form, setForm] = useState({ 
    name: "", 
    price: "", 
    category: "", 
    description: "", 
    image: "",
    stock: "" 
  })

  // If editing, load product data into form; else reset form
  useEffect(() => {
    if(editing) setForm(editing)
    else setForm({ name: "", price: "", category: "", description: "", image: "", stock: "" })
  }, [editing])

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target
    if ((name === "price" || name === "stock") && value < 0) return // prevent negative numbers
    setForm({ ...form, [name]: value })
  }

  // Handle image upload and convert to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if(!file) return
    const reader = new FileReader()
    reader.onloadend = () => setForm({ ...form, image: reader.result })
    reader.readAsDataURL(file)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.stock === "" || isNaN(form.stock)) {
      toast.error("Please specify inventory levels")
      return
    }

    if(editing) {
      updateProduct({ ...form, id: editing.id, active: editing.active }) // update existing product
      toast.success("Asset refined")
      setEditing(null)
    } else {
      addProduct({ ...form, active: true }) // add new product
      toast.success("Asset committed")
    }
    
    setForm({ name: "" , price: "", category: "", description: "", image: "", stock: "" }) // reset form
    setOpen(false) // close modal
    refresh() // refresh product list
  }

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if(!val) setEditing(null) }}>
      <DialogContent className="w-[95vw] sm:max-w-3xl lg:max-w-4xl max-h-[95vh] overflow-y-auto border-none rounded-2xl shadow-2xl bg-white dark:bg-zinc-950 p-0 overflow-hidden">
        
        <div className="flex flex-col">
          {/* Header Section */}
          <div className="p-6 border-b bg-zinc-50/50 dark:bg-zinc-900/30">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                {editing ? "Refine Asset Parameters" : "Initialize New Asset"}
              </DialogTitle>
              <DialogDescription className="text-[11px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider">
                System Registry Update Products
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Name, Category, Price, Stock */}
              <div className="space-y-4">
                {/* Asset Name */}
                <div className="group space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                    <Tag className="w-3 h-3" /> Asset Name
                  </label>
                  <Input 
                    name="name" 
                    placeholder="Identify asset..."
                    value={form.name} 
                    onChange={handleChange} 
                    className="h-10 bg-zinc-100/50 dark:bg-zinc-900/50 border-none rounded-lg text-sm font-medium" 
                    required 
                  />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Category</label>
                    <Input 
                      name="category" 
                      placeholder="Sector"
                      value={form.category} 
                      onChange={handleChange} 
                      className="h-10 bg-zinc-100/50 dark:bg-zinc-900/50 border-none rounded-lg text-sm font-medium" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                      <BadgeDollarSign className="w-3 h-3" /> Valuation
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground/50 text-xs">$</span>
                      <Input 
                        type="number" 
                        name="price" 
                        step="0.01"
                        placeholder="0.00"
                        value={form.price} 
                        onChange={handleChange} 
                        className="h-10 pl-7 bg-zinc-100/50 dark:bg-zinc-900/50 border-none rounded-lg text-sm font-bold font-mono" 
                        required 
                      />
                    </div>
                  </div>
                </div>

                {/* Stock input with low stock alert */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                    <Package className="w-3 h-3" /> Initial Stock Units
                  </label>
                  <Input 
                    type="number" 
                    name="stock" 
                    placeholder="Units in stock"
                    value={form.stock} 
                    onChange={handleChange} 
                    className={cn(
                      "h-10 bg-zinc-100/50 dark:bg-zinc-900/50 border-none rounded-lg text-sm font-bold transition-colors",
                      form.stock !== "" && form.stock < 5 && "text-orange-500 bg-orange-50/50 dark:bg-orange-950/20"
                    )}
                    required 
                  />
                  {form.stock !== "" && form.stock < 5 && (
                    <p className="text-[10px] text-orange-500 font-bold uppercase flex items-center gap-1.5 mt-1 animate-pulse tracking-tight">
                      <AlertCircle className="w-3 h-3" /> Alert: Stock Low
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Description & Image Upload */}
              <div className="space-y-4">
                {/* Asset Description */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">Asset Specifications</label>
                  <Textarea 
                    name="description" 
                    placeholder="Detailed specifications..."
                    value={form.description} 
                    onChange={handleChange} 
                    rows={3} 
                    className="bg-zinc-100/50 dark:bg-zinc-900/50 border-none rounded-lg text-xs font-medium italic p-4 focus:ring-1 focus:ring-primary/20 transition-all resize-none" 
                  />
                </div>

                {/* Image Upload */}
                <div className="relative group overflow-hidden">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                  <div className={cn(
                      "relative z-10 border-2 border-dashed rounded-xl p-6 transition-all duration-300 flex flex-col items-center justify-center text-center",
                      form.image ? "border-primary/40 bg-primary/5" : "border-zinc-200 dark:border-zinc-800 hover:border-primary/50"
                  )}>
                      {!form.image ? (
                          <>
                              <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full mb-2 group-hover:scale-110 transition-transform">
                                  <Upload className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Upload Visual</p>
                          </>
                      ) : (
                          <div className="flex items-center gap-3 w-full">
                              <img src={form.image} className="w-12 h-12 object-cover rounded-lg shadow-md border dark:border-zinc-800" />
                              <div className="flex-1 text-left">
                                  <p className="text-[10px] font-black uppercase text-primary tracking-tighter leading-none">Visual Captured</p>
                                  <p className="text-[10px] text-muted-foreground leading-tight">Click to replace image</p>
                              </div>
                              <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="icon" 
                                  className="z-30 rounded-full hover:bg-red-500/10 hover:text-red-500 w-8 h-8"
                                  onClick={(e) => { e.stopPropagation(); setForm({...form, image: ""}) }}
                              >
                                  <X className="w-4 h-4" />
                              </Button>
                          </div>
                      )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1 h-12 text-xs font-bold uppercase tracking-widest rounded-xl" onClick={() => setOpen(false)}>
                Discard
              </Button>
              <Button type="submit" className="h-12 text-sm font-black uppercase italic tracking-tighter shadow-lg shadow-primary/20 rounded-xl transition-all active:scale-95 bg-primary hover:brightness-110">
                {editing ? "Finalize Updates" : "Commit to Registry"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}