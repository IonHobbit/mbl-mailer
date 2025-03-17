'use client';

import { UserResponse } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment } from "react";
import pluralize from "pluralize";
import Loader from "@/components/Loader";

export default function HomePage() {

  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: (): Promise<UserResponse> => fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/67d769c333a561fe2f5c0319`).then(res => res.json()),
  });

  const user = data?.data;

  const randomGreeting = () => {
    const greetings = [
      'Hello',
      'Hi',
      'Hey',
      'Welcome back',
      'Nice to see you',
    ]

    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  return (
    <Fragment>
      {isLoading && <div className="flex flex-col justify-center gap-4 h-full">
        <Loader />
        <p className="text-xs">Loading user profile...</p>
      </div>}
      {error && <div className="flex flex-col justify-center h-full text-red-500">Error: {error.message}</div>}
      {user && (
        <Fragment>
          <p className="text-lg">{randomGreeting()}, <span className="font-semibold">{user.firstName} {user.lastName}</span></p>
          <p className="text-base">You have {user.inbox.unreadMessages <= 0 ? 'no' : user.inbox.unreadMessages} unread {pluralize('message', user.inbox.unreadMessages)} out of <span className="font-semibold">{user.inbox.totalMessages}</span> total messages</p>
          <Link href="/inbox" className="bg-[#717CEB] text-white px-4 py-2 w-max cursor-pointer">
            View Messages
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
}
