import React from "react";

import Card from "@/components/atoms/Card/Card";
import CardDetails from "@/components/atoms/CardDetails/CardDetails";
import Icon from "@/components/atoms/Icon/Icon";
import useFetchCards from "@/hooks/useFetchCards";
import useSlider from "@/hooks/useSlider";
import { Media } from "@/types/media";

import styles from "./Carousel.module.scss";

interface CarouselProps {
  endpoint: string;
}

const Carousel: React.FC<CarouselProps> = ({ endpoint }) => {
  const { cardRef, scrollRef, carouselRef, handleClickNext, handleClickPrev, isScrollAvailable } =
    useSlider();
  const { cards, isLoading, isError } = useFetchCards(endpoint);

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
    <>
      {cards?.data.length > 0 && (
        <div className={styles.container}>
          {isScrollAvailable && (
            <span className={styles.navContainer}>
              <button type="button" className={styles.button} onClick={handleClickPrev}>
                <Icon icon="chevronLeft" />
              </button>
              <button type="button" className={styles.button} onClick={handleClickNext}>
                <Icon icon="chevronRight" />
              </button>
            </span>
          )}
          <div className={styles.carouselWrapper} ref={scrollRef}>
            <div className={styles.carousel}>
              <ul className={styles.list} ref={carouselRef}>
                {cards?.data.map(
                  ({
                    id,
                    title,
                    name,
                    poster_path,
                    first_air_date,
                    release_date,
                  }: Media.IMediaItem) => {
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
      )}
    </>
  );
};

export default Carousel;
