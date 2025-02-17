"use client";

import { UserType } from "@/lib/types";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function AsideSuggetions() {
    const { data, isLoading } = useSWR("/api/user/lookup", fetcher);

    return (
        <section className="bg-transparent border rounded-xl p-4 shadow-inner" id="user-suggestions">
            <h2 className="font-bold text-xl mb-4 text-gray-800 dark:text-gray-200">Who to follow</h2>

            { /** Loading state */ }
            {isLoading && <p>Loading...</p>}

            { /** Loaded state */ }
                <ul className="space-y-4">
                    {data.map((user: UserType) => {
                        <li key={user.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                            <Link href={user.username}>
                            </Link>
                        </li>
                    })}
                </ul>

        </section>
    )
}