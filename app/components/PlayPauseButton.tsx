import Icon from "./Icon";

export type PlayPauseButtonProps = {
  isPlaying: boolean;
  togglePlayPause: () => void;
};

const PlayPauseButton = ({
  isPlaying,
  togglePlayPause,
}: PlayPauseButtonProps) => {
  return (
    <div
      className="flex items-center justify-center transition-all duration-500 bg-violet-600 hover:bg-violet-800 w-[50px] h-[50px] rounded-full"
      onClick={togglePlayPause}
    >
      <div className="relative w-[30px] h-[30px]">
        <Icon src="/icons/Pause.svg" isVisible={isPlaying} />
        <Icon src="/icons/Play.svg" isVisible={!isPlaying} />
      </div>
    </div>
  );
};

export default PlayPauseButton;
