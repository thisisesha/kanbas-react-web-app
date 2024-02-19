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
function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  return (
    <>
      {/* <!-- Add buttons here --> */}
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
            <FaCheckCircle/>
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
        {modulesList.map((module) => (
          <li
            className="list-group-item"
            onClick={() => setSelectedModule(module)}
          >
            <div>
              <FaEllipsisV className="me-2" />
              {module.name}
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            {selectedModule._id === module._id && (
              <ul className="list-group">
                {module.lessons?.map((lesson) => (
                  <li className="list-group-item">
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ModuleList;
