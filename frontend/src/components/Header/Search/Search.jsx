import { MdClose } from "react-icons/md";
import "./Search.scss";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const Search = ({ setShowSearch }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [cachedResults, setCachedResults] = useState({});
  const navigate = useNavigate();

  const { data, error, loading } = useFetch(
    debouncedQuery ? `/api/products/search/${debouncedQuery}` : null
  );

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  useEffect(() => {
    if (data && debouncedQuery) {
      setCachedResults((prev) => ({
        ...prev,
        [debouncedQuery]: data.products,
      }));
    }
  }, [data, debouncedQuery]);

  const handleSearchChange = useCallback(
    debounce((value) => {
      setDebouncedQuery(value);
    }, 500),
    []
  );

  const onChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearchChange(value);
  };
  const products = cachedResults[debouncedQuery] || data?.products;

  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          type="text"
          autoFocus
          placeholder="Search Products"
          value={query}
          onChange={onChange}
        />
        <MdClose
          onClick={() => {
            setShowSearch(false);
          }}
        />
      </div>
      <div className="search-result-content">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">Something went wrong</div>}
        <div className="search-results">
          {products?.length > 0 ? (
            products?.map((item) => (
              <div
                key={item._id}
                className="search-result-item"
                onClick={() => {
                  navigate("/product/" + item._id);
                  setShowSearch(false);
                }}
              >
                <div className="image-container">
                  <img src={item?.thumbnail} alt={item?.title} loading="lazy" />
                </div>
                <div className="prod-details">
                  <span className="name">{item?.title}</span>
                  <span className="desc">{item?.description}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
{
  /*import { MdClose } from "react-icons/md";
import prod from "../../../assets/products/earbuds-prod-5.webp";
import "./Search.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
const Search = ({ setShowSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  let { data } = useFetch(`/api/products/search/${query}`);

  // if (!query.length) {
  //   data = null;
  // }
  const onChange = (e) => {
    setQuery(e.target.value);
  };
  const products = data?.products;

  // console.log(products[0].title);
  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          type="text"
          autoFocus
          placeholder="Search Products"
          value={query}
          onChange={onChange}
        />
        <MdClose
          onClick={() => {
            setShowSearch(false);
          }}
        />
      </div>
      <div className="search-result-content">
        <div className="search-results">
          {products?.map((item) => (
            <div key={item._id} className="search-result-item">
              <div className="image-container">
                <img src={item?.thumbnail} alt="" />
              </div>
              <div className="prod-details">
                <span className="name">{item?.title}</span>

                <span className="desc">{item?.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
*/
}
