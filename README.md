<p align="center">
<img align="center" width="300" src="https://github.com/BenjaminAHodgson/css-audio/blob/master/logo.svg" />
</p>

<h2 align="center">A simple way to animate your site with sound.</h2>

<p align="center">
  <em>
    Any js framework
  </em>
  <br />
  <em>
    Any css framework
  </em>
  <br />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/css-audio">
    <img alt="npm version" src="https://img.shields.io/npm/v/css-audio.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/css-audio">
    <img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/css-audio.svg?style=flat-square"></a>
</p>

## Intro

This is a simple wrapper for the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), allowing you to easily animate your site with sound from any source.

### Install

`pnpm install css-audio`
or
`npm install css-audio`

### Example

```js
import cssAudio from "../src";

document.addEventListener("DOMContentLoaded", async () => {
  const start = await cssAudio({
    src: "/elevator.wav",
  });

  function play() {
    start();
    document.removeEventListener("click", play);
  }

  document.addEventListener("click", play);
});
```

```css
.bar {
  display: block;
  height: calc(var(--freq-low) / 200 * 1px);
  width: 100px;
  background-color: red;
}
```

### Default CSS Variables Available

```css
var(--freq-low)
var(--freq-mid)
var(--freq-high)
```

### Example Project
[See example directory](https://github.com/BenjaminAHodgson/css-audio/tree/master/example)

---
