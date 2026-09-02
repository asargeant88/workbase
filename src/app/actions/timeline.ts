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

export async function addPhoto(jobId: string, base64Image: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authorized")

  // For this demo, we'll store the base64 image directly in the DB (or could save to disk).
  // In a real app with large photos, upload to S3/Cloud Storage and save URL here.
  await prisma.timelineItem.create({
    data: {
      jobId,
      userId: session.user.id,
      type: "photo",
      content: base64Image,
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
