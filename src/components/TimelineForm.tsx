"use client"

import { useState, useRef } from "react"
import { addMessage, addPhotos } from "@/app/actions/timeline"

export function TimelineForm({ jobId }: { jobId: string }) {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleMessageSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    setLoading(true)
    await addMessage(jobId, message)
    setMessage("")
    setLoading(false)
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (files.length === 0) return

    setLoading(true)
    
    // Convert all files to base64
    const promises = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = (event) => resolve(event.target?.result as string)
        reader.readAsDataURL(file)
      })
    })

    const base64Images = await Promise.all(promises)
    await addPhotos(jobId, base64Images)
    
    setLoading(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="flex gap-2">
      <form onSubmit={handleMessageSubmit} className="flex-1 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a message..."
          className="flex-1 bg-[#222222] border border-[#333] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#ccff00]"
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading || !message.trim()}
          className="bg-[#ccff00] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#b3e600] disabled:opacity-50 transition"
        >
          Send
        </button>
      </form>

      <button 
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="bg-[#222222] text-gray-400 px-4 py-2.5 rounded-lg hover:bg-[#333] hover:text-white border border-[#333] flex items-center gap-2 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Photo
      </button>
      <input 
        type="file" 
        accept="image/*" 
        multiple
        capture="environment"
        ref={fileInputRef} 
        onChange={handlePhotoChange} 
        className="hidden" 
      />
    </div>
  )
}
