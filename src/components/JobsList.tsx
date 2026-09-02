"use client"

import Link from "next/link"

type Job = {
  id: string
  name: string
  updatedAt: Date
  createdAt: Date
}

export function JobsList({ jobs }: { jobs: Job[] }) {
  if (!jobs.length) {
    return <p className="text-gray-500 py-4">No jobs found. Create one to get started.</p>
  }

  return (
    <ul className="divide-y divide-[#2a2a2a]">
      {jobs.map((job) => (
        <li key={job.id} className="hover:bg-[#222222] transition duration-150 group">
          <Link href={`/jobs/${job.id}`} className="block p-4 pl-6 border-l-4 border-transparent hover:border-[#ccff00]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-gray-200 truncate group-hover:text-white transition">{job.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Last updated {new Date(job.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
