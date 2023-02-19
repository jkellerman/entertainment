import Image from "next/image";
import styles from "../Poster/Poster.module.css";
import { shimmer, toBase64 } from "@/utils/utils";
import { POSTER_URL_IMAGE } from "@/constants/tmdb";
import React from "react";

// RECOMMENDED POSTERS IN RECOMMENDATION COMPONENT

interface PosterProps {
  poster: string;
  title: string;
  hero?: boolean;
}

const Poster: React.FC<PosterProps> = ({ poster, title, hero }) => {
  return (
    <div
      className={
        hero ? `${styles.heroPoster}` : `${styles.mediaDetailsTabPoster}`
      }
    >
      <Image
        src={`${POSTER_URL_IMAGE}${poster}`}
        alt={`${title} poster`}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(240, 140))}`}
        unoptimized={true}
        layout="fill"
        priority={hero ? true : false}
      />
    </div>
  );
};

export default Poster;