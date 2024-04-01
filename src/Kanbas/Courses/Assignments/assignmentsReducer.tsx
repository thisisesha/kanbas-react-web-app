import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

interface Assignment {
    title: string;
    description: string;
    points: string;
    dueDateTime: string;
    _id: string,
    course: string;
    availableFromDate: string;
    availableUntilDate: string;
  }

const initialState = {
    assignments: [] as Assignment[],
    assignment: {
    _id: "-1",
    title: "New Assignment",
    description: "New Description",
    course: "-1",
    points: "100",
    dueDateTime: new Date().toISOString().slice(0, 16),
    availableFromDate: new Date().toISOString().slice(0, 16),
    availableUntilDate: new Date().toISOString().slice(0, 16),
    }
};

const assignmentSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
          },
        addAssignment: (state, action) => {
            state.assignments = [
                ...state.assignments,
                { ...action.payload, _id: new Date().getTime().toString() },
              ];
              state.assignment = initialState.assignment;
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id != action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) => {
                if (assignment._id === action.payload._id) {
                    return action.payload;
                } else {
                    return assignment;
                }
            });
        },
        selectAssignment: (state, action) => {
            state.assignment = action.payload;
        },
        cancelAssignmentUpdate: (state) => {
            state.assignment = initialState.assignment;
        },
    },
});

export const { addAssignment, deleteAssignment, 
updateAssignment, selectAssignment, cancelAssignmentUpdate, setAssignments } = assignmentSlice.actions;

export default assignmentSlice.reducer;