import React from 'react';
import './MenuList.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const MenuList = props => {
  const {link, iconClass, label, isActive} = props;
  return (
    <li className={`menuItem justify-content-start ${isActive ? 'active': ''}`}>
      <a href={`${link}`} aria-current="page">
        <i className={`${iconClass} icon`}></i>
        {label}
      </a>
    </li>
  );
}

export default MenuList;