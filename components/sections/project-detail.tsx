import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TreePine, Waves, GraduationCap, Leaf } from "lucide-react"
import { Translate } from "@/lib/_types"

const items = [
  { key: "greenZone", descKey: "greenZoneDesc", icon: TreePine },
  { key: "waterFeatures", descKey: "waterFeaturesDesc", icon: Waves },
  { key: "ecoEducation", descKey: "ecoEducationDesc", icon: GraduationCap },
  { key: "greenTech", descKey: "greenTechDesc", icon: Leaf },
]

export default function ProjectDetailSection({ t }: Translate) {
  return (
    <section id="green-nalaikh" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            {t.greenComponents}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto dark:text-gray-400">
            {t.greenComponentsDesc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ key, descKey, icon: Icon }) => (
            <Card
              key={key}
              className="border border-gray-100 hover:border-nalaikh-navy/20 transition-colors dark:border-gray-800 dark:hover:border-nalaikh-gold/30"
            >
              <CardHeader>
                <div className="w-11 h-11 bg-nalaikh-navy/8 rounded-lg flex items-center justify-center mb-4 dark:bg-nalaikh-gold/10">
                  <Icon className="h-5 w-5 text-nalaikh-navy dark:text-nalaikh-gold" />
                </div>
                <CardTitle className="text-base dark:text-white">
                  {t[key as keyof typeof t]}
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  {t[descKey as keyof typeof t]}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
