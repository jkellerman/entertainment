import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";
import React from "react";

import Button from "@/components/Buttons/Buttons";
import Content from "@/components/Content/Content";
import Dropdown, {
  DropdownsContainer,
  DropdownsInnerContainer,
} from "@/components/Dropdown/Dropdown";
import Header from "@/components/Header/Header";
import Heading from "@/components/Heading/Heading";
import MediaGenerator from "@/components/MediaGenerator/MediaGenerator";
import { Panel, PanelInner } from "@/components/Panel/Panel";
import styles from "@/components/Panel/Panel.module.scss";
import { DEFAULT_GENRE, DEFAULT_WATCH_NETWORK } from "@/constants/app";
import { BASE_TMDB_URL, BASE_TMDB_QUERY_PARAMS, watchMovieNetworkList } from "@/constants/tmdb";
import useGenerator from "@/hooks/useGenerator";
import { Media } from "@/types/media";

interface WatchProps {
  genreList: Media.IGenre[];
}

const Watch: React.FC<WatchProps> = ({ genreList }) => {
  const { query } = useRouter();

  const genre =
    (genreList &&
      genreList.find((genreItem) => genreItem && genreItem.name.toLowerCase() === query.genre)) ??
    DEFAULT_GENRE;

  const network =
    watchMovieNetworkList.find(
      ({ provider_name }) => provider_name.toLowerCase() === query.genre
    ) ?? DEFAULT_WATCH_NETWORK;

  const { data, isLoading, isError, noResults, fetchRecommendation } = useGenerator(
    "/api/network/movie/8|337|9|531|350",
    "movie"
  );

  return (
    <>
      <Head>
        <title>StreamHub | What to watch tonight?</title>
        <meta
          name="description"
          content="StreamHub allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other providers in one place, whilst providing recommendations on what to watch tonight."
        />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Heading as="h1" size="m">
            What to watch tonight?
          </Heading>
          <Content>
            Cut through streaming indecision! Use the generator below to simplify choices, so you
            can dive into content faster.
          </Content>
          <DropdownsInnerContainer>
            <Heading as="h2" size="s">
              Select preferences:
            </Heading>
            <DropdownsContainer>
              <Dropdown watch type="movies" media="movies" variant="media" style="secondary" />
            </DropdownsContainer>

            <DropdownsContainer>
              <Dropdown
                watch
                type="movies"
                selected_genre={genre}
                genre_list={genreList}
                variant="genre"
                style="secondary"
              />
            </DropdownsContainer>

            <DropdownsContainer>
              <Dropdown
                watch
                type="movies"
                selected_network={network}
                network_list={watchMovieNetworkList}
                variant="service"
                style="secondary"
              />
            </DropdownsContainer>
          </DropdownsInnerContainer>

          <Panel>
            <PanelInner>
              <Heading as="h2" size="s">
                Suggest a movie
              </Heading>
              <Content>
                Select your movie preferences using the options above, have a spin and find the
                perfect film to watch to tonight. Simple!
              </Content>

              <Button variant="primary" isFull onClick={fetchRecommendation} disabled={isLoading}>
                {data ? "SPIN AGAIN" : "SPIN"}
              </Button>
            </PanelInner>

            <MediaGenerator
              data={data}
              isLoading={isLoading}
              isError={isError}
              type="movie"
              noResults={noResults}
            />
          </Panel>
        </div>
      </main>
    </>
  );
};

export default Watch;

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
