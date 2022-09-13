import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "@/components/SearchResults/SearchResults.module.css";
import Card from "@/components/Card/Card";
import CardDetails from "@/components/CardDetails/CardDetails";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const SearchResults = ({ endpoint }) => {
  const router = useRouter();
  const { query } = router.query;
  const [results, setResults] = useState([]);
  const [number, setNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`${endpoint}`);
        const data = await response.json();
        const filteredArr = data.data.results.filter(
          (item) => item.backdrop_path !== null
        );
        const arr = filteredArr;
        setResults(arr);
        setNumber(arr.length);
        setIsLoading(false);
      } catch (error) {
        setError("An error occured");
      }
    };
    fetchResults();
  }, [endpoint]);

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div>
          <div
            className={styles.heading}
          >{`Found ${number} results for '${query}'`}</div>
          <div className={styles.container}>
            {results.map((item) => {
              return (
                <article key={item.id} className={styles.linkContainer}>
                  <Card
                    id={item.id}
                    image={item.backdrop_path}
                    title={item.title}
                    seriesName={item.name}
                  />
                  <CardDetails
                    releaseDate={item.release_date}
                    title={item.title}
                    airDate={item.first_air_date}
                    seriesName={item.name}
                  />
                </article>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResults;
