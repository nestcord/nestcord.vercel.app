export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      badges: {
        Row: {
          description: string
          id: number
          name: string
        }
        Insert: {
          description: string
          id?: number
          name: string
        }
        Update: {
          description?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          id: string
          status_id: string
          user_id: string
        }
        Insert: {
          id?: string
          status_id: string
          user_id: string
        }
        Update: {
          id?: string
          status_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_author_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "status"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachment: string | null
          author: string
          channel_id: string | null
          channel_idsd: string
          content: string
          created_at: string
          delivered_to: string
          id: string
          read_state: boolean
          updated_at: string | null
        }
        Insert: {
          attachment?: string | null
          author: string
          channel_id?: string | null
          channel_idsd?: string
          content: string
          created_at?: string
          delivered_to: string
          id?: string
          read_state?: boolean
          updated_at?: string | null
        }
        Update: {
          attachment?: string | null
          author?: string
          channel_id?: string | null
          channel_idsd?: string
          content?: string
          created_at?: string
          delivered_to?: string
          id?: string
          read_state?: boolean
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_delivered_to_fkey"
            columns: ["delivered_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          author: string
          id: string
          status_id: string
        }
        Insert: {
          author: string
          id?: string
          status_id: string
        }
        Update: {
          author?: string
          id?: string
          status_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: true
            referencedRelation: "status"
            referencedColumns: ["id"]
          },
        ]
      }
      status: {
        Row: {
          attachment: string | null
          author: string
          comments: number
          content: string | null
          created_at: string
          id: string
          likes: number
          updated_at: string | null
          views: number
        }
        Insert: {
          attachment?: string | null
          author: string
          comments?: number
          content?: string | null
          created_at?: string
          id?: string
          likes?: number
          updated_at?: string | null
          views?: number
        }
        Update: {
          attachment?: string | null
          author?: string
          comments?: number
          content?: string | null
          created_at?: string
          id?: string
          likes?: number
          updated_at?: string | null
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "status_author_id_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      "status.replies": {
        Row: {
          attachment: string | null
          author: string | null
          comments: number | null
          content: string | null
          created_at: string
          id: string
          likes: number | null
          status_id: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          attachment?: string | null
          author?: string | null
          comments?: number | null
          content?: string | null
          created_at?: string
          id?: string
          likes?: number | null
          status_id: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          attachment?: string | null
          author?: string | null
          comments?: number | null
          content?: string | null
          created_at?: string
          id?: string
          likes?: number | null
          status_id?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "replies_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "replies_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "status"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar: string | null
          biography: string | null
          category: string | null
          created_at: string
          email: string | null
          followers: number
          following: number
          id: string
          location: string | null
          name: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar?: string | null
          biography?: string | null
          category?: string | null
          created_at?: string
          email?: string | null
          followers?: number
          following?: number
          id: string
          location?: string | null
          name?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar?: string | null
          biography?: string | null
          category?: string | null
          created_at?: string
          email?: string | null
          followers?: number
          following?: number
          id?: string
          location?: string | null
          name?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      "users.badges": {
        Row: {
          badge_id: number
          expires_at: string | null
          granted_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: number
          expires_at?: string | null
          granted_at: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: number
          expires_at?: string | null
          granted_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_bades_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_bades_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_unique_username: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      decrement_like: {
        Args: {
          status_id: string
        }
        Returns: undefined
      }
      decrementstatuslikes: {
        Args: {
          status_id: string
        }
        Returns: undefined
      }
      generate_random_username: {
        Args: {
          base_name: string
        }
        Returns: string
      }
      handlelikes: {
        Args: {
          status_id: number
          user_id: string
          increment: boolean
        }
        Returns: undefined
      }
      handlestatuslikes: {
        Args: {
          statusidprop: string
          user_id: string
        }
        Returns: {
          id: string
          likes: number
        }[]
      }
      increment_like: {
        Args: {
          status_id: string
        }
        Returns: undefined
      }
      incrementstatuslikes: {
        Args: {
          status_id: string
        }
        Returns: undefined
      }
      snowflake: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      unique_user_name: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      unique_username: {
        Args: {
          base_name: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
