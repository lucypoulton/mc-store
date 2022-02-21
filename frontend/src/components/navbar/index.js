import React, {useContext} from 'react';
import {ConfigContext} from "../../context";
import './index.scss';
import {Link} from "react-router-dom";

export default function Navbar() {
  const branding = useContext(ConfigContext)
  return <nav>
    <Link to="/">{branding.name}</Link>
  </nav>
}