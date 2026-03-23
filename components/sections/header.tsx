"use client"

import Image from "next/image"
import { Language } from "@/lib/translations"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CompanyLogo from "@/assets/logos/ncdc-logo.jpg"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type Props = {
  t: Record<string, string>
  language: Language
  setLanguage?: (lang: Language) => void
}

const NAV_ITEMS = [
  { key: "about", href: "/about", type: "page" },
  { key: "projects", href: "#projects", type: "section" },
  { key: "news", href: "/posts", type: "page" },
  { key: "careers", href: "/jobs", type: "page" },
  { key: "contact", href: "#contact", type: "section" },
]

export default function Header({ t, language, setLanguage }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigateToLanguage = (nextLang: Language) => {
    const url = new URL(window.location.href)
    const hash = url.hash
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length === 0) {
      router.push(`/${nextLang}${hash}`)
      return
    }
    segments[0] = nextLang
    const nextPath = `/${segments.join("/")}${hash}`
    router.push(nextPath)
  }

  const handleNavClick = (item: (typeof NAV_ITEMS)[number]) => {
    setMobileOpen(false)
    if (item.type === "section") {
      const el = document.querySelector(item.href)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      } else {
        window.location.href = `/${language}${item.href}`
      }
    } else {
      router.push(`/${language}${item.href}`)
    }
  }

  return (
    <header className="border-b backdrop-blur-md bg-white/90 sticky top-0 z-50 dark:bg-nalaikh-navy/95 dark:border-nalaikh-gold/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${language}`} className="flex items-center gap-3">
          <Image src={CompanyLogo} alt="NCDC" className="w-10 h-10 rounded" />
          <span className="text-sm font-semibold text-nalaikh-navy leading-tight max-w-[180px] dark:text-white">
            {t.company}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item)}
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-nalaikh-navy rounded-md hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10"
            >
              {t[item.key as keyof typeof t]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <Select
            value={language}
            onValueChange={(value: Language) =>
              setLanguage ? setLanguage(value) : navigateToLanguage(value)
            }
          >
            <SelectTrigger className="w-16 h-9 text-sm border-gray-200 dark:bg-nalaikh-navy/50 dark:border-nalaikh-gold/30 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-nalaikh-navy dark:border-nalaikh-gold/30">
              <SelectItem value="mn" className="dark:text-white">MN</SelectItem>
              <SelectItem value="en" className="dark:text-white">EN</SelectItem>
              <SelectItem value="zh" className="dark:text-white">中文</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-nalaikh-navy dark:text-gray-300"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white dark:bg-nalaikh-navy">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item)}
                className="text-left px-3 py-3 text-sm font-medium text-gray-700 hover:text-nalaikh-navy hover:bg-gray-50 rounded-md transition-colors dark:text-gray-300 dark:hover:bg-white/10"
              >
                {t[item.key as keyof typeof t]}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
