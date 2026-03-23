import Image from "next/image"
import CompanyLogo from "@/assets/logos/ncdc-logo.jpg"
import { Translate } from "@/lib/_types"

export default function Footer({ t }: Translate) {
  return (
    <footer className="bg-nalaikh-navy text-white dark:bg-gray-950 dark:border-t dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src={CompanyLogo} alt="NCDC" className="w-10 h-10 rounded" />
              <span className="text-sm font-semibold leading-tight">
                {t.company}
              </span>
            </div>
            <p className="text-sm text-blue-100/60 leading-relaxed">
              {t.heroDescription?.slice(0, 120)}...
            </p>
          </div>

          {/* Projects */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/90">{t.projects}</h4>
            <ul className="space-y-2.5 text-sm text-blue-100/60">
              <li>{t.greenNalaikh}</li>
              <li>{t.industrialPark}</li>
              <li>{t.housingDevelopment}</li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/90">{t.services}</h4>
            <ul className="space-y-2.5 text-sm text-blue-100/60">
              <li>{t.urbanPlanning}</li>
              <li>{t.greenFinancing}</li>
              <li>{t.sustainableDevelopment}</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/90">{t.contact}</h4>
            <div className="space-y-2.5 text-sm text-blue-100/60">
              <p>{t.address}</p>
              <p>{t.phone}</p>
              <p>{t.email}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-sm text-blue-100/40">
            © 2025 {t.company}. {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
