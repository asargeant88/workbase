import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/")

  return (
    <div className="flex flex-col h-full bg-[#222222]">
      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] shrink-0 h-16 flex items-center px-6">
        <h1 className="text-xl font-bold text-white tracking-wide">Settings</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Profile Section */}
          <section className="bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden">
            <div className="p-6 border-b border-[#333]">
              <h2 className="text-lg font-bold text-white mb-1">Profile Information</h2>
              <p className="text-sm text-gray-400">Update your account's profile information and email address.</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  defaultValue={session.user.name || ""} 
                  disabled
                  className="w-full bg-[#222] border border-[#333] rounded-lg px-4 py-2.5 text-gray-300 opacity-70 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  defaultValue={session.user.email || ""} 
                  disabled
                  className="w-full bg-[#222] border border-[#333] rounded-lg px-4 py-2.5 text-gray-300 opacity-70 cursor-not-allowed"
                />
              </div>
              <div className="flex justify-end">
                <button disabled className="bg-[#ccff00] text-black font-bold px-6 py-2.5 rounded-lg opacity-50 cursor-not-allowed">
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* Workspace Preferences */}
          <section className="bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden">
            <div className="p-6 border-b border-[#333]">
              <h2 className="text-lg font-bold text-white mb-1">Workspace Preferences</h2>
              <p className="text-sm text-gray-400">Manage your workspace settings and team defaults.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Dark Mode</h3>
                  <p className="text-sm text-gray-500">Enable dark mode across the application.</p>
                </div>
                <div className="w-12 h-6 bg-[#ccff00] rounded-full p-1 flex justify-end items-center cursor-not-allowed opacity-80">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
              </div>
              <hr className="border-[#333]" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive an email when someone views a shared report.</p>
                </div>
                <div className="w-12 h-6 bg-[#333] rounded-full p-1 flex justify-start items-center cursor-not-allowed opacity-80">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="bg-red-500/10 rounded-xl border border-red-500/20 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-bold text-red-500 mb-1">Danger Zone</h2>
              <p className="text-sm text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button disabled className="bg-red-500/20 text-red-500 font-bold px-6 py-2.5 rounded-lg border border-red-500/30 opacity-50 cursor-not-allowed">
                Delete Account
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
