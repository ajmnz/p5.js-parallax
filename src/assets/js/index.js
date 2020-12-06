/* eslint-disable no-unused-vars */
import '../css/main.css';
import p5 from 'p5';
import galaxySketch from './sketch/galaxySketch';
import imageSketch from './sketch/imageSketch';

/**
 * Creem una nova instància de p5 per el parallax d'estrelles,
 * i una altra per el parallax d'imatges.
 * Només els mostrem si el seu contenedor existeix al html,
 * ja que tenim diferents pàgines per a cadascun.
 */
const galaxyCanvas = document.querySelector('#galaxy');
if (galaxyCanvas) {
  const gSk = new p5(galaxySketch, galaxyCanvas);
}

const imageCanvas = document.querySelector('#image');
if (imageCanvas) {
  const iSk = new p5(imageSketch, imageCanvas);
}
