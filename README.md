# The One Ring 2E Statblocks

This plugin renders adversary statblocks for The One Ring, Second Edition.

Many thanks to @ben for creating the [13th Age statblocks plugin](https://github.com/ben/obsidian-13th-age-statblocks) from which this plugin is adapted.

### Development

- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run dev` to start compilation in watch mode.

### Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/tor2e-statblocks/`.
  - If you ran `npm run dev`, these will be in the root folder.
  - Pre-built versions of these files can be found in the `dist` folder. I have only tested these on Mac OSX so far.
- In Obsidian, navigate to Preferences > Community plugins. Toggle `The One Ring 2E Statblocks` on.

### Create a statblock

A statblock may be defined in a note using this syntax. Fields are mostly optional. If the stat block "disappears" it is because there is a field in the wrong format. Try adding fields one at a time.

The parameters in the statblock are parsed as YAML. Certain Obsidian conventions (for example, double brackets: `[[]]`) may not work as YAML has its own interpretation of what this means. Try wrapping these in double quotes `""`.

#### Fields

- `name` - Adversary name
- `blurb` or `description` - The flavor-text description about the adversary.
  - This field is rendered as Markdown: Obsidian links `[[]]` will work here.
- `features` - A list of distinctive features
- `level` - The attribute level of the adversary
- `endurance` - Endurance points
- `might` - Might rating
- `hate` or `resolve` - Use either of these, the right label will appear
- `parry` - Parry rating
- `armour` or `armor` - Armour rating
- `proficiencies` - Combat proficiencies. These are represented by a list of YAML dictionaries in the following format:
  - `name` - The attack name
  - `rating` - The attack rating
  - `damage` - The damage rating
  - `injury` - The injury threshold
  - `special` - Special damage opportunities
    - This field is rendered as Markdown: Obsidian links `[[]]` will work here. If they are not rendering as links, try wrapping the brackets in double quotes.
- `abilities` - A list of Fell Abilities
  - This field is rendered as Markdown: Obsidian links `[[]]` will work here. If they are not rendering as links, try wrapping the brackets in double quotes.

#### Example

````
```tor2e
name: The Covetous Lurker
description: The Covetous Lurker is a worm-like creature that lives underground. It has great grasping claws which clash against cave walls as it pulls itself around its territory, searching for invaders which seek to steal its treasure.
features:
- Greedy
level: 7
endurance: 70
might: 2
hate: 7 # or resolve
parry: 0
armour: 3 # or armor
proficiencies:
- name: Rend
  rating: 3
  damage: 5
  injury: 16
  special: "[[Special Damage Options#Seize|Seize]]"
- name: Crush
  rating: 3
  damage: 7
  injury: 12
  special: "[[Special Damage Options#Break Shield|Break Shield]]"
abilities:
- "[[Fell Abilities#Fear of Fire|Fear of Fire]]"
- "[[Fell Abilities#Thing of Terror|Thing of Terror]]"
- "[[Fell Abilities#Thick Hide|Thick Hide]]"
```
````
