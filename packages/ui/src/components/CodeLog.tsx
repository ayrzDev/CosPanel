import * as React from 'react';

export interface CodeLogProps extends React.HTMLAttributes<HTMLDivElement> {
  lines: string[];
  autoscroll?: boolean;
}

export function CodeLog({ lines, autoscroll = true, className = '', ...props }: CodeLogProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!autoscroll) return;
    const el = ref.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines, autoscroll]);

  return (
    <div
      ref={ref}
      className={`font-mono text-xs bg-black text-green-300 p-3 rounded-md h-64 overflow-auto ${className}`}
      role="log"
      aria-live="polite"
      {...props}
    >
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {l}
        </div>
      ))}
    </div>
  );
}
