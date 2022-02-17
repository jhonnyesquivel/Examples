const json = require("./RudeDemons.json");
const {
  ARMOR,
  CHAINS,
  EYES,
  HORNS,
  MOUTHS,
  SKINS,
  SPECIALS,
  WINGS,
  HEADS,
} = require("./demon-rarities");

const mapDemons = () => {
  let result = json
    .map((g) => {
      const resp = g.info.meta;
      const id = g.info.data.id;
      const { name, attributes } = resp;
      return { id, name, rank: calculeRank(id, attributes) };
    })
    .sort((a, b) => compare(a, b));

  const ranks = Object.fromEntries(
    result.map((x, i) => {
      return [i, x];
    })
  );

  //console.log(result);
  const fs = require("fs");
  const jsonContent = JSON.stringify(ranks);

  fs.writeFile(
    //"G://codigo//RudeCards//RudeCards//Resources//Golems.json",
    "./ResDemons.json",
    jsonContent,
    "utf8",
    function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    }
  );
};

const calculeRank = (id, attributes) => {
  let totalRank = 1 / 6.25;

  if (attributes == undefined) {
    console.log(id, attributes);
    return 0;
  }

  for (let index = 0; index < attributes.length; index++) {
    const attr = attributes[index];

    if (attr.trait_type == "Wings") {
      totalRank += 1 / WINGS[attr.value];
    }

    if (attr.trait_type == "Skin") {
      totalRank += 1 / SKINS[attr.value];
    }

    if (attr.trait_type == "Armor") {
      totalRank += 1 / ARMOR[attr.value];
    }

    if (attr.trait_type == "Mouth") {
      totalRank += 1 / MOUTHS[attr.value];
    }

    if (attr.trait_type == "Chain") {
      totalRank += 1 / CHAINS[attr.value];
    }

    if (attr.trait_type == "Eyes") {
      totalRank += 1 / EYES[attr.value];
    }

    if (attr.trait_type == "Head") {
      totalRank += 1 / HEADS[attr.value];
    }

    if (attr.trait_type == "Horns") {
      totalRank += 1 / HORNS[attr.value];
    }

    if (attr.trait_type == "Special") {
      totalRank += 1 / SPECIALS[attr.value];
    }
  }

  return totalRank;
};

mapDemons();

function compare(a, b) {
  if (a.rank < b.rank) {
    return 1;
  }
  if (a.rank > b.rank) {
    return -1;
  }
  return 0;
}
