import { memo } from 'react';
import { HistoricalDates } from 'modules';

function MainPageProto() {
  return <HistoricalDates />;
}

const MainPage = memo(MainPageProto);

export default MainPage;
