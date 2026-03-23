import { Translate } from "@/lib/_types"

export default function TopHeader({ t }: Translate) {
  return (
    <section className="bg-primary text-white text-center text-xs p-2">
      {t.topBanner}
    </section>
  )
}
