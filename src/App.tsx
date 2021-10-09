import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import UserListing from "./UserListing";
import { User } from "./util/UserTypes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserDetails from "./UserDetails";

const App = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
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
    <div className="app-body">
      <Router>
        <Switch>
          <Route path="/user-details/:id">
            <UserDetails />
          </Route>
          <Route path="/">
            {users ? <UserListing fetchedUsers={users} /> : "Loading..."}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
