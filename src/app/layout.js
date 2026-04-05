// app/layout.js or RootLayout.js
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

export const metadata = {
  title: "invento",
  description: "Product Management Dashboard",
  icons: {
    icon: "/Logos/bgremoveLogo.png",      
    shortcut: "/Logos/bgremoveLogo.png",  
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}