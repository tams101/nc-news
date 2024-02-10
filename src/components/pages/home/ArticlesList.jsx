import { getArticles } from "../../../../utils/api";
import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import Topics from "./Topics";
import { useParams, useSearchParams } from "react-router-dom";
import SortBy from "./SortBy";
import ErrorComponent from "../../ErrorComponent";

export default function ArticlesList({topics, setTopics}) {
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [toggle, setToggle] = useState(true)

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { topic_name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    sort_by: "created_at",
    order: "desc",
    p: "1",
  });

  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");
  const p = searchParams.get("p");

  useEffect(() => {
    getArticles(topic_name, sort_by, order, p)
      .then(({ articles, total_count }) => {
        if (p === null) {
          setPage(1);
        }
        setArticles(articles);
        setTotalCount(total_count);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          setError({
            status: "Network Error",
            msg: "Please check your internet connection.",
          });
        } else {
          const errorMsg = err.response.data.msg;
          const errorCode = err.response.status;
          setError({ status: errorCode, msg: errorMsg });
        }
        setIsLoading(false);
      });
  }, [topic_name, sort_by, order, p, totalCount]);

  function handleChangePageClick(e) {
    if (e.target.name === "prev-page") {
      setSearchParams(
        (currParams) => {
          currParams.set("p", page - 1);
          return currParams;
        },
        { replace: true }
      );

      setPage((currPage) => {
        return currPage - 1;
      });
    } else {
      setSearchParams(
        (currParams) => {
          currParams.set("p", page + 1);
          return currParams;
        },
        { replace: true }
      );

      setPage((currPage) => {
        return currPage + 1;
      });
    }
  }

  function handleToggle() {
    setToggle((currState) => !currState)
  }

  if (isLoading) return <p className="loading-msg">Loading articles...</p>;
  if (error) return <ErrorComponent err={error} />;

  return (
    <section>
      <button id="filter-btn" onClick={handleToggle}>Filter articles</button>
      {toggle ? null : 
        <>
        <Topics topics={topics} setTopics={setTopics} />
        <SortBy setSearchParams={setSearchParams} />
        </>
      }
      
      <div className="change-page-container">
        <button
          onClick={handleChangePageClick}
          disabled={page === 1}
          name="prev-page"
          id="prev-page-btn"
        >
          Prev Page
        </button>
        <button
          onClick={handleChangePageClick}
          disabled={10 * page >= totalCount}
          name="next-page"
          id="next-page-btn"
        >
          Next Page
        </button>
      </div>

      <section className="articles-list-container">
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.article_id} />;
        })}
      </section>
    </section>
  );
}
