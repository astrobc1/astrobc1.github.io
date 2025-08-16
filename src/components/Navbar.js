import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link, useLocation } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
} from "react-icons/ai";
import { GiGalaxy } from "react-icons/gi";

import { CgFileDocument } from "react-icons/cg";



function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const location = useLocation();

  // Map routes to page names
  const routeNames = {
    '/': 'Home',
    '/projects': 'Projects',
    '/notes': 'Dev Notes',
    '/hobbies': 'Hobbies',
  };

  // Find the best match for the current path
  function getCurrentPageName(pathname) {
    if (pathname === '/') return routeNames['/'];
    const match = Object.keys(routeNames).find((route) =>
      route !== '/' && pathname.startsWith(route)
    );
    return match ? routeNames[match] : '';
  }

  const currentPageName = getCurrentPageName(location.pathname);

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        {/* Show current page name on mobile, hide on desktop */}
        {(!expand || expand === false) && (
          <span
            className="navbar-current-page d-md-none mx-auto"
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              textAlign: 'center',
              letterSpacing: '0.01em',
              lineHeight: 1.2,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              position: 'absolute',
              left: '56px',
              right: '16px',
              marginLeft: 0,
              marginRight: 0,
              zIndex: 2,
              pointerEvents: 'none',
              maxWidth: 'calc(100vw - 72px)'
            }}
          >
            {currentPageName}
          </span>
        )}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto" defaultActiveKey="#home">
            {/* ...existing code... */}
            <Nav.Item>
              <Nav.Link 
                as={Link} 
                to="/" 
                onClick={() => updateExpanded(false)}
                className={isActive("/") ? "active" : ""}
              >
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                as={Link} 
                to="/projects" 
                onClick={() => updateExpanded(false)}
                className={isActive("/projects") ? "active" : ""}
              >
                <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} /> Projects
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                as={Link} 
                to="/notes" 
                onClick={() => updateExpanded(false)}
                className={isActive("/notes") ? "active" : ""}
              >
                <ImBlog style={{ marginBottom: "2px" }} /> Dev Notes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                as={Link} 
                to="/hobbies" 
                onClick={() => updateExpanded(false)}
                className={isActive("/hobbies") ? "active" : ""}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> Hobbies
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href={process.env.PUBLIC_URL + "/Assets/CV_Resume_2024.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => updateExpanded(false)}
                className=""
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> Resume
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
