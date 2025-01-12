import { useState } from "react";
import { HelpCircle } from "lucide-react";
import { matchResource } from "./gacha-resource";

interface gachaAvatarCardProps {
  name: string;
  resourceId: number;
  number: number;
}

export default function GachaAvatarCard(props: gachaAvatarCardProps) {
  const { name, resourceId, number } = props;
  const imagePath = matchResource(name, resourceId);
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    console.error("Cannot find resource");
    setImageError(true);
  };

  console.info(imagePath, name, resourceId);

  return (
    <div className="w-16 h-24 flex flex-col items-center justify-center rounded-md overflow-hidden border border-gray-200 mt-1 mb-1 mx-1">
      {imageError || !imagePath ? (
        <HelpCircle
          className="text-gray-400 w-6 h-6"
          role="gacha-avatar-fallback-icon"
        />
      ) : (
        <img
          src={imagePath}
          alt="small"
          className="w-16 h-20 object-cover"
          onError={handleError}
        />
      )}
      <div className="text-base text-gray-800">{number}</div>
    </div>
  );
}
