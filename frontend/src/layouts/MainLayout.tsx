import { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib';

type MainLayoutProps = ComponentPropsWithoutRef<'main'>;

export const MainLayout = ({ className, ...props }: MainLayoutProps) => (
  <main
    className={cn(
      'w-full flex flex-col items-center justify-center h-full',
      className
    )}
    {...props}
  />
);
