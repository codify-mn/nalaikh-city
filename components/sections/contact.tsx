import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"
import { Translate } from "@/lib/_types"

export default function ContactSection({ t }: Translate) {
  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
              {t.contact}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-gray-100 dark:border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-nalaikh-navy/8 rounded-lg flex items-center justify-center mx-auto mb-5 dark:bg-nalaikh-gold/10">
                  <MapPin className="h-5 w-5 text-nalaikh-navy dark:text-nalaikh-gold" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 dark:text-white">
                  {t.officeLocation}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed dark:text-gray-400">
                  {t.address}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 dark:border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-nalaikh-navy/8 rounded-lg flex items-center justify-center mx-auto mb-5 dark:bg-nalaikh-gold/10">
                  <Phone className="h-5 w-5 text-nalaikh-navy dark:text-nalaikh-gold" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 dark:text-white">
                  {t.phoneContact}
                </h3>
                <p className="text-base font-medium text-gray-900 dark:text-white">
                  {t.phone}
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 dark:border-gray-800">
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 bg-nalaikh-navy/8 rounded-lg flex items-center justify-center mx-auto mb-5 dark:bg-nalaikh-gold/10">
                  <Mail className="h-5 w-5 text-nalaikh-navy dark:text-nalaikh-gold" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 dark:text-white">
                  {t.emailContact}
                </h3>
                <p className="text-base font-medium text-gray-900 dark:text-white">
                  info@ncdc.mn
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Partnership */}
          <div className="mt-12 bg-nalaikh-navy/[0.03] rounded-xl p-8 text-center dark:bg-white/[0.04]">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 dark:text-white">
              {t.partnershipOpportunities}
            </h3>
            <p className="text-sm text-gray-500 max-w-2xl mx-auto dark:text-gray-400">
              {t.partnershipDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
