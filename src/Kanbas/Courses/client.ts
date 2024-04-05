import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
export const COURSES_API = `${BASE_API}/api/courses`;

export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: Date;
    endDate: Date;
    image: string;
  }

  axios.defaults.withCredentials = true

  export const findAllCourses = async () => {
    const response = await axios.get(`${COURSES_API}`);
    return response.data;
  };

  export const createCourse = async (course: Course) => {
    const response = await axios.post(`${COURSES_API}`, course);
    return response.data;
  };

  export const findCourseById = async (id: string) => {
    const response = await axios.get(`${COURSES_API}/${id}`);
    return response.data;
  };

  export const updateCourse = async (course: any) => {
    console.log(course);
    const response = await axios.put(`${COURSES_API}/${course.id}`, course);
    return response.data;
  };

  export const deleteCourse = async (course: any) => {
    const response = await axios.delete(
      `${COURSES_API}/${course.id}`);
    return response.data;
  };