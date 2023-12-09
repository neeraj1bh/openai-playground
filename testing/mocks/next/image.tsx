/* eslint @next/next/no-img-element: 0 */
import { ImageProps } from 'next/image';
import React from 'react';

export const NextImageMock: React.FC<ImageProps> = ({
  width,
  height,
  alt,
  loader,
  src,
  priority,
  unoptimized,
  ...props
}) => {
  let newSrc = '';
  if (typeof src === 'string') {
    newSrc = src;
    if (loader) {
      newSrc = loader({
        src: src,
        quality: Number(props.quality),
        width: Number(width) || 0,
      });
    }
  }

  return <img alt={alt} width={width} height={height} src={newSrc} {...props} />;
};

export default NextImageMock;
