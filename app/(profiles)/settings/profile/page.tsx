"use client"

import type React from "react"

import { useState, useRef, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera, X } from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/navigation/Sidebar"
import { useUser } from "@/contexts/UserContext"
import Image from "next/image"

export default function SettingsProfilePage() {
  const router = useRouter()
  const { user } = useUser(); 
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)

  // Datos de ejemplo del usuario

  const [formData, setFormData] = useState({
    name: user?.name,
    biography: user?.biography || "",
    location: user?.location || "",
    website: user?.website || "",
  })

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleBannerClick = () => {
    bannerInputRef.current?.click()
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRemoveAvatar = () => {
    setAvatarPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleRemoveBanner = () => {
    setBannerPreview(null)
    if (bannerInputRef.current) bannerInputRef.current.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    
    // Simulación de guardado
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/${user?.username}`)
    }, 1500)
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-black dark:text-white">
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />

        <main className="flex-1 border-x border-gray-800">
          <div className="sticky top-0 z-10 bg-background backdrop-blur">
            <div className="flex items-center gap-8 px-4 py-3">
              <Link href="/" className="rounded-full p-2 hover:bg-gray-800">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-xl font-bold">Edit Profile</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Banner y Avatar */}
            <div className="relative">
              <div className="h-48 w-full bg-gray-800 relative">
                {bannerPreview ? (
                  <Image
                    src={bannerPreview || "/assets/default-profile-banner.webp"}
                    alt="Banner preview"
                    className="h-full w-full object-cover"
                    width={1500}
                    height={1500}
                  />
                ) : user.banner ? (
                  <Image
                    src={user.banner || "/placeholder.svg"}
                    alt="User banner"
                    className="h-full w-full object-cover"
                                        width={1500}
                    height={1500}
                  />
                ) : null}

                <div className="absolute inset-0 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleBannerClick}
                    className="rounded-full bg-black/50 p-3 hover:bg-black/70"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                  {(bannerPreview || user.banner) && (
                    <button
                      type="button"
                      onClick={handleRemoveBanner}
                      className="rounded-full bg-black/50 p-3 hover:bg-black/70"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="absolute -bottom-16 left-4">
                <div className="relative h-32 w-32 rounded-full border-4 border-black bg-black">
                  <Avatar className="h-full w-full">
                    <AvatarImage src={avatarPreview || user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={handleAvatarClick}
                      className="rounded-full bg-black/50 p-3 hover:bg-black/70"
                    >
                      <Camera className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="mt-20 px-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm text-gray-500">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    maxLength={50}
                    className="bg-transparent border-gray-800 focus:border-sky-500"
                  />
                  <div className="mt-1 text-right text-xs text-gray-500">{formData.name?.length}/50</div>
                </div>

                <div>
                  <label htmlFor="biography" className="mb-1 block text-sm text-gray-500">
                    Biography
                  </label>
                  <Textarea
                    id="biography"
                    name="biography"
                    value={formData.biography}
                    onChange={handleInputChange}
                    maxLength={160}
                    className="min-h-[100px] bg-transparent border-gray-800 focus:border-sky-500"
                  />
                  <div className="mt-1 text-right text-xs text-gray-500">{formData.biography.length}/160</div>
                </div>

                <div>
                  <label htmlFor="location" className="mb-1 block text-sm text-gray-500">
                    Location
                  </label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    maxLength={30}
                    className="bg-transparent border-gray-800 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label htmlFor="website" className="mb-1 block text-sm text-gray-500">
                    Website
                  </label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="bg-transparent border-gray-800 focus:border-sky-500"
                  />
                </div>


              </div>

              {/* Botones */}
              <div className="mt-8 flex justify-end border-t border-gray-800 pt-4">
                <Button
                  type="submit"
                  className="rounded-full bg-white font-bold text-black hover:bg-gray-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Guardando..." : "Save"}
                </Button>
              </div>
            </div>
          </form>

          {/* Inputs ocultos para archivos */}
          <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
          <input type="file" ref={bannerInputRef} onChange={handleBannerChange} accept="image/*" className="hidden" />
        </main>
      </div>
    </div>
  )
}

