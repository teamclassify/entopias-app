import useUser from "@/hooks/useUser";


function ProfileCard() {
    const { user, logout } = useUser();

    return (
        <div className="border-2 max-w-[280px] h-[100px] p-3 flex flex-row gap-1 justify-evenly items-center">
            <div className="w-[28%] h-full  bg-fuchsia-200">
                <img src={user?.photo} alt="" />
            </div>
            <div className="w-[60%]">
                <p className="text-xl">Hola, {user.name}!</p>
                <p className="text-xs text-[#737373] break-words whitespace-normal">{user.email}</p>
            </div>
        </div>
    );
}

export default ProfileCard;