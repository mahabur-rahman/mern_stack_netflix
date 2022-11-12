import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState([]);

  // get random movie
  useEffect(() => {
    const getRandomMoive = async () => {
      try {
        const res = await axios.get(`movies/random?type=${type}`, {
          headers: {
            token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmE5MWM1NmU1NDAwN2M3Y2Q2ODkwMSIsImlzQWRtaW4iOiJ0cnVlIiwiaWF0IjoxNjY4MDg2MzU4LCJleHAiOjE2NzA2NzgzNTh9.M32rLCRRy3jclJjwKqV7KpHIJ91LwkHpNo9ndKxXp4g`,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };

    getRandomMoive();
  }, [type]);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content?.img} alt="" />
      <div className="info">
        <img src={content?.imgTitle} alt="" />
        <span className="desc">{content?.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
