"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

export default function CopyEmailButton({
  email,
  copiedLabel = "Copied!",
}: {
  email: string
  copiedLabel?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 bg-nalaikh-navy text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-nalaikh-navy/90 transition-colors"
    >
      {copied ? (
        <>
          <Check className="size-4" />
          {copiedLabel}
        </>
      ) : (
        <>
          <Copy className="size-4" />
          {email}
        </>
      )}
    </button>
  )
}
