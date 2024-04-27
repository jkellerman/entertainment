import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";
import React, { useEffect, useState } from "react";

import Carousel from "@/components/Carousel/Carousel";
import CategoryHeading from "@/components/CategoryHeading/CategoryHeading";
import Generator from "@/components/Generator/Generator";
import Header from "@/components/Header/Header";
import { DEFAULT_GENRE, DEFAULT_GENERATOR_NETWORK } from "@/constants/app";
import { BASE_TMDB_URL, BASE_TMDB_QUERY_PARAMS } from "@/constants/tmdb";
import useGenerator from "@/hooks/useGenerator";
import { useRegion } from "@/src/context/regionContext";
import { Media } from "@/types/media";

interface GeneratorProps {
  genreList: Media.IGenre[];
}

const GeneratorPage: React.FC<GeneratorProps> = ({ genreList }) => {
  const { query } = useRouter();
  const [storedMovieData, setStoredMovieData] = useState<Media.IMediaItem | null>(null);
  const { providers, region } = useRegion();
  const selectedGenre =
    (genreList &&
      genreList.find((genreItem) => genreItem && genreItem.name.toLowerCase() === query.genre)) ??
    DEFAULT_GENRE;

  const selectedNetwork =
    providers?.find(
      ({ provider_name }) => provider_name.replace(" Plus", "+").toLowerCase() === query.genre
    ) ?? DEFAULT_GENERATOR_NETWORK;

  const networkList = providers && [DEFAULT_GENERATOR_NETWORK, ...providers];

  const providerIds =
    providers &&
    providers.map((item) => {
      return item.provider_id;
    });
  const countryNetworkList = providerIds.toString().split(",").join("|");

  const { data, isLoading, isError, noResults, fetchRecommendation } = useGenerator(
    `/api/network/movie/${region}/${countryNetworkList}`,
    "movie"
  );

  useEffect(() => {
    const storedData = sessionStorage.getItem("storedMovieData");
    if (storedData) {
      setStoredMovieData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem("storedMovieData", JSON.stringify(data));
      setStoredMovieData(data);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>StreamHub | What to watch tonight</title>
        <meta
          name="description"
          content="StreamHub allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other providers in one place, whilst providing recommendations on what to watch tonight."
        />
      </Head>
      <Header />
      <main>
        <Generator
          selectedGenre={selectedGenre}
          genreList={genreList}
          selectedNetwork={selectedNetwork}
          networkList={networkList}
          fetchRecommendation={fetchRecommendation}
          isError={isError}
          isLoading={isLoading}
          data={data}
          storedMovieData={storedMovieData}
          noResults={noResults}
          mediaType="movies"
        />

        <CategoryHeading
          category="popular series"
          subheading="The most popular on all streaming services."
        />
        <Carousel endpoint={`/api/trending/tv/week`} />
        <CategoryHeading
          category="popular movies"
          subheading="The most popular on all streaming services."
        />
        <Carousel endpoint={`/api/network/movie/${region}/${countryNetworkList}`} />
      </main>
    </>
  );
};

export default GeneratorPage;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/movie/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
  );
  const genreList = await response.json();

  return {
    props: {
      genreList: [DEFAULT_GENRE, ...genreList.genres],
    },
  };
};
