import styles from "../MediaOverview/MediaOverview.module.css";
import useReadMore from "hooks/useReadMore";

const MediaOverview = ({ hero, overview, mediaSummary }) => {
  const { readMore, handleToggle } = useReadMore();
  return (
    <>
      {mediaSummary && (
        <div>
          <p
            className={
              !readMore
                ? `${styles.mediaSummaryOverview} ${styles.overview}`
                : `${styles.mediaSummaryOverview} ${styles.overview} ${styles.expand}`
            }
          >
            {overview}
          </p>
          {overview.split(" ").length > 32 && (
            <button className={styles.readMoreToggle} onClick={handleToggle}>
              {!readMore ? "Read more" : "Show Less"}
            </button>
          )}
        </div>
      )}

      {!mediaSummary && (
        <p
          className={
            hero
              ? `${styles.heroOverview} ${styles.overview}`
              : `${styles.mediaDetailsTabOverview} ${styles.overview}`
          }
        >
          {overview}
        </p>
      )}
    </>
  );
};

export default MediaOverview;
