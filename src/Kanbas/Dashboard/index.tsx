import React, { useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";

function Dashboard({
  course,
  course1,
  setCourse1,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  course: any[];
  course1: any;
  setCourse1: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const handleCourseUpdate = (course: any) => {
    if (course !== null) {
      console.log("hi");
      if (course.startDate && course.startDate !== "") {
        course.startDate = new Date(course.startDate)
          .toISOString()
          .split("T")[0];
      }
      if (course.endDate && course.endDate !== "") {
        course.endDate = new Date(course.endDate).toISOString().split("T")[0];
      }
    }
    setCourse1(course);
  };
  return (
    <div className="p-4">
      <h1>Dashboard</h1> <hr />
      <h5>Course</h5>
      <input
        value={course1.name}
        className="form-control"
        onChange={(e) => setCourse1({ ...course1, name: e.target.value })}
      />
      <input
        value={course1.number}
        className="form-control"
        onChange={(e) => setCourse1({ ...course1, number: e.target.value })}
      />
      <input
        value={course1.startDate}
        className="form-control"
        type="date"
        onChange={(e) => setCourse1({ ...course1, startDate: e.target.value })}
      />
      <input
        value={course1.endDate}
        className="form-control"
        type="date"
        onChange={(e) => setCourse1({ ...course1, endDate: e.target.value })}
      />
      <button
        className="btn btn-primary btn-md me-1"
        style={{
          //width: "50px",
          backgroundColor: "red",
          borderRadius: "5px",
        }}
        onClick={addNewCourse}
      >
        Add
      </button>
      <button
        className="btn btn-primary btn-md me-1"
        style={{
          //width: "50px",
          // backgroundColor: "blue",
          borderRadius: "5px",
        }}
        onClick={updateCourse}
      >
        Update
      </button>
      <br />
      <br></br>
      <h2>Published Courses ({course.length})</h2> <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {course.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card">
                <img
                  src={`/images/${course.image}`}
                  className="card-img-top"
                  style={{ height: 150 }}
                />
                <div className="card-body">
                  <Link
                    className="card-title"
                    to={`/Kanbas/Courses/${course.id}/Home`}
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    {course.name}{" "}
                    <button
                      className="btn btn-primary btn-sm me-1"
                      style={{
                        //width: "50px",
                        backgroundColor: "green",
                        borderRadius: "5px",
                      }}
                      onClick={(event) => {
                        event.preventDefault();
                        //setCourse1(course);
                        handleCourseUpdate(course);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      style={{
                        //width: "50px",
                        backgroundColor: "red",
                        borderRadius: "5px",
                      }}
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(course._id);
                      }}
                    >
                      Delete
                    </button>
                  </Link>
                  <p className="card-text">{course.name}</p>
                  <Link
                    to={`/Kanbas/Courses/${course.id}/Home`}
                    className="btn btn-primary"
                  >
                    Go
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
