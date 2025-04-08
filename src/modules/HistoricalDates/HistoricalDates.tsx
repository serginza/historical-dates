import { memo, useCallback, useRef, useState } from 'react';
import { SwiperRef } from 'swiper/react';
import gsap from 'gsap';
import { HISTORY_DATA } from 'shared/constants';
import {
  CircleSpinner,
  DateSlider,
  HorizontalLine,
  SliderPagination,
  SpherePagination,
  TitleBlock,
  VerticalLine,
  YearPeriod,
} from './components';
import { Context } from './HistoricalDates.context';
import './HistoricalDates.style.scss';

function HistoricalDatesProto() {
  const [eventsPage, setEventsPage] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const swiperRef = useRef<SwiperRef | null>(null);

  const changeEventsBlock = useCallback(
    (direction: number, isSlider: boolean | undefined = false) => {
      const newPage = isSlider ? eventsPage + direction : eventsPage;

      if (newPage < 0 || newPage > HISTORY_DATA.length - 1 || isAnimating)
        return;

      setIsAnimating(true);
      setEventsPage(newPage);
      gsap.to('.date-slider-wrapper', {
        opacity: 0,
        y: 0,
        duration: 0.5,
        ease: 'power1.inOut',
        onComplete: () => {
          swiperRef?.current?.swiper.slideTo(0);
          gsap.set('.date-slider-wrapper', { y: 10 });
          gsap.to('.date-slider-wrapper', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power1.inOut',
            onComplete: () => setIsAnimating(false),
          });
        },
      });
    },
    [eventsPage, swiperRef, isAnimating],
  );

  return (
    <Context.Provider
      value={{
        data: HISTORY_DATA,
        eventsPage,
        setEventsPage,
        changeEventsBlock,
        swiperRef,
      }}
    >
      <section className="historical-dates-container">
        <TitleBlock />
        <VerticalLine />
        <HorizontalLine />
        <YearPeriod />
        <SliderPagination />
        <DateSlider />
        <CircleSpinner />
        <SpherePagination />
      </section>
    </Context.Provider>
  );
}

export const HistoricalDates = memo(HistoricalDatesProto);
