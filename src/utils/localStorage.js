const STORAGE_KEY = "products"

const parseJSON = (data) => {
  try {
    return JSON.parse(data)
  } catch {
    return []
  }
}

// GET ALL PRODUCTS
export const getProducts = () => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? parseJSON(data) : []
}

// SAVE PRODUCTS
export const saveProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

// ADD NEW PRODUCT
export const addProduct = (product) => {
  const products = getProducts()

  const newProduct = {
    id: Date.now(),
    name: product.name || "",
    price: Number(product.price || 0),
    description: product.description || "",
    category: product.category || "General",
    image: product.image || "",
    stock: Number(product.stock || 0),  // ✅ Add stock
    active: true
  }

  saveProducts([...products, newProduct])
}

// UPDATE EXISTING PRODUCT
export const updateProduct = (updatedProduct) => {
  const products = getProducts().map((p) =>
    p.id === updatedProduct.id
      ? {
          ...p,
          name: updatedProduct.name || p.name,
          price: Number(updatedProduct.price ?? p.price),
          description: updatedProduct.description || p.description,
          category: updatedProduct.category || p.category,
          image: updatedProduct.image || p.image,
          stock: Number(updatedProduct.stock ?? p.stock), // ✅ Update stock
          active: updatedProduct.active ?? p.active
        }
      : p
  )
  saveProducts(products)
}

// DELETE PRODUCT
export const deleteProduct = (id) => {
  const products = getProducts().filter((p) => p.id !== id)
  saveProducts(products)
}

// TOGGLE ACTIVE STATUS
export const toggleProductStatus = (id) => {
  const products = getProducts().map((p) =>
    p.id === id ? { ...p, active: !p.active } : p
  )
  saveProducts(products)
}