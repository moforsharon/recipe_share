import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { UtensilsCrossed } from "lucide-react"
import { NavLink } from "@/components/NavLink";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "RecipeShare - Discover and Share Delicious Recipes",
    template: "%s | RecipeShare",
  },
  description: "Find and share your favorite recipes with a community of food lovers",
  keywords: ["recipes", "cooking", "food", "meal planning", "culinary"],
  authors: [{ name: "RecipeShare Team" }],
  creator: "RecipeShare",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://recipeshare.vercel.app",
    siteName: "RecipeShare",
    title: "RecipeShare - Discover and Share Delicious Recipes",
    description: "Find and share your favorite recipes with a community of food lovers",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RecipeShare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecipeShare - Discover and Share Delicious Recipes",
    description: "Find and share your favorite recipes with a community of food lovers",
    images: ["/og-image.jpg"],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className={`flex min-h-screen flex-col ${inter.className}`}>
            <header className="border-b">
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <UtensilsCrossed className="h-6 w-6" />
                  <span className="font-bold text-xl">RecipeShare</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/categories">Categories</NavLink>
                  <NavLink href="/about">About</NavLink>
                </nav>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="border-t py-8">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <Link href="/" className="flex items-center gap-2 mb-4">
                      <UtensilsCrossed className="h-6 w-6" />
                      <span className="font-bold text-xl">RecipeShare</span>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Discover and share delicious recipes with a community of food lovers.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Explore</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/" className="text-sm hover:underline">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link href="/categories" className="text-sm hover:underline">
                          Categories
                        </Link>
                      </li>
                      <li>
                        <Link href="/popular" className="text-sm hover:underline">
                          Popular
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/about" className="text-sm hover:underline">
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="text-sm hover:underline">
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link href="/careers" className="text-sm hover:underline">
                          Careers
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/terms" className="text-sm hover:underline">
                          Terms of Service
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy" className="text-sm hover:underline">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/cookies" className="text-sm hover:underline">
                          Cookie Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                  &copy; 2025 RecipeShare. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'