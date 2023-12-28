import { Colors } from '../../colors';

export const GLOBAL_CSS = `
/* http://meyerweb.com/eric/tools/css/reset/
   v5.0.1 | 20191019
   License: none (public domain)
*/
h1, h2, h3, h4, h5, h6 {
	margin: 0;
	padding: 0;
	vertical-align: baseline;
}

html, body, div, span, applet, object, iframe,
p, blockquote, pre, a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
	display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
menu, ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

h1 {
  font-size: 3.6rem;
  font-weight: bolder;
}

h2 {
  font-size: 3.2rem;
  font-weight: bolder;
}

h3 {
  font-size: 2.4rem;
  font-weight: bolder;
}
h4 {
  font-size: 2rem;
  font-weight: bolder;
}

h5 {
  font-size: 1.4rem;
  font-weight: bolder;
}
h6 {
  font-size: 1rem;
  font-weight: bolder;
}

:root {
  /* NOTE: 1 rem을 10px 기준으로 처리하도록 함 */
  font-size: 62.5%;
}

html {
  background-color: ${Colors.Dark};
}

@media (max-width: 400px) {
  .mobile-ui {
    display: block;
  }
  .desktop-ui {
    display: none;
  }
  .clickable {
    text-decoration: unset;
    cursor: unset;
  }
}

@media (min-width: 401px) {
  .mobile-ui {
    display: none;
  }
  .desktop-ui {
    display: block;
  }
  .clickable {
    text-decoration: underline;
    cursor: pointer;
  }
}

bold {
  font-weight: bold;
}
`;
