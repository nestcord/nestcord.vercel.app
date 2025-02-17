"use client";

import useSWRInfinite from 'swr/infinite'
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "./Card";
import { StatusType } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Feed() {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.nextCursor) return null;
    return `/api/feed?cursor=${previousPageData?.nextCursor ?? ""}&limit=10`;
  };

  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(getKey, fetcher);
  const status = data ? data.flatMap(page => page.status) : [];

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isValidating) {
        setSize(size + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [size, isValidating, setSize]);

  return (
    <section className="mr-36 w-full max-w-[800px] md:ml-16 p-4 max-sm:ml-10" id="feed">
      <Tabs defaultValue="home">
        <TabsList className="fixed justify-center w-[770px] max-sm:w-[350] max-sm:ml-2 gap-6">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="py-8">
          { /** Loading state */ }
          {isLoading && <p>Loading...</p>}

          { /** Loaded state */ }
          {status.map((status: StatusType) => (
            <Card key={status.id} {...status} />
          ))}

        </TabsContent>

        <TabsContent value="following" className="py-8">
          <p>Following</p>
        </TabsContent>
      </Tabs>
    </section>
  );
}
