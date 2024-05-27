import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";
import { SpinnerMini } from "./Spinner";
import GlobalTypes from "../utils/GlobalType";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  &:disabled {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

Menus.propTypes = GlobalTypes;
Menu.propTypes = GlobalTypes;
Toggle.propTypes = GlobalTypes;
List.propTypes = GlobalTypes;
Button.propTypes = GlobalTypes;

function Menus({ children }) {
  const [rowId, setRowId] = useState("");
  const [clickPosition, setClickPosition] = useState({});

  const close = () => setRowId("");
  const open = setRowId;

  return (
    <MenusContext.Provider
      value={{ close, open, rowId, clickPosition, setClickPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  const { clickPosition } = useContext(MenusContext);

  return <StyledMenu position={clickPosition}>{children}</StyledMenu>;
}

function Toggle({ id }) {
  const { rowId, close, open, setClickPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    rowId === "" || rowId !== id ? open(id) : close();

    const rect = e.target.closest("button").getBoundingClientRect();
    const x = window.innerWidth - rect.width - rect.x;
    const y =
      window.innerHeight > rect.bottom + 130
        ? rect.height + rect.y + 8
        : rect.y - 130;

    setClickPosition({ x, y });
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }) {
  const { clickPosition, rowId, close } = useContext(MenusContext);
  const ref = useClickOutside(close, false);
  const parent = document.body;

  if (id !== rowId) return null;

  return createPortal(
    <StyledList ref={ref} position={clickPosition}>
      {children}
    </StyledList>,
    parent
  );
}

function Button({ children, icon, onClick, disabled }) {
  const { close } = useContext(MenusContext);

  function handler() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handler} disabled={disabled}>
        {disabled ? <SpinnerMini type="menu" /> : icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.Button = Button;
Menus.List = List;

export default Menus;
