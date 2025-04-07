import { memo } from 'react';
import './HorizontalLine.style.scss';

function HorizontalLineProto() {
  return (
    <article className='horizontal-line' />
  );
}

export const HorizontalLine = memo(HorizontalLineProto);
