@def title = "Research and Codes"

# Research

### Precision Radial Velocities

I primarily search for exoplanets with the radial velocity (RV) technique. Planets do not orbit a stationary star, but rather the entire system orbits around the center of mass. In our own Solar System, the Sun undergoes as maximum velocity of change ~20 m/s, primarily due to the orbit of Jupiter, the most massive planet in our Solar System. Such changes in a star's apparent velocity along our line of sight can be measured via [Doppler spectroscopy](https://en.wikipedia.org/wiki/Doppler_spectroscopy). Significant periods in these changes correspond to the effective year for the candidate perturber, and the relative amplitude of the maximum velocity change can be used to measure the mass of the perturbing object, which may be a planet. Searching for planets around K and M dwarfs in particular provides a potential shortcut to finding habitable zone worlds. I develop a set of Julia and Python codes to generate and model the Doppler velocities from a variety of facilities, including iSHELL/IRTF, PARVI/HALE, ESO/ESPRESSO, ESO/HARPS, MINERVA, and NIRSPEC/Keck.

### Julia Codes I've developed for Research:

#### IterativeNelderMead.jl

An Nelder-Mead solver written in Julia. The solver is robust in high-dimensional parameter spaces.

[GitHub repo](https://github.com/astrobc1/IterativeNelderMead.jl/)

[Documentation and Examples](https://astrobc1.github.io/IterativeNelderMead.jl/dev/)

#### Echelle suite
Process echelle spectra and generate precise radial velocities, with various levels of support for PARVI, iSHELL, CHIRON, MINERVA, MINERVA-Australis, HARPS, and ESPRESSO. GitHub Links:

[EchelleBase.jl](https://github.com/astrobc1/EchelleBase.jl/)

[EchelleReduce.jl](https://github.com/astrobc1/EchelleReduce.jl/)

[EchelleSpectralModeling.jl](https://github.com/astrobc1/EchelleSpectralModeling.jl/)

[EchelleSpectrographs.jl](https://github.com/astrobc1/EchelleSpectrographs.jl/)

\figenv{}{spec.png}{width:50%;}

### Julia Codes I've developed for fun:

In my spare time, I enjoy coding up mathematical fractals in the complex plane. Here is the burning ship fractal, computed by iterating

$$ z_{n+1} = (|\mathrm{Re}(z_{n})| + i \ |\mathrm{Im}(z_{n})|)^2 + c $$

for each point c in the complex plane, starting from the origin.

\figenv{}{burningship.png}{width:50%;}