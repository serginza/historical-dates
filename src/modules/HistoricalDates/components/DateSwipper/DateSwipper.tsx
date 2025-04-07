import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { ReactComponent as CarouselArrow } from 'shared/assets/icons/carousel-arrow.svg';
import { ReactComponent as SliderArrow } from 'shared/assets/icons/slider-arrow.svg';
import { padZero } from 'shared/utils';
import { Context } from '../../HistoricalDates.context';
import './DateSwipper.style.scss';

function DateSwipperProto() {
  const { data, eventsPage, changeEventsBlock, swiperRef } = useContext(Context);

  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
  // TODO: избавиться от костыля
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

  return (
    <article>
      <div className="arrow-buttons-container">
        <div className="slider-block-count">{`${padZero(eventsPage + 1)}/${padZero(data.length)}`}</div>
        <div className="slider-arrows">
          <button
            className="slider-arrow-button arrow-prev"
            onClick={() => changeEventsBlock(-1, true)}
            disabled={eventsPage === 0}
          >
            <SliderArrow />
          </button>
          <button
            className="slider-arrow-button"
            onClick={() => changeEventsBlock(1, true)}
            disabled={eventsPage === data.length - 1}
          >
            <SliderArrow />
          </button>
        </div>
      </div>

      <div className="slider-container">
        <div
          className={`carousel-arrow-button arrow-prev ${isFirstSlide ? 'hidden' : ''}`}
          onClick={() => swiperRef?.current?.swiper.slidePrev()}
        >
          <CarouselArrow />
        </div>
        <div className="carousel">
          <Swiper
            spaceBetween={'80px'}
            slidesPerView="auto"
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500 }}
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

export const DateSwipper = memo(DateSwipperProto);
