import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Translate } from "@/lib/_types"
import { Shield, Building2, Globe, Home } from "lucide-react"

const solutionCards = [
  { num: "01", key: "downPaymentInsurance", descKey: "downPaymentInsuranceDesc", icon: Shield },
  { num: "02", key: "corporateFinancing", descKey: "corporateFinancingDesc", icon: Building2 },
  { num: "03", key: "fundingSources", descKey: "fundingSourcesDesc", icon: Globe },
  { num: "04", key: "passiveHousing", descKey: "passiveHousingDesc", icon: Home },
]

export default function FinancingSolutionsSection({ t }: Translate) {
  return (
    <section id="financing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            {t.financingSolutions}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto dark:text-gray-400">
            {t.financingSolutionsDesc}
          </p>
        </div>

        {/* Problem → Solution */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-5 dark:text-white">
              {t.constructionFinancing}
            </h3>
            <div className="space-y-4">
              {/* Problem — warm navy tint, not aggressive red */}
              <div className="bg-nalaikh-navy/[0.04] border border-nalaikh-navy/10 p-5 rounded-xl dark:bg-white/[0.04] dark:border-white/10">
                <div className="text-sm font-semibold text-nalaikh-navy mb-2 dark:text-nalaikh-gold">
                  {t.currentProblem}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-400">
                  {t.currentProblemDesc}
                </p>
              </div>
              {/* Solution — slightly warmer, uses gold accent */}
              <div className="bg-nalaikh-gold/[0.08] border border-nalaikh-gold/20 p-5 rounded-xl dark:bg-nalaikh-gold/[0.06] dark:border-nalaikh-gold/15">
                <div className="text-sm font-semibold text-nalaikh-navy mb-2 dark:text-nalaikh-gold">
                  {t.solution}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-400">
                  {t.solutionDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Price comparison — navy/gold only */}
          <Card className="border border-gray-100 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">
                {t.priceComparison}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg dark:bg-white/[0.04]">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t.bankLoanPrice}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ₮240,000,000
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-nalaikh-gold/[0.08] rounded-lg dark:bg-nalaikh-gold/[0.06]">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t.preOrderPrice}
                  </span>
                  <span className="font-bold text-nalaikh-navy dark:text-nalaikh-gold">
                    ₮164,000,000
                  </span>
                </div>
                <div className="text-center p-4 bg-nalaikh-navy rounded-lg">
                  <div className="text-base font-bold text-white">
                    {t.actualSavings}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 4 solution cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {solutionCards.map(({ num, key, descKey, icon: Icon }) => (
            <Card
              key={key}
              className="border border-gray-100 dark:border-gray-800"
            >
              <CardHeader className="text-center">
                <div className="w-11 h-11 bg-nalaikh-navy/8 rounded-lg flex items-center justify-center mx-auto mb-3 dark:bg-nalaikh-gold/10">
                  <Icon className="h-5 w-5 text-nalaikh-navy dark:text-nalaikh-gold" />
                </div>
                <span className="text-xs font-bold text-nalaikh-navy/30 dark:text-gray-600">
                  {num}
                </span>
                <CardTitle className="text-sm font-semibold dark:text-white">
                  {t[key as keyof typeof t]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                  {t[descKey as keyof typeof t]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
