"use client";

import useSWR from "swr";
import Card, { CardProps } from "@/components/status/Card";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function ProfilePosts({ id }: { id: string }) {
    const { data, isLoading } = useSWR(`/user/${id}/status`, fetcher);

    return (
        <section className="mr-36 w-full max-w-[800px] md:ml-16 p-4">

            { /** Loading state */ }
            {isLoading && <p>Loading...</p>}

            { /** Loaded state */ }
            {data?.map((status: CardProps) => (
                <Card key={status.id} {...status}  />
                ))}
        </section>
    )
}