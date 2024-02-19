import { courses } from "../../Kanbas/Database";
import {
  useParams,
  Link,
  useLocation,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import "./index.css";
import Modules from "./Modules";
import StudentView from "./StudentView";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";

function Courses() {
  const { courseId } = useParams();
  const { pathname } = useLocation();
  const [slash, kanbas, cour, id, screen, assignment] = pathname.split("/");
  const isAssignmentScreen = assignment ? true : false;

  const course = courses.find((course) => course._id === courseId);
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex wd-nav-div-margin">
          <h5>
            <HiMiniBars3 color="red" />{" "}
          </h5>

          <nav className="wd-nav-style" aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item wd-top-bar">
                <Link
                  style={{
                    marginTop: "3px",
                    marginLeft: "2px",
                    textDecoration: "none",
                    paddingTop: "10px",
                    color: "red",
                  }}
                  to={`/Kanbas/Courses/${courseId}/Home`}
                >
                  Course {course?.name}{" "}
                </Link>
              </li>
              {!isAssignmentScreen ? (
                <li className="breadcrumb-item active wd-top-bar-text">
                  {screen}
                </li>
              ) : (
                <>
                <li className="breadcrumb-item wd-top-bar">
                  <Link
                    style={{
                      marginTop: "3px",
                      marginLeft: "2px",
                      textDecoration: "none",
                      paddingTop: "10px",
                      color: "red",
                    }}
                    to={`/Kanbas/Courses/${courseId}/Assignments`}
                  >
                    Assignments{" "}
                  </Link>
                </li>

                <li className="breadcrumb-item wd-top-bar">
                   {assignment}
                </li>
                </>
                
              )}
            </ol>
          </nav>
        </div>

        <StudentView />
      </div>
      <hr />
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "70px" }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>
    </>
  );
}
export default Courses;