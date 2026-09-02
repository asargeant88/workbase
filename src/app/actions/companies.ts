"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

async function ensureUserWorkspace(userId: string, userName: string | null) {
  let userWorkspace = await prisma.workspaceMember.findFirst({
    where: { userId }
  })

  if (!userWorkspace) {
    const workspace = await prisma.workspace.create({
      data: {
        name: `${userName || 'User'}'s Workspace`,
        ownerId: userId,
      }
    })
    
    userWorkspace = await prisma.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: userId,
        role: "owner",
        canShareReports: true
      }
    })
  }

  return userWorkspace
}

export async function getCompanies() {
  const session = await auth()
  if (!session?.user?.id) return []

  const userWorkspace = await ensureUserWorkspace(session.user.id, session.user.name)

  return prisma.company.findMany({
    where: { workspaceId: userWorkspace.workspaceId },
    orderBy: { name: 'asc' }
  })
}

export async function createCompany(data: { name: string, address?: string, phone?: string, email?: string }) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authorized")

  const userWorkspace = await ensureUserWorkspace(session.user.id, session.user.name)

  await prisma.company.create({
    data: {
      ...data,
      workspaceId: userWorkspace.workspaceId
    }
  })

  revalidatePath("/companies")
}
