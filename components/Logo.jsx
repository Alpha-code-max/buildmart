import NavBar from "@/components/NavBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Logo () {

      const [showLinks, setShowLinks] = useState(false);
      const pathname = usePathname();
    
      useEffect(() => {
        // Only run this on client after pathname is available
        const visiblePaths = ["/Admin/add", "/Admin/product"];
        
        const isEditPage = pathname.startsWith("/Admin/edit");
        setShowLinks(visiblePaths.includes(pathname) || isEditPage);
      }, [pathname]);

    return <Link href={'/'} className="font-bold text-5xl">BuildMart
                {showLinks && <span className="font-bold text-3xl text-blue-400 mb-19">  <i>Admin</i></span>}
           </Link>
}