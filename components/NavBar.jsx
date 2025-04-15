'use client';

import Logo from "./Logo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [showLinks, setShowLinks] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only run this on client after pathname is available
    const visiblePaths = ["/CheckoutPage", "/CatalogPage", "/ShoppingCartPage"];
    setShowLinks(visiblePaths.includes(pathname));
  }, [pathname]);


  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 justify-between items-end text-blue-500 dark:text-blue-400 py-5 border-b-2 px-14 border-blue-500 dark:border-blue-400">
      <div>
        <Logo />
      </div>

      {showLinks && (
        <div className="flex justify-between items-center font-bold gap-6 text-blue-500 dark:text-blue-400 py-2 px-4 rounded-3xl w-2/6">
          <Link href={"/CatalogPage"}>Materials</Link>
          <Link href={"/ShoppingCartPage"}>Cart</Link>
          <Link href={"/CheckoutPage"}>Orders</Link>
        </div>
      )}
    </div>
  );
}
