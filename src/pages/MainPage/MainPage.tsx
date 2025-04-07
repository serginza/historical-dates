import { memo } from 'react';
import { HistoricalDates } from 'modules';
import { MainPageWrapper } from './MainPage.style';

function MainPageProto() {
  return (
    <MainPageWrapper>
      <HistoricalDates />
    </MainPageWrapper>
  );
}

const MainPage = memo(MainPageProto);

export default MainPage;
