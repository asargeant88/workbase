import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { TimelineForm } from "@/components/TimelineForm"

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      company: true,
      timeline: {
        orderBy: { createdAt: 'asc' },
        include: { user: true }
      }
    }
  })

  if (!job) notFound()

  return (
    <div className="flex flex-col h-full bg-[#222222]">
      {/* Detail View Header */}
      <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] z-10 shrink-0 h-16 flex items-center">
        <div className="px-6 flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-white tracking-wide">{job.name.toUpperCase()}</h1>
          </div>
          
          <button className="text-black bg-[#ccff00] hover:bg-[#b3e600] rounded-md px-4 py-1.5 transition text-sm font-bold flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Report
          </button>
        </div>
      </header>

      {/* Timeline Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6 max-w-3xl mx-auto">
          
          {/* Job Details Card */}
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333] mb-8 flex flex-wrap gap-6 text-sm">
            {job.company && (
              <div>
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Company</span>
                <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-[#ccff00]/20 text-[#ccff00]">
                  {job.company.name.toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Priority</span>
              <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${job.priority === 'high' ? 'bg-red-500/20 text-red-500' : job.priority === 'low' ? 'bg-blue-500/20 text-blue-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                {job.priority.toUpperCase()}
              </span>
            </div>
            {job.jobDate && (
              <div>
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Scheduled Date</span>
                <span className="text-gray-200 font-medium">
                  {new Date(job.jobDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            )}
            {job.address && (
              <div className="flex-1 min-w-[200px]">
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Address</span>
                <span className="text-gray-200 font-medium">{job.address}</span>
              </div>
            )}
            <div>
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Created On</span>
              <span className="text-gray-400">
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {job.timeline.length === 0 ? (
             <div className="text-center z-10 mt-20">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-1">No activity yet</h3>
              <p className="text-gray-400 text-sm mb-6">Start by sending a message or taking a photo!</p>
            </div>
          ) : (
            job.timeline.map((item) => (
              <div key={item.id} className="bg-[#1a1a1a] p-5 rounded-xl border border-[#333]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-white text-xs font-bold">
                    {(item.user?.name || "SYS").substring(0,2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-200">{item.user?.name || item.user?.email || "System"}</div>
                    <div className="text-xs text-gray-500">{item.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                </div>
                
                {item.type === "message" && (
                  <p className="text-gray-300 ml-11">{item.content}</p>
                )}
                
                {item.type === "photo" && (
                  <div className="relative h-64 w-full md:w-2/3 rounded-lg overflow-hidden mt-2 ml-11 border border-[#333]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.content} alt="Job Photo" className="object-cover w-full h-full" />
                  </div>
                )}
                
                {item.type === "report_view" && (
                  <p className="text-sm text-[#ccff00] italic ml-11">Report viewed via shared link</p>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      <div className="shrink-0 bg-[#1a1a1a] border-t border-[#2a2a2a] p-4">
        <div className="max-w-3xl mx-auto">
          <TimelineForm jobId={job.id} />
        </div>
      </div>
    </div>
  )
}
