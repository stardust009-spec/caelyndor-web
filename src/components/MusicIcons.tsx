import type { ReactNode, SVGProps } from "react";

type MusicIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

type IconFrameProps = MusicIconProps & {
  children: ReactNode;
};

function IconFrame({ children, size = 18, ...props }: IconFrameProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PlayIcon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <polygon points="7 5 19 12 7 19 7 5" fill="currentColor" stroke="none" />
    </IconFrame>
  );
}

export function PauseIcon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
    </IconFrame>
  );
}

export function SkipBackIcon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <path d="M19 20 9 12l10-8v16Z" fill="currentColor" stroke="none" />
      <path d="M5 19V5" />
    </IconFrame>
  );
}

export function SkipForwardIcon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <path d="m5 4 10 8-10 8V4Z" fill="currentColor" stroke="none" />
      <path d="M19 5v14" />
    </IconFrame>
  );
}

export function ShuffleIcon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <path d="M16 3h5v5" />
      <path d="M4 20 21 3" />
      <path d="M21 16v5h-5" />
      <path d="M15 15l6 6" />
      <path d="M4 4l5 5" />
    </IconFrame>
  );
}

export function RepeatIcon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11V9a3 3 0 0 1 3-3h15" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v2a3 3 0 0 1-3 3H3" />
    </IconFrame>
  );
}

export function RepeatOneIcon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11V9a3 3 0 0 1 3-3h15" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v2a3 3 0 0 1-3 3H3" />
      <path d="M11.5 10.5 13 9v6" />
    </IconFrame>
  );
}

export function HeartIcon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    </IconFrame>
  );
}

export function EyeIcon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </IconFrame>
  );
}

export function Volume2Icon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
      <path d="M16 8.5a5 5 0 0 1 0 7" />
      <path d="M19.5 5a10 10 0 0 1 0 14" />
    </IconFrame>
  );
}

export function VolumeXIcon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
      <path d="m19 9-6 6" />
      <path d="m13 9 6 6" />
    </IconFrame>
  );
}

export function ListMusicIcon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <path d="M3 6h12" />
      <path d="M3 12h10" />
      <path d="M3 18h6" />
      <path d="M17 14v5" />
      <circle cx="17" cy="20" r="2" />
      <path d="M19 14h2" />
    </IconFrame>
  );
}

export function XIcon(props: MusicIconProps) {
  return (
    <IconFrame {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </IconFrame>
  );
}
