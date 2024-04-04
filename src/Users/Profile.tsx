import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({
    id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    console.log(account);
    if (account !== null && account.dob && account.dob !== "") {
      account.dob = new Date(account.dob).toISOString().split("T")[0];
    }
    setProfile(account);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  const save = async () => {
    await client.updateUser(profile);
  };

  return (
    <div>
      <h1>Profile</h1>
      <Link
        to="/Kanbas/Account/Admin/Users"
        className="btn btn-warning w-100 mb-2"
      >
        Users
      </Link>
      {profile && (
        <form>
          <div className="form-group">
            <input
              className="form-control mb-2"
              value={profile.username}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              type="password"
              value={profile.password}
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              value={profile.dob}
              type="date"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
            <input
              className="form-control mb-2"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <select
              className="form-control mb-2"
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
            <button className="form-control btn btn-primary" onClick={save}>
              Save
            </button>
            <button className="form-control btn btn-danger" onClick={signout}>
              Signout
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
