"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Suspense } from "react";
import LoadingIndicator from "../LoadingIndicator";

type MenuItem = {
  name: string;
  href: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { name: "Home", href: "/" },
  { name: "Loan Calculator", href: "/loan-calculator" },
  {
    name: "Tools",
    href: "/tools",
    children: [
      { name: "SIP", href: "/tools/sip" },
      { name: "SWP", href: "/tools/swp" },
      { name: "SWP Inflation", href: "/tools/swp-inflation" },
      {
        name: "Mortage SWP comparison",
        href: "/tools/mortgage-swp-comparison",
      },
    ],
  },
];

const NavLink = ({
  item,
  isNested = false,
}: {
  item: MenuItem;
  isNested?: boolean;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <div className={`relative group ${isNested ? "ml-4" : ""}`}>
      <Link
        href={item.href}
        className={`flex items-center text-gray-600 hover:text-gray-900 transition-colors ${
          isActive ? "font-semibold text-primary" : ""
        }`}
      >
        {item.name}
        {item.children && <ChevronDown className="ml-1 h-4 w-4" />}
      </Link>
      {item.children && (
        <div className="absolute left-0 w-64 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
          <div className="flex gap-2 flex-col">
            {item.children.map((child) => (
              <NavLink key={child.href} item={child} isNested />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileNavLink = ({
  item,
  isNested = false,
}: {
  item: MenuItem;
  isNested?: boolean;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(item.href + "/");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={`${isNested ? "ml-4" : ""}`}>
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          className={`text-gray-600 hover:text-gray-900 transition-colors ${
            isActive ? "font-semibold text-primary" : ""
          }`}
        >
          {item.name}
        </Link>
        {item.children && (
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        )}
      </div>
      {item.children && isOpen && (
        <div className="mt-2 space-y-2">
          {item.children.map((child) => (
            <MobileNavLink key={child.href} item={child} isNested />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
              <path d="M12 3v6" />
            </svg>
            <span className="text-xl font-bold">Personal Fin</span>
          </Link>

          <nav className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLogin}
              className="hidden md:flex"
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </>
              ) : (
                <>
                  <User className="mr-2 h-4 w-4" />
                  Login
                </>
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <MobileNavLink key={item.href} item={item} />
                  ))}
                  <Button variant="outline" size="sm" onClick={toggleLogin}>
                    {isLoggedIn ? (
                      <>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-4 w-4" />
                        Login
                      </>
                    )}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingIndicator />}>{children}</Suspense>
      </main>

      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 Personal Fin. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
