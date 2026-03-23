import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  TreePine,
  Home,
  Factory,
  Banknote,
  TrendingUp,
  Users,
  Cpu,
} from "lucide-react"
import { Translate } from "@/lib/_types"

const projectCards = [
  { key: "industrialPark", descKey: "industrialParkDesc", icon: Factory },
  { key: "urbanDevelopment", descKey: "urbanDevelopmentDesc", icon: Home },
  { key: "economicZone", descKey: "economicZoneDesc", icon: MapPin },
  { key: "greenNalaikhProject", descKey: "greenNalaikhDesc", icon: TreePine },
]

const benefitCards = [
  { key: "greenFinancing", descKey: "greenFinancingDesc", icon: Banknote },
  { key: "exportSupport", descKey: "exportSupportDesc", icon: TrendingUp },
  { key: "jobCreation", descKey: "jobCreationDesc", icon: Users },
  { key: "newTechnology", descKey: "newTechnologyDesc", icon: Cpu },
]

const stats = [
  { value: "5+", key: "projectCoordination", descKey: "projectCoordinationDesc" },
  { value: "100%", key: "livingEnvironment", descKey: "livingEnvironmentDesc" },
  { value: "∞", key: "developmentModel", descKey: "developmentModelDesc" },
]

export default function ProjectOutcomesSection({ t }: Translate) {
  return (
    <section
      id="projects"
      className="py-20 bg-nalaikh-navy dark:bg-gray-950 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-white/10 text-white/80 border-white/20 hover:bg-white/15">
            {t.integratedApproach}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {t.projectOutcomes}
          </h2>
          <p className="text-lg text-blue-100/70 max-w-2xl mx-auto">
            {t.projectOutcomesDesc}
          </p>
        </div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {projectCards.map(({ key, descKey, icon: Icon }, i) => (
            <Card
              key={key}
              className="bg-white/[0.07] backdrop-blur-sm border-white/10 hover:bg-white/[0.12] transition-colors group"
            >
              <CardHeader className="text-center">
                <div className="w-14 h-14 bg-nalaikh-gold/15 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-nalaikh-gold" />
                </div>
                <div className="text-xs font-bold text-nalaikh-gold/60 mb-2">
                  0{i + 1}
                </div>
                <CardTitle className="text-base font-semibold text-white mb-2">
                  {t[key as keyof typeof t]}
                </CardTitle>
                <CardDescription className="text-blue-100/60 text-sm">
                  {t[descKey as keyof typeof t]}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-white/[0.04] rounded-2xl p-8 border border-white/10 mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">
              {t.benefitsTitle}
            </h3>
            <p className="text-blue-100/60">{t.benefitsDesc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefitCards.map(({ key, descKey, icon: Icon }) => (
              <div key={key} className="text-center">
                <div className="w-12 h-12 bg-nalaikh-gold/15 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-nalaikh-gold" />
                </div>
                <h4 className="text-sm font-semibold mb-1.5 text-white">
                  {t[key as keyof typeof t]}
                </h4>
                <p className="text-sm text-blue-100/50">
                  {t[descKey as keyof typeof t]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5">
          {stats.map(({ value, key, descKey }) => (
            <div
              key={key}
              className="bg-white/[0.07] rounded-xl p-6 border border-white/10 text-center"
            >
              <div className="text-3xl font-bold text-nalaikh-gold mb-1">
                {value}
              </div>
              <div className="text-white font-medium text-sm mb-1">
                {t[key as keyof typeof t]}
              </div>
              <div className="text-sm text-blue-100/50">
                {t[descKey as keyof typeof t]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
