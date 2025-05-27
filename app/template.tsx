"use client";

import { PageTransition } from "../components/Page_transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
