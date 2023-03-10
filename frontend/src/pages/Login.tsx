import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";
import ErrorNotication from "../components/ErrorNotification";

function Login(): JSX.Element {
  const { login, authError, isLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="section">
      <div className="container is-fluid">
        <form className="box">
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@example.com"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="********"
              />
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              login(email, password);
            }}
            className="button is-primary"
          >
            Log in
          </button>
        </form>

        {authError && <ErrorNotication message={authError} />}
      </div>
    </div>
  );
}

export default Login;
