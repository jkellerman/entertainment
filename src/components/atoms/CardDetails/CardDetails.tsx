import React from "react";

import styles from "../CardDetails/CardDetails.module.scss";

const DATE_SLICE = 4;

interface CardDetailsProps {
  movieTitle?: string;
  seriesName?: string;
  movieYear?: string;
  seriesYear?: string;
}

const CardDetails: React.FC<CardDetailsProps> = ({
  movieTitle,
  seriesName,
  movieYear,
  seriesYear,
}) => {
  return (
    <figcaption className={styles.title}>
      <span>{seriesName || movieTitle}&nbsp;</span>
      {movieYear && <span>({movieYear?.slice(0, DATE_SLICE)})</span>}
      {seriesYear && <span>({seriesYear?.slice(0, DATE_SLICE)})</span>}
    </figcaption>
  );
};

export default CardDetails;
