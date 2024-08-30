// hooks/useSafeNavigate.js
import { useNavigate as useRouterNavigate } from "react-router-dom";

export const useSafeNavigate = () => {
  try {
    return useRouterNavigate();
  } catch (error) {
    console.error("useNavigate can only be used inside a Router", error);
    return () => {
      <></>;
    }; // Return a noop function or handle error appropriately
  }
};
