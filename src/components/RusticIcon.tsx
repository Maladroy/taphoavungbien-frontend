import React from "react";

interface RusticIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  className?: string;
}

export const RusticIcon: React.FC<RusticIconProps> = ({
  name,
  size = 24,
  className = "",
  ...props
}) => {
  const getPath = () => {
    switch (name) {
      case "beef":
        return (
          <>
            <path d="M3 12c2-4 6-7 11-7 4 0 7 3 7 6s-2 5-5 5c-2 0-3-1-5-1-3 0-6 3-9 3l1-6z" />
            <path d="M6 15l-2 4" />
          </>
        );
      case "sausage":
        return (
          <>
            <rect x="3" y="9" width="18" height="7" rx="3.5" />
            <path d="M7 9v7M12 9v7M17 9v7" />
          </>
        );
      case "noodle":
        return (
          <>
            <path d="M4 6c3 2 3 4 0 6s-3 4 0 6" />
            <path d="M10 6c3 2 3 4 0 6s-3 4 0 6" />
            <path d="M16 6c3 2 3 4 0 6s-3 4 0 6" />
          </>
        );
      case "cake":
        return (
          <>
            <rect x="4" y="10" width="16" height="9" rx="1.5" />
            <path d="M4 10l8-5 8 5" />
            <path d="M9 14h6" />
          </>
        );
      case "spice":
        return (
          <>
            <path d="M5 10a7 7 0 0 1 14 0v3a7 7 0 0 1-14 0z" />
            <circle cx="9" cy="12" r="1" fill="currentColor" />
            <circle cx="13" cy="10" r="1" fill="currentColor" />
            <circle cx="15" cy="14" r="1" fill="currentColor" />
          </>
        );
      case "honey":
        return (
          <>
            <path d="M12 3l7 4v6l-7 4-7-4V7z" />
            <path d="M9 9.5h6M9 14.5h6" />
          </>
        );
      case "jar":
        return (
          <>
            <path d="M9 2h6v3H9z" />
            <path d="M8 5h8l1 4v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9z" />
            <path d="M7 12h10" />
          </>
        );
      case "tea":
        return (
          <>
            <path d="M12 21c-4-3-7-7-7-11a7 7 0 0 1 14 0c0 4-3 8-7 11z" />
            <path d="M12 6c0 4 3 4 3 8" />
          </>
        );
      case "textile":
        return (
          <>
            <path d="M4 4l8 8-8 8" />
            <path d="M12 4l8 8-8 8" />
          </>
        );
      case "bag":
        return (
          <>
            <path d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
          </>
        );
      default:
        return (
          <>
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </>
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {getPath()}
    </svg>
  );
};
