import React from 'react';

const ProfileBio = ({fullname}) => {
  return (
    <div className="p-4">
      <div className="font-semibold">{fullname}</div>
      <div className="text-gray-600">Bio Description Should be here</div>
      <a href="" className="text-blue-500">
        www.example.com
      </a>
    </div>
  );
};

export default ProfileBio;
