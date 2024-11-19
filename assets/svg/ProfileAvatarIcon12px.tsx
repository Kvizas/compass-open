const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={12}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M7.86 2.91c0 1.607-1.28 2.91-2.86 2.91-1.58 0-2.86-1.303-2.86-2.91C2.14 1.303 3.42 0 5 0c1.58 0 2.86 1.303 2.86 2.91Zm1.903 7.075a.836.836 0 0 0 .074-1.09C8.725 7.416 6.971 6.46 5 6.46c-1.971 0-3.724.956-4.837 2.437a.836.836 0 0 0 .074 1.089A6.644 6.644 0 0 0 5 12c1.86 0 3.546-.77 4.763-2.015Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgComponent;
