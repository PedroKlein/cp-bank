import React, { useState } from "react";
import getNameInitials from "../../utils/nameInitials.utils";

type Props = {
  imageUrl?: string;
  userName: string;
};

const AvatarIcon: React.FC<Props & React.HTMLProps<HTMLDivElement>> = ({
  userName,
  imageUrl,
  ...rest
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div {...rest}>
      {imageUrl && !imageError ? (
        <img
          onError={() => setImageError(true)}
          className="rounded-full"
          src={imageUrl}
        />
      ) : (
        <div className="bg-neutral w-full h-full rounded-full flex justify-center items-center text-default text-xl">
          <span>{getNameInitials(userName)}</span>
        </div>
      )}
    </div>
  );
};

export default AvatarIcon;
