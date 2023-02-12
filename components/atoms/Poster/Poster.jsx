import Image from "next/image";
import styles from "../Poster/Poster.module.css";
import { POSTER_URL_IMAGE, shimmer, toBase64 } from "@/utils/utils";

// SUGGESTED POSTERS IN SUGGESTED COMPONENT

const Poster = ({ poster, title, hero }) => {
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
