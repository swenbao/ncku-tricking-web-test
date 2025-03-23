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
      bookings: {
        Row: {
          booking_date: string
          class_id: string | null
          created_at: string | null
          id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          booking_date: string
          class_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          booking_date?: string
          class_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_schedule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      class_schedule: {
        Row: {
          created_at: string | null
          day: string
          description: string | null
          difficulty: string
          id: string
          level: string
          name: string
          points_cost: number
          time: string
          type: string
        }
        Insert: {
          created_at?: string | null
          day: string
          description?: string | null
          difficulty: string
          id?: string
          level: string
          name: string
          points_cost: number
          time: string
          type: string
        }
        Update: {
          created_at?: string | null
          day?: string
          description?: string | null
          difficulty?: string
          id?: string
          level?: string
          name?: string
          points_cost?: number
          time?: string
          type?: string
        }
        Relationships: []
      }
      completed_tricks: {
        Row: {
          completed_at: string | null
          id: string
          status: string | null
          trick_id: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          status?: string | null
          trick_id?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          status?: string | null
          trick_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "completed_tricks_trick_id_fkey"
            columns: ["trick_id"]
            isOneToOne: false
            referencedRelation: "tricks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "completed_tricks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          package_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          package_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          package_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "point_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      point_packages: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          points: number
          popular: boolean | null
          price: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          points: number
          popular?: boolean | null
          price: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          points?: number
          popular?: boolean | null
          price?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          phone_number: string | null
          points: number | null
          profile_picture: string | null
          role: string | null
          sex: string | null
          status: string | null
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          phone_number?: string | null
          points?: number | null
          profile_picture?: string | null
          role?: string | null
          sex?: string | null
          status?: string | null
        }
        Update: {
          age?: number | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone_number?: string | null
          points?: number | null
          profile_picture?: string | null
          role?: string | null
          sex?: string | null
          status?: string | null
        }
        Relationships: []
      }
      tricks: {
        Row: {
          categories: string[]
          created_at: string | null
          description: string | null
          id: string
          level: string
          name: string
          prerequisites: string[] | null
          video_url: string | null
        }
        Insert: {
          categories: string[]
          created_at?: string | null
          description?: string | null
          id?: string
          level: string
          name: string
          prerequisites?: string[] | null
          video_url?: string | null
        }
        Update: {
          categories?: string[]
          created_at?: string | null
          description?: string | null
          id?: string
          level?: string
          name?: string
          prerequisites?: string[] | null
          video_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_tricks_with_status: {
        Args: {
          user_uuid: string
        }
        Returns: {
          id: string
          name: string
          level: string
          description: string
          video_url: string
          categories: string[]
          prerequisites: string[]
          status: string
        }[]
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
