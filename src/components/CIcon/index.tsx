import { type FC, ReactElement, type SVGAttributes, useMemo } from 'react';

import classNames from 'classnames';

import styles from './style.module.css';

export interface CIconProps extends SVGAttributes<unknown> {
  icon: string[] | ReactElement;
  size?: 'custom' | 'custom-size' | 'sm' | 'lg' | 'xl' | 'xxl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
}
const CIcon: FC<CIconProps> = ({ icon, className, height, size, width, ...props }) => {
  const { iconCode, viewBox } = useMemo(() => {
    if (Array.isArray(icon)) return { iconCode: icon[1], viewBox: `0 0 ${icon[0]}` };
    return { iconCode: '', viewBox: '' };
  }, [icon]);

  const _className = useMemo(() => {
    if (className || size) {
      return classNames(
        styles.icon,
        {
          [styles[`icon-${size}`]]: size,
          [styles[`icon-custom-size`]]: height || width,
        },
        className,
      );
    }
    return undefined;
  }, [className, size]);

  if (!Array.isArray(icon)) {
    return icon;
  }

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={_className}
      {...(height && { height: height })}
      {...(width && { width: width })}
      role="img"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: iconCode }}
    />
  );
};

export default CIcon;
