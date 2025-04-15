'use client';

import Logo from "./Logo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

export default function NavBar() {
  const [showLinks, setShowLinks] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only run this on client after pathname is available
    const visiblePaths = ["/CheckoutPage", "/CatalogPage", "/ShoppingCartPage"];
    setShowLinks(visiblePaths.includes(pathname));
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-100  border-b-2 border-blue-500 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <Logo />
          </div>

          {showLinks && (
            <>
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="text-blue-500 hover:text-blue-600 focus:outline-none"
                >
                  {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
              </div>

              {/* Desktop menu */}
              <div className="hidden md:flex justify-between items-center font-bold gap-6 text-blue-500 dark:text-blue-400">
                <Link href={"/CatalogPage"} className="hover:text-blue-600 transition-colors">
                  Materials
                </Link>
                <Link href={"/ShoppingCartPage"} className="hover:text-blue-600 transition-colors">
                  Cart
                </Link>
                <Link href={"/CheckoutPage"} className="hover:text-blue-600 transition-colors">
                  Orders
                </Link>
              </div>

              {/* Mobile menu */}
              {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-gray-100 md:hidden z-50">
                  <div className="container mx-auto px-4 py-2">
                    <div className="flex flex-col space-y-4">
                      <Link
                        href={"/CatalogPage"}
                        className="text-blue-500 hover:text-blue-600 transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Materials
                      </Link>
                      <Link
                        href={"/ShoppingCartPage"}
                        className="text-blue-500 hover:text-blue-600 transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Cart
                      </Link>
                      <Link
                        href={"/CheckoutPage"}
                        className="text-blue-500 hover:text-blue-600 transition-colors py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Orders
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
