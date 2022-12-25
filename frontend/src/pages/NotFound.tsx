import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="section">
      <div className="container is-fluid">
        <h1 className="title">Oops! You seem to be lost.</h1>
        <p className="subtitle">Here are some helpful links:</p>
        <Link to="/">Go back to home</Link>
      </div>
    </div>
  );
}
