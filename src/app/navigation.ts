import NextLink, { LinkProps } from 'next/link';
import type { AppRouteId } from '@shared/appRoutes';

const ROUTE_MAP: Record<AppRouteId, string> = {
  home: '/',
  editor: '/editor',
  designs: '/designs',
  components: '/components',
  templates: '/templates',
  vega: '/vega',
  partners: '/partners',
  users: '/users',
};

interface AppLinkProps extends Omit<LinkProps, 'href'> {
  to: AppRouteId;
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function AppLink({ to, href, className, children, ...props }: AppLinkProps) {
  const url = href ?? ROUTE_MAP[to] ?? '/';
  return (
    <NextLink
      href={url}
      className={`transition-all duration-200${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </NextLink>
  );
}

export { AppRouteId };