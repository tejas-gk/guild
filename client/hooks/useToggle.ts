import { useState } from "react";

export default function useToggle() {
  const [toggle, setToggle] = useState<boolean>(false);
  function toggleHandler() {
    setToggle(!toggle);
  }
  return [toggle, toggleHandler];
}
