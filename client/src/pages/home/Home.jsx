import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      // http://localhost:4000/api/lists?type=movie&genre=crime

      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmE5MWM1NmU1NDAwN2M3Y2Q2ODkwMSIsImlzQWRtaW4iOiJ0cnVlIiwiaWF0IjoxNjY4MDg2MzU4LCJleHAiOjE2NzA2NzgzNTh9.M32rLCRRy3jclJjwKqV7KpHIJ91LwkHpNo9ndKxXp4g`,
            },
          }
        );

        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />

      <Featured type={type} />
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
};

export default Home;
