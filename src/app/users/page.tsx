import { getWorkspaceMembers, getInviteLink } from "@/app/actions/users"

export default async function UsersPage() {
  const members = await getWorkspaceMembers()
  const inviteLink = await getInviteLink()
  
  const qrCodeUrl = inviteLink 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(inviteLink)}&color=000000&bgcolor=ffffff`
    : null

  return (
    <>
      {/* Middle Column (Users List) */}
      <div className="w-80 bg-[#1a1a1a] border-r border-[#2a2a2a] flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-[#2a2a2a]">
          <h2 className="text-xl font-bold text-white tracking-wide">Team Members</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-[#2a2a2a]">
            {members.map((member) => (
              <li key={member.id} className="p-4 flex flex-col gap-2 hover:bg-[#222222] transition border-l-4 border-transparent hover:border-[#ccff00]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-white font-bold shrink-0">
                    {(member.user.name || "U").substring(0,2).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-white font-medium truncate">{member.user.name || "Unknown User"}</p>
                    <p className="text-xs text-gray-400 truncate">{member.user.email}</p>
                  </div>
                </div>
                <div className="ml-13">
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${member.role === 'owner' ? 'bg-[#ccff00]/20 text-[#ccff00]' : 'bg-[#333] text-gray-300'}`}>
                    {member.role.toUpperCase()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column (Invite Detail) */}
      <div className="flex-1 bg-[#222222] flex flex-col overflow-y-auto">
        <div className="p-10 max-w-2xl mx-auto w-full mt-12">
          <div className="bg-[#1a1a1a] rounded-2xl border border-[#333] p-10 text-center shadow-2xl">
            <div className="w-16 h-16 bg-[#ccff00] rounded-xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">Invite to Workspace</h1>
            <p className="text-gray-400 mb-8 max-w-sm mx-auto">
              Scan the QR code below on a mobile device or tablet to instantly join this workspace.
            </p>
            
            {qrCodeUrl ? (
              <div className="bg-white p-6 rounded-2xl inline-block mb-8 shadow-inner border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrCodeUrl} alt="Invite QR Code" className="w-64 h-64 mx-auto" />
              </div>
            ) : (
              <p className="text-red-400 mb-8">Unable to generate invite link.</p>
            )}

            <div className="text-left bg-[#222] p-4 rounded-xl border border-[#333]">
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Or copy direct link</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={inviteLink || ""} 
                  className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-2.5 text-sm text-gray-300 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
