import { ReactElement, useEffect, useState } from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { User, Post } from "./util/UserTypes";
type Props = RouteComponentProps;

const UserDetails = (props: Props): ReactElement => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  useEffect(() => {
    async function getUser(): Promise<void> {
      const fetchedUserResponse: Response = await fetch(
        `http://jsonplaceholder.typicode.com/users/${props?.match?.params?.id}`
      );
      const fetchedUser: User = (await fetchedUserResponse.json()) as User;
      setUser(fetchedUser);
    }
    async function getUserPosts(): Promise<void> {
      const fetchedUserPostsResponse: Response = await fetch(
        `http://jsonplaceholder.typicode.com/posts?userId=${props?.match?.params?.id}`
      );
      const fetchedPosts = (await fetchedUserPostsResponse.json()) as Post[];
      setPosts(fetchedPosts);
    }
    void getUser();
    void getUserPosts();
  }, []);
  return renderUserInfo();

  function renderUserInfo(): ReactElement {
    if (user) {
      return (
        <div className="user-details-wrapper">
          <h1>
            <Link to="/" className="header-link">
              Users
            </Link>
            {" > " + user?.name}
          </h1>
          <div className="user-details-body">
            <div className="user-info-section">
              <div className="info-container">
                <h2>Contact info</h2>
                <div>Username: {user.username}</div>
                <div>
                  Email: <a href={"mailto:" + user.email}>{user.email}</a>
                </div>
                <div>
                  Phone: <a href={"tel:" + user.phone}>{user.phone}</a>
                </div>
                <div>
                  Website: <a href={"http://" + user.website}>{user.website}</a>
                </div>
              </div>
              <div className="info-container">
                <h2>Address</h2>
                {`${user.address.suite} ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
              </div>
              <div className="info-container"></div>
              <h2>Company</h2>
              <div>{user.company.name}</div>

              <div>{user.company.bs}</div>

              <div>{`"${user.company.catchPhrase}"`}</div>
            </div>
            <div className="user-posts-section">
              <h2>Posts by {user.name}</h2>
              <div className="posts-listing-wrapper">
                {posts ? posts.map(renderPost) : "Loading posts..."}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div>Loading user info...</div>;
  }

  function renderPost(post: Post): ReactElement {
    return (
      <div>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    );
  }
};

export default withRouter(UserDetails);
