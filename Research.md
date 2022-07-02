@def title = "Research"

# Research

### Precision Radial Velocities

I primarily search for [exoplanets](https://exoplanets.nasa.gov/) with the [radial velocity (RV) technique](https://exoplanets.nasa.gov/resources/2285/radial-velocity/). Planets do not orbit a stationary star, but rather all bodies orbit around the center of mass of the entire system. In our own Solar System, the Sun undergoes a maximum velocity change of ~25 m/s, primarily due to the orbit of Jupiter, the most massive planet in our Solar System. Such changes in a star's apparent velocity along our line of sight can be measured via [Doppler spectroscopy](https://en.wikipedia.org/wiki/Doppler_spectroscopy). Significant periods in these changes correspond to the effective year for the candidate perturber (which may be a planet!), and the relative amplitude of the maximum velocity change can be used to measure the mass of the object. Searching for planets around [K and M dwarfs](https://en.wikipedia.org/wiki/Red_dwarf) in particular provides a potential shortcut to finding habitable zone worlds.

~~~
<br/>
~~~

\figenv{Credit: @ Alysa Obertas}{../assets/rvs.gif}{width:100%; display: block; margin-left: auto; margin-right: auto;}

~~~
<br/>
~~~

I specifically develop a set of Julia and Python codes to generate and model the Doppler velocities from a variety of facilities, including:

- [iSHELL / IRTF](http://irtfweb.ifa.hawaii.edu/~ishell/)
- [PARVI / Hale](https://sites.astro.caltech.edu/palomar/observer/newsletter/palomarobserver2.html#parvi)
- [HARPS-S / La Silla 3.6 m](https://www.eso.org/sci/facilities/lasilla/instruments/harps.html)
- [ESPRESSO / VLT](https://www.eso.org/sci/facilities/paranal/instruments/espresso.html)
- [CHIRON / SMARTS 1.5 m](http://exoplanets.astro.yale.edu/instrumentation/chiron.php)
- [NIRSPEC / Keck](https://www2.keck.hawaii.edu/inst/nirspec/)
- [MINERVA](https://lweb.cfa.harvard.edu/minerva/)
- [MINERVA-Australis](https://astrophysics.usq.edu.au/minerva-australis/)