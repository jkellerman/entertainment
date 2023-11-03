import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import QueryString from "qs";

import CardList from "@/components/CardList/CardList";
import Dropdown, { DropdownsContainer } from "@/components/Dropdown/Dropdown";
import styles from "@/components/Dropdown/Dropdown.module.scss";
import Description from "@/components/MediaPageDescription/MediaPageDescription";
import { DEFAULT_GENRE, DEFAULT_NETWORK } from "@/constants/app";
import { BASE_TMDB_URL, BASE_TMDB_QUERY_PARAMS, seriesNetworkList } from "@/constants/tmdb";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Genres } from "@/types/genres";

interface GenreSeriesProps {
  genreList: Genres.IGenre[];
}

const GenreSeries: React.FC<GenreSeriesProps> = ({ genreList }) => {
  const { query } = useRouter();

  const slug = query.slugs;

  const genre =
    (genreList && genreList.find((genre) => slug?.includes(genre.name.toLowerCase()))) ||
    DEFAULT_GENRE;

  const network =
    seriesNetworkList.find(({ provider_name }) => slug?.includes(provider_name.toLowerCase())) ??
    DEFAULT_NETWORK;

  const isNetworkSelected = slug?.includes(network.provider_name.toLowerCase());

  const endpoint = isNetworkSelected
    ? `/api/network/tv/${network.provider_id}/${genre.id}`
    : `/api/network/tv/8|337|9|531|350/${genre.id}`;

  const { cards, isLoading, isError, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteScroll(endpoint);

  return (
    <>
      <Head>
        <title>{`Watch ${genre?.name} Series Online | Reelgood`}</title>
        <meta
          name="description"
          content="Find out where to watch series from Netflix, Amazon Prime, Disney+ and many more services"
        />
      </Head>
      <main>
        <DropdownsContainer>
          <Dropdown
            type="series"
            selected_genre={genre}
            genre_list={genreList}
            variant="genre"
            selected_network={network}
          />
          <Dropdown type="series" media="series" variant="media" />
          <span className={styles.span}>On</span>
          <Dropdown
            type="series"
            selected_network={network}
            network_list={seriesNetworkList}
            selected_genre={genre}
            variant="service"
          />
        </DropdownsContainer>
        <Description />
        <CardList
          cards={cards}
          isLoading={isLoading}
          isError={isError}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      </main>
    </>
  );
};

export default GenreSeries;

export async function getStaticPaths() {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/tv/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
  );
  const genreList = await response.json();

  const paths = genreList.genres.map((slug: Genres.IGenre) => ({
    params: { slugs: [slug.name] },
  }));
  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/tv/list?${QueryString.stringify(BASE_TMDB_QUERY_PARAMS)}`
  );
  const genreList = await response.json();

  return {
    props: {
      genreList: [DEFAULT_GENRE, ...genreList.genres],
    },
  };
};
