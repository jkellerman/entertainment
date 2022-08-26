import Head from "next/head";
import Search from "@/components/Search/Search";
import Movies from "@/components/Movies/Movies";

const movies = () => {
  return (
    <>
      <Head>
        <title>Movies | Entertainment</title>
        <meta
          name="description"
          content="Stream now for access to the best movies"
        />
      </Head>
      <main>
        <Search movies />
        <Movies />
      </main>
    </>
  );
};

export default movies;
