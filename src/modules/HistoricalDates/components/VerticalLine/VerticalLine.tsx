import { memo } from 'react';
import './VerticalLine.style.scss';

function VerticalLineProto() {
  return <article className="vertical-line" />;
}

export const VerticalLine = memo(VerticalLineProto);
