import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

function DevNotes() {
  const [activePost, setActivePost] = useState(1);

  const blogPosts = [
    {
      id: 1,
      title: "Optical vs. As-sampled Spectral Resolution",

      content: (
        <>
          <p style={{ fontSize: '1.1rem', color: '#e0e0e6', lineHeight: 1.6, marginBottom: '1.5rem', textAlign: 'justify' }}>
            In spectroscopy, the <b><i>instrumental spectral resolution</i></b>, is typically reported by integrating through the optical system, but it's not uncommon to ignore the final broadening introduced by the detector sampling.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#e0e0e6', lineHeight: 1.6, marginBottom: '1.5rem', textAlign: 'justify' }}>
            To accurately account for the detector sampling, one must know the sub-pixel response, which may be  be complex and pixel-dependent. In many applications, it's appropriate to assume a top-hat reponse for the pixel, and/or that each pixel's response is the same up to an overall scaling factor.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ color: '#a259ff', fontSize: '1.3rem', fontWeight: 'bold' }}>
              <BlockMath math={"\\mathrm{FWHM}_{\\mathrm{eff}} = 2.355 \\sqrt{\\sigma_{g}^2 + \\frac{w^2}{12}}"} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={process.env.PUBLIC_URL + "/Assets/pixel_broadening.png"} alt="Pixel Broadening" style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '6px' }} />
          </div>
        </>
      )
    },
    {
      id: 2,
      title: "Why Julia is Amazing",
      content: (
        <div>
        <p style={{ fontSize: '1.1rem', color: '#e0e0e6', lineHeight: 1.6 }}>
          The <a href="https://julialang.org/" target="_blank" rel="noopener noreferrer" style={{ color: '#a259ff', textDecoration: 'none' }}>Julia programming language</a> is an awesome programming language that combines many of Python's rapid development features with C's runtime performance. Julia uses a Just-in-time (JIT) compiler which allows for dynamically written functions.
          
          Unlike Python classes, Julia uses multiple dispatch, parallel computing, easy interop, and elegant syntax. Perfect for high-performance scientific computing!
        </p>
        <div style={{ fontSize: '1.5em', color: '#a259ff', marginBottom: 4, fontWeight: 500 }}>
          # Julia functions
        </div>
        <SyntaxHighlighter language="julia" style={dracula} customStyle={{ borderRadius: 8, fontSize: '1.05em', padding: 16 }}>
            {`
            # In-line function definition
            f(x) = x^2 + 2x + 2 

            function f(x) # Formal function definition
              return x^2 + 2x + 2
            end

            f = (x) -> x^2 + 2x + 2 # anonymous function
            `}
        </SyntaxHighlighter>

        <div style={{ fontSize: '1.5em', color: '#a259ff', marginBottom: 4, fontWeight: 500 }}>
          # Julia types
        </div>
        <SyntaxHighlighter language="julia" style={dracula} customStyle={{ borderRadius: 8, fontSize: '1.05em', padding: 16 }}>
            {`
            # Concrete types are always structs, immutable by default
            struct Point3D
                x::Float64
                y::Float64
                z::Float64
            end
            
            # Add points together to create a new point
            Base.:+(p1::Point3D, p2::Point3D) = Point3D(p1.x + p2.x, p1.y + p2.y, p1.z + p2.z)

            # Create a mutable type
            mutable struct MPoint3D
                x::Float64
                y::Float64
                z::Float64
            end

            p = MPoint3D(1, 2, 3)
            p.x += 5
            println(p) # => MPoint3D(6, 2, 3)

            # Parametric types
            struct PPoint3D{T<:Number}
                x::T
                y::T
                z::T
            end

            p = PPoint3D(1, 2, 3)
            println(p) # => PPoint3D{Int64}(1, 2, 3)

            # Abstract types
            abstract type AbstractPoint end
            `}

        </SyntaxHighlighter>
        <div style={{ fontSize: '1.5em', color: '#a259ff', marginBottom: 4, fontWeight: 500 }}>
          # Named tuples are slick
        </div>
        <SyntaxHighlighter language="julia" style={dracula} customStyle={{ borderRadius: 8, fontSize: '1.05em', padding: 16 }}>
            {`
            # Named tuples are slick and can act as lightweight structs
            t = (x=1, y=2, z=3) # Named tuple
            println(t.x) # => 1
            `}
        </SyntaxHighlighter>
        <div style={{ fontSize: '1.5em', color: '#a259ff', marginBottom: 4, fontWeight: 500 }}>
          # Macro system is amazing
        </div>
        <SyntaxHighlighter language="julia" style={dracula} customStyle={{ borderRadius: 8, fontSize: '1.05em', padding: 16 }}>
            {`
            using BenchmarkTools

            function foo()
                # Heavy compuation here
                # ...
            end

            # @benchmark is a macro
            @benchmark foo() # => reports execution time and memory usage
            `}
        </SyntaxHighlighter>
        <div style={{ fontSize: '1.5em', color: '#a259ff', marginBottom: 4, fontWeight: 500 }}>
          # Python interop
        </div>
        <SyntaxHighlighter language="julia" style={dracula} customStyle={{ borderRadius: 8, fontSize: '1.05em', padding: 16 }}>
            {`
            using PyCall

            py = pyimport("some_python_module")
            A = [1, 2, 3]
            B = Dict("x" => 1, "y" => 2, "z" => 3)
            py.some_function(A, B)

            plt = pyimport("matplotlib.pyplot")
            x = 1:0.01:10
            y = sin.(x)
            plt.plot(x, y)
            plt.show()
            `}
        </SyntaxHighlighter>
        </div>
      )
    }
  ];

  const currentPost = blogPosts.find(post => post.id === activePost);

  return (
    <Container fluid className="dev-notes-section" id="dev-notes" style={{ paddingTop: "80px" }}>
      <Container className="dev-notes-content">
        <h4 className="overview-heading" style={{ fontFamily: "Inter, sans-serif", textAlign: "center", paddingTop: '30px', fontWeight: 700, fontSize: '2.5rem', color: '#f3f3fa', marginBottom: '2rem' }}>Developer Notes</h4>
        
        <Row>
          <Col md={3}>
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="flex-column">
                {blogPosts.map((post) => (
                  <div key={post.id} style={{ marginBottom: '1.5rem' }}>
                    <h5
                      onClick={() => setActivePost(post.id)}
                      style={{
                        color: activePost === post.id ? '#a259ff' : '#b0b0b0',
                        fontFamily: "Inter, sans-serif",
                        fontWeight: activePost === post.id ? 700 : 500,
                        fontSize: activePost === post.id ? '1.3rem' : '1.1rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textShadow: activePost === post.id ? '0 0 10px rgba(162, 89, 255, 0.3)' : 'none',
                        margin: 0,
                        lineHeight: 1.4
                      }}
                      onMouseEnter={(e) => {
                        if (activePost !== post.id) {
                          e.target.style.color = '#d0d0d0';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activePost !== post.id) {
                          e.target.style.color = '#b0b0b0';
                        }
                      }}
                    >
                      {post.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          <Col md={9}>
            <div style={{ paddingLeft: '2rem' }}>
              <h2 style={{ 
                fontFamily: "Inter, sans-serif", 
                color: '#f3f3fa', 
                fontWeight: 600, 
                fontSize: '2.2rem', 
                marginBottom: '2rem',
                borderBottom: '2px solid #a259ff',
                paddingBottom: '0.5rem'
              }}>
                {currentPost.title}
              </h2>
              <div style={{ 
                fontFamily: "Inter, sans-serif", 
                color: '#f3f3fa',
                fontSize: '1.1rem',
                lineHeight: 1.7
              }}>
                {currentPost.content}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default DevNotes;
