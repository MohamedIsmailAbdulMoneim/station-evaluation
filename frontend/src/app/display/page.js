import StationDataDisplay from './StationDataDisplay/StationDataDisplay';
import { getAnswers, getAreas } from '@/lib/apiHandlers/utils';

const DisplayPage = async () => {
  const areas = await getAreas();

  return (
    <>
      <StationDataDisplay areas={areas} getData={getAnswers} />
    </>
  );
};

export default DisplayPage;
