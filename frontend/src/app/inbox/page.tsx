'use client';

import Loader from "@/components/Loader";
import { MessagesResponse } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment } from "react";

export default function InboxPage() {
  const userId = '67d769c333a561fe2f5c0319';

  const { data, isLoading, error } = useQuery({
    queryKey: ['messages'],
    queryFn: (): Promise<MessagesResponse> => fetch(`${process.env.NEXT_PUBLIC_API_URL}/message/?userId=${userId}`).then(res => res.json()),
  });

  const messages = data?.data ?? [];

  return (
    <Fragment>
      <div className="flex flex-col gap-2">
        <Link href="/" className="text-xs w-max">Go back home</Link>
        <div className="flex items-center gap-3">
          <p className="text-2xl font-semibold">Inbox</p>
          {isLoading && <Loader />}
        </div>
      </div>
      {error && <div className="flex flex-col justify-center h-full text-red-500">Error: {error.message}</div>}
      {!isLoading && !error && messages.length === 0 && <div className="flex flex-col justify-center h-full">No messages found</div>}
      {!isLoading && !error && (
        <div className="flex flex-col gap-4 max-w-lg overflow-y-auto md:h-[400px] lg:h-[500px]">
          {messages.map((message) => (
            <Link key={message._id} href={`/inbox/${message._id}`} className="flex w-full flex-col gap-2 border p-4 py-3 group hover:bg-foreground hover:text-background transition-all duration-300">
              <div className="flex items-center gap-4 justify-between w-full">
                <div className="flex items-center gap-1.5">
                  {!message.isRead &&
                    <div className={`w-2 h-2 bg-[#158EF0] group-hover:bg-background transition-all duration-300`} />
                  }
                  <p className="text-lg font-semibold">{message.subject}</p>
                </div>
                <p className="text-xs">{new Date(message.createdAt).toLocaleString()}</p>
              </div>
              <p className="text-sm truncate">{message.content}</p>
            </Link>
          ))}
        </div>
      )}
    </Fragment>
  );
}
