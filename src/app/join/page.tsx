import { joinWorkspace } from "@/app/actions/users"
import { auth } from "@/auth"

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<{ w?: string }>
}) {
  const { w: workspaceId } = await searchParams
  const session = await auth()

  if (!workspaceId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#222]">
        <div className="text-center p-8 bg-[#1a1a1a] rounded-xl border border-[#333] shadow-xl">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Invalid Link</h1>
          <p className="text-gray-400">This invite link is invalid or missing the workspace ID.</p>
        </div>
      </div>
    )
  }

  // If logged in, process the join immediately
  if (session?.user) {
    await joinWorkspace(workspaceId)
    // joinWorkspace redirects on success
  }

  // If not logged in, prompt to login
  return (
    <div className="flex-1 flex items-center justify-center bg-[#222]">
      <div className="text-center p-8 bg-[#1a1a1a] rounded-xl border border-[#333] shadow-xl max-w-sm w-full">
        <div className="w-16 h-16 bg-[#ccff00] rounded-xl mx-auto mb-6 flex items-center justify-center">
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">You have been invited!</h1>
        <p className="text-gray-400 mb-6 text-sm">Please sign in to accept the invitation and join the workspace.</p>
        
        <p className="text-xs text-gray-500 mb-2">You will be redirected to login automatically...</p>
        
        {/* We can provide a manual button just in case */}
        <a 
          href={`/?callbackUrl=/join?w=${workspaceId}`}
          className="block w-full bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold py-3 px-4 rounded-lg transition duration-200 mt-4"
        >
          Sign in to Join
        </a>
      </div>
    </div>
  )
}
