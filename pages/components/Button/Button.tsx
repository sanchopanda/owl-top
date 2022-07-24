import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";
import cn from 'classnames';

export const Button = ({ appearence, children }: ButtonProps): JSX.Element => {
  return <button className={cn(styles.button, {
    [styles.primary]: appearence == 'primary',
    [styles.ghost]: appearence == 'ghost'
  })}>{children}</button>;
};
