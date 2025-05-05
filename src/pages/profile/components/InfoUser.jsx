import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import useUser from "@/hooks/useUser";
import { useTranslation } from "react-i18next";

function InfoUser({ onChange }) {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-row justify-between py-4">
        <p className="font-bold text-[20px]">{t("profile.title")}</p>
        <button
          className="border-2 border-[#1C0B08] p-1 w-32 cursor-pointer"
          onClick={() => onChange("editar")}
        >
          {t("verbs.edit")}
        </button>
      </div>
      <div className="flex flex-col sm:flex-row w-full md:justify-between justify-center items-center gap-8">
        <div className="w-[130px] h-[130px] bg-fuchsia-200 flex justify-center">
          <img src={user?.photo} alt="" />
        </div>
        <div className="w-full sm:w-[80%]">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <p>{t("data_users.name")}</p>
                </TableCell>
                <TableCell>
                  <p className="text-[#737373]">{user.name}</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <p>{t("data_users.email")}</p>
                </TableCell>
                <TableCell>
                  <p className="text-[#737373]">{user.email}</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <p>{t("data_users.phone")}</p>
                </TableCell>
                <TableCell>
                  <p className="text-[#737373]">{user.phone}</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <p>{t("data_users.genre")}</p>
                </TableCell>
                <TableCell>
                  <p className="text-[#737373]">{user.gender}</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default InfoUser;
