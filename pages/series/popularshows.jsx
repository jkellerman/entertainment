import Head from "next/head";
import SearchBar from "@/components/atoms/SearchBar/SearchBar";
import CategoryResults from "@/components/organisms/MediaCategory/MediaCategory";

const PopularShows = () => {
  return (
    <>
      <Head>
        <title>Popular Shows | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="Reelgood allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <SearchBar series />
        <CategoryResults
          endpoint="/api/series/popular"
          category="popular shows"
          type="series"
        />
      </main>
    </>
  );
};

export default PopularShows;
