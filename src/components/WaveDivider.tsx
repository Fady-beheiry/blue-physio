interface WaveDividerProps {
  fillColor?: string;
  className?: string;
  flip?: boolean;
}

export default function WaveDivider({ fillColor = '#ffffff', className = '', flip = false }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-20"
      >
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1350,20 1440,40 L1440,80 L0,80 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

export function WaveDividerTop({ fillColor = '#ffffff', className = '' }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-20"
      >
        <path
          d="M0,40 C360,0 720,80 1080,40 C1260,20 1380,60 1440,40 L1440,0 L0,0 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
