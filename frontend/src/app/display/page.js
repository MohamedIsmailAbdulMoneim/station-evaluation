import DataFilter from './StationDataDisplay/DataFilter/DataFilters';
import StationDataDisplay from './StationDataDisplay/StationDataDisplay';
import {
  getStations,
  getAnswers,
  getAreas,
  getGovernorates,
} from '@/lib/apiHandlers/utils';

const DisplayPage = async () => {
  const stations = await getStations();
  const areas = await getAreas();
  const governs = await getGovernorates();

  return (
    <>
      <StationDataDisplay
        stations={stations}
        areas={areas}
        governs={governs}
        getData={getAnswers}
      />
    </>
  );
};

export default DisplayPage;
