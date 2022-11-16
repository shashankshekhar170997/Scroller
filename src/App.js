import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
// import Login from "./login";
function App() {
  const [offset, setOffset] = useState(0);

  const [post, setpost] = useState([]);
  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?results=10`)
      .then((res) => {
        console.log(res.data.results);
        // setpost(res.data.results);
        setpost((pre) => [...pre, ...res.data.results]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [offset]);
  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setOffset(offset + 10);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return (
    <div className="App">
      {post.map((posts) => (
        <div key={posts.large}>
          <img src={posts.picture.large} alt="" />
          <div className="contact">
            <p>contact - {posts.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
