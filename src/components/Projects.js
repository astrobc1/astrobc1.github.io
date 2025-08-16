import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// Use public/Assets/rvs.gif for image source

function Projects() {
  return (
    <Container fluid className="projects-section" id="home" style={{ paddingTop: "80px" }}>
      <Container className="projects-content">
        <h2 className="overview-heading" style={{ 
          fontFamily: "Inter, sans-serif", 
          textAlign: "center",
          fontWeight: 700, 
          fontSize: '2.8rem', 
          marginBottom: '2rem',
        }}>
          Overview
        </h2>
        <div style={{ 
          fontSize: '1.2rem', 
          lineHeight: 1.7, 
          color: '#e0e0e6', 
          fontFamily: "Inter, sans-serif", 
          textAlign: 'justify', 
          maxWidth: '900px', 
          margin: '0 auto 3rem auto',
          fontWeight: 700
        }}>
          I write software to calibrate and transform data products collected from ground- and space-based observatories. Astronomical data collected at telescopes (even in space!) is contaminated by all sorts of confounding variables, and delicate care is required to correct for these artifacts in order to maximize the accuracy of measuremnts of interest, and ultimately maximize the scientific yield of each mission. Below are the projects I'm currently involved in!
        </div>
        {/* High Resolution Echelle Spectroscopy Section */}
        <div style={{ marginTop: '4rem', marginBottom: '3rem' }}>
          <h3 style={{ 
            fontFamily: "Inter, sans-serif", 
            textAlign: "center", 
            color: '#f3f3fa', 
            fontWeight: 600, 
            fontSize: '2.2rem', 
            marginBottom: '2rem',
            borderBottom: '2px solid #a259ff',
            paddingBottom: '0.5rem',
            display: 'inline-block',
            width: '100%'
          }}>
            High Resolution Echelle Spectroscopy
          </h3>
          <div style={{ 
            fontSize: '1.1rem', 
            lineHeight: 1.6, 
            color: '#e0e0e6', 
            fontFamily: "Inter, sans-serif", 
            marginBottom: '2rem',
            fontWeight: 700
          }}>
            Echelle spectrographs use a high-resolution diffraction elements (R~100,000)
            followed by an orthogonal low-resolution diffraction element to image a wide bandpass
            on a square detector. These instruments have proven critical for measuring the masses of
            extrasolar planets via{" "}
            <a href="https://en.wikipedia.org/wiki/Doppler_spectroscopy" target="_blank" rel="noreferrer" style={{ color: '#a259ff', textDecoration: 'none' }}>
              Doppler monitoring
            </a>{" "}
            of the host star, as well as characterizing the atmospheres of exoplanets through{" "}
            <a
              href="https://www.esa.int/ESA_Multimedia/Images/2023/03/Transmission_spectroscopy"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#a259ff', textDecoration: 'none' }}
            >
              transit spectroscopy
            </a>.
          </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: '1rem' }}>
          <img src={process.env.PUBLIC_URL + "/Assets/rvs.gif"} alt="rvs gif" style={{ width: '400px', height: 'auto', borderRadius: '10px', boxShadow: '0 4px 20px rgba(162, 89, 255, 0.2)' }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", color: "#a259ff", fontFamily: "Inter, sans-serif", fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '2rem' }}>
          Credit: @ Alysa Obertas
        </div>

        <div style={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.6, 
          color: '#e0e0e6', 
          fontFamily: "Inter, sans-serif", 
          marginBottom: '2rem',
          fontWeight: 700
        }}>
          The High Resolution Spectrograph for Exoplanet Characterization (<a href="https://etlab.caltech.edu/instruments/hispec" target="_blank" rel="noreferrer" style={{ color: '#a259ff', textDecoration: 'none', fontWeight: 600 }}>HISPEC</a>) will record a near infrared spectrum from 0.98 - 2.46 μm at R~120,000 by utilizing two spectrograph units simultaneously. HISPEC is currently under development and will be installed at the Keck II telescope.
          <br /><br />
          The HISPEC DRP will correct for or perform at minimum the following:
          
          <div style={{ marginLeft: '1rem', marginTop: '1.5rem' }}>
            <h6 style={{ color: '#a259ff', fontWeight: 600, marginBottom: '0.8rem', fontSize: '1.1rem' }}>Detector Level:</h6>
            <ul style={{ marginBottom: '1.5rem' }}>
              <li>Saturation</li>
              <li>Bias</li>
              <li>Non-linearity</li>
              <li>Dark current</li>
              <li>Pixel to pixel sensitivities (flat field)</li>
              <li>Electronics 1 / f noise</li>
              <li>Ordinary least squares ramp fit</li>
            </ul>

            <h6 style={{ color: '#a259ff', fontWeight: 600, marginBottom: '0.8rem', fontSize: '1.1rem' }}>Spectral Level:</h6>
            <ul style={{ marginBottom: '1.5rem' }}>
              <li>Correct for changes in the wavelength solution</li>
              <li>Optimal spectral extraction</li>
              <li>Flux-weighted barycenter corrections</li>
              <li>Telluric absorption correction</li>
              <li>Sky emission line correction</li>
              <li>Line spread function (LSF) characterization</li>
              <li>Compute precision RVs for stars</li>
            </ul>
          </div>
        </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '4rem' }}>
          <a href="https://etlab.caltech.edu/instruments/hispec" target="_blank" rel="noopener noreferrer">
            <img src={process.env.PUBLIC_URL + "/Assets/hispec.png"} alt="HISPEC" style={{ 
              width: '300px', 
              maxWidth: '40vw', 
              height: 'auto', 
              borderRadius: '10px', 
              boxShadow: '0 4px 20px rgba(162, 89, 255, 0.3)', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
              cursor: 'pointer'
            }} 
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 8px 30px rgba(162, 89, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 20px rgba(162, 89, 255, 0.3)';
            }}
            />
          </a>
        </div>

        <div style={{ marginTop: '4rem', marginBottom: '3rem' }}>
          <h3 style={{ 
            fontFamily: "Inter, sans-serif", 
            textAlign: "center", 
            color: '#f3f3fa', 
            fontWeight: 600, 
            fontSize: '2.2rem', 
            marginBottom: '2rem',
            borderBottom: '2px solid #a259ff',
            paddingBottom: '0.5rem',
            display: 'inline-block',
            width: '100%'
          }}>
            Integral Field Spectroscopy
          </h3>

        <div style={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.6, 
          color: '#e0e0e6', 
          fontFamily: "Inter, sans-serif", 
          marginBottom: '2rem',
          fontWeight: 700
        }}>
          Integral field spectroscopy (IFS) combines spectroscopic and imaging capabilities. An integral field unit (IFU) records the spectra across an entire field of view simultaneously, which is powerful for studying extended objects and complex fields. An IFU typically uses a grid of lenslets or slits that sample different regions within the field of view. The light from each region is dispersed by a grating and subsequently imaged, producing a spatially resolved spectrum across the entire field. Science cases for IFS span a broad range, encompassing studies such as the kinematics near the center of the Milky Way's super-massive black hole, dark-matter physics from gravitationally lensed objects, and the atmospheres of exoplanets.
        </div>

        <div style={{ 
          fontSize: '1.1rem', 
          lineHeight: 1.6, 
          color: '#e0e0e6', 
          fontFamily: "Inter, sans-serif", 
          marginBottom: '2rem',
          fontWeight: 700
        }}>
          <a href="https://oirlab.ucsd.edu/LIGER.html" target="_blank" rel="noreferrer" style={{ color: '#a259ff', textDecoration: 'none', fontWeight: 600 }}>Liger</a> and the Infrared Imaging Spectrograph{" "}
          <a href="https://www.tmt.org/page/iris" target="_blank" rel="noreferrer" style={{ color: '#a259ff', textDecoration: 'none', fontWeight: 600 }}>IRIS</a> are integral field spectrographs that will be installed at the Keck I and Thirty-Meter-Telescope, respectively.
          I am creating a data reduction package that will serve both Liger and IRIS.
        </div>
        </div>

        {/* Integral Field Spectroscopy Links */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', marginTop: '2rem', marginBottom: '4rem' }}>
          <a href="https://oirlab.ucsd.edu/LIGER.html" target="_blank" rel="noopener noreferrer">
            <img src={process.env.PUBLIC_URL + "/Assets/liger.png"} alt="Liger" style={{ 
              width: '300px', 
              maxWidth: '40vw', 
              height: 'auto', 
              borderRadius: '10px', 
              boxShadow: '0 4px 20px rgba(162, 89, 255, 0.3)', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 8px 30px rgba(162, 89, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 20px rgba(162, 89, 255, 0.3)';
            }}
            />
          </a>
          <a href="https://www.tmt.org/page/iris" target="_blank" rel="noopener noreferrer">
            <img src={process.env.PUBLIC_URL + "/Assets/iris.png"} alt="IRIS" style={{ 
              width: '300px', 
              maxWidth: '40vw', 
              height: 'auto', 
              borderRadius: '10px', 
              boxShadow: '0 4px 20px rgba(162, 89, 255, 0.3)', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 8px 30px rgba(162, 89, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 20px rgba(162, 89, 255, 0.3)';
            }}
            />
          </a>
        </div>
      </Container>
    </Container>
  );
}

export default Projects;
