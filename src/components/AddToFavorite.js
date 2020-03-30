import React from "react";
import classNames from "classnames";
import useFetch from "../hooks/useFetch";
const AddToFavorite = ({ isFavorited, favoritesCount, articlesSlug }) => {
  const apiUrl = `/articles/${articlesSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const favoritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;
  const isFavoritedWithResponse = response
    ? response.article.favorited
    : isFavorited;
  const buttonClasses = classNames({
    btn: true,
    "btn-sm": true,
    "btn-primary": isFavoritedWithResponse,
    "btn-outline-primary": !isFavoritedWithResponse
  });

  const handleLike = e => {
    e.preventDefault();
    doFetch({
      method: isFavoritedWithResponse ? "delete" : "post"
    });
  };

  return (
    <button className={buttonClasses} onClick={handleLike}>
      <i className="ion-heart" /> <span>{favoritesCountWithResponse}</span>
    </button>
  );
};

export default AddToFavorite;
