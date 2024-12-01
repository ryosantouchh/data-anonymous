"use client";

export default function SuccessButton({
  text,
  handleOnClick,
  width,
  height,
}: {
  text: string;
  handleOnClick?: () => void;
  width?: number;
  height?: number;
}) {
  return (
    <button
      className={`bg-success rounded-lg w-[${width ? width + "px" : "105px"}] h-[${height ? height + "px" : "40px"}] border-1 border-success`}
      {...(handleOnClick ? { onClick: handleOnClick } : {})}
    >
      <span className="text-white">{text}</span>
    </button>
  );
}
