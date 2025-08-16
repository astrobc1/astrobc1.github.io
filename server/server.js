const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://astrobc1.github.io', 'https://www.astrobc1.github.io'] 
    : ['http://localhost:3000', 'http://localhost:3001']
}));

app.use(express.json());

// Rate limiting to be respectful to NASA's API
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Endpoint to get exoplanet data for a specific system
app.get('/api/exoplanets/:systemName', async (req, res) => {
  try {
    const { systemName } = req.params;
    
    // Validate input
    if (!systemName || systemName.length > 50) {
      return res.status(400).json({ 
        error: 'Invalid system name. Must be between 1-50 characters.' 
      });
    }

    // Clean the system name to prevent injection
    const cleanSystemName = systemName.replace(/[^a-zA-Z0-9\s\-\.]/g, '');
    
    console.log(`Fetching data for system: ${cleanSystemName}`);

    // NASA Exoplanet Archive API query
    // We're using the PSCompPars table which contains confirmed planets
    const query = `
      select pl_name,hostname,pl_orbper,pl_radj,pl_orbsmax,pl_masse,st_rad,st_mass
      from pscomppars 
      where hostname like '${cleanSystemName}%' 
      and pl_orbper is not null 
      and pl_radj is not null 
      and pl_orbsmax is not null
      and pl_orbper > 0 
      and pl_radj > 0 
      and pl_orbsmax > 0
    `.replace(/\s+/g, '+').replace(/\n/g, '');

    const apiUrl = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${query}&format=json`;

    // Make request to NASA API with proper headers
    const response = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'ExoplanetVisualization/1.0 (Educational)',
        'Accept': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ 
        error: `No exoplanet data found for system: ${systemName}`,
        suggestion: 'Try systems like "Kepler-11", "TRAPPIST-1", "HD 40307", or "Kepler-90"'
      });
    }

    // Process and validate the data
    const processedData = response.data
      .map(planet => ({
        name: planet.pl_name,
        hostname: planet.hostname,
        period: parseFloat(planet.pl_orbper), // orbital period in days
        radius: parseFloat(planet.pl_radj), // planet radius in Jupiter radii
        semiMajorAxis: parseFloat(planet.pl_orbsmax), // semi-major axis in AU
        mass: planet.pl_masse ? parseFloat(planet.pl_masse) : null, // planet mass in Earth masses
        stellarRadius: planet.st_rad ? parseFloat(planet.st_rad) : null, // stellar radius in solar radii
        stellarMass: planet.st_mass ? parseFloat(planet.st_mass) : null // stellar mass in solar masses
      }))
      .filter(planet => 
        planet.period && planet.radius && planet.semiMajorAxis &&
        planet.period > 0 && planet.radius > 0 && planet.semiMajorAxis > 0 &&
        !isNaN(planet.period) && !isNaN(planet.radius) && !isNaN(planet.semiMajorAxis)
      );

    if (processedData.length === 0) {
      return res.status(404).json({ 
        error: 'No valid planet data found with complete orbital parameters',
        rawDataFound: response.data.length
      });
    }

    // Add metadata
    const result = {
      system: cleanSystemName,
      planetCount: processedData.length,
      dataSource: 'NASA Exoplanet Archive',
      retrievedAt: new Date().toISOString(),
      planets: processedData
    };

    console.log(`Successfully retrieved ${processedData.length} planets for ${cleanSystemName}`);
    res.json(result);

  } catch (error) {
    console.error('Error fetching exoplanet data:', error.message);
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        error: 'Unable to connect to NASA Exoplanet Archive. Please try again later.' 
      });
    }
    
    if (error.response?.status === 429) {
      return res.status(429).json({ 
        error: 'NASA API rate limit exceeded. Please try again later.' 
      });
    }

    res.status(500).json({ 
      error: 'Internal server error while fetching exoplanet data' 
    });
  }
});

// Endpoint to get list of popular/well-known systems
app.get('/api/popular-systems', (req, res) => {
  const popularSystems = [
    {
      name: 'Kepler-11',
      description: 'Six-planet system with tightly packed orbits',
      planetCount: 6
    },
    {
      name: 'TRAPPIST-1',
      description: 'Seven Earth-sized planets around an ultra-cool dwarf star',
      planetCount: 7
    },
    {
      name: 'HD 40307',
      description: 'Super-Earth system with potentially habitable worlds',
      planetCount: 6
    },
    {
      name: 'Kepler-90',
      description: 'Eight-planet system similar to our Solar System',
      planetCount: 8
    },
    {
      name: 'K2-138',
      description: 'Five sub-Neptune planets in resonant chain',
      planetCount: 5
    },
    {
      name: 'TOI-178',
      description: 'Six planets with unique orbital resonance pattern',
      planetCount: 6
    }
  ];

  res.json({
    systems: popularSystems,
    note: 'These are well-studied multi-planet systems with complete orbital data'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Exoplanet API server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 NASA Exoplanet Archive proxy ready`);
});

module.exports = app;
