"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { AsideSearch } from "./aside/Aside-Search"
import { AsideTrends } from "./aside/Aside-Trends"
import { AsideSuggestions } from "./aside/Aside-Suggestions"

export function Aside() {
  const isMobile = useIsMobile()

  // En móvil no mostramos el aside
  if (isMobile) return null

  return (
    <aside className="sticky top-0 ml-6 hidden h-screen w-[350px] flex-col gap-4 py-2 lg:flex">
      <AsideSearch />

      <AsideTrends />

      <AsideSuggestions />

      <div className="p-3 text-xs text-gray-500">
        <div className="flex flex-wrap gap-2">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
        <p className="mt-2">© 2025 Marc Fernandez.</p>
      </div>
    </aside>
  )
}

export function ProfileAside() {
  const isMobile = useIsMobile()

  // En móvil no mostramos el aside
  if (isMobile) return null

  return (
    <aside className="sticky top-0 ml-6 hidden h-screen w-[350px] flex-col gap-4 py-2 lg:flex">
      <AsideSearch />

      <AsideTrends />

      <AsideSuggestions />

      <div className="p-3 text-xs text-gray-500">
        <div className="flex flex-wrap gap-2">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
        <p className="mt-2">© 2025 Marc Fernandez.</p>
      </div>
    </aside>
  )
}