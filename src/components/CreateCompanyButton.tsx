"use client"

import { useState } from "react"
import { createCompany } from "@/app/actions/companies"

export function CreateCompanyButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    await createCompany({ name, address, phone, email })
    setName("")
    setAddress("")
    setPhone("")
    setEmail("")
    setIsOpen(false)
    setLoading(false)
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold py-2 px-6 rounded-md transition duration-200 text-sm flex items-center gap-2"
      >
        <span>+</span> Add Company
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold mb-6 text-white">Add New Company</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Company Name *</label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  className="w-full bg-[#222] border border-[#333] text-white rounded-lg p-3 focus:outline-none focus:border-[#ccff00]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Address</label>
                <input
                  type="text"
                  placeholder="123 Business St..."
                  className="w-full bg-[#222] border border-[#333] text-white rounded-lg p-3 focus:outline-none focus:border-[#ccff00]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="contact@acme.com"
                    className="w-full bg-[#222] border border-[#333] text-white rounded-lg p-3 focus:outline-none focus:border-[#ccff00]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="w-full bg-[#222] border border-[#333] text-white rounded-lg p-3 focus:outline-none focus:border-[#ccff00]"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-[#333]">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white rounded transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#ccff00] text-black font-bold rounded-lg hover:bg-[#b3e600] disabled:opacity-50 transition"
                >
                  {loading ? "Adding..." : "Add Company"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
