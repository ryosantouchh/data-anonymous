export default function CorrectIcon({ size }: { size?: number }) {
  return (
    <svg
      width={size || "21"}
      height={size || "21"}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.2244 5.94824L8.05778 15.1149L3.89111 10.9482"
        stroke="#4A4A4A"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
