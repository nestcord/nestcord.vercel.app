"use client"

import useSWRInfinite from "swr/infinite"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Card from "./Card"
import type { StatusType } from "@/lib/types"

import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "../ui/button"
import { Loader2, RefreshCw } from "lucide-react"
const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function Feed() {

  const isMobile = useIsMobile()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.nextCursor) return null
    return `/api/feed?cursor=${previousPageData?.nextCursor ?? ""}&limit=10`
  }

  const { data, size, setSize, mutate, isLoading, isValidating } = useSWRInfinite(getKey, fetcher)
  const status = data ? data.flatMap((page) => page.status) : []

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isValidating) {
        setSize(size + 1)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [size, isValidating, setSize])

    // Función para actualizar el feed después de un nuevo post
    const refreshFeed = async () => {
      setIsRefreshing(true)
      await mutate() // Recarga los datos sin necesidad de recargar la página
      setTimeout(() => setIsRefreshing(false), 1000) // Efecto visual de actualización
    }

  return (
    <section className={`border-x ${isMobile ? "flex-1" : "w-[600px]"}`} id="feed">
      
        <div className="sticky top-0 z-10 bg-white dark:bg-background backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold">Home</h1>
          {!isLoading && (
            <Button
              onClick={refreshFeed}
              variant="ghost"
              size="icon"
              disabled={isRefreshing}
              className="rounded-full hover:bg-indigo-500/10 hover:text-indigo-500 transition-all bi"
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? "animate-spin text-indigo-500" : ""}`} />
              <span className="sr-only">Update Feed</span>
            </Button>
          )}
        </div>
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-transparent">
          <TabsTrigger
            value="home"
            className="rounded-none data-[state=active]:border-b-4 data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Home
          </TabsTrigger>
          <TabsTrigger
            value="following"
            className="rounded-none data-[state=active]:border-b-4 data-[state=active]:border-indigo-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home" className="p-0">
          
          {/** Loading state */}
          {isLoading && (
            <div className="flex justify-center py-4 ">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            </div>
          )}

          {/** Loaded state */}
          <div >
            {status.map((status: StatusType) => (
              <div key={status.id} className="border-b">
              <Card {...status} />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="following" className="border-0 p-0">
          <p className="flex justify-center py-4">You are not following anyone yet.</p>
        </TabsContent>
      </Tabs>
      </div>
    </section>
  )
}

