import {
  FileText,
  Building2,
  MessageSquare,
  Banknote,
  Rocket,
} from "lucide-react"
import { Translate } from "@/lib/_types"

const steps = [
  { key: "step1", icon: FileText, phase: "phase1" },
  { key: "step2", icon: Building2, phase: "phase1" },
  { key: "step3", icon: MessageSquare, phase: "phase2" },
  { key: "step4", icon: Banknote, phase: "phase2" },
  { key: "step5", icon: Rocket, phase: "phase3" },
]

export default function ImplementationTimelineSection({ t }: Translate) {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            {t.implementationTimeline}
          </h2>
        </div>

        {/* Desktop timeline */}
        <div className="hidden md:block max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-7 left-0 right-0 h-px bg-gray-200 dark:bg-gray-700" />

            <div className="grid grid-cols-5 gap-4">
              {steps.map(({ key, icon: Icon }, i) => (
                <div key={key} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 w-14 h-14 bg-nalaikh-navy text-white rounded-full flex items-center justify-center mb-4 dark:bg-nalaikh-gold dark:text-nalaikh-navy">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-xs font-bold text-nalaikh-navy/40 mb-1 dark:text-gray-500">
                    0{i + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-900 leading-tight dark:text-white">
                    {t[key as keyof typeof t]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Phase labels */}
          <div className="grid grid-cols-5 gap-4 mt-8">
            <div className="col-span-2 text-center">
              <span className="text-xs font-semibold text-nalaikh-navy/50 uppercase tracking-wider dark:text-gray-500">
                {t.phase1}
              </span>
            </div>
            <div className="col-span-2 text-center">
              <span className="text-xs font-semibold text-nalaikh-navy/50 uppercase tracking-wider dark:text-gray-500">
                {t.phase2}
              </span>
            </div>
            <div className="col-span-1 text-center">
              <span className="text-xs font-semibold text-nalaikh-navy/50 uppercase tracking-wider dark:text-gray-500">
                {t.phase3}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="md:hidden space-y-0">
          {steps.map(({ key, icon: Icon }, i) => (
            <div key={key} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-nalaikh-navy text-white rounded-full flex items-center justify-center shrink-0 dark:bg-nalaikh-gold dark:text-nalaikh-navy">
                  <Icon className="size-4" />
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px h-12 bg-gray-200 dark:bg-gray-700" />
                )}
              </div>
              <div className="pt-2 pb-8">
                <span className="text-xs font-bold text-nalaikh-navy/40 dark:text-gray-500">
                  0{i + 1}
                </span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {t[key as keyof typeof t]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
