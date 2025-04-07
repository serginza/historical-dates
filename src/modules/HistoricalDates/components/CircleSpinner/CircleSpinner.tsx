import { memo, useCallback, useContext, useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Context } from '../../HistoricalDates.context';
import './CircleSpinner.style.scss';

function CircleSpinnerProto() {
  const { data, eventsPage, setEventsPage, changeEventsBlock } = useContext(Context);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const circleRef = useRef<HTMLDivElement | null>(null);
  const spheresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setActiveIndex(eventsPage);
    onChangeSphere(eventsPage);
    changeEventsBlock(eventsPage, false);
  }, [eventsPage]);

  const circleRadius = 530 / 2;

  const onChangeSphere = useCallback((index: number) => {
    if (index === activeIndex) return;

    const rotationAngle = (360 / data.length) * (index - activeIndex);
    
    // Анимация вращения внешнего круга
    gsap.to(circleRef.current, {
      rotation: `-=${rotationAngle}`,
      duration: 1,
      ease: 'power2.inOut',
    });

    // Анимация обратного вращения для каждого элемента
    data.forEach((_, i) => {
      gsap.to(spheresRef.current[i], {
        rotation: `+=${rotationAngle}`, 
      });
    });

    setActiveIndex(index);
    setEventsPage(index);
  }, [activeIndex, data.length, setEventsPage]);

  return (
    <article className="circle-spinner-container">
      <div ref={circleRef} className="circle-spinner">
        {data.map((events, index) => {
          const angle = (360 / data.length) * index + 30;
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              ref={(el) => { spheresRef.current[index] = el; }}
              className={`sphere-point ${isActive ? 'active' : ''}`}
              style={{
                transform: `rotate(${angle}deg) translateY(-${circleRadius}px) rotate(-${angle}deg)`,
              }}
              onClick={() => onChangeSphere(index)}
            >
              <div className="sphere-number">{index + 1}</div>
              <div className='sphere-title'>{events.sphere}</div>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export const CircleSpinner = memo(CircleSpinnerProto);
