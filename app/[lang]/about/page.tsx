import { PageProps } from "@/lib/_types"
import { InfoCard } from "./components/info-card"
import { EyeIcon, GiftIcon } from "lucide-react"
import { getT } from "@/lib/i18n"

export default async function AboutPage({ params }: PageProps) {
  const { lang: language } = await params
  const t = getT(language)

  return (
    <div className="container mx-auto px-4 py-20 space-y-12 flex justify-center flex-col">
      <InfoCard
        title={t.vision}
        icon={<EyeIcon className="size-14" />}
        body={t.visionBody}
      />

      <div className="text-center space-y-4 bg-primary text-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold">{t.participation}</h3>
      </div>

      <InfoCard
        title={t.mission}
        icon={<GiftIcon className="size-14" />}
        body={t.missionBody}
      />

      <section className="py-16 bg-white dark:bg-gray-900 text-center">
        <h2 className="text-3xl font-bold text-primary mb-8 dark:text-white">
          {t.directorGreeting}
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-justify text-base leading-7 text-gray-700 dark:text-gray-300">
            {t.directorMessage}
          </p>
        </div>
      </section>
    </div>
  )
}
