import React, { ReactNode, useState } from "react";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";

type TableSortProps = {
  children: ReactNode | ReactNode[];
  sort: () => void;
};

type TableSortState = {
  toggle: boolean;
};

export default function TableSort(props: TableSortProps) {
  const [toggle, setToggle] = useState(false);
  const { theme } = React.useContext(ThemeContext);
  return (
    <th
      data-theme={theme}
      onClick={() => {
        props.sort();
        setToggle(!toggle);
      }}
    >
      {props.children}
      {toggle ? (
        <i className="bi bi-caret-up-fill"></i>
      ) : (
        <i className="bi bi-caret-down-fill"></i>
      )}
    </th>
  );
}
