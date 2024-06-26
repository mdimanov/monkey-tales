import Image from "next/image";

type OpenCloseButtonProps = {
  isOpen: boolean;
  toggleOpenClose: () => void;
};

const OpenCloseButton: React.FC<OpenCloseButtonProps> = ({
  isOpen,
  toggleOpenClose,
}) => {
  return (
    <div className="relative w-8 h-8 z-10" onClick={toggleOpenClose}>
      <Image
        src="/icons/hamburger.svg"
        width={30}
        height={30}
        alt="open"
        className={`absolute transition-opacity duration-500 ${!isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <Image
        src="/icons/close.svg"
        width={30}
        height={30}
        alt="close"
        className={`absolute transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export default OpenCloseButton;
