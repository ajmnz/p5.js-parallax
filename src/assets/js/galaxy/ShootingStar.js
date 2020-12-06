/**
 * Classe encarregada de renederitzar
 * una estrella fugaç cada un determinat
 * interval de temps.
 */
class ShootingStar {
  constructor(s) {
    this.s = s;

    // Coordenades de cada estrella fugaç
    this.x = 0;
    this.y = 0;

    // Color de l'estrella fugaç
    this.fill = 255;

    // Dimensions de l'estrella fugaç
    this.width = 60;
    this.height = 0;

    /**
     * Variable que conté l'interval d'aparició
     * de cada estrella fugaç, per poder
     * cancel·lar-lo quan sigui necessari.
     */
    this.interval = '';

    this.init();
  }

  /**
   * Mètode encarregat d'iniciar l'interval
   * que determinarà quan es mostra cada
   * estrella fugaç.
   */
  init() {
    const { s } = this;
    this.interval = setInterval(() => {
      /**
       * Reiniciem la seva posició x i
       * fem aleatòria la seva y.
       */
      this.x = 0;
      this.y = s.random(-100, 200);

      /**
       * Reiniciem el seu fill i les seves dimensions
       * perquè han estat alterades pel mètode display.
       */
      this.fill = 255;
      this.width = 60;
    }, 7000);
  }

  display() {
    const { s } = this;

    /**
     * Restem un valor al fill
     * perquè fagi l'efecte de fade out.
     */
    this.fill -= 1.3;
    s.fill(this.fill);

    /**
     * Sumem valors a la x i y per tal de
     * que es desplaci en direcció diagonal
     * al través del canvas.
     */
    this.x += 5;
    this.y += 2;

    /**
     * Fem la seva amplada cada cop més
     * petita per donar la sensació que
     * s'està endinsant cap al fons del
     * canvas.
     */
    this.width -= 0.3;

    /**
     * Si l'amplada és més petita de 0,
     * evitem que segueixi restant perquè sinó
     * començaria a crèixer en direcció contrària.
     */
    if (this.width < 0) {
      this.width = 0;
    }

    /**
     * Fem un translate per tal de poder aplicar la
     * rotació a l'objecte, a la vegada que sumem la x
     * i la y per provocar el desplaçament.
     */
    s.translate((-s.width / 2) + this.x, (-s.height / 2) + this.y);

    /**
     * Rotem l'estrella fugaç 20 graus per donar-li
     * una angulació cap abaix.
     */
    s.rotate(20);

    // Renderitzem l'estrella fugaç
    s.rect(0, 0, this.width, 1);
  }

  /**
   * Mètode encarregat de renderitzar una
   * nova estrella fugaç. Utilitzat a la GUI.
   */
  createNew() {
    const { s } = this;

    /**
     * Parem l'interval per tal d'evitar col·lisions
     * quan, per exemple, s'ha cridat al mètode i
     * l'interval torna a còrrer.
     */
    clearInterval(this.interval);
    /**
     * Reiniciem les propietats de l'estrella
     * fugaç (com a init()), per tal de mostrar-la.
     */
    this.x = 0;
    this.y = s.random(-100, 200);
    this.fill = 255;
    this.width = 60;

    /**
     * Finalment cridem init() per reprendre
     * l'interval.
     */
    this.init();
  }
}

export default ShootingStar;
