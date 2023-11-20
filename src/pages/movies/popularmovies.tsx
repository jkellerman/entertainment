import Head from "next/head";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import MediaCategory from "@/components/organisms/MediaCategory/MediaCategory";

const PopularMovies = () => {
  return (
    <>
      <Head>
        <title>Popular Movies | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="StreamHub allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <SearchBar movies />
        <MediaCategory
          endpoint="/api/movies/popular"
          category="popular movies"
          type="movies"
        />
      </main>
    </>
  );
};

export default PopularMovies;
