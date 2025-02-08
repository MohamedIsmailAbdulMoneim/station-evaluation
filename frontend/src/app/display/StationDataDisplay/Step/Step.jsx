import styles from '../StationDataDisplay.module.scss';

const Step = ({ currentData }) => {
  const subTitles = [
    ...new Set(currentData.map((row) => row.question_sub_sort.trim())),
  ];

  console.log(subTitles);

  return subTitles.map((subTitle, index) => (
    <div key={index} className={styles.stationCard}>
      <h2 className={styles.stationName}>{subTitle}</h2>
      {/* <p className={styles.location}>{station.location}</p> */}
      <div className={styles.details}>
        {currentData
          .filter((detail) => detail.question_sub_sort === subTitle)
          .map((detail, i) => (
            <div key={i}>
              <p>{detail.question}</p>
              <span>{detail.data}</span>
            </div>
          ))}
      </div>
    </div>
  ));

  return <></>;
};

export default Step;
