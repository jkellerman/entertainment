import React from "react";
import Head from "next/head";
import qs from "qs";

import { GetServerSideProps } from "next";
import { Genres, Media } from "types";
import { BASE_TMDB_QUERY_SEARCH_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";

import styles from "@/components/organisms/Hero/Hero.module.css";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import Hero from "@/components/organisms/Hero/Hero";
import HeroContent from "@/components/molecules/HeroContent/HeroContent";
import MediaDetails from "@/components/molecules/MediaDetails/MediaDetails";
import MediaSummary from "@/components/molecules/MediaSummary/MediaSummary";
import MediaDirectorOrNetwork from "@/components/atoms/MediaDirectorOrNetwork/MediaDirectorOrNetwork";
import Cast from "@/components/atoms/Cast/Cast";
import MediaGenres from "@/components/atoms/MediaGenres/MediaGenres";
import MediaRunTimeOrSeasons from "@/components/atoms/MediaRunTimeOrSeasons/MediaRunTimeOrSeasons";
import Tablist from "@/components/molecules/TabList/TabList";
import StarRating from "@/components/atoms/StarRating/StarRating";
import WatchProviders from "@/components/molecules/WatchProviders/WatchProviders";
import Recommendations from "@/components/molecules/Recommendations/Recommendations";
import Certification from "@/components/atoms/Certification/Certification";
import ReleaseDate from "@/components/atoms/ReleaseDate/ReleaseDate";
import MediaOverview from "@/components/atoms/MediaOverview/MediaOverview";

interface SeriesProps {
  backdrop: string;
  tagline: string;
  series_age_rating: string;
  air_date: string;
  vote_average: number;
  overview: string;
  poster: string;
  cast: Media.ICastMember[];
  genres: Genres.IGenre[];
  watch_providers: Media.IProviderList;
  recommendations: Media.IRecommendationsList;
  seasons: number;
  network: Media.IDirectorOrNetwork;
  title: string;
}

const Series: React.FC<SeriesProps> = ({
  backdrop,
  tagline,
  series_age_rating,
  air_date,
  vote_average,
  overview,
  poster,
  cast,
  genres,
  watch_providers,
  recommendations,
  seasons,
  network,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{`Watch ${title} Online | Reelgood`}</title>
        <meta name="description" content={`Where to watch ${title}`} />
      </Head>
      <main className={styles.main}>
        <SearchBar series hero />

        <Hero backdrop={backdrop} title={title}>
          <HeroContent
            tagline={tagline}
            series_age_rating={series_age_rating}
            air_date={air_date}
            star_rating={vote_average}
            overview={overview}
            poster={poster}
            title={title}
          >
            <Certification series_age_rating={series_age_rating} />
            <ReleaseDate air_date={air_date} styled />
            <StarRating star_rating={vote_average} />
          </HeroContent>
        </Hero>

        <WatchProviders watch_providers={watch_providers} />

        <MediaSummary star_rating={vote_average}>
          <Certification movie_age_rating={series_age_rating} />
          <ReleaseDate air_date={air_date} styled />
          <MediaOverview overview={overview} mediaSummary />
        </MediaSummary>

        <MediaDetails>
          <MediaDirectorOrNetwork network={network} />
          <Cast cast={cast} />
          <MediaGenres genres={genres} movies />
          <MediaRunTimeOrSeasons seasons={seasons} />
        </MediaDetails>

        <Tablist
          series_age_rating={series_age_rating}
          air_date={air_date}
          seasons={seasons}
          star_rating={vote_average}
          overview={overview}
          poster={poster}
          network={network}
          cast={cast}
          genres={genres}
          watch_providers={watch_providers}
          title={title}
        />

        <Recommendations recommendations={recommendations} />
      </main>
    </>
  );
};

export default Series;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { id } = query;

  const queryString = qs.stringify(
    {
      ...BASE_TMDB_QUERY_SEARCH_PARAMS,
    },
    { addQueryPrefix: true }
  );

  const url = `${BASE_TMDB_URL}/tv/${id}${queryString}&append_to_response=credits,recommendations,watch%2Fproviders,content_ratings`;
  console.info("🚀 Request URL: ", url);

  const response = await fetch(url);

  const data = await response.json();

  const {
    backdrop_path,
    tagline,
    content_ratings,
    first_air_date,
    vote_average,
    overview,
    poster_path,
    credits,
    genres,
    recommendations,
    number_of_seasons,
    networks,
    name: title,
  } = data;

  const certification: Media.ICertificationSeries | null =
    content_ratings.results.find(
      (country: Media.ICertificationSeries) => country.iso_3166_1 === "GB"
    ) || null;

  const age_rating: string = certification?.rating ?? "";

  const network: string = networks.map((item: Media.IDirectorOrNetwork) => {
    return item.name;
  });

  const cast: Media.ICast = credits.cast.slice(0, 4);

  const getWatchProviders: Media.IProviderList | null =
    data["watch/providers"].results.GB;

  const watch_providers = getWatchProviders ?? [];

  return {
    props: {
      backdrop: backdrop_path,
      tagline,
      series_age_rating: age_rating,
      air_date: first_air_date,
      vote_average,
      overview,
      poster: poster_path,
      cast,
      genres,
      watch_providers,
      recommendations,
      seasons: number_of_seasons,
      network,
      title,
      data,
    },
  };
};
