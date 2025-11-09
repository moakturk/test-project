import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase/server"
import { LogOut, Mail, Building, MessageSquare, Calendar, Filter } from "lucide-react"
import Link from "next/link"
import ContactActions from "./contact-actions"

type ContactStatus = "new" | "read" | "replied" | "archived"

interface Contact {
  id: string
  name: string
  email: string
  company: string | null
  message: string
  status: ContactStatus
  created_at: string
}

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: ContactStatus }>
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  // Get filter status
  const params = await searchParams
  const filterStatus = params.status

  // Build query
  let query = supabaseAdmin
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })

  // Apply status filter if provided
  if (filterStatus) {
    query = query.eq("status", filterStatus)
  }

  const { data: contacts, error } = await query

  if (error) {
    console.error("Error fetching contacts:", error)
  }

  // Get status counts for badges
  const { count: newCount } = await supabaseAdmin
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("status", "new")

  const { count: readCount } = await supabaseAdmin
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("status", "read")

  const { count: repliedCount } = await supabaseAdmin
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("status", "replied")

  const { count: archivedCount } = await supabaseAdmin
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("status", "archived")

  const statusColors: Record<ContactStatus, string> = {
    new: "bg-green-500/20 text-green-400 border-green-500/30",
    read: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    replied: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    archived: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-2xl font-bold text-white">Contact Management</h1>
                <p className="text-sm text-gray-400 mt-1">
                  Manage and respond to customer inquiries
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                ← Dashboard
              </Link>
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
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto">
          <div className="flex items-center gap-2 text-gray-400 mr-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filter:</span>
          </div>
          <Link
            href="/admin/contacts"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              !filterStatus
                ? "bg-primary-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            All ({(newCount || 0) + (readCount || 0) + (repliedCount || 0) + (archivedCount || 0)})
          </Link>
          <Link
            href="/admin/contacts?status=new"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterStatus === "new"
                ? "bg-green-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            New ({newCount || 0})
          </Link>
          <Link
            href="/admin/contacts?status=read"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterStatus === "read"
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Read ({readCount || 0})
          </Link>
          <Link
            href="/admin/contacts?status=replied"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterStatus === "replied"
                ? "bg-purple-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Replied ({repliedCount || 0})
          </Link>
          <Link
            href="/admin/contacts?status=archived"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              filterStatus === "archived"
                ? "bg-gray-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Archived ({archivedCount || 0})
          </Link>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts && contacts.length > 0 ? (
            contacts.map((contact: Contact) => (
              <div
                key={contact.id}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-white">
                        {contact.name}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${
                          statusColors[contact.status]
                        }`}
                      >
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                      </span>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Mail className="h-4 w-4 text-primary-400" />
                        <a
                          href={`mailto:${contact.email}`}
                          className="hover:text-primary-400 transition-colors"
                        >
                          {contact.email}
                        </a>
                      </div>
                      {contact.company && (
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Building className="h-4 w-4 text-primary-400" />
                          <span>{contact.company}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="h-4 w-4 text-primary-400" />
                        <span>
                          {new Date(contact.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-xs font-medium text-gray-400 uppercase">
                          Message
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">
                        {contact.message}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <ContactActions
                    contactId={contact.id}
                    currentStatus={contact.status}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-12 text-center">
              <Mail className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No contacts found
              </h3>
              <p className="text-gray-400">
                {filterStatus
                  ? `No contacts with status "${filterStatus}"`
                  : "No contact submissions yet"}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
