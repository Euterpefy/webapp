import { Footer } from "@/components/footer";
import { MainNav } from "@/components/nav/main";
import { mainNavItems } from "@/config/site";
import React from "react";

/**
 * Layout component that wraps the entire application.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 * @returns {JSX.Element} The Layout component.
 */
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 gap-6 justify-between sm:space-x-0">
          <MainNav items={mainNavItems} />
        </div>
      </header>
      <main className="flex min-h-screen flex-col">{children}</main>
      <Footer />
    </div>
  );
}
