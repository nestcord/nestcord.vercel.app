"use client";

import { useUser } from "@/contexts/UserContext";
import { db } from "@/lib/client";
import { useEffect, useState } from "react";

interface Message {
    id: string
    channel_id: string
    author: string
    delivered_to: string
    content: string
    read_state: boolean
    created_at: string
  }


  export function useChat(channelId: string) {
    const [messages, setMessages] = useState<Message[]>([])
    const { user } = useUser()
    
    useEffect(() => {
      const fetchMessages = async () => {
        const { data } = await db
          .from("messages")
          .select("*")
          .eq("channel_id", channelId)
          .order("created_at", { ascending: true })
        if (data) setMessages(data)

          if (data) {
            const { data: updateData } = await db
            .from("messages")
            .update({ read_state: true })
            .eq("channel_id", channelId)
            .neq("author", user?.id)
            
            if (updateData) console.log("[WS]: Updated unread messages")
          }
      }
  
      fetchMessages()
  
      // Suscribirse a nuevos mensajes
      const subscription = db
        .channel("realtime-messages")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages", filter: `channel_id=eq.${channelId}` },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as Message])
          }
        )
        .subscribe()
  
      return () => {
        db.removeChannel(subscription)
      }
    }, [channelId])
  
    return { messages }
  }