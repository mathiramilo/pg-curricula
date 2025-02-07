import type { SvgProps } from "@/models";

export const CloseIcon = ({ ...props }: SvgProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_61_56)">
      <path
        d="M18 6L6 18"
        stroke="#004A87"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="#004A87"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_61_56">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
