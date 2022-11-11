import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`users?new=true`, {
          headers: {
            token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmE5MWM1NmU1NDAwN2M3Y2Q2ODkwMSIsImlzQWRtaW4iOiJ0cnVlIiwiaWF0IjoxNjY4MDg2MzU4LCJleHAiOjE2NzA2NzgzNTh9.M32rLCRRy3jclJjwKqV7KpHIJ91LwkHpNo9ndKxXp4g`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users?.map((user) => {
          return (
            <li className="widgetSmListItem" key={user._id}>
              <img
                src={
                  user.profilePic ||
                  "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
                <span className="widgetSmUserTitle">{user.email}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
