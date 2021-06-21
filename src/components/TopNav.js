import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

//This is the navagation bar component that would have the company name, app name, company url etc.
const TopNav = () => {
    return (
      <div>
        <Navbar color="dark">
          <NavbarBrand className="text-muted" href="https://www.paymerang.com">
            <h1>StackCheck</h1>
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }


export default TopNav;
