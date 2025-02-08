import DataFilter from './StationDataDisplay/DataFilter/DataFilters';
import StationDataDisplay from './StationDataDisplay/StationDataDisplay';
import { getStations, getAnswers } from '@/lib/apiHandlers/utils';

const DisplayPage = async () => {
  const stations = await getStations();

  return (
    <>
      <StationDataDisplay stations={stations} getData={getAnswers} />
    </>
  );
};

export default DisplayPage;
