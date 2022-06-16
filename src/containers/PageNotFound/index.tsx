import { Link } from "react-router-dom";
import Header from "../../components/header";

const pageNotFound = () => {
  return (
    <>
      <Header />
      <div>
        <h1 style={{ color: "red", fontSize: 100 }}>404</h1>
        <h3>Page Not Found</h3>
        <p>
          <Link to="/" style={{ textDecoration: "underline" }}>
            Go home
          </Link>
        </p>
      </div>
    </>
  );
};

export default pageNotFound;
