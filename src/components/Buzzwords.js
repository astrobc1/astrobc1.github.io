import React from "react";
import Typewriter from "typewriter-effect";

function Buzzwords() {
  return (
    <>
      <style>{`
        .buzzwords-text {
          font-weight: 700; /* thicker text */
        }
        .buzzwords-cursor {
          color: #ff4d94 !important;
          font-weight: 900 !important; /* even thicker cursor */
        }
      `}</style>
      <div
        style={{
          backgroundColor: "#1e1e1e",
          color: "#33ff33",
          fontFamily: "'Courier New', Courier, monospace",
          padding: "1rem 1.5rem",
          borderRadius: "8px",
          boxShadow: "0 0 10px #33ff33aa",
          display: "inline-flex",
          alignItems: "center",
          fontSize: "1.5rem",
          userSelect: "none",
        }}
      >
        <span style={{ paddingRight: "0.5rem", fontWeight: 700 }}>❯</span>
        <Typewriter
          options={{
            strings: [
              "Astronomer",
              "Software Engineer",
              "Data Scientist",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
            wrapperClassName: "buzzwords-text",
            cursorClassName: "buzzwords-cursor",
          }}
        />
      </div>
    </>
  );
}

export default Buzzwords;
