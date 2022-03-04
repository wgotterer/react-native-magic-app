class Card {
  constructor(
    id,
    categoryIds,
    title,
    rarity,
    type,
    imageUrl,
    expansion,
    rulings,
    infos,
    isCreature,
    isSorcery,
    isInstant,
    isArtifact
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.imageUrl = imageUrl;
    this.rulings = rulings;
    this.infos = infos;
    this.expansion = expansion;
    this.type = type;
    this.rarity = rarity;
    this.isCreature = isCreature;
    this.isSorcery = isSorcery;
    this.isInstant = isInstant;
    this.isArtifact = isArtifact;
  }
}

export default Card;
