import React from "react";

import Button from "@/components/atoms/Buttons/Carousel/Button";
import Card from "@/components/atoms/Card/Card";
import CardDetails from "@/components/atoms/CardDetails/CardDetails";
import useSlider from "@/hooks/useSlider";
import { Media } from "@/src/types";

import styles from "./RecommendationsList.module.scss";

interface RecommendationsProps {
  recommendations: Media.IRecommendationsList;
  isLoading: boolean;
  isError: boolean;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
  isLoading,
  isError,
}) => {
  const { cardRef, scrollRef, carouselRef, handleClickNext, handleClickPrev, isScrollAvailable } =
    useSlider();

  if (isLoading) {
    return (
      <div className={styles.carouselWrapper} ref={scrollRef}>
        <div className={styles.carousel}>
          <ul className={styles.list} ref={carouselRef}></ul>
        </div>
      </div>
    );
  }

  if (isError)
    return (
      <div className={styles.error}>...Oops we are having some issues, please reload the page.</div>
    );

  return (
    <div className={styles.container}>
      {isScrollAvailable && (
        <span className={styles.navContainer}>
          <Button left handleClickPrev={handleClickPrev} />
          <Button right handleClickNext={handleClickNext} />
        </span>
      )}
      <div className={styles.carouselWrapper} ref={scrollRef}>
        <div className={styles.carousel}>
          <ul className={styles.list} ref={carouselRef}>
            {recommendations.results.map(
              ({
                id,
                title,
                name,
                poster_path,
                first_air_date,
                release_date,
              }: Media.IRecommendations) => {
                return (
                  <li key={id} className={styles.listItem} ref={cardRef}>
                    <figure>
                      <Card id={id} poster={poster_path} movieTitle={title} seriesName={name} />
                      <CardDetails
                        movieTitle={title}
                        seriesName={name}
                        movieYear={release_date}
                        seriesYear={first_air_date}
                      />
                    </figure>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;