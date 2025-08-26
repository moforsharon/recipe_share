"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form 
      // onSubmit={handleSearch} 
      className="flex w-full max-w-2xl mx-auto">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 rounded-r-none"
        />
      </div>
      <Button type="submit" className="rounded-l-none">
        Search
      </Button>
    </form>
  )
}

