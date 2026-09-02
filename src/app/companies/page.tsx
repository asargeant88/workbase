import { getCompanies } from "@/app/actions/companies"
import { CreateCompanyButton } from "@/components/CreateCompanyButton"

export default async function CompaniesPage() {
  const companies = await getCompanies()

  return (
    <>
      <div className="flex-1 bg-[#222222] p-8 overflow-y-auto flex flex-col">
        <div className="max-w-5xl mx-auto w-full space-y-8">
          <header className="flex justify-between items-end border-b border-[#333] pb-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Companies</h1>
              <p className="text-gray-400">Manage clients or companies associated with your projects.</p>
            </div>
            <CreateCompanyButton />
          </header>

          {companies.length === 0 ? (
            <div className="bg-[#1a1a1a] rounded-xl border border-[#333] p-12 text-center">
              <div className="w-16 h-16 bg-[#2a2a2a] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Companies Found</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">You haven't added any companies yet. Create one to easily assign it to future projects.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <div key={company.id} className="bg-[#1a1a1a] rounded-xl border border-[#333] p-5 hover:border-[#ccff00] transition">
                  <h3 className="text-lg font-bold text-white mb-1">{company.name}</h3>
                  <div className="space-y-2 mt-4 text-sm">
                    {company.address && (
                      <div className="flex items-start gap-2 text-gray-400">
                        <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{company.address}</span>
                      </div>
                    )}
                    {company.email && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{company.email}</span>
                      </div>
                    )}
                    {company.phone && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{company.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
