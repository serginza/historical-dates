import { createContext, Dispatch, SetStateAction } from 'react';
import { SwiperRef } from 'swiper/react';
import { HISTORY_DATA } from 'shared/constants';
import { HistoryDataType } from 'shared/types';

interface ContextType {
  data: HistoryDataType[];
  eventsPage: number;
  setEventsPage: Dispatch<SetStateAction<number>>;
  changeEventsBlock: (direction: number, isSlider?: boolean) => void;
  swiperRef: React.RefObject<SwiperRef | null>;
}

const defaultContextValue: ContextType = {
  data: HISTORY_DATA,
  eventsPage: 0,
  setEventsPage: () => {},
  changeEventsBlock: () => {},
  swiperRef: { current: null },
};

export const Context = createContext<ContextType>(defaultContextValue);
