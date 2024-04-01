import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  selectAssignment,
} from "../assignmentsReducer";
import { KanbasState } from "../../../store";
import { cancelAssignmentUpdate } from "../assignmentsReducer";
import * as service from "../../Assignments/service";

function AssignmentEditor() {
  const { assignmentId, courseId } = useParams();
  const isAddNew = assignmentId === "Editor";
  const navigate = useNavigate();
  

  const dispatch = useDispatch();
  const assignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignment
  );
  // const assignmentList = useSelector((state: KanbasState) =>
  //       state.assignmentsReducer.assignments);

  //   useEffect(() => {
  //     const assignmentData = assignmentList.find(a => a._id === assignmentId);
  //     if (assignmentData) {
  //         dispatch(selectAssignment(assignmentData));
  //         console.log("Hello");
  //     } else {
  //         dispatch(cancelAssignmentUpdate(assignment));
  //     }
  // }, [dispatch, assignmentId]);

  const handleSave = () => {
    if (isAddNew) {
      handleAddingNew();
    } else {
      handleUpdateAssignment();
    }
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  const handleAddingNew = () => {
    service.createAssignment(courseId, assignment).then((assignment) => {
      dispatch(addAssignment(assignment));
    });
  };

    const handleUpdateAssignment = async () => {
      const status = await service.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
    };

    const handleCancel = () => {
      dispatch(cancelAssignmentUpdate(assignment));
      navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

  return (
    <div className="me-3">
      <h2>Assignment Name</h2>
      <input
        value={assignment?.title}
        onChange={(e) =>
          dispatch(selectAssignment({ ...assignment, title: e.target.value }))
        }
        className="form-control mb-2"
      />
      <br />
      <textarea
        value={assignment?.description}
        className="form-control"
        cols={50}
        rows={5}
        onChange={(e) =>
          dispatch(
            selectAssignment({ ...assignment, description: e.target.value })
          )
        }
      ></textarea>
      <br />
      <div className="row g-0 text-end" style={{ paddingBottom: "15px" }}>
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          Points
        </div>
        <div className="col-sm-6 col-md-8 w-50">
          <input
            className="form-control"
            type="number"
            placeholder="Points"
            aria-label="default input example"
            value={assignment?.points}
            onChange={(e) =>
              dispatch(
                selectAssignment({ ...assignment, points: e.target.value })
              )
            }
          />
        </div>
      </div>
      <div className="row g-0 text-end">
        <div
          className="col-6 col-md-4"
          style={{ paddingTop: "5px", paddingRight: "15px" }}
        >
          Assign
        </div>
        <div className="col-sm-6 col-md-8 w-50" style={{ textAlign: "start" }}>
          <div
            className="wd-group"
            style={{
              border: "0.5px solid black",
              borderRadius: "1%",
              padding: "10px",
            }}
          >
            <b>Assign to</b>
            <input
              className="form-control"
              type="text"
              placeholder="Choose"
              value="Everyone"
              aria-label="default input example"
            />
            <br />
            <b>Due</b>
            <input
              className="form-control"
              type="datetime-local"
              value={assignment?.dueDateTime}
              onChange={(e) =>
                dispatch(
                  selectAssignment({
                    ...assignment,
                    dueDateTime: e.target.value,
                  })
                )
              }
            />

            <br />
            <div
              className="wd-flex-row-container"
              style={{
                width: "-webkit-fill-available",
                justifyContent: "space-around",
              }}
            >
              <div className="row">
                <div className="col">
                  <b>Available from </b>
                </div>
                <div className="col">
                  <b>Until </b>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <input
                    className="form-control w-75"
                    type="datetime-local"
                    value={assignment?.availableFromDate}
                    onChange={(e) =>
                      dispatch(
                        selectAssignment({
                          ...assignment,
                          availableFromDate: e.target.value,
                        })
                      )
                    }
                  />
                </div>
                <div className="col">
                  <input
                    className="form-control w-75"
                    type="datetime-local"
                    value={assignment?.availableUntilDate}
                    onChange={(e) =>
                      dispatch(
                        selectAssignment({
                          ...assignment,
                          availableUntilDate: e.target.value,
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleSave} className="btn btn-success ms-2 float-end">
        Save
      </button>
      <Link
        onClick={() => dispatch(cancelAssignmentUpdate(assignment))}
        to={`/Kanbas/Courses/${courseId}/Assignments`}
        className="btn btn-danger float-end"
      >
        Cancel
      </Link>
    </div>
  );
}
export default AssignmentEditor;
