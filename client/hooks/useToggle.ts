import { useState } from "react";

export default function useToggle() {
  const [toggle, setToggle] = useState(false);
  function toggleHandler() {
    setToggle(!toggle);
  }
  return [toggle, toggleHandler];
}
