import { getPayloadHMR } from "@payloadcms/next/utilities"
import configPromise from "../../../src/payload.config"
import { getT } from "@/lib/i18n"
import { PageProps } from "@/lib/_types"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Ruler,
  HardHat,
  Droplets,
  Thermometer,
  Calculator,
  Briefcase,
  Code,
  Users,
  MapPin,
  type LucideIcon,
} from "lucide-react"
import type { Language } from "@/lib/translations"
import CopyEmailButton from "@/components/ui/copy-email-button"

const iconMap: Record<string, LucideIcon> = {
  ruler: Ruler,
  hardhat: HardHat,
  droplets: Droplets,
  thermometer: Thermometer,
  calculator: Calculator,
  briefcase: Briefcase,
  code: Code,
  users: Users,
}

const pageStrings = {
  mn: {
    dateBadge: "2026 оны 03 дугаар сар",
    title: "Нээлттэй ажлын байр",
    subtitle:
      "\u201cНалайх хотын хөгжлийн корпораци\u201d ОНӨААТҮГ-ын сул орон тооны мэдээлэл",
    location: "Налайх дүүрэг",
    openings: "орон тоо",
    totalOpenings: (n: number) => `Нийт ${n} сул орон тоо`,
    duties: "Үндсэн үүрэг",
    requirements: "Шаардлага",
    applyTitle: "Анкет илгээх",
    applyDesc:
      "Дээрх албан тушаалд сонирхолтой бол анкет, CV-гээ дараах хаягаар илгээнэ үү.",
    noJobs: "Одоогоор нээлттэй ажлын байр байхгүй байна.",
    copied: "Хуулагдсан!",
  },
  en: {
    dateBadge: "March 2026",
    title: "Open Positions",
    subtitle:
      "Current job openings at Nalaikh City Development Corporation LLC",
    location: "Nalaikh District",
    openings: "openings",
    totalOpenings: (n: number) => `${n} open positions`,
    duties: "Key Responsibilities",
    requirements: "Requirements",
    applyTitle: "Apply Now",
    applyDesc:
      "If you are interested in any of the above positions, please send your CV to the following address.",
    noJobs: "No open positions at this time.",
    copied: "Copied!",
  },
  zh: {
    dateBadge: "2026年3月",
    title: "招聘职位",
    subtitle: "纳来哈市发展公司有限责任公司当前招聘信息",
    location: "纳来哈区",
    openings: "个空缺",
    totalOpenings: (n: number) => `共${n}个空缺`,
    duties: "主要职责",
    requirements: "任职要求",
    applyTitle: "投递简历",
    applyDesc: "如您对以上职位感兴趣，请将简历发送至以下邮箱。",
    noJobs: "目前没有空缺职位。",
    copied: "已复制！",
  },
} as const

export default async function JobsPage({ params }: PageProps) {
  const { lang } = await params
  const t = getT(lang)
  const s = pageStrings[lang]

  const payload = await getPayloadHMR({ config: configPromise })

  const jobs = await payload.find({
    collection: "jobs",
    where: { status: { equals: "open" } },
    sort: "sortOrder",
    locale: lang,
    limit: 50,
  })

  const totalOpenings = jobs.docs.reduce(
    (sum, job) => sum + ((job.openings as number) || 0),
    0
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-nalaikh-navy py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/10 text-white/80 border-white/20 hover:bg-white/15">
              {s.dateBadge}
            </Badge>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
              {s.title}
            </h1>
            <p className="text-blue-100/70 text-lg mb-6">{s.subtitle}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-blue-100/60">
              <span className="flex items-center gap-2">
                <Briefcase className="size-4" />
                {s.totalOpenings(totalOpenings)}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-4" />
                {s.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {jobs.docs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">{s.noJobs}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.docs.map((job) => {
                const Icon = iconMap[(job.icon as string) || "briefcase"] || Briefcase
                const duties = (job.duties as { duty: string }[] | undefined) || []
                const requirements =
                  (job.requirements as { requirement: string }[] | undefined) || []

                return (
                  <Card
                    key={job.id as string}
                    className="border border-gray-100 dark:border-gray-800 overflow-hidden"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 bg-nalaikh-navy/8 rounded-lg flex items-center justify-center shrink-0 dark:bg-nalaikh-gold/10">
                            <Icon className="h-5 w-5 text-nalaikh-navy dark:text-nalaikh-gold" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-semibold dark:text-white">
                              {job.title as string}
                            </CardTitle>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {job.department as string}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary" className="shrink-0 text-xs">
                          {job.openings as number} {s.openings}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-5">
                      <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-400">
                        {job.purpose as string}
                      </p>

                      {duties.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 dark:text-white">
                            {s.duties}
                          </h4>
                          <ul className="space-y-2">
                            {duties.map((item, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                              >
                                <span className="w-1 h-1 rounded-full bg-nalaikh-navy mt-2 shrink-0 dark:bg-nalaikh-gold" />
                                {item.duty}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {requirements.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3 dark:text-white">
                            {s.requirements}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {requirements.map((item, j) => (
                              <span
                                key={j}
                                className="inline-flex text-xs bg-gray-50 text-gray-600 px-3 py-1.5 rounded-md dark:bg-white/5 dark:text-gray-400"
                              >
                                {item.requirement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Contact CTA */}
          {jobs.docs.length > 0 && (
            <div className="mt-12 bg-nalaikh-navy/[0.03] rounded-xl p-8 text-center dark:bg-white/[0.04]">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-white">
                {s.applyTitle}
              </h3>
              <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">
                {s.applyDesc}
              </p>
              <CopyEmailButton email="info@ncdc.mn" copiedLabel={s.copied} />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
