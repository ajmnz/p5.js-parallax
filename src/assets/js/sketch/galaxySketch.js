import * as dat from 'dat.gui';
import Galaxy from '../galaxy/Galaxy';
import ShootingStar from '../galaxy/ShootingStar';

let galaxy;
let shootingStar;

/**
 * Propietats inicials de cada
 * galàxia.
 */
const initProps = {
  galaxyAmount: 3,
  galaxyProps: [
    {
      width: 0.5,
      height: 3,
      speed: 0.2,
      amount: 200,
    },
    {
      width: 2.5,
      height: 2.5,
      speed: 1,
      amount: 50,
    },
    {
      width: 4.5,
      height: 4.5,
      speed: 3.3,
      amount: 30,
    },
  ],
};

/**
 * Instància que controla totes
 * les propietats del canvas generat
 * per p5. És inicialitzat a index.js
 */
const galaxySketch = (s) => {
  /**
   * Mètode de p5. Creem el canvas i carreguem
   * les instàncies de les galàxies i l'estrella
   * fugaç.
   */
  s.setup = () => {
    s.createCanvas(600, 300);
    s.noStroke();
    s.angleMode(s.DEGREES);
    s.noCursor();

    // Creem una nova instància de dat.gui
    const gui = new dat.GUI({ autoPlace: false });

    // Creem la carpeta 'General' dins la GUI
    const f1 = gui.addFolder('General');

    // Creem una segona carpeta anomenada 'Galaxies'
    const f2 = gui.addFolder('Galaxies');

    /**
     * Definim l'objecte de subcarpetes que aniràn
     * dins de la f2
     */
    const sf = {};

    /**
     * Creem una nova instància de la galàxia
     * i passem la instància de p5 i les propietats
     * definides a l'inici del document
     */
    galaxy = new Galaxy(s, initProps);

    /**
     * Afegim una propietat a la carpeta 'General',
     * que correspon amb el mètode addGalaxy() i
     * que permet afegir una nova galàxia.
     * Ens subscribim a l'event de canvi, per tal
     * de poder crear una nova subcarpeta per aquella
     * galàxia.
     */
    f1.add(galaxy, 'addGalaxy').onFinishChange(() => {
      /**
       * Recuperem les galàxies actuals, que incorporarà
       * la nova creada perquè al fer click hem cridat
       * al mètode addGalaxy().
       */
      const galaxies = galaxy.getGalaxies();

      // Desem la nova galàxia
      const newGalaxy = galaxies[galaxies.length - 1];

      /**
       * Afegim totes els propietats d'aquesta a una nova
       * subcarpeta dins de la carpeta 'Galaxies' (f2).
       */
      sf[galaxies.length - 1] = f2.addFolder(`Galaxy ${galaxies.length}`);
      sf[galaxies.length - 1].add(newGalaxy, 'speed', 0.01, 10);
      sf[galaxies.length - 1].add(newGalaxy, 'width', 0.5, 10);
      sf[galaxies.length - 1].add(newGalaxy, 'height', 0.5, 10);

      /**
       * Quan s'estigui canviant l'amount (quantitat) d'estrelles
       * d'aquesta galàxia, posem la bandera de tweaking a true,
       * que no permetrà córrer al mètode init().
       */
      sf[galaxies.length - 1].add(newGalaxy, 'amount', 1, 1000).onChange(() => {
        newGalaxy.tweaking = true;
      }).onFinishChange(() => {
        /**
         * Un cop l'usuari hagi aixecat el cursor
         * de l'slider, tornem tweaking a false
         * i cridem a init(), que generarà tantes
         * estrelles com haguem especificat.
         */
        newGalaxy.tweaking = false;
        newGalaxy.init();
      });
    });

    // Recuperem les galàxies creades
    const galaxies = galaxy.getGalaxies();

    // Iterem totes les galàxies
    for (let i = 0; i < Object.keys(galaxies).length; i += 1) {
      /**
       * Per a cada galàxia afegim una nova subcarpeta
       * i afegim les propietats de cada galàxia a dins
       * d'aquesta.
       */
      sf[i] = f2.addFolder(`Galaxy ${i + 1}`);

      sf[i].add(galaxies[i], 'speed', 0.01, 10);
      sf[i].add(galaxies[i], 'width', 0.5, 10);
      sf[i].add(galaxies[i], 'height', 0.5, 10);

      /**
       * Quan s'estigui canviant l'amount (quantitat) d'estrelles
       * d'aquesta galàxia, posem la bandera de tweaking a true,
       * que no permetrà córrer al mètode init().
       */
      sf[i].add(galaxies[i], 'amount', 1, 1000).onChange(() => {
        galaxies[i].tweaking = true;
      }).onFinishChange(() => {
        /**
         * Un cop l'usuari hagi aixecat el cursor
         * de l'slider, tornem tweaking a false
         * i cridem a init(), que generarà tantes
         * estrelles com haguem especificat.
         */
        galaxies[i].tweaking = false;
        galaxies[i].init();
      });
    }

    // Creem una nova instància de l'estrella fugaç
    shootingStar = new ShootingStar(s);

    // Creem una nova carpeta per aquesta
    const f3 = gui.addFolder('Shooting Star');

    // Afegim el mètode createNew()
    f3.add(shootingStar, 'createNew');

    // Fem que la GUI se situi a dins del contenidor especificat
    document.querySelector('#galaxyGUI').appendChild(gui.domElement);
  };

  // Coordenades del cohet (mouse)
  let cx = -50;
  let cy = -50;

  /**
   * Mètode de p5.
   * Renderitzem el cohet (cursor), juntament
   * amb les galàxies i l'estrella fugaç.
   */
  s.draw = () => {
    s.background(8, 9, 20);

    /**
     * Utilitzem interpolació linial per tal
     * d'aconseguir un moviment del cohet fluid
     * i amb cert delay.
     */
    cx = s.lerp(cx, s.mouseX, 0.08);
    cy = s.lerp(cy, s.mouseY, 0.08);

    // No permetem que el cohet marxi del canvas
    if (cx > s.width - 25) cx = s.width - 25;
    if (cx < 0) cx = 0;
    if (cy > s.height) cy = s.height;
    if (cy < 25) cy = 25;

    // Renderitzem el cohet, que en realitat és un emoji😁
    s.textSize(25);
    s.text('🚀', cx, cy);

    // Cridem als mètodes de renderitzat de les galàxies i l'estrella fugaç
    galaxy.render();
    shootingStar.display();
  };
};

export default galaxySketch;
