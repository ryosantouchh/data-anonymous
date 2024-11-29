export default function SuccessButton({
  text,
  handleOnClick,
}: {
  text: string;
  handleOnClick?: () => void;
}) {
  return (
    <button
      className="bg-success rounded-lg w-[105px] h-[40px] border-1 border-success"
      {...(handleOnClick ? { onClick: handleOnClick } : {})}
    >
      <span className="text-white">{text}</span>
    </button>
  );
}
