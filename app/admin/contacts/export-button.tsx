"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Contact {
  id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  message: string
  status: string
  created_at: string
}

interface ExportButtonProps {
  contacts: Contact[]
  filename?: string
}

export default function ExportButton({ contacts, filename = "contacts" }: ExportButtonProps) {
  const exportToCSV = () => {
    if (!contacts || contacts.length === 0) {
      alert("No contacts to export")
      return
    }

    // CSV headers
    const headers = ["ID", "Name", "Email", "Company", "Phone", "Message", "Status", "Created At"]

    // Convert contacts to CSV rows
    const rows = contacts.map((contact) => [
      contact.id,
      `"${contact.name.replace(/"/g, '""')}"`, // Escape quotes
      contact.email,
      contact.company ? `"${contact.company.replace(/"/g, '""')}"` : "",
      contact.phone || "",
      `"${contact.message.replace(/"/g, '""')}"`, // Escape quotes and newlines
      contact.status,
      new Date(contact.created_at).toLocaleString(),
    ])

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n")

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      const timestamp = new Date().toISOString().split("T")[0]
      link.setAttribute("href", url)
      link.setAttribute("download", `${filename}_${timestamp}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <Button
      onClick={exportToCSV}
      variant="outline"
      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
    >
      <Download className="w-4 h-4 mr-2" />
      Export CSV ({contacts.length})
    </Button>
  )
}
