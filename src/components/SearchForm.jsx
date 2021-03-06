import search from "../search.svg";
import close from "../close.svg";
import { useState } from "react";
import { useStateValue } from "../State/StateProvider";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchForm() {
  let [typing, setTyping] = useState(false);
  let path = useLocation().search.split("&");
  let q = path[0].split("=")[1];
  let [value, setValue] = useState(q || "");
  let [, dispatch] = useStateValue();
  let navigate = useNavigate();

  const handle = (e) => {
    if (e.target.value === "") {
      setTyping(false);
    } else {
      setTyping(true);
    }
    setValue(e.target.value);
  };

  const clear = () => {
    setValue("");
    setTyping(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({
      type: "term",
      item: value,
    });

    navigate(`/search?q=${value}&start=1`);
  };

  return (
    <form
      className="relative flex items-center justify-center w-full bg-white"
      onSubmit={handleSearch}
    >
      {typing && (
        <button type="button" className="inline-block ml-2" onClick={clear}>
          <img src={close} alt="search" className="w-3 h-3" />
        </button>
      )}
      <input
        type="text"
        className="w-full p-3 text-sm border-b-2 outline-none md:p-4 bg-none"
        placeholder="What are you looking for?"
        onChange={handle}
        value={value.replace(/%20/g, " ")}
      />
      <button
        type="submit"
        className="absolute -translate-y-1/2 right-4 top-1/2"
      >
        <img src={search} alt="search" className="w-4 h-4" />
      </button>
    </form>
  );
}
