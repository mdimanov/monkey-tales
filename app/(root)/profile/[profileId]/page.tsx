import React from "react";

const ProfileDetails = ({
  params: { profileId },
}: {
  params: { profileId: string };
}) => {
  return (
    <div>
      <h1 className="main_title">{profileId}</h1>
    </div>
  );
};

export default ProfileDetails;
