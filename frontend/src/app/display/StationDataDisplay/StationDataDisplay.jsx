'use client';

import { useState } from 'react';
import styles from './StationDataDisplay.module.scss';
import DataFilter from './DataFilter/DataFilters';
import Step from './Step/Step';
import { getStations, getGovernorates } from '@/lib/apiHandlers/utils';

const StationDataDisplay = ({ areas, getData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState('');
  const [governs, setGoverns] = useState('');
  const [stations, setStations] = useState('');

  const reportPageNumbers = [
    ...new Set(data?.map((item) => item.report_page_number)),
  ].sort();

  // Calculate total pages
  const totalPages = reportPageNumbers.length;

  const currentData = data.filter(
    (row) => row.report_page_number === currentPage,
  );

  // Handlers for pagination
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleFetchData = (stationName, date) => {
    if (!stationName || stationName === 'اختر' || !date) {
      setErrors('يجب اختيار المحطة والتاريخ');
      return;
    }
    getData(stationName, date).then(({ data }) => setData(data ?? []));
  };

  const handleGetGov = (areaId) => {
    getGovernorates(areaId).then((data) => {
      setGoverns(data);
    });
  };

  const handleGetStation = (govId) => {
    getStations(govId).then((data) => {
      setStations(data);
    });
  };

  return (
    <>
      <DataFilter
        handleGetGov={handleGetGov}
        handleGetStation={handleGetStation}
        governs={governs || []}
        stations={stations || []}
        areas={areas}
        getData={handleFetchData}
      />
      <div className={styles.container}>
        <Step currentData={currentData} />
        {errors && <h1 style={{ color: 'red' }}>{errors}</h1>}
        {/* Pagination Controls */}
        {data.length > 0 && (
          <div className={styles.pagination}>
            <button onClick={prevPage} disabled={currentPage === 1}>
              ◀ Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next ▶
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default StationDataDisplay;
