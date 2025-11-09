"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, MoreVertical, Check, Eye, Reply, Archive } from "lucide-react"

type ContactStatus = "new" | "read" | "replied" | "archived"

interface ContactActionsProps {
  contactId: string
  currentStatus: ContactStatus
}

export default function ContactActions({
  contactId,
  currentStatus,
}: ContactActionsProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusChange = async (newStatus: ContactStatus) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/contacts/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId, status: newStatus }),
      })

      if (response.ok) {
        router.refresh()
        setIsOpen(false)
      } else {
        alert("Failed to update status")
      }
    } catch (error) {
      console.error("Error updating status:", error)
      alert("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this contact? This action cannot be undone.")) {
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/contacts/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert("Failed to delete contact")
      }
    } catch (error) {
      console.error("Error deleting contact:", error)
      alert("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const statusOptions = [
    { value: "new", label: "New", icon: Check, color: "text-green-400" },
    { value: "read", label: "Read", icon: Eye, color: "text-blue-400" },
    { value: "replied", label: "Replied", icon: Reply, color: "text-purple-400" },
    { value: "archived", label: "Archived", icon: Archive, color: "text-gray-400" },
  ] as const

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="p-2 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
      >
        <MoreVertical className="h-5 w-5 text-gray-400" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute right-0 top-10 z-20 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
            {/* Status Options */}
            <div className="p-2 border-b border-gray-700">
              <p className="text-xs font-medium text-gray-400 px-2 py-1">
                Change Status
              </p>
              {statusOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    onClick={() => handleStatusChange(option.value)}
                    disabled={isLoading || currentStatus === option.value}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors ${
                      currentStatus === option.value
                        ? "bg-gray-700 text-white cursor-default"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } disabled:opacity-50`}
                  >
                    <Icon className={`h-4 w-4 ${option.color}`} />
                    <span>{option.label}</span>
                    {currentStatus === option.value && (
                      <Check className="h-3 w-3 ml-auto" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Delete Option */}
            <div className="p-2">
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
