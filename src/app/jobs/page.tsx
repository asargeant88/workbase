export default function JobsPage() {
  return (
    <div className="flex-1 flex items-center justify-center relative">
      {/* Background faded logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-3xl border-8 border-white mb-6 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full"></div>
          </div>
          <h1 className="text-6xl font-black tracking-widest text-white">WORKBASE</h1>
        </div>
      </div>
      
      {/* Empty State message */}
      <div className="text-center z-10">
        <div className="w-16 h-16 bg-[#2a2a2a] rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-1">No jobs found</h3>
        <p className="text-gray-400 text-sm mb-6">Select a job from the list to view details.</p>
      </div>
    </div>
  )
}
