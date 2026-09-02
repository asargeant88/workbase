"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname()

  const links = [
    { name: "Projects", href: "/jobs", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { name: "Companies", href: "/companies", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { name: "Users", href: "/users", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
    { name: "Settings", href: "/settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
  ]

  return (
    <div className="w-64 bg-[#121212] border-r border-[#2a2a2a] flex flex-col justify-between h-full shrink-0">
      <div>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-[#2a2a2a] mb-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-[#ccff00] rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-white font-bold tracking-widest text-sm mt-1">WORKBASE</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "bg-[#1f2910] text-[#ccff00]" : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                </svg>
                {link.name}
                {link.badge && (
                  <span className="ml-auto bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <div className="bg-[#1a1a1a] rounded-xl p-3 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ccff00] flex items-center justify-center text-black font-bold text-sm shrink-0">
              {user.name?.substring(0, 2).toUpperCase() || "US"}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-gray-500 text-xs truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full bg-[#2a2a2a] hover:bg-[#333] text-gray-300 text-xs py-2 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
