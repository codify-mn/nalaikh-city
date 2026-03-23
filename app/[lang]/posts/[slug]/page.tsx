import { getPayloadHMR } from "@payloadcms/next/utilities"
import configPromise from "../../../../src/payload.config"
import { getT } from "@/lib/i18n"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { RichText } from "@payloadcms/richtext-lexical/react"
import type { SerializedEditorState } from "lexical"

const categoryKeys: Record<string, string> = {
  news: "categoryNews",
  projects: "categoryProjects",
  "green-development": "categoryGreenDev",
  housing: "categoryHousing",
  technology: "categoryTechnology",
}

interface PostPageProps {
  params: Promise<{ lang: "mn" | "en" | "zh"; slug: string }>
}

async function getPost(slug: string, locale: string) {
  const payload = await getPayloadHMR({ config: configPromise })
  const posts = await payload.find({
    collection: "posts",
    where: {
      slug: { equals: slug },
      status: { equals: "published" },
    },
    draft: false,
    limit: 1,
    locale,
  })
  return posts.docs[0] || null
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const post = await getPost(slug, lang)

  if (!post) {
    return { title: "Post Not Found" }
  }

  const seo = post.seo as { title?: string; description?: string } | undefined

  return {
    title: seo?.title || (post.title as string),
    description: seo?.description || (post.excerpt as string),
    openGraph: {
      title: seo?.title || (post.title as string),
      description: seo?.description || (post.excerpt as string),
      locale: lang,
      type: "article",
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { lang, slug } = await params
  const t = getT(lang)
  const post = await getPost(slug, lang)

  if (!post) {
    notFound()
  }

  const featuredImage = post.featuredImage as
    | { url?: string; alt?: string }
    | undefined

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      lang === "mn" ? "mn-MN" : lang === "zh" ? "zh-CN" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <Link href={`/${lang}/posts`}>
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600">
              <ArrowLeft className="h-4 w-4" />
              {t.backToPosts}
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      {featuredImage?.url && (
        <div className="relative h-64 md:h-[28rem] w-full overflow-hidden">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || (post.title as string)}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      )}

      {/* Article */}
      <article className="py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Badge className="bg-nalaikh-navy text-white hover:bg-nalaikh-navy/90">
                {t[
                  categoryKeys[
                    post.category as string
                  ] as keyof typeof t
                ] || (post.category as string)}
              </Badge>
              {(post.tags as string[] | undefined)?.map(
                (tag: string, i: number) => (
                  <Badge key={i} variant="outline" className="gap-1 text-xs">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                )
              )}
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              {post.title as string}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {post.excerpt as string}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground pb-6 border-b">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author as string}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedDate as string)}
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:tracking-tight prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-nalaikh-navy prose-img:rounded-lg">
            {post.content ? (
              <RichText data={post.content as SerializedEditorState} />
            ) : null}
          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t">
            <Link href={`/${lang}/posts`}>
              <Button
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.backToPosts}
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
