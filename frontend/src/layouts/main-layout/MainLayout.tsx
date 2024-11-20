import { ComponentPropsWithoutRef } from 'react';

import styles from './MainLayout.module.css';

type MainLayoutProps = ComponentPropsWithoutRef<'main'>;

export const MainLayout = ({ className, ...props }: MainLayoutProps) => (
  <main className={`${styles.container} ${className}`} {...props} />
);
