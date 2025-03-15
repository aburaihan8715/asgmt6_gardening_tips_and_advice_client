import PasswordUpdate from '@/components/common/PasswordUpdate';
import ProfileUpdate from '@/components/common/ProfileUpdate';

const Settings = () => {
  return (
    <div className="mx-auto mt-5 max-w-2xl gap-10 rounded-md bg-gray-50 p-5">
      <ProfileUpdate />
      <PasswordUpdate />
    </div>
  );
};

export default Settings;
