import React from "react";
import { auth } from "../config/firebase";
import ProfileDetails from "../components/ProfilePage/ProfileDetails";
import ProfileStats from "../components/ProfilePage/ProfileStats";

function Profile() {
  return (
    <div className="py-4 px-4 md:px-24">
      <div className="w-full bg-zinc-900 p-4 rounded-2xl flex items-center gap-4">
        <div className="avatar">
          <div className="w-14 rounded-full bg-black">
            <img src={auth.currentUser.photoURL} alt="" />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-xl">{auth.currentUser.displayName}</p>
        </div>
      </div>
      <ProfileDetails />
      <div className="mt-10 mb-10">{/* <ProfileStats /> */}</div>
    </div>
  );
}

export default Profile;
