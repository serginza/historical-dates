import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { ReactComponent as CarouselArrow } from 'shared/assets/icons/carousel-arrow.svg';
import { Context } from '../../HistoricalDates.context';
import './DateSlider.style.scss';

function DateSliderProto() {
  const { data, eventsPage, swiperRef } = useContext(Context);

  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
  const [delayedEventsPage, setDelayedEventsPage] = useState(eventsPage);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayedEventsPage(eventsPage);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [eventsPage]);

  const handleSlideChange = useCallback((swiper: SwiperClass) => {
    setIsFirstSlide(swiper.isBeginning);
    setIsLastSlide(swiper.isEnd);
  }, []);

  // TODO: функция убирает стрелки навигации, но не сенхронизирована с другими компонентами
  // const handleSlide = (direction: 'next' | 'prev') => {
  //   const swiper = swiperRef?.current?.swiper;
  //   if (swiper) {
  //     direction === 'next' ? swiper.slideNext() : swiper.slidePrev();
  //     handleSlideChange(swiper);
  //   }
  // };

  return (
    <article className="date-slider-wrapper">
      <div className="slider-sphere-title">
        {data[delayedEventsPage].sphere}
      </div>
      <div className="slider-horizontal-line" />

      <div className="slider-container">
        <div
          className={`carousel-arrow-button arrow-prev ${isFirstSlide ? 'hidden' : ''}`}
          onClick={() => swiperRef?.current?.swiper.slidePrev()}
        >
          <CarouselArrow />
        </div>
        <div className="carousel">
          <Swiper
            slidesPerView="auto"
            direction="horizontal"
            onSlideChange={handleSlideChange}
            ref={swiperRef}
          >
            {data[delayedEventsPage].events.map((event) => (
              <SwiperSlide key={event.year}>
                <div className="event-card">
                  <div className="card-title">{event.year}</div>
                  <div className="card-desription">{event.description}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          className={`carousel-arrow-button arrow-next ${isLastSlide ? 'hidden' : ''}`}
          onClick={() => swiperRef?.current?.swiper.slideNext()}
        >
          <CarouselArrow />
        </div>
      </div>
    </article>
  );
}

export const DateSlider = memo(DateSliderProto);
