import { memo } from 'react';
import './TitleBlock.style.scss';

function TitleBlockProto() {
  return (
    <article className='title-container'>
      <div className="gradient"></div>
      <div className="title">Исторические даты</div>
    </article>
    
  );
}

export const TitleBlock = memo(TitleBlockProto);
