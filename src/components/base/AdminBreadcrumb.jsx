import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "wouter";

function AdminBreadcrumb({ currentPage = "Dashboard" }) {
  const [location] = useLocation();

  const pages = location.split("/").filter((page) => page !== "");

  return (
    <Breadcrumb className="mb-8">
      <BreadcrumbList>
        {pages.slice(0, pages.length - 1).map((page, index) => {
          const backURL = pages.slice(0, index).join("/");

          return (
            <BreadcrumbItem key={index}>
              <Link href={`/${backURL === "" ? "/admin" : backURL}/${page}`} className="text-sm">
                {page.toUpperCase()}
              </Link>

              {index < pages.length - 2 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>

      <BreadcrumbPage className="text-2xl font-bold pt-12">
        {currentPage}
      </BreadcrumbPage>
    </Breadcrumb>
  );
}

export default AdminBreadcrumb;
