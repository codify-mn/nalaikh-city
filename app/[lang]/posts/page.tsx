import { getPayloadHMR } from "@payloadcms/next/utilities"
import configPromise from "../../../src/payload.config"
import { getT } from "@/lib/i18n"

export const dynamic = 'force-dynamic'
import { PageProps } from "@/lib/_types"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import type { Where } from "payload"

const categoryKeys: Record<string, string> = {
  news: "categoryNews",
  projects: "categoryProjects",
  "green-development": "categoryGreenDev",
  housing: "categoryHousing",
  technology: "categoryTechnology",
}

interface PostsPageProps extends PageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function PostsPage({
  params,
  searchParams,
}: PostsPageProps) {
  const { lang } = await params
  const { category, page } = await searchParams
  const t = getT(lang)
  const currentPage = parseInt(page || "1")

  const payload = await getPayloadHMR({ config: configPromise })

  const where: Where = { status: { equals: "published" } }
  if (category && category !== "all") {
    where.category = { equals: category }
  }

  const posts = await payload.find({
    collection: "posts",
    where,
    draft: false,
    limit: 9,
    page: currentPage,
    sort: "-publishedDate",
    locale: lang,
  })

  const categories = [
    { value: "all", label: t.allCategories },
    { value: "news", label: t.categoryNews },
    { value: "projects", label: t.categoryProjects },
    { value: "green-development", label: t.categoryGreenDev },
    { value: "housing", label: t.categoryHousing },
    { value: "technology", label: t.categoryTechnology },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      lang === "mn" ? "mn-MN" : lang === "zh" ? "zh-CN" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-nalaikh-navy via-blue-900 to-blue-950 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <Badge
              variant="secondary"
              className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              NCDC
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              {t.postsTitle}
            </h1>
            <p className="text-lg text-blue-100/80 max-w-2xl">
              {t.postsDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b bg-white sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => {
              const isActive =
                (!category && cat.value === "all") || category === cat.value
              return (
                <Link
                  key={cat.value}
                  href={
                    cat.value === "all"
                      ? `/${lang}/posts`
                      : `/${lang}/posts?category=${cat.value}`
                  }
                  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-nalaikh-navy text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {posts.docs.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t.noPosts}
              </h3>
              <p className="text-gray-500">{t.noPostsDesc}</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {posts.docs.map((post: Record<string, unknown>) => {
                  const featuredImage = post.featuredImage as
                    | {
                        url?: string
                        alt?: string
                        sizes?: {
                          card?: { url?: string }
                        }
                      }
                    | undefined
                  const imageUrl =
                    featuredImage?.sizes?.card?.url || featuredImage?.url

                  return (
                    <Card
                      key={post.id as string}
                      className="group grid grid-rows-[auto_auto_1fr_auto] overflow-hidden border-gray-200/80 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Image */}
                      <Link href={`/${lang}/posts/${post.slug}`}>
                        <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
                          {imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={
                                (featuredImage?.alt as string) ||
                                (post.title as string)
                              }
                              width={640}
                              height={360}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                              <span className="text-4xl text-gray-300">
                                NCDC
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Header */}
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge
                            variant="secondary"
                            className="text-xs font-medium"
                          >
                            {t[
                              categoryKeys[
                                post.category as string
                              ] as keyof typeof t
                            ] || (post.category as string)}
                          </Badge>
                        </div>
                        <Link href={`/${lang}/posts/${post.slug}`}>
                          <h3 className="text-lg font-semibold leading-snug tracking-tight line-clamp-2 group-hover:text-nalaikh-navy transition-colors">
                            {post.title as string}
                          </h3>
                        </Link>
                      </CardHeader>

                      {/* Content */}
                      <CardContent>
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {post.excerpt as string}
                        </p>
                      </CardContent>

                      {/* Footer */}
                      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author as string}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.publishedDate as string)}
                          </span>
                        </div>
                        <Link
                          href={`/${lang}/posts/${post.slug}`}
                          className="flex items-center gap-1 font-medium text-nalaikh-navy hover:underline"
                        >
                          {t.readMore}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>

              {/* Pagination */}
              {posts.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: posts.totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <Link
                        key={p}
                        href={`/${lang}/posts?page=${p}${category ? `&category=${category}` : ""}`}
                        className={`inline-flex items-center justify-center h-10 w-10 rounded-full text-sm font-medium transition-colors ${
                          p === currentPage
                            ? "bg-nalaikh-navy text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {p}
                      </Link>
                    )
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
