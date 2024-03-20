import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlus,
  FaPlusCircle,
  FaEdit,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { cancelAssignmentUpdate, deleteAssignment, selectAssignment } from "./assignmentsReducer";
import { KanbasState } from "../../store";

function Assignments() {
  const { courseId } = useParams();
  const assignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignment
  );
  const assignments = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignments
  );
  console.log(assignments);
  const assignmentList = assignments.filter((assignment) => assignment.course === courseId);
  console.log(assignmentList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToAddAssignemnt = () => {
    dispatch(cancelAssignmentUpdate());
    navigate(`/Kanbas/Courses/${courseId}/Assignments/Editor`);
  };

  const handleDelete = () => {
    const result = window.confirm(
      "Are you sure you want to delete this Assignment?"
    );
    if (result) {
      console.log("Yes");
      return true;
    } else {
      console.log("No");
      return false;
    }
  };
  return (
    <>
      <div className="col me-3">
        <div className="row wd-margin-top">
          <div className="float-end wd-margin-right">
            <div className="wd-button float-end">
              <a
                className="btn btn-secondary btn-sm"
                role="button"
                style={{ backgroundColor: "lightgray" }}
              >
                <FaEllipsisV />
              </a>
            </div>
            <div className="wd-button float-end">
            <Button variant="danger btn-sm" onClick={navigateToAddAssignemnt}>
                <FaPlus className="me-1" />
                Assignment
              </Button>{" "}
            </div>

            <div className="wd-button float-end">
              <Button
                variant="secondary btn-sm"
                style={{ backgroundColor: "lightgray" }}
              >
                <FaPlus className="me-1" />
                Group
              </Button>{" "}
            </div>
            <div className="float-start w-25">
              <input
                className="form-control"
                id="input1"
                placeholder="Search for Assignment"
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="wd-assignments-list">
          <ul
            className="list-group wd-margin-left"
            style={{ borderRadius: "0%" }}
          >
            <li className="list-group-item list-group-item-secondary">
              <div>
                <FaEllipsisV className="me-2" />
                <b>Assignments</b>
                <span className="float-end">
                  <label
                    className="form-label pe-2 ps-2 me-3"
                    style={{
                      borderRadius: "50px",
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  >
                    40% of Total
                  </label>
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
            </li>
            <ul className="list-group" style={{ borderRadius: "0%" }}>
              {assignmentList.map((assignment) => (
                <li className="list-group-item">
                  <div className="row">
                    <div
                      className="col-auto"
                      style={{ margin: "auto", display: "flex" }}
                    >
                      <FaEllipsisV
                        style={{ verticalAlign: "middle", marginRight: "10px" }}
                      />
                      <FaEdit style={{ color: "green" }} />
                    </div>
                    <div className="col wd-fg-color-gray ps-0 ms-2">
                    <Link onClick={(e)=>dispatch(selectAssignment(assignment))}
                        style={{ color: "green", textDecoration: "none" }}
                        className="fw-bold ps-0"
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                      >
                        {assignment.title}
                      </Link>
                      <br />
                      {assignment.description} |
                      <br />
                      <b>Due</b> {assignment.dueDateTime} | {assignment.points}
                    </div>
                    <div
                      className="col-auto"
                      style={{ margin: "auto", display: "flex" }}
                    >
                      <button
                        className="btn m-0 pt-0 pb-0 me-1 btn-danger btn-sm"
                        onClick={() => {
                          // handleDelete()
                          //   ? dispatch(deleteAssignment(assignment._id))
                          //   : navigate(
                          //       `/Kanbas/Courses/${courseId}/Assignments`
                          //     );
                          if (handleDelete()) {
                            dispatch(deleteAssignment(assignment._id))
                          }
                        }}
                      >
                        Delete
                      </button>
                      <FaCheckCircle style={{ color: "green" }} />
                      <FaEllipsisV style={{ verticalAlign: "middle" }} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Assignments;
