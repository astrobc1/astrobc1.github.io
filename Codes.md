
~~~
<span style="font-weight:bold; margin-left: 0px; margin-right: 0px; font-size:18pt; max-width: 5000px;">Julia codes I've developed for research</span>
~~~

~~~
<br/>
<br/>
<br/>
~~~

~~~
<span style="font-size:20pt; font-weight: bold"> <a href="https://astrobc1.github.io/IterativeNelderMead.jl/dev/">IterativeNelderMead.jl</a> </span>
~~~



\figenv{}{../assets/simplex.gif}{display: block; margin-left: 5px; margin-right: auto; width: 80%;}

An Nelder-Mead solver written in Julia. The solver is robust in high-dimensional parameter spaces.

**[GitHub repo](https://github.com/astrobc1/IterativeNelderMead.jl/)**

**[Documentation and Examples](https://astrobc1.github.io/IterativeNelderMead.jl/dev/)**

~~~
<br/>
~~~

---

~~~
<span style="font-size:20pt; font-weight: bold"> <a href="https://github.com/astrobc1/Echelle.jl">Echelle.jl</a> </span>
~~~

~~~
<br/>
<br/>
~~~

~~~
<img src="../assets/spec.png" style="text-align: center; display: block; margin-left: auto; margin-right: auto; width: 100%; padding: 0" alt=""/>
~~~

Process echelle spectra and generate precise radial velocities with:

- **[EchelleBase.jl](https://github.com/astrobc1/EchelleBase.jl)** - Provides base data types and mathematical functions that can apply to all echelle data.
- **[EchelleReduce.jl](https://github.com/astrobc1/EchelleReduce.jl)** - Provides an interface to reduce (calibrate and extract) echelle spectra.
- **[EchelleSpectralModeling.jl](https://github.com/astrobc1/EchelleSpectralModeling.jl)** - Provides an interface to model 1-dimensional echelle spectra with an emphasis on radial velocities.

Different levels of support are provided for:

- [iSHELL / IRTF](http://irtfweb.ifa.hawaii.edu/~ishell/)
- [PARVI / Hale](http://irtfweb.ifa.hawaii.edu/~ishell/)
- [HARPS-S / La Silla 3.6 m](https://www.eso.org/sci/facilities/lasilla/instruments/harps.html)
- [ESPRESSO / VLT](https://www.eso.org/sci/facilities/paranal/instruments/espresso.html)
- [CHIRON / SMARTS 1.5 m](http://exoplanets.astro.yale.edu/instrumentation/chiron.php)
- [NIRSPEC / Keck](https://www2.keck.hawaii.edu/inst/nirspec/)
- [MINERVA](https://lweb.cfa.harvard.edu/minerva/)
- [MINERVA-Australis](https://astrophysics.usq.edu.au/minerva-australis/)

---

~~~
<br/>
~~~

~~~
<span style="font-weight:bold; margin-left: 0px; margin-right: 0px; font-size:18pt; max-width: 5000px;">Julia codes I've developed for fun</span>
~~~

~~~
<br/>
<br/>
~~~

In my spare time, I enjoy coding up mathematical fractals in the complex plane. Here is the burning ship fractal, computed by iterating

$$ z_{n+1} = (|\mathrm{Re}(z_{n})| + i \ |\mathrm{Im}(z_{n})|)^2 + c $$

for each point c in the complex plane, starting from the origin. Each pixel is colored according to it's "escape velicity" where brighter pixels escape to complex infinity after fewer iterations.

~~~
<br/>
~~~

~~~
<img src="../assets/burningship.png" style="text-align: center; display: block; margin-left: auto; margin-right: auto; width: 100%; padding: 0" alt=""/>
~~~