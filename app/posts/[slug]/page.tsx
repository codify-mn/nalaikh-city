import { redirect } from "next/navigation"

export default async function PostRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  redirect(`/mn/posts/${slug}`)
}
