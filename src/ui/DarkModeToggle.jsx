import { HiMoon, HiSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useGlobalContext } from "../context/useGlobalContext";

function DarkModeToggle() {
  const { isDarkMode, handleToggle } = useGlobalContext();
  return (
    <ButtonIcon onClick={handleToggle}>
      {!isDarkMode ? <HiMoon /> : <HiSun />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
