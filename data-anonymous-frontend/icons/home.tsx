export default function HomeIcon({ size }: { size?: number }) {
  return (
    <svg
      width={size || "25"}
      height={size || "25"}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.84473 17.438H16.8447M11.8624 3.20199L5.08012 8.47711C4.62675 8.82973 4.40006 9.00604 4.23675 9.22684C4.09209 9.42243 3.98433 9.64277 3.91875 9.87704C3.84473 10.1415 3.84473 10.4287 3.84473 11.003V18.238C3.84473 19.3581 3.84473 19.9181 4.06271 20.346C4.25446 20.7223 4.56042 21.0282 4.93675 21.22C5.36457 21.438 5.92462 21.438 7.04473 21.438H18.6447C19.7648 21.438 20.3249 21.438 20.7527 21.22C21.129 21.0282 21.435 20.7223 21.6267 20.346C21.8447 19.9181 21.8447 19.3581 21.8447 18.238V11.003C21.8447 10.4287 21.8447 10.1415 21.7707 9.87704C21.7051 9.64277 21.5974 9.42243 21.4527 9.22684C21.2894 9.00604 21.0627 8.82973 20.6093 8.47711L13.827 3.20199C13.4757 2.92873 13.3 2.79211 13.1061 2.73959C12.9349 2.69325 12.7545 2.69325 12.5834 2.73959C12.3894 2.79211 12.2137 2.92873 11.8624 3.20199Z"
        stroke="#243831"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}