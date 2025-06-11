import { UserProfile } from "@clerk/nextjs";

function ProfilePage() {
  return (
    <div className="p-5">
      <UserProfile />
    </div>
  );
}
export default ProfilePage;
