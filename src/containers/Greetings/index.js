import { useEffect } from "react";
import { navigate } from "@reach/router";

const Greetings = () => {
  useEffect(() => {
    navigate("/rooms", { replace: true });
  }, []);
  return null;
};

export default Greetings;
