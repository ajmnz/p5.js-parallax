import Star from '../galaxy/Star';

/**
 * Classe encarregada de controlar
 * i renderitzar les diferents galàxies
 * aka grups d'estrelles.
 */
class Galaxy {
  constructor(s, props = {}) {
    // Instància de p5 que ens dóna accès als mètodes
    this.s = s;

    /**
     * Propietats de cada galàxia
     * galaxyAmount : quantes galàxies volem (3)
     * galaxyProps  : propietats individuals de cada galàxia
     */
    this.props = {
      ...props,
    };

    // Array amb cada instància de cada galàxia
    this.galaxies = [];

    this.init();
  }

  /**
   * Mètode encarregat de crear instàncies per
   * a cada galàxia i desar-les a l'array
   */
  init() {
    for (let i = 0; i < this.props.galaxyAmount; i += 1) {
      /**
       * Desem a l'array cada instància de la galàxia i
       * passem la instància de p5 i les propietats d'aquesta
       */
      this.galaxies[i] = new Star(
        this.s,
        this.props.galaxyProps[i],
      );
    }
  }

  /**
   * Mètode encarregat d'iterar les diferents galàxies
   * i cridar els mètodes d'aquestes que les faràn
   * apareixer dins el canvas
   */
  render() {
    for (let i = 0; i < this.props.galaxyAmount; i += 1) {
      this.galaxies[i].move();
      this.galaxies[i].display();
    }
  }

  /**
   * Mètode que ens retorna les galàxies actuals.
   * És utilitzat a l'hora de crear carpetes per la GUI.
   */
  getGalaxies() {
    return (
      this.galaxies
    );
  }

  /**
   * Mètode que afegeix una galàxia amb propietats
   * aleatòries dins de l'array. Utilitzat a l'hora
   * d'afegir una galàxia a través de la GUI.
   */
  addGalaxy() {
    const { s } = this;
    // Augmentem la quantitat de galàxies
    this.props.galaxyAmount += 1;

    /**
     * Afegim una galàxia al final de l'array amb propietats aleatòries
     * per així tenir-la disponible a l'hora de cridar render().
     */
    this.galaxies[this.galaxies.length] = new Star(
      this.s,
      {
        width: s.random(0.5, 10),
        height: s.random(0.5, 10),
        speed: s.random(0.5, 10),
        amount: s.random(10, 30),
      },
    );
  }
}

export default Galaxy;
