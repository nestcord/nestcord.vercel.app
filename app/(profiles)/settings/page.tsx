"use client"
import Link from "next/link"
import {
  ArrowLeft,
  ChevronRight,
  User,
  Bell,
  CookieIcon as Privacy,
  Shield,
  Accessibility,
  Palette,
} from "lucide-react"

export default function SettingsPage() {
  const settingsCategories = [
    {
      icon: User,
      title: "Tu cuenta",
      description:
        "Ver información sobre tu cuenta, descargar un archivo de tus datos o aprender sobre tus opciones de desactivación de cuenta.",
      href: "/settings/account",
    },
    {
      icon: Bell,
      title: "Notificaciones",
      description: "Selecciona los tipos de notificaciones que quieres recibir.",
      href: "/settings/notifications",
    },
    {
      icon: Privacy,
      title: "Privacidad y seguridad",
      description: "Administra lo que otros pueden ver sobre ti.",
      href: "/settings/privacy",
    },
    {
      icon: Accessibility,
      title: "Accesibilidad, visualización y lenguajes",
      description: "Administra cómo se te muestra el contenido.",
      href: "/settings/accessibility",
    },
    {
      icon: Shield,
      title: "Seguridad y acceso a la cuenta",
      description: "Administra la seguridad de tu cuenta y configura el acceso a la cuenta.",
      href: "/settings/security",
    },
    {
      icon: Palette,
      title: "Personalización de la interfaz",
      description: "Administra cómo se ve X para ti.",
      href: "/settings/appearance",
    },
  ]

  return (
    <>
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur">
        <div className="flex items-center gap-8 px-4 py-3">
          <Link href="/" className="rounded-full p-2 hover:bg-gray-800">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Configuración</h1>
        </div>
      </div>

      <div className="px-4 py-2">
        <Link href="/settings/profile" className="block">
          <div className="flex items-center justify-between rounded-lg p-4 hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-sky-500 p-2">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold">Perfil</h2>
                <p className="text-sm text-gray-500">Edita tu información personal</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-500" />
          </div>
        </Link>

        {settingsCategories.map((category, index) => (
          <Link href={category.href} key={index}>
            <div className="flex items-center justify-between rounded-lg p-4 hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gray-800 p-2">
                  <category.icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold">{category.title}</h2>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

