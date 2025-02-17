"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChartNoAxesColumn, Heart, MessageCircle, Share } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { mutate } from "swr";
import { updateStatusViews } from "../actions/Update-Views";

dayjs.extend(relativeTime);

export interface CardProps {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    biography?: string;
    created_at: string;
  };
  content: string;
  comments: number;
  likes: number;
  views: number;
  created_at: string;
}

export default function Card({ id, author, content, comments, likes, views, created_at }: CardProps) {
  const [hasLiked, setHasLiked] = useState(false);
  const createdAt = dayjs(created_at).fromNow();

  const hasViewed = useRef(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })
  // Simulación de acción de "Like"
  const handleLike = () => setHasLiked(!hasLiked);

  // Simulación de aumento de vistas
  useEffect(() => {

    if (inView && !hasViewed.current) {
      updateStatusViews(id, views + 1, author.id).then((success) => {
        if (success) mutate(`/api/feed?id=${id}`)
      })
      hasViewed.current = true;
    }
  }, [author.id, id, inView, views]);

  return (
    <div ref={ref} className="border-b border-border px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
      <div className="flex gap-3">
        {/* Enlace al perfil del autor (Avatar y nombre) */}
        <Link href={`/${author.username}`} className="flex-shrink-0">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.avatar} alt={author.username} />
            <AvatarFallback>2</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            {/* Enlace al perfil del autor (nombre) */}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link href={`/${author.username}`} className="font-bold hover:underline">
                  {author.name}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <p className="text-sm">{author.biography || "No bio available"}</p>
              </HoverCardContent>
            </HoverCard>
            <span className="text-muted-foreground text-sm">@{author.username} · {createdAt}</span>
          </div>

          {/* Enlace al post completo */}
          <Link href={`/status/${id}`} className="mt-2 text-[15px] leading-normal">
            <ReactMarkdown>{content}</ReactMarkdown>
          </Link>

          {/* Acciones del post */}
          <div className="flex items-center gap-6 mt-3">
            {/* Comentarios */}
            <Button variant="ghost" size="icon" className="h-8 w-8 group hover:text-blue-500">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">{comments}</span>
            </Button>

            {/* Likes */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={`h-8 w-8 ${hasLiked ? "text-red-500" : "hover:text-red-500"}`}
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">{likes}</span>
            </Button>

            {/* Enlace a las vistas */}
            <Link href={`/post/${id}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-blue-500">
              <ChartNoAxesColumn className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">{views}</span>
            </Button>
            </Link>

            {/* Compartir */}
            <Button
              variant="ghost"
              size="icon"
            >
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
