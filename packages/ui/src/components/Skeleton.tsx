import * as React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

const rounds = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
} as const;

export function Skeleton({ className = '', rounded = 'md', ...props }: SkeletonProps) {
  return <div className={`${rounds[rounded]} bg-muted animate-pulse ${className}`} {...props} />;
}
