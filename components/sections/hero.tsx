import CityImage from "@/assets/images/new-nalaikh.jpg"
import { Translate } from "@/lib/_types"
import { ArrowRight, Leaf } from "lucide-react"

export default function HeroSection({ t }: Translate) {
  return (
    <section className="relative isolate overflow-hidden min-h-[70vh] flex items-end">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${CityImage.src})` }}
      />
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-nalaikh-navy/90 via-nalaikh-navy/40 to-transparent" />

      <div className="container mx-auto px-4 relative z-10 pb-16 pt-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-white/90 mb-6 border border-white/20">
            <Leaf className="size-4" />
            <span>{t.ecoFriendlyCity}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-white mb-5">
            {t.heroTitle}
          </h1>

          <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl">
            {t.heroDescription}
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-white text-nalaikh-navy px-6 py-3 rounded-lg font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              {t.viewProjects}
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold text-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              {t.contact}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
