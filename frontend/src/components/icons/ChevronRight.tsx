import type { SvgProps } from "@/models";

export const ChevronRightIcon = ({ ...props }: SvgProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_5_83)">
      <path
        d="M6 4L10 8L6 12"
        stroke="#004A87"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_5_83">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
