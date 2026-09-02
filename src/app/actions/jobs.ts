"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createJob(name: string, address?: string, priority: string = "medium", jobDate?: string, companyId?: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authorized")

  // Find or create the user's default workspace for this demo
  let workspace = await prisma.workspace.findFirst({
    where: { ownerId: session.user.id }
  })

  if (!workspace) {
    workspace = await prisma.workspace.create({
      data: {
        name: `${session.user.name || 'User'}'s Workspace`,
        ownerId: session.user.id,
      }
    })
    
    await prisma.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: session.user.id,
        role: "owner",
        canShareReports: true
      }
    })
  }

  const job = await prisma.job.create({
    data: {
      name,
      address,
      priority,
      jobDate: jobDate ? new Date(jobDate) : null,
      workspaceId: workspace.id,
      companyId: companyId || null,
    }
  })

  // Add initial timeline event
  await prisma.timelineItem.create({
    data: {
      jobId: job.id,
      userId: session.user.id,
      type: "message",
      content: `Job created: ${name}`,
    }
  })

  revalidatePath("/")
  return job
}

export async function deleteJob(jobId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authorized")

  // Soft delete
  await prisma.job.update({
    where: { id: jobId },
    data: { isTrashed: true }
  })

  revalidatePath("/")
}

export async function getJobs() {
  const session = await auth()
  if (!session?.user?.id) return []

  // Get workspaces this user belongs to
  const members = await prisma.workspaceMember.findMany({
    where: { userId: session.user.id }
  })
  const workspaceIds = members.map(m => m.workspaceId)

  return prisma.job.findMany({
    where: { 
      workspaceId: { in: workspaceIds },
      isTrashed: false 
    },
    orderBy: { updatedAt: 'desc' } // Ordered by most recent activity
  })
}
