import styles from '../StationDataDisplay.module.scss';

const Step = ({ currentData }) => {
  const subTitles = [
    ...new Set(currentData.map((row) => row.question_sub_sort.trim())),
  ];

  console.log(currentData);

  return subTitles.map((subTitle, index) => {
    // Filter details for this subtitle
    const subTitleDetails = currentData.filter(
      (detail) => detail.question_sub_sort.trim() === subTitle,
    );

    return (
      <div key={index} className={styles.stationCard}>
        <h2 className={styles.stationName}>{subTitle}</h2>
        {/* <p className={styles.location}>{station.location}</p> */}
        <div className={styles.details}>
          {subTitleDetails.map((detail, i) => (
            <div key={i}>
              <p className={styles.question}>
                <span className={styles.questionNumber}>{i + 1}</span>
                {detail.question}
              </p>
              <span>{detail.data}</span>
            </div>
          ))}
        </div>
      </div>
    );
  });
};

export default Step;
