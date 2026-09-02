import { getJobs } from "@/app/actions/jobs"
import { getCompanies } from "@/app/actions/companies"
import { CreateJobButton } from "@/components/CreateJobButton"
import { JobsList } from "@/components/JobsList"

export default async function JobsLayout({ children }: { children: React.ReactNode }) {
  const jobs = await getJobs()
  const companies = await getCompanies()

  return (
    <>
      {/* Detail View (now in the middle) */}
      <div className="flex-1 bg-[#222222] flex flex-col overflow-hidden">
        {children}
      </div>
      
      {/* Jobs Master List (now on the right) */}
      <div className="w-80 bg-[#1a1a1a] border-l border-[#2a2a2a] flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-[#2a2a2a] space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search" 
                className="block w-full pl-9 pr-3 py-1.5 border border-[#333] rounded-md leading-5 bg-[#222] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ccff00] focus:border-[#ccff00] sm:text-sm"
              />
            </div>
            <CreateJobButton companies={companies} />
            <button className="p-1.5 border border-[#333] rounded-md bg-[#222] text-gray-400 hover:text-white transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <JobsList jobs={jobs} />
        </div>

        <div className="p-4 border-t border-[#2a2a2a] text-center text-xs text-gray-500">
          <p>{jobs.length} of {jobs.length} results</p>
          <div className="mt-2 flex justify-center gap-4">
            <button className="hover:text-white transition">&lt; Previous</button>
            <button className="hover:text-white transition">Next &gt;</button>
          </div>
        </div>
      </div>
    </>
  )
}
