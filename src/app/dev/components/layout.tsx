import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Component Library Showcase (Dev Preview)",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
