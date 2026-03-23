import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Translate } from "@/lib/_types"

export default function HousingStatisticSection({ t }: Translate) {
  return (
    <section id="housing" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            {t.housingChallengeDesc}
          </h2>
        </div>

        {/* Key stats — all navy, no color-coding individual numbers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border border-gray-100 dark:border-gray-800">
            <CardHeader className="pb-2">
              <div className="text-4xl font-bold text-nalaikh-navy dark:text-white">
                15,000
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-semibold mb-1 dark:text-white">
                {t.totalHouseholds}
              </CardTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.totalHouseholdsDesc}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border border-gray-100 dark:border-gray-800">
            <CardHeader className="pb-2">
              <div className="text-4xl font-bold text-nalaikh-navy dark:text-white">
                35%
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-semibold mb-1 dark:text-white">
                {t.downPaymentCapable}
              </CardTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.downPaymentCapableDesc}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border border-gray-100 dark:border-gray-800">
            <CardHeader className="pb-2">
              <div className="text-4xl font-bold text-nalaikh-navy dark:text-white">
                87%
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-sm font-semibold mb-1 dark:text-white">
                {t.noDownPayment}
              </CardTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t.noDownPaymentDesc}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detail cards — consistent brand colors, no rainbow */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Mortgage demand */}
          <Card className="border border-gray-100 dark:border-gray-800">
            <CardHeader>
              <div className="text-3xl font-bold text-nalaikh-navy dark:text-white">
                70,000
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.mortgageDemand}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t.totalBorrowers}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    100%
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t.normalLoans}
                  </span>
                  <span className="font-semibold text-nalaikh-navy dark:text-nalaikh-gold">
                    98.2%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-nalaikh-navy h-2 rounded-full dark:bg-nalaikh-gold"
                    style={{ width: "98.2%" }}
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {t.badLoans}
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1.8%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk */}
          <Card className="border border-gray-100 dark:border-gray-800">
            <CardHeader>
              <div className="text-3xl font-bold text-nalaikh-navy dark:text-white">
                ₮ 5.4 ТБ
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t.totalRisk}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-nalaikh-navy mt-2 shrink-0 dark:bg-nalaikh-gold" />
                  <span>10,000 өрхийн 1.8% нь чанаргүй зээлдэгч</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-nalaikh-navy mt-2 shrink-0 dark:bg-nalaikh-gold" />
                  <span>20 жилийн хугацаанд 180 өрх чанаргүй зээлдэгч болно</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-nalaikh-navy mt-2 shrink-0 dark:bg-nalaikh-gold" />
                  <span>Нэг өрхийн ипотекийн зээл: ₮100 сая</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-nalaikh-navy mt-2 shrink-0 dark:bg-nalaikh-gold" />
                  <span>Нэг чанаргүй зээлээс: ₮30 сая эрсдэл</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
