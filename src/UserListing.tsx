import { ReactElement, useState } from "react";
import { User } from "./util/UserTypes";
import { Link } from "react-router-dom";

type Props = {
  fetchedUsers: User[];
  handleInvertModeCallback: () => void;
};

type SortByValue = "name" | "username" | "email";

const UserListing = ({
  handleInvertModeCallback,
  fetchedUsers,
}: Props): ReactElement => {
  const [users, setUsers] = useState(fetchedUsers);
  const [searchText, setSearchText] = useState("");
  const [sortByValue, setSortByValue] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  return (
    <div className="user-listing-wrapper">
      <h1>Users</h1>
      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            onChange={updateSearchText}
            id="search"
            placeholder="Enter search text..."
          />
        </div>
        <div className="filter-group">
          <label htmlFor="sortBy">Sort By</label>
          <div className="sort-control">
            <select
              name="sortBy"
              id="sortBy"
              value={sortByValue}
              onChange={updateSortBy}
              onBlur={updateSortBy}
            >
              <option value="name">Name</option>
              <option value="username">Username</option>
              <option value="email">Email</option>
            </select>
            <button onClick={updateSortDirection}>{sortAsc ? "↓" : "↑"}</button>
            <button
              className="mode-toggle"
              onClick={handleInvertModeCallback}
            ></button>
          </div>
        </div>
      </div>
      <div className="users-listing-section">
        {users.filter(filterUsers).sort(sortUsers).map(renderUserEntry)}
      </div>
    </div>
  );

  function sortUsers(userA: User, userB: User) {
    const dir = sortAsc ? 1 : -1;
    switch (sortByValue) {
      case "username":
        return dir * userA.username.localeCompare(userB.username);
      case "email":
        return dir * userA.email.localeCompare(userB.email);
      default:
        return dir * userA.name.localeCompare(userB.name);
    }
  }

  function filterUsers(user: User) {
    return (
      user.username.includes(searchText) ||
      user.email.includes(searchText) ||
      user.name.includes(searchText)
    );
  }

  function updateSortDirection(): void {
    setSortAsc(!sortAsc);
  }

  function updateSortBy(event: React.ChangeEvent<HTMLSelectElement>): void {
    setSortByValue(event.target.value);
  }

  function updateSearchText(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchText(event.target.value);
  }

  function renderUserEntry(user: User) {
    return (
      <Link
        key={user.id}
        className="user-list-item"
        to={"/user-details/" + user.id}
      >
        <div className="portrait"></div>
        <div className="user-info">
          <div className="left-content">
            <div>{user.name}</div>
            <div>{user.username}</div>
          </div>
          <button
            className="user-email"
            onClick={(event) => {
              event.preventDefault();
              window.location.href = "mailto:" + user.email;
            }}
          >
            {user.email}
          </button>
        </div>
      </Link>
    );
  }
};

export default UserListing;
