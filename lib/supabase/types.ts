export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          message: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          message: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          message?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      detailed_analysis: {
        Row: {
          id: string
          contact_id: string | null
          current_processes: string | null
          pain_points: string | null
          team_size: string | null
          current_tools: string | null
          automation_goals: string | null
          budget_range: string | null
          timeline: string | null
          success_metrics: string | null
          integration_needs: string | null
          additional_info: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          contact_id?: string | null
          current_processes?: string | null
          pain_points?: string | null
          team_size?: string | null
          current_tools?: string | null
          automation_goals?: string | null
          budget_range?: string | null
          timeline?: string | null
          success_metrics?: string | null
          integration_needs?: string | null
          additional_info?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          contact_id?: string | null
          current_processes?: string | null
          pain_points?: string | null
          team_size?: string | null
          current_tools?: string | null
          automation_goals?: string | null
          budget_range?: string | null
          timeline?: string | null
          success_metrics?: string | null
          integration_needs?: string | null
          additional_info?: string | null
          status?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
