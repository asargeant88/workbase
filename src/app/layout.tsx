import { auth, signIn } from "@/auth"
import Sidebar from "@/components/Sidebar"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "WorkBase",
  description: "Field Service Management",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body className="bg-[#121212] text-gray-200 antialiased h-screen overflow-hidden flex">
        {!session?.user ? (
          <div className="flex w-full h-full items-center justify-center bg-[#1a1a1a]">
            <div className="text-center p-8 bg-[#222222] rounded-xl shadow-2xl w-full max-w-sm border border-[#333]">
              <div className="mb-8">
                <div className="w-16 h-16 bg-[#ccff00] rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-2">WORKBASE</h1>
                <p className="text-gray-400">Field Service Management</p>
              </div>
              
              <form action={async () => { "use server"; await signIn("credentials", { email: "test@example.com", redirectTo: "/jobs" }) }}>
                <button type="submit" className="w-full bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold py-3 px-4 rounded-lg transition duration-200">
                  Sign in with Test Account
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            <Sidebar user={session.user} />
            <div className="flex-1 flex overflow-hidden">
              {children}
            </div>
          </>
        )}
      </body>
    </html>
  )
}
