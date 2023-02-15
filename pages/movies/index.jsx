import Head from "next/head";
import styles from "@/components/organisms/MediaCategoriesHomePage/MediaCategoriesHomePage.module.css";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import CardList from "@/components/molecules/CardList/CardList";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { BASE_TMDB_QUERY_PARAMS, BASE_TMDB_URL } from "@/constants/tmdb";
import QueryString from "qs";
import { useRouter } from "next/router";
import Dropdown from "@/components/molecules/Dropdown/Dropdown";
import { DEFAULT_MOVIES_GENRE } from "@/constants/app";

const Movies = ({ genreList }) => {
  const { query, pathname } = useRouter();
  const genre =
    genreList.find(({ name }) => name.toLowerCase() === query.genre) ||
    DEFAULT_MOVIES_GENRE;
  const isDefaultGenre = genre.name === DEFAULT_MOVIES_GENRE.name;
  const endpoint = !isDefaultGenre
    ? `api/movies/genre/${genre.id}`
    : "api/movies/popular";
  const pageType = pathname.replace(/\//g, "");
  const { cards, isLoading } = useInfiniteScroll(endpoint);

  return (
    <>
      <Head>
        <title>{`Watch ${genre.name} Movies Online | Reelgood`}</title>
        <meta
          name="description"
          content="Find out where to watch movies from Netflix, Amazon Prime, Disney+ and many more services"
        />
      </Head>
      <main>
        <SearchBar movies />
        <section>
          <div className={styles.headingAndDropdownButtonWrapper}>
            <h1 className={styles.heading}>{pageType}</h1>
            <Dropdown
              type={pageType}
              selectedGenre={genre}
              genreList={genreList}
            />
          </div>

          <CardList cards={cards} isLoading={isLoading} />
        </section>
      </main>
    </>
  );
};

export default Movies;

export async function getStaticProps() {
  const response = await fetch(
    `${BASE_TMDB_URL}/genre/movie/list?${QueryString.stringify(
      BASE_TMDB_QUERY_PARAMS
    )}`
  );
  const genreList = await response.json();

  return {
    props: {
      genreList: [DEFAULT_MOVIES_GENRE, ...genreList.genres],
    },
  };
}
