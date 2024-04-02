import { Link, Navigate, Route, Routes } from "react-router-dom";
import Nav from "../Nav";
import KanbasNavigation from "./KanbasNavigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

function Kanbas() {
  const [course, setCourses] = useState<any[]>([]);
  const [course1, setCourse1] = useState({
    _id: "",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "reactjs.png",
  });
  const COURSES_API = `${API_BASE}/api/courses`;
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  const updateCourse = async () => {
    const response = await axios.put(
      `${COURSES_API}/${course1._id}`,
      course
    );
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

  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course1);
    setCourses([...course, response.data ]);
  };
  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}`
    );
    setCourses(course.filter(
      (c) => c._id !== courseId));
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
          <Route path="Courses/:courseId/*" element={<Courses/>} />
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
