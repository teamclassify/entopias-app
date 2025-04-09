import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProfileCard from "./components/ProfileCard";
import ProfileMenu from "./components/ProfileMenu";
import InfoUser from "./components/InfoUser";


function Profile() {
    return (
        <DefaultLayout>
            <div className="flex flex-row w-full gap-8">
                <div className="flex flex-col w-[28%] gap-8">
                    <ProfileCard />
                    <ProfileMenu />
                </div>
                <InfoUser/>
            </div>
        </DefaultLayout>
    );
}

export default Profile;