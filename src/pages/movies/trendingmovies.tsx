import Head from "next/head";

import MediaCategory from "@/components/organisms/MediaCategory/MediaCategory";

const TrendingMovies = () => {
  return (
    <>
      <Head>
        <title>Trending | Streaming Movies and TV series guide</title>
        <meta
          name="description"
          content="Reelgood allows you to search and discover any movie or TV show across Netflix, Disney, Amazon and many other other providers in one place."
        />
      </Head>
      <main>
        <MediaCategory
          endpoint="/api/trending/movie/week"
          category="trending movies"
          type="movies"
        />
      </main>
    </>
  );
};

export default TrendingMovies;