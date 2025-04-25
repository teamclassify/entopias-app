import useUser from "@/hooks/useUser";

function ProfileCard() {
  const { user } = useUser();

  return (
    <div className="border-2 max-w-[100%] p-3 flex flex-row gap-1 justify-evenly items-center">
      {/* <img src={user?.photo} alt="Foto del usuario" /> */}
      <div>
        <p className="text-lg">Hola, {user.name}!</p>
        <p className="text-xs text-[#737373] break-words whitespace-normal">
          {user.email}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
