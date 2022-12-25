import { useContext, useState } from "react";
import { AuthContext } from "../contexts/Auth";
import ErrorNotication from "./ErrorNotification";
import { Navigate, redirect } from "react-router-dom";

function Signup(): JSX.Element {
  const { signup, authError, isLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="box">
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
            signup(email, password);
          }}
          className="button is-primary"
        >
          Sign up
        </button>
      </form>

      {authError && <ErrorNotication message={authError} />}
    </div>
  );
}

export default Signup;
