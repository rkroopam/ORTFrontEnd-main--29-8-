import React, { useState } from "react";

import PracticeTestIntroduction from "./PracticeTestPage/PracticeMainPage";
import PracticeQuestionPage from "./PracticeTestPage/PracticeTestQuestionPage";
import PracticeTestCompleted from "./PracticeTestPage/PractitceTestCompletedPage";
import RegularTestPage from "./RegularTestPage/RegularTestPage";
import TestQuestionPage from "./RegularTestPage/RegularTestQuestionsPage";
import TestResultPage from "./RegularTestPage/RegularTestResultPage";
import TestFeedbackPage from "./RegularTestPage/RegularTestFeedBack";
// import PaymentPage from "./PaymentPage/PaymentPage";
import { CustomButton } from "../../common";
import { Box, Container } from "@mui/material";
// import StudentForm from "../admin/teachers/studentForm";
// import FirstSignUp from "./FirstSignUp";

interface ComponentItem {
  component: any;
  title: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData?: any;
}

const components: ComponentItem[] = [
  { component: PracticeTestIntroduction, title: "Practice Test Introduction" },
  { component: PracticeQuestionPage, title: "Practice Question" },
  { component: PracticeTestCompleted, title: "Practice Test Completed" },
  { component: RegularTestPage, title: "Regular Test Page" },
  { component: TestQuestionPage, title: "Test Question" },
  { component: TestResultPage, title: "Test Result" },
  { component: TestFeedbackPage, title: "Test Feedback" },
  // { component: PaymentPage, title: "Payment Page" },
];

const InitialTest: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(formData, "form");
  const handleNextClick = () => {
    if (currentIndex === 1) {
      const userCanHear = formData.userCanHear;
      if (userCanHear) {
        setCurrentIndex(3);
        return;
      } else {
        setCurrentIndex(2);
        return;
      }
    }
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, components.length - 1)
    );
  };

  const handlePreviousClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const { component: CurrentComponent, title } = components[currentIndex];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CurrentComponent
            title={title}
            handleChange={handleChange}
            formData={formData}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "16px",
          }}
        >
          <CustomButton
            variant="outlined"
            onClick={handlePreviousClick}
            disabled={currentIndex === 0}
          >
            Previous
          </CustomButton>
          <CustomButton
            variant="outlined"
            onClick={handleNextClick}
            disabled={currentIndex === components.length - 1}
          >
            {currentIndex === components.length - 1 ? "Submit" : "Next"}
          </CustomButton>
        </Box>
      </Box>
    </Container>
  );
};

export default InitialTest;
