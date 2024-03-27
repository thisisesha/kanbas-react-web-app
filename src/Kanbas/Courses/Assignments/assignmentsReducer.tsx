import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
    assignments: assignments,
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
updateAssignment, selectAssignment, cancelAssignmentUpdate } = assignmentSlice.actions;

export default assignmentSlice.reducer;