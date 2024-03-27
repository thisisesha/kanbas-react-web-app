import { Link, Navigate, Route, Routes } from "react-router-dom";
import Nav from "../Nav";
import KanbasNavigation from "./KanbasNavigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useState } from "react";
import { courses } from "./Database";
import store from "./store";
import { Provider } from "react-redux";



function Kanbas() {
  const [course, setCourses] = useState(courses);
  const [course1, setCourse1] = useState({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "reactjs.png",
  });
  const updateCourse = () => {
    setCourses(
      course.map((c) => {
        if (c._id === course1._id) {
          return course1;
        } else {
          return c;
        }
      })
    );
  };

  const addNewCourse = () => {
    const newCourse = { ...course1, _id: new Date().getTime().toString() };
    setCourses([...course, { ...course1, ...newCourse }]);
  };
  const deleteCourse = (courseId: any) => {
    setCourses(course.filter((course1) => course1._id !== courseId));
  };

  return (
    <Provider store={store}>
    <div className="d-flex">
      <KanbasNavigation/>
      <div style={{ flexGrow: 1 }}>
      <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account" element={<h1>Account</h1>} />
          <Route path="Dashboard" element={
            <Dashboard
            course={course}
            course1={course1}
            setCourse1={setCourse1}
            addNewCourse={addNewCourse}
            deleteCourse={deleteCourse}
            updateCourse={updateCourse}/>

          } />
          <Route path="Courses/*" element={<h1>Courses</h1>} />
          <Route path="Courses/:courseId/*" element={<Courses course2={course} />} />
          <Route path="Calendar" element={<h1>Calendar</h1>} />
          <Route path="Inbox" element={<h1>Inbox</h1>} />
          <Route path="History" element={<h1>History</h1>} />
          <Route path="Studio" element={<h1>Studio</h1>} />
          <Route path="Commons" element={<h1>Commons</h1>} />
          <Route path="Help" element={<h1>Help</h1>} />
        </Routes>

      </div>
    </div>
    </Provider>
  );
}
export default Kanbas;
