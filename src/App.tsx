import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import UserListing from "./UserListing";
import { User } from "./util/UserTypes";

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
      {users ? <UserListing fetchedUsers={users} /> : "Loading..."}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
