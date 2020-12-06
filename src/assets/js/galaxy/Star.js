/**
 * Classe encarregada de crear totes les
 * estrelles d'una galàxia.
 */
class Star {
  constructor(s, opts) {
    this.s = s;

    // Les dimensions del canvas
    this.bounds = {
      width: s.width,
      height: s.height,
    };

    /**
     * Enlloc de posar les propietats a un
     * objecte o array, les posem per individual
     * perquè és un requeriment de la GUI. Sinó
     * no les podríem controlar.
     *
     * amount : nombre total d'estrelles d'aquella galàxia
     * width  : amplada les estrelles
     * height : alçada de les estrelles
     * speed  : velocitat de les estrelles
     */
    this.amount = opts.amount;
    this.width = opts.width;
    this.height = opts.height;
    this.speed = opts.speed;

    // Arrays amb la posició de cada estrella
    this.x = {};
    this.y = {};

    /**
     * Bandera per saber si s'està manipulant
     * la GUI. Necessària perquè sinó hi havia
     * alguns bugs a l'hora d'augmentar
     * l'amount (quantitat) d'estrelles d'una galàxia
     */
    this.tweaking = false;

    this.init();
  }

  /**
   * Mètode que randomitza les coordenades
   * d'inici de cada estrella i les desa a
   * l'array respectiu.
   */
  init() {
    const { s } = this;

    for (let i = 0; i < this.amount; i += 1) {
      // Comprovem que no s'estigui manipulant la GUI
      if (!this.tweaking) {
        this.x[i] = s.random(0, 600);
        this.y[i] = s.random(0, 300);
      }
    }
  }

  /**
   * Mètode que renderitza les estrelles al canvas.
   */
  display() {
    const { s } = this;
    for (let i = 0; i < this.amount; i += 1) {
      s.noStroke();

      /**
       * Si randomitzem el fill dins de l'escala de grisos
       * aconseguim aquest efecte parpellejant.
       */
      s.fill(s.random(255));
      s.ellipse(this.x[i], this.y[i], this.width, this.height);
    }
  }

  /**
   * Mètode encarregat de moure cap avall els grups
   * d'estrelles.
   */
  move() {
    const { s } = this;
    const { bounds } = this;

    for (let i = 0; i < this.amount; i += 1) {
      /**
       * Si l'estrella arriba al final del canvas,
       * la tornem a l'inici i randomitzem la seva
       * posició horitzontal (x).
       */
      if (this.y[i] > bounds.height) {
        this.y[i] = 0;
        this.x[i] = s.random(0, 600);
      } else {
        // Sinó, sumem la velocitat a la seva y.
        this.y[i] += this.speed;
      }
    }
  }
}

export default Star;
