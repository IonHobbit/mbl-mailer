import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox",
  description: "Inbox",
};

export default function InboxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}