import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase/server"
import { LogOut, Mail, Users, Calendar } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  // Get contact submissions count
  const { count: totalContacts } = await supabaseAdmin
    .from("contacts")
    .select("*", { count: "exact", head: true })

  const { count: newContacts } = await supabaseAdmin
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("status", "new")

  // Get recent contacts
  const { data: recentContacts } = await supabaseAdmin
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-gray-400 mt-1">
                Welcome back, {session.user.name}
              </p>
            </div>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary-500/20 to-primary-600/10 border border-primary-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-500/20 rounded-lg">
                <Mail className="h-6 w-6 text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Contacts</p>
                <p className="text-3xl font-bold text-white">{totalContacts || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">New Contacts</p>
                <p className="text-3xl font-bold text-white">{newContacts || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">This Month</p>
                <p className="text-3xl font-bold text-white">
                  {recentContacts?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Contacts</h2>
            <Link
              href="/admin/contacts"
              className="text-sm text-primary-400 hover:text-primary-300"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {recentContacts && recentContacts.length > 0 ? (
              recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{contact.name}</h3>
                      <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                        {contact.status || "new"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{contact.email}</p>
                    {contact.company && (
                      <p className="text-sm text-gray-500 mt-1">{contact.company}</p>
                    )}
                    <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                      {contact.message}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-500">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No contacts yet
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
