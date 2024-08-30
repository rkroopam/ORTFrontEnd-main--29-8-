import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boolean } from "yup";

interface LearnerState {
  testData: any[];
  showContent: boolean; 
  answers: any;
}

const initialState: LearnerState = {
  testData: [],
  showContent: false, 
  answers:[],
};

const learnerSlice = createSlice({
  name: 'learner',
  initialState,
  reducers: {
    addTestData: (state, action: PayloadAction<any>) => {
      state.testData.push(action.payload);
    },
    showContent:(state,action : PayloadAction<any>) => {
      state.showContent = action.payload;
    },
    saveAnswers: (state,action : PayloadAction<any>) => {
      console.log("final payload saved",action.payload);
      state.answers.push(action.payload)
    }
  },
});

export const { addTestData ,showContent,saveAnswers} = learnerSlice.actions;

export const selectTestData = (state: { learner: LearnerState }) => state.learner.testData;

export default learnerSlice.reducer;
