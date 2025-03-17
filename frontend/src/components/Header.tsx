'use client';

import { UserResponse } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import React, { Fragment } from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();

  const { data, } = useQuery({
    queryKey: ['user'],
    queryFn: (): Promise<UserResponse> => fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/67d769c333a561fe2f5c0319`).then(res => res.json()),
  });

  const user = data?.data;

  return (
    <Fragment>
      <Link href="/" className='w-max'>
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 28 28"><g fill="none"><path fill="#367af2" d="M2.004 8.503V19.25A3.75 3.75 0 0 0 5.754 23H22.25A3.75 3.75 0 0 0 26 19.25V8.5l-11.658 5.972a.75.75 0 0 1-.684 0z" /><path fill="url(#fluentColorMail280)" d="M2.004 8.503V19.25A3.75 3.75 0 0 0 5.754 23H22.25A3.75 3.75 0 0 0 26 19.25V8.5l-11.658 5.972a.75.75 0 0 1-.684 0z" /><path fill="url(#fluentColorMail281)" d="M2.004 8.503V19.25A3.75 3.75 0 0 0 5.754 23H22.25A3.75 3.75 0 0 0 26 19.25V8.5l-11.658 5.972a.75.75 0 0 1-.684 0z" /><path fill="url(#fluentColorMail282)" fillOpacity="0.75" d="M2.004 8.503V19.25A3.75 3.75 0 0 0 5.754 23H22.25A3.75 3.75 0 0 0 26 19.25V8.5l-11.658 5.972a.75.75 0 0 1-.684 0z" /><path fill="url(#fluentColorMail283)" fillOpacity="0.7" d="M2.004 8.503V19.25A3.75 3.75 0 0 0 5.754 23H22.25A3.75 3.75 0 0 0 26 19.25V8.5l-11.658 5.972a.75.75 0 0 1-.684 0z" /><path fill="url(#fluentColorMail284)" d="M2.004 7.75A3.75 3.75 0 0 1 5.754 4H22.25A3.75 3.75 0 0 1 26 7.75v1.2l-11.658 5.972a.75.75 0 0 1-.684 0L2.004 8.953z" /><defs><linearGradient id="fluentColorMail280" x1="17.5" x2="23.168" y1="10.5" y2="23.701" gradientUnits="userSpaceOnUse"><stop offset=".199" stopColor="#0094f0" stopOpacity="0" /><stop offset=".431" stopColor="#0094f0" /></linearGradient><linearGradient id="fluentColorMail281" x1="10.574" x2="4.55" y1="10.026" y2="24.154" gradientUnits="userSpaceOnUse"><stop offset=".191" stopColor="#0094f0" stopOpacity="0" /><stop offset=".431" stopColor="#0094f0" /></linearGradient><linearGradient id="fluentColorMail282" x1="20.329" x2="21.305" y1="17.151" y2="24.345" gradientUnits="userSpaceOnUse"><stop stopColor="#2764e7" stopOpacity="0" /><stop offset="1" stopColor="#2764e7" /></linearGradient><linearGradient id="fluentColorMail283" x1="17.716" x2="19.496" y1="10.281" y2="24.921" gradientUnits="userSpaceOnUse"><stop offset=".533" stopColor="#ff6ce8" stopOpacity="0" /><stop offset="1" stopColor="#ff6ce8" /></linearGradient><linearGradient id="fluentColorMail284" x1="9.133" x2="16.477" y1=".555" y2="19.789" gradientUnits="userSpaceOnUse"><stop stopColor="#6ce0ff" /><stop offset=".462" stopColor="#29c3ff" /><stop offset="1" stopColor="#4894fe" /></linearGradient></defs></g></svg>
      </Link>
      <div className="flex gap-4 justify-between">
        <h1 className="text-3xl font-bold">MBL Mailer</h1>
        {pathname !== '/' && user && (
          <div className="flex items-center gap-2">
            {user?.inbox.unreadMessages > 0 && (
              <Link href="/inbox" className="flex items-center gap-1">
                <p className="text-sm">{user?.inbox.unreadMessages}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 96H88a40 40 0 0 0-40 40v240a40 40 0 0 0 40 40h334.73a40 40 0 0 0 40-40V239" /><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="m112 160l144 112l87-65.67" /><circle cx="431.95" cy="128.05" r="47.95" fill="currentColor" /><path fill="currentColor" d="M432 192a63.95 63.95 0 1 1 63.95-63.95A64 64 0 0 1 432 192m0-95.9a32 32 0 1 0 31.95 32a32 32 0 0 0-31.95-32" /></svg>
              </Link>
            )}
            <Link href="/" className="text-sm">{user?.firstName} {user?.lastName}</Link>
          </div>
        )}
      </div>
    </Fragment>
  )
}
