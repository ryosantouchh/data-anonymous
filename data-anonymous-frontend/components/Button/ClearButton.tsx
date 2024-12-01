"use client";

export default function ClearButton({
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
      className={`bg-white rounded-lg w-[${width ? width.toString() + "px" : "132px"}] h-[${height ? height.toString() + "px" : "40px"}] border border-success`}
      {...(handleOnClick ? { onClick: handleOnClick } : {})}
    >
      <span className="text-success">{text}</span>
    </button>
  );
}
