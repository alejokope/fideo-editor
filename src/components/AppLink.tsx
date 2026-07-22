import Link, { LinkProps } from 'next/link';
import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

interface AppLinkProps extends LinkProps {
  className?: string;
  children?: React.ReactNode;
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={cn('transition-all duration-200', className)}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

AppLink.displayName = 'AppLink';