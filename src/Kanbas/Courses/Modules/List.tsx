import React, { useState } from "react";
import "./index.css";
import { modules } from "../../Database";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlusCircle,
  FaPlus,
} from "react-icons/fa";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, setModule } from "./reducer";
import { KanbasState } from "../../store";

function ModuleList() {
  const { courseId } = useParams();
  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Link to={"#"} className="btn btn-secondary btn-sm wd-button">
          Collapse All
        </Link>

        <Link
          to={"#"}
          className="btn btn-secondary btn-sm wd-button"
          role="button"
        >
          View Progress
        </Link>

        <div className="dropdown">
          <Link
            to={"#"}
            className="btn btn-secondary btn-sm dropdown-toggle wd-button"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
          >
            <FaCheckCircle />
            Publish All
          </Link>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <Link to={"#"} className="dropdown-item">
                None
              </Link>
            </li>
          </ul>
        </div>

        <Link to={"#"} className="btn btn-danger btn-sm" role="button">
          <FaPlus />
          Modules
        </Link>

        <Link
          to={"#"}
          className="btn btn-secondary btn-sm wd-button"
          role="button"
        >
          <FaEllipsisV />
        </Link>
      </div>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div className="d-flex">
            <div>
              <input
                value={module.name}
                className="form-group"
                onChange={(e) =>
                  dispatch(setModule({ ...module, name: e.target.value }))
                }
              />
            </div>
            <div style={{ marginLeft: "5px" }}>
              <button
                className="btn btn-primary btn-md me-1"
                style={{
                  width: "45px",
                  backgroundColor: "green",
                  borderRadius: "5px",
                }}
                onClick={() =>
                  dispatch(addModule({ ...module, course: courseId }))
                }
              >
                Add
              </button>
              <button
                className="btn btn-primary btn-md me-1"
                style={{ width: "60px", borderRadius: "5px" }}
                onClick={() => dispatch(updateModule(module))}
              >
                Update
              </button>
            </div>
          </div>
          <div className="ml-2">
            <textarea
              value={module.description}
              className="form-group"
              onChange={(e) =>
                dispatch(setModule({ ...module, description: e.target.value }))
              }
            />
          </div>
        </li>

        {moduleList
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => setSelectedModule(module)}
            >
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <button
                    className="btn btn-primary btn-md me-1"
                    style={{
                      width: "60px",
                      backgroundColor: "red",
                      borderRadius: "5px",
                    }}
                    onClick={() => dispatch(deleteModule(module._id))}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary btn-md me-1"
                    style={{
                      width: "50px",
                      backgroundColor: "green",
                      borderRadius: "5px",
                    }}
                    onClick={() => dispatch(setModule(module))}
                  >
                    Edit
                  </button>

                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
              {selectedModule._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map(
                    (lesson: {
                      name:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined;
                    }) => (
                      <li className="list-group-item">
                        <FaEllipsisV className="me-2" />
                        {lesson.name}
                        <span className="float-end">
                          <FaCheckCircle className="text-success" />
                          <FaEllipsisV className="ms-2" />
                        </span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </>
  );
}
export default ModuleList;
