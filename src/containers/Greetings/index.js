import { useEffect } from "react";
import { navigate } from "@reach/router";

const Greetings = () => {
  useEffect(() => {
    navigate("/rooms");
  }, []);
  return null;
};

export default Greetings;
