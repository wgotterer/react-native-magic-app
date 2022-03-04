import Category from "../models/category";
import Meal from "../models/meal";

export const CATEGORIES = [
  new Category("c1", "Italian", "#f5428d"),
  new Category("c2", "Quick & Easy", "#f54242"),
  new Category("c3", "Hamburgers", "#f5a442"),
  new Category("c4", "German", "#f5d142"),
  new Category("c5", "Light & Lovely", "#368dff"),
  new Category("c6", "Exotic", "#41d95d"),
  new Category("c7", "Breakfast", "#9eecff"),
  new Category("c8", "Asian", "#b9ffb0"),
  new Category("c9", "French", "#ffc7ff"),
  new Category("c10", "Summer", "#47fced"),
];

export const MEALS = [
  new Meal(
    "m1",
    ["c1", "c2"],
    "Cursed Scroll",
    "rare",
    "artifact",
    "https://static.tappedout.net/mtg-cards-2/tempest/cursed-scroll/2014-cursed-scroll-cropped.jpg",
    "Tempest",
    [
      "If you have no cards in hand, you still have to name a card. Then you fail to reveal one (since there aren't any). Since the named card wasn't revealed, no damage is dealt."
    ],
    [
      "Expansion: Tempest (Rare) Tempest",
      "Rarity: Rare",
      "Artist: D. Alexander Gregory",
    ],
    false,
    true,
    true,
    true
  ),

  new Meal(
    "m2",
    ["c2"],
    "Holy Avenger",
    "rare",
    "Artifact-Equipment",
    "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=531911&type=card",
    "Commander",
    [
      "	You may put an Aura card onto the battlefield attached to the equipped creature if it could legally be attached to that creature."
    ],
    [
      "Expansion: Adventures in the Forgotten Realms Commander",
      "Rarity: Rare",
      "Artist: Milivoj Ćeran",
      
    ],
    false,
    false,
    false,
    false
  ),

  new Meal(
    "m3",
    ["c3"],
    "Kaya's Onslaught",
    "uncommon",
    "instant",
    "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=503623&type=card",
    "Kaldheim",
    [
      "Because exiling a card with foretell from your hand is a special action, you can do so any time you have priority during your turn, including in response to spells and abilities. Once you announce you're taking the action, no other player can respond by trying to remove the card from your hand.",
    ],
    [
      "Expansion: Kaldheim",
      "Rarity: Uncommon",
      "Artist: Daarken",
    ],
    false,
    false,
    false,
    true
  ),

  new Meal(
    "m4",
    ["c4"],
    "Dragon Turtle",
    "rare",
    "Creature",
    "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=527343&type=card",
    "Forgotten Realms",
    [
      "If you target an opponent's creature with Dragon Turtle's Drag Below ability and that target is illegal as the ability tries to resolve, the entire ability is removed from the stack and does nothing. Dragon Turtle will remain untapped and will untap as normal during its controller's next untap step.",
    ],
    [
      "Expansion:  Adventures in the Forgotten Realms",
      "Rarity: Rare",
      "Artist: Dan Scott",
    ],
    false,
    false,
    false,
    false
  ),

  new Meal(
    "m5",
    ["c2", "c5", "c10"],
    "Raise Dead",
    "common",
    "sorcery",
    "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=1174&type=card",
    "Revised Edition",
    [
      "You must show the card you bring out of the graveyard to your opponent.",
    ],
    [
      "Expansion:  Adventures in the Forgotten Realms",
      "Rarity: common",
      "Artist: : Jeff A. Menges",
    ],
    true,
    false,
    true,
    true
  ),

  new Meal(
    "m6",
    ["c6", "c10"],
    "Pelakka Wurm",
    "uncommon",
    "creature - wurm",
    "https://cdn.pixabay.com/photo/2017/05/01/05/18/pastry-2274750_1280.jpg",
    "Conspiracy",
    [
      '"It eats what it wants to eat—which is anything that moves."',
    ],
    [
      "Expansion:   Magic: The Gathering—Conspiracy",
      "Rarity: uncommon",
      "Artist: : Daniel Ljunggren"
    ],
    true,
    false,
    true,
    false
  ),

  new Meal(
    "m7",
    ["c7"],
    "Woodfall Primus",
    "rare",
    "creature",
    "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=370406&type=card",
    "Modern Masters",
    [
      "If a creature with persist stops being a creature, persist will still work.",
    ],
    [
      "Expansion: Modern Masters",
      "Rarity: rare",
      "Artist: : Adam Rex",
    ],
    true,
    false,
    true,
    false
  ),

  new Meal(
    "m8",
    ["c8"],
    "Prismatic Vista",
    "rare",
    "land",
    "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=464193&type=card",
    "Modern Horizons",
    [
      '"There is beauty in the uncertainty of potential."',
    ],
    [
      "Expansion: Modern Horizons",
      "Rarity: rare",
      "Artist: : Sam Burley",
    ],
    true,
    false,
    false,
    true
  ),

  new Meal(
    "m9",
    ["c9"],
    "Hordeling Outburst",
    "uncommon",
    "sorcery",
    "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=438491&type=card",
    "Merfolk vs. Goblins",
    [
      "Leave no scraps, lest you attract pests."
    ],
    [
      "Expansion: Merfolk vs. Goblins",
      "Rarity: uncommon",
      "Artist: : Zoltan Boros",
    ],
    true,
    false,
    true,
    false
  ),
  new Meal(
    "m10",
    ["c2", "c5", "c10"],
    "Sulfurous Blast",
    "uncommon",
    "instant",
    "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=109685&type=card",
    "Time Spiral",
    [
      "The Keldons used the toxic vents in the cracked earth to bolster their home's defenses.",
    ],
    [
      "Expansion: Time Spiral",
      "Rarity: uncommon",
      "Artist: Jeff Miracola",
    ],
    true,
    true,
    true,
    true
  ),
];
