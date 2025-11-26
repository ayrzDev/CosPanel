import * as React from 'react';

type Tone = 'default' | 'success' | 'warning' | 'danger' | 'info';

const tones: Record<Tone, string> = {
  default: 'bg-muted text-foreground',
  success: 'bg-emerald-600/15 text-emerald-700 dark:text-emerald-300',
  warning: 'bg-amber-600/15 text-amber-700 dark:text-amber-300',
  danger: 'bg-red-600/15 text-red-700 dark:text-red-300',
  info: 'bg-blue-600/15 text-blue-700 dark:text-blue-300'
};

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function StatusPill({ tone = 'default', className = '', ...props }: StatusPillProps) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]} ${className}`} {...props} />;
}
