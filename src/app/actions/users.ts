"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { headers } from "next/headers"

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

export async function getWorkspaceMembers() {
  const session = await auth()
  if (!session?.user?.id) return []

  const userWorkspace = await ensureUserWorkspace(session.user.id, session.user.name)

  return prisma.workspaceMember.findMany({
    where: { workspaceId: userWorkspace.workspaceId },
    include: { user: true }
  })
}

export async function getInviteLink() {
  const session = await auth()
  if (!session?.user?.id) return null

  const userWorkspace = await ensureUserWorkspace(session.user.id, session.user.name)
  
  // Use headers to get the current host for the invite link
  const headersList = await headers()
  const host = headersList.get("host") || "localhost:3000"
  const protocol = host.includes("localhost") ? "http" : "https"
  
  return `${protocol}://${host}/join?w=${userWorkspace.workspaceId}`
}

export async function joinWorkspace(workspaceId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect(`/?callbackUrl=/join?w=${workspaceId}`)
  }

  // Check if already a member
  const existing = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId: session.user.id
      }
    }
  })

  if (!existing) {
    await prisma.workspaceMember.create({
      data: {
        workspaceId,
        userId: session.user.id,
        role: "member"
      }
    })
  }

  redirect("/jobs")
}
