import React from "react";
import Head from "next/head";
import QueryString from "qs";
import { useRouter } from "next/router";
import styles from "../../components/organisms/MediaCategoryHomePage/MediaCategoryHomePage.module.css";
import { GetStaticProps } from "next";

import Dropdown from "@/components/molecules/Dropdown/Dropdown";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import CardList from "@/components/molecules/CardList/CardList";

import { DEFAULT_SERIES_GENRE } from "@/constants/app";
import { BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { Genres } from "types";

interface SeriesIndexPageProps {
  genreList: Genres.IGenre[];
}

const Series: React.FC<SeriesIndexPageProps> = ({ genreList }) => {
  const { query, pathname } = useRouter();
  const genre =
    genreList.find(
      (item: Genres.IGenre) => item.name.toLowerCase() === query.genre
    ) || DEFAULT_SERIES_GENRE;
  const isDefaultGenre = genre.name === DEFAULT_SERIES_GENRE.name;
  const endpoint = !isDefaultGenre
    ? `api/series/genre/${genre.id}`
    : "api/series/popular";
  const pageType = pathname.replace(/\//g, "");
  const { cards, isLoading } = useInfiniteScroll(endpoint);

  return (
    <>
      <Head>
        <title>Watch TV series Online | Reelgood</title>
        <meta
          name="description"
          content="Find out where to watch TV shows from Netflix, Amazon Prime, Disney+ and many more services."
        />
      </Head>
      <main>
        <SearchBar series />
        <section>
          <div className={styles.headingAndDropdownButtonWrapper}>
            <h1 className={styles.heading}>{pageType}</h1>
            <Dropdown
              type={pageType}
              selected_genre={genre}
              genre_list={genreList}
            />
          </div>
          <CardList cards={cards} isLoading={isLoading} />
        </section>
      </main>
    </>
  );
};

export default Series;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/tv/list?${QueryString.stringify(
      BASE_TMDB_QUERY_PARAMS
    )}`
  );
  const genreList = await response.json();

  return {
    props: {
      genreList: [DEFAULT_SERIES_GENRE, ...genreList.genres],
    },
  };
};