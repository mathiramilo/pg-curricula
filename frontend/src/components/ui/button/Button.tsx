import { ComponentPropsWithoutRef } from 'react';

import styles from './Button.module.css';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

export const Button = ({ className, ...props }: ButtonProps) => (
  <button className={`${styles.button} ${className}`} {...props} />
);
