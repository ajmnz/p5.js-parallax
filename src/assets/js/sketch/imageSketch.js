import interBlack from '../../fonts/inter-black.ttf';
import interRegular from '../../fonts/inter-regular.ttf';

/**
 * Propietats de cada capa.
 *
 * image: imatge de la capa
 * speed: velocitat de la capa
 * y    : posició de la y de la capa
 * prevY: posició prèvia de la y, per el lerp
 */
const elements = [
  {
    image: require('../../img/mtn-8.png'),
    speed: 1,
    y: 0,
    prevY: 0,
  },
  {
    image: require('../../img/mtn-7.png'),
    speed: 3,
    y: 0,
    prevY: 0,
  },
  {
    image: require('../../img/mtn-6.png'),
    speed: 5,
    y: 0,
    prevY: 0,
  },
  {
    image: require('../../img/mtn-5.png'),
    speed: 8,
    y: 0,
    prevY: 0,
  },
  {
    image: require('../../img/mtn-4.png'),
    speed: 10,
    y: 0,
    prevY: 0,
  },
  {
    image: require('../../img/mtn-3.png'),
    speed: 12,
    y: 0,
    prevY: 0,
  },
  {
    image: require('../../img/mtn-2.png'),
    speed: 15,
    y: 0,
    prevY: 0,
  },
  {
    image: require('../../img/mtn-1.png'),
    speed: 20,
    y: 0,
    prevY: 0,
  },
];

// Continguts del bloc de text
const textString = 'Animal rights is the idea in which some, or all, animals are entitled to the possession of their own existence and that their most basic interests —such as the need to avoid suffering— should be afforded the same consideration as similar interests of human beings. That is, some species of animals have the right to be treated as individuals, with their own desires and needs, rather than as an unfeeling property.';

let boldFont;
let regularFont;

/**
 * Instància que controla totes
 * les propietats del canvas generat
 * per p5. És inicialitzat a index.js
 */
const imageSketch = (s) => {
  /**
   * Precarreguem les imatges de cada
   * capa i les fonts a utilitzar.
   */
  s.preload = () => {
    elements.forEach((el) => {
      el.image = s.loadImage(el.image);
    });

    boldFont = s.loadFont(interBlack);
    regularFont = s.loadFont(interRegular);
  };

  // Creem el canvas
  s.setup = () => {
    s.createCanvas(750, 500);
    s.noStroke();
  };

  /**
   * Mètode de p5.
   * Mostrem les capes i els títols i textos.
   */
  s.draw = () => {
    s.background(44, 12, 25);

    // Iterem cada capa
    elements.forEach((el, i) => {
      /**
       * Calculem la y a partir de la posició
       * prèvia d'aquesta amb interpolació
       * linial.
       */
      el.y = s.lerp(el.y, el.prevY, 0.2);

      // Renderitzem cada imatge
      s.image(el.image, 0, el.y);

      /**
       * Situem el títol de WILDLIFE després
       * de la capa 2, perquè quedi com
       * intercal·lat.
       */
      if (i === 2) {
        s.blendMode(s.OVERLAY);
        s.textFont(boldFont);
        s.fill(255);
        s.textSize(100);
        s.textAlign(s.CENTER);
        s.text('WILDLIFE', 375, 230);
        s.blendMode(s.BLEND);
      }
    });

    /**
     * Rectangle que va enganxat a la darrera capa
     * i que actua com a màscara. Si no estigués, veuriem
     * el final de les capes. No permetem el seu moviment
     * un cop hagin desaparegut totes les capes, per tal que
     * ocupi tot el canvas.
     */
    if (Math.abs(elements[7].y) > s.height) {
      elements[7].y = s.height * -1;
    }
    s.fill(44, 12, 25);

    /**
     * Fem que la seva y vagi enganxada
     * a l'última capa, amb un offset perquè
     * la lerp provoca alguns flaixos.
     */
    s.rect(0, s.height + elements[elements.length - 1].y - 10, s.width, s.height + 10);

    // Capçalera del bloc de text
    s.textAlign(s.LEFT);
    s.textFont(boldFont);
    s.textSize(40);
    s.fill(172, 64, 65);
    s.text('Animal rights', 30, s.height + elements[elements.length - 1].y + 100);

    // Bloc de text
    s.textSize(14);
    s.textLeading(30);
    s.textFont(regularFont);
    s.fill(255, 210, 143);

    // Els dos últims arguments són la bounding box del text
    s.text(textString, 30, s.height + elements[elements.length - 1].y + 130, 600, 500);
  };

  /**
   * Mètode de p5.
   * Còrre quan es fa scroll i
   * suma o resta una velocitat a la y.
   */
  s.mouseWheel = (ev) => {
    /**
     * Iterem totes les capes perquè aquestes
     * tenen la seva y i velocitat pròpia.
     */
    elements.forEach((el) => {
      // Si l'scroll és cap amunt
      if (ev.deltaY < 0) {
        /**
         * Sumem l'speed a prevY per poder
         * fer la lerp posteriorment.
         */
        el.prevY += el.speed;

        /**
         * No permetem el desplaçament de les capes
         * si la seva y és més gran de 0, per així
         * evitar que baixin més del compte
         */
        if (el.prevY > 0) {
          el.prevY = 0;
        }
      } else {
        // Si l'scroll és cap a baix, restem l'speed a la y
        el.prevY -= el.speed;
      }
    });
  };

  /**
   * Mètode de p5.
   * Còrre quan s'apreta una tecla.
   */
  s.keyPressed = () => {
    /**
     * Fem el mateix que amb mouseWheel, però
     * aquest cop mapejant les tecles S i fletxa avall,
     * i W i fletxa amunt. Repliquem el mateix
     * comportament que quan es fa scroll.
     */
    elements.forEach((el) => {
      if (s.keyCode === s.DOWN_ARROW || s.key === 's') {
        el.prevY += el.speed;

        if (el.prevY > 0) {
          el.prevY = 0;
        }
      }
      if (s.keyCode === s.UP_ARROW || s.key === 'w') {
        el.prevY -= el.speed;
      }
    });
  };
};

export default imageSketch;
