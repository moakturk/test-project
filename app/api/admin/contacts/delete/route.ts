import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabase/server"

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
    const { contactId } = body

    // Validation
    if (!contactId || typeof contactId !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid contact ID" },
        { status: 400 }
      )
    }

    // Delete contact from database
    const { error } = await supabaseAdmin
      .from("contacts")
      .delete()
      .eq("id", contactId)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json(
        { success: false, message: "Failed to delete contact" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
