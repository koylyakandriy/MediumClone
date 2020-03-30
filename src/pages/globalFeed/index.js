import React, { useEffect } from "react";
import { stringify } from "query-string";

import Feed from "../../components/Feed";
import useFetch from "../../hooks/useFetch";
import Pagination from "../../components/Pagination";
import PopularTags from "../../components/PopularTags";
import { getPaginator, limit } from "../../utils";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import FeedToggler from "../../components/FeedToggler";

const GlobalFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = stringify({
    limit,
    offset
  });
  const apiUrl = `/articles?${stringifiedParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const url = match.url;

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={url}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
