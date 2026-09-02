"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function addMessage(jobId: string, content: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authorized")

  await prisma.timelineItem.create({
    data: {
      jobId,
      userId: session.user.id,
      type: "message",
      content,
    }
  })

  // Update job updated_at for sorting
  await prisma.job.update({
    where: { id: jobId },
    data: { updatedAt: new Date() }
  })

  revalidatePath(`/jobs/${jobId}`)
}

export async function addPhotos(jobId: string, base64Images: string[]) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authorized")

  // Store all base64 images directly in the DB under the new photos array
  await prisma.timelineItem.create({
    data: {
      jobId,
      userId: session.user.id,
      type: "photo",
      photos: base64Images,
    }
  })

  await prisma.job.update({
    where: { id: jobId },
    data: { updatedAt: new Date() }
  })

  revalidatePath(`/jobs/${jobId}`)
}

export async function createReportLink(jobId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authorized")

  const link = await prisma.sharedLink.create({
    data: { jobId }
  })

  return link.token
}
