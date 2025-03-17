'use client';

import Loader from "@/components/Loader";
import { MessageResponse } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Fragment, useEffect } from "react";

export default function MessagePage() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['message', id],
    queryFn: (): Promise<MessageResponse> => fetch(`${process.env.NEXT_PUBLIC_API_URL}/message/${id}`).then(res => res.json()),
  });

  const message = data?.data;

  useEffect(() => {
    document.title = `${message?.subject} | MBL Mailer`;
  }, [message])

  return (
    <Fragment>
      <div className="flex flex-col gap-2">
        <Link href="/inbox" className="text-xs w-max">Go back to Inbox</Link>
        <div className="flex items-center gap-3">
          <p className="text-2xl font-semibold">Message</p>
          {isLoading && <Loader />}
        </div>
      </div>
      {error && <div className="flex flex-col justify-center h-full text-red-500">Error: {error.message}</div>}
      {!isLoading && !error && !message && <div className="flex flex-col justify-center h-full">Message not found</div>}
      {!isLoading && !error && message && (
        <div className="flex flex-col gap-4 max-w-lg overflow-y-auto h-[500px]">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 bg-[#158EF0]`} />
            <p className="text-xl font-semibold">{message?.subject}</p>
          </div>
          <p className="text-sm">{message?.content}</p>
        </div>
      )}
    </Fragment>
  );
}
