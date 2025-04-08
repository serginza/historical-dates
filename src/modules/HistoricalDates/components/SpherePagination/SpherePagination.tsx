import { memo, useCallback, useContext, useState, useEffect, JSX } from 'react';
import { Context } from '../../HistoricalDates.context';
import './SpherePagination.style.scss';

function SpherePaginationProto() {
  const { data, eventsPage, setEventsPage } = useContext(Context);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(eventsPage);
    onChangePagination(eventsPage);
  }, [eventsPage]);

  const onChangePagination = useCallback(
    (index: number) => {
      if (index === activeIndex) return;

      setActiveIndex(index);
      setEventsPage(index);
    },
    [activeIndex, data.length, setEventsPage],
  );

  const PointPagination = ({
    sphere,
    index,
  }: {
    sphere: string;
    index: number;
  }): JSX.Element => {
    const isActive = index === activeIndex;

    return (
      <div
        key={sphere}
        className={`pagination-point ${isActive ? 'active' : ''}`}
        onClick={() => onChangePagination(index)}
      />
    );
  };

  return (
    <div className="sphere-pagination-container">
      {data.map((events, index) => (
        <PointPagination sphere={events.sphere} index={index} />
      ))}
    </div>
  );
}

export const SpherePagination = memo(SpherePaginationProto);
