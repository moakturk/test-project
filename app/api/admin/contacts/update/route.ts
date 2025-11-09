import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabase/server"

const VALID_STATUSES = ["new", "read", "replied", "archived"] as const
type ContactStatus = typeof VALID_STATUSES[number]

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { contactId, status } = body

    // Validation
    if (!contactId || typeof contactId !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid contact ID" },
        { status: 400 }
      )
    }

    if (!status || !VALID_STATUSES.includes(status as ContactStatus)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      )
    }

    // Update contact status in database
    const { data, error } = await supabaseAdmin
      .from("contacts")
      .update({ status })
      .eq("id", contactId)
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { success: false, message: "Failed to update contact" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Contact status updated successfully",
      data,
    })
  } catch (error) {
    console.error("Error updating contact:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
