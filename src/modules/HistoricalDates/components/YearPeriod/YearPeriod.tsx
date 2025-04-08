import React, { useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Context } from '../../HistoricalDates.context';
import './YearPeriod.style.scss';

function YearPeriodProto() {
  const { data, eventsPage } = useContext(Context);

  const startYearRef = useRef<HTMLDivElement | null>(null);
  const endYearRef = useRef<HTMLDivElement | null>(null);

  const prevYears = useRef({
    startYear: data[eventsPage].startYear,
    endYear: data[eventsPage].endYear,
  });

  const animateYearChange = (
    ref: React.RefObject<HTMLDivElement | null>,
    prevYear: number,
    currentYear: number,
  ) => {
    gsap.fromTo(
      ref.current,
      { innerText: prevYear },
      {
        innerText: currentYear,
        duration: 1,
        roundProps: 'innerText',
        snap: 'innerText',
        ease: 'power2.out',
      },
    );
  };

  useEffect(() => {
    const currentStartYear = data[eventsPage].startYear;
    const currentEndYear = data[eventsPage].endYear;

    animateYearChange(
      startYearRef,
      prevYears.current.startYear,
      currentStartYear,
    );
    animateYearChange(endYearRef, prevYears.current.endYear, currentEndYear);

    prevYears.current.startYear = currentStartYear;
    prevYears.current.endYear = currentEndYear;
  }, [eventsPage, data]);

  return (
    <article className="year-period-container">
      <div className="year start-year" ref={startYearRef}>
        {data[eventsPage].startYear}
      </div>
      <div className="year end-year" ref={endYearRef}>
        {data[eventsPage].endYear}
      </div>
    </article>
  );
}

export const YearPeriod = React.memo(YearPeriodProto);
