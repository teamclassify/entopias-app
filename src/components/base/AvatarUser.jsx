import { Link } from "wouter";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

function AvatarUser({ user, logout, userIsAdminOrSales }) {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-[30px] mt-1 p-0 w-[30px]">
          <AvatarImage src={user?.photo} />
          <AvatarFallback>{user.firstName}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {t("homePage.navigation.account")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href="/perfil/inicio">
          <DropdownMenuItem>
            {t("homePage.navigation.profile")}
          </DropdownMenuItem>
        </Link>

        {userIsAdminOrSales && (
          <Link href="/admin">
            <DropdownMenuItem>
              {t("homePage.navigation.admin")}
            </DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuItem onClick={logout}>
          {t("homePage.navigation.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarUser;
