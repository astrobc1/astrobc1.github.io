<!--
Add here global page variables to use throughout your website.
-->
+++
author = "Bryson Cale"
mintoclevel = 2

# Add here files or directories that should be ignored by Franklin, otherwise
# these files might be copied and, if markdown, processed by Franklin which
# you might not want. Indicate directories by ending the name with a `/`.
# Base files such as LICENSE.md and README.md are ignored by default.
ignore = ["node_modules/"]

# RSS (the website_{title, descr, url} must be defined to get RSS)
generate_rss = true
website_title = "Bryson Cale"
website_descr = "Bryson Cale Personal Website"
website_url   = "https://astrobc1.github.io/"
+++

<!--
Add here global latex commands to use throughout your pages.
-->

\newcommand{\R}{\mathbb R}
\newcommand{\scal}[1]{\langle #1 \rangle}
\newcommand{\figenv}[3]{
~~~
<figure style="text-align:center;">
<img src="!#2" style="padding:0;#3" alt="#1"/>
<figcaption>#1</figcaption>
</figure>
~~~
}
