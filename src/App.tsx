import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import UserListing from "./UserListing";
import { User } from "./util/UserTypes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserDetails from "./UserDetails";

const App = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);

  const [inDarkMode, setInDarkMode] = useState(false);
  useEffect(() => {
    async function getUsers(): Promise<void> {
      const fetchedUsersResponse: Response = await fetch(
        "http://jsonplaceholder.typicode.com/users"
      );
      const fetchedUsers: User[] =
        (await fetchedUsersResponse.json()) as User[];
      setUsers(fetchedUsers);
    }
    void getUsers();
  }, []);

  return (
    <div className={"app-body" + (inDarkMode ? " dark-mode" : "")}>
      <Router>
        <Switch>
          <Route path="/user-details/:id">
            <UserDetails />
          </Route>
          <Route path="/">
            {users ? (
              <UserListing
                handleInvertModeCallback={handleInvertMode}
                fetchedUsers={users}
              />
            ) : (
              "Loading..."
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );

  function handleInvertMode(): void {
    const r: Element | null = document.querySelector(":root");
    setInDarkMode(!inDarkMode);
    if (r) {
      if (!inDarkMode) {
        r.style.setProperty("--background-color", "black");
        r.style.setProperty("--text-color", "white");
        r.style.setProperty("--button-background", "black");
        r.style.setProperty("--list-alt-color", "maroon");
        r.style.setProperty("--hover-color", "orange");
        r.style.setProperty("--link-color", "green");
      } else {
        r.style.setProperty("--background-color", "white");
        r.style.setProperty("--text-color", "black");
        r.style.setProperty("--button-background", "rgb(202, 195, 195)");
        r.style.setProperty("--list-alt-color", "lightgray");
        r.style.setProperty("--hover-color", "rgb(181, 204, 226)");
        r.style.setProperty("--link-color", "cornflowerblue");
      }
    }
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
