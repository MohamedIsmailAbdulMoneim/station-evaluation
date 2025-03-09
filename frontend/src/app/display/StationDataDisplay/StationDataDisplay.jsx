'use client';

import { useState } from 'react';
import styles from './StationDataDisplay.module.scss';
import DataFilter from './DataFilter/DataFilters';
import Step from './Step/Step';
import { getStations, getGovernorates } from '@/lib/apiHandlers/utils';
import Spinner from '@/components/Ui/Spinner/Spinner';

const StationDataDisplay = ({ areas, getData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState('');
  const [governs, setGoverns] = useState('');
  const [stations, setStations] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageInput, setPageInput] = useState(''); // State for page input

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
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);

  // Handle page input change
  const handlePageInputChange = (e) => {
    setPageInput(e.target.value);
  };

  // Handle jump to page
  const handleJumpToPage = () => {
    const pageNumber = parseInt(pageInput, 10);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
    setPageInput(''); // Clear input after jumping
  };

  const handleGetGov = (areaId) => {
    setGoverns([]);
    getGovernorates(areaId).then((data) => {
      setGoverns(data);
    });
  };

  const handleGetStation = (govId) => {
    setStations([]);
    getStations(govId).then((data) => {
      setStations(data);
    });
  };

  const handleFetchData = (stationName, date) => {
    setIsLoading(true);
    if (!stationName || stationName === 'اختر' || !date) {
      setErrors('يجب اختيار المحطة والتاريخ');
      setIsLoading(false);
      return;
    }

    setErrors('');
    getData(stationName, date).then(({ data }) => {
      setData(data ?? []);
      setIsLoading(false);
    });
  };

  if (isLoading) return <Spinner />;

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
        {data.length > 0 && (
          <div className={styles.pageJumpContainer}>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={pageInput}
              onChange={handlePageInputChange}
              placeholder={`Jump to page (1-${totalPages})`}
              className={styles.pageInput}
            />
            <button
              onClick={handleJumpToPage}
              className={styles.pageJumpButton}
            >
              Go
            </button>
          </div>
        )}
        {/* Page Jump Input */}

        <Step currentData={currentData} />
        {errors && <h1 style={{ color: 'red' }}>{errors}</h1>}
        {/* Pagination Controls */}
        {data.length > 0 ? (
          <div className={styles.pagination}>
            <button
              onClick={lastPage}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              Last
            </button>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              ◀ Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              Next ▶
            </button>

            <button
              onClick={firstPage}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              First
            </button>
          </div>
        ) : (
          <h1>لا توجد بيانات</h1>
        )}
      </div>
    </>
  );
};

export default StationDataDisplay;
