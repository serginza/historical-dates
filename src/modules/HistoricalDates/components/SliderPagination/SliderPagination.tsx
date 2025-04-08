import { memo, useContext } from 'react';
import { ReactComponent as SliderArrow } from 'shared/assets/icons/slider-arrow.svg';
import { padZero } from 'shared/utils';
import { Context } from '../../HistoricalDates.context';
import './SliderPagination.style.scss';

function SliderPaginationProto() {
  const { data, eventsPage, changeEventsBlock } = useContext(Context);

  return (
    <article className="slider-pagination-container">
      <div className="pagination-count">{`${padZero(eventsPage + 1)}/${padZero(data.length)}`}</div>
      <div className="pagination-buttons">
        <button
          className="pagination-arrow-button"
          onClick={() => changeEventsBlock(-1, true)}
          disabled={eventsPage === 0}
        >
          <SliderArrow className="arrow-prev-icon" />
        </button>
        <button
          className="pagination-arrow-button"
          onClick={() => changeEventsBlock(1, true)}
          disabled={eventsPage === data.length - 1}
        >
          <SliderArrow className="arrow-next-icon" />
        </button>
      </div>
    </article>
  );
}

export const SliderPagination = memo(SliderPaginationProto);
