import React from "react";
import { Link } from "react-router-dom";

import TagList from "./TagList";
import AddToFavorite from "./AddToFavorite";

const Feed = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <div className="article-preview" key={index}>
          <div className="article-meta">
            <Link to={`/profiles/${article.author.username}`}>
              {article.author.image && (
                <img src={article.author.image} alt="user avatar" />
              )}
            </Link>
            <div className="info">
              <Link
                to={`/profiles/${article.author.username}`}
                className="author"
              >
                {article.author.username}
              </Link>
              <span className="date">{article.createdAt}</span>
            </div>
            <div className="pull-xs-right">
              <AddToFavorite
                isFavorited={article.favorited}
                favoritesCount={article.favoritesCount}
                articlesSlug={article.slug}
              />
            </div>
          </div>
          <Link to={`/article/${article.slug}`} className="preview-link">
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>

            <TagList tags={article.tagList} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Feed;
