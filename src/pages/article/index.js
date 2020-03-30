import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import TagList from "../../components/TagList";
import { CurrentUserContext } from "../../context/currentUser";

const Article = ({ match }) => {
  const [currentUserState] = useContext(CurrentUserContext);
  const slug = match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

  const [
    {
      response: fetchArticleResponse,
      error: fetchArticleError,
      isLoading: fetchArticleIsLoading
    },
    doFetch
  ] = useFetch(apiUrl);
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(
    apiUrl
  );

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) return false;

    return (
      fetchArticleResponse.article.author.username ===
      currentUserState.currentUser.username
    );
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  const deleteArticle = () => {
    doDeleteArticle({
      method: "delete"
    });
  };

  useEffect(() => {
    if (!deleteArticleResponse) return;
    setIsSuccessfullDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfullDelete) return <Redirect to="/" />;

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profile/${fetchArticleResponse.article.author.username}`}
              >
                <img
                  src={fetchArticleResponse.article.author.image}
                  alt="avatar"
                />
              </Link>
              <div className="info">
                <Link
                  to={`/profile/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>

              {isAuthor() && (
                <span>
                  <Link
                    to={`/article/${fetchArticleResponse.article.slug}/edit`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <i className="ion-edit" /> Edit Post
                  </Link>{" "}
                  <button
                    onClick={deleteArticle}
                    className="btn btn-outline-danger btn-sm"
                  >
                    <i className="ion-trash-a" /> Delete Post
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{fetchArticleResponse.article.body}</p>
              </div>
              <TagList tags={fetchArticleResponse.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
