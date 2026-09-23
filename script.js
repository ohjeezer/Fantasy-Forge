"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const byId = id => document.getElementById(id);
  const pick = items => items[Math.floor(Math.random() * items.length)];
  const options = items => items.map(item => `<option value="${item}">${item}</option>`).join("");

  const DATA = {
    dndRaces: ["Human","Elf","Dwarf","Halfling","Gnome","Tiefling","Dragonborn","Half-Orc"],
    classes: ["Barbarian","Bard","Cleric","Druid","Fighter","Monk","Paladin","Ranger","Rogue","Sorcerer","Warlock","Wizard"],
    skyrimRaces: ["Nord","Breton","Imperial","Redguard","High Elf","Wood Elf","Dark Elf","Orc","Khajiit","Argonian"],
    archetypes: ["Warrior","Mage","Thief","Assassin","Companion","Dragonborn","Vampire Hunter","Necromancer","Knight","Ranger"],
    styles: ["Short","Normal","Epic"],
    dndNames: {
      Human: [["Alden","Brenna","Caleb","Clara","Dorian","Elara","Gareth","Mara"],["Ashford","Hawthorne","Reed","Vale","Ward"]],
      Elf: [["Aelar","Caelynn","Faelar","Liora","Naivara","Sylvar","Thalia"],["Dawnbranch","Moonwhisper","Silverleaf","Willowshade"]],
      Dwarf: [["Bromli","Dagna","Dorn","Hilda","Kazrik","Morgran","Thora"],["Anvilborn","Deepforge","Ironhammer","Stonebeard"]],
      Halfling: [["Bimble","Meri","Perrin","Pippa","Rosie","Tobin"],["Goodbarrel","Greenhill","Softstep","Underbough"]],
      Gnome: [["Bix","Fizzwick","Nim","Pipkin","Tinka","Wobble"],["Brassbutton","Copperspark","Gearwhistle","Tinkertop"]],
      Tiefling: [["Azara","Belros","Kallista","Nyx","Vaelis","Zareth"],["Ashmark","Emberveil","Nightscar","Shadowbrand"]],
      Dragonborn: [["Arjhan","Balasar","Kriv","Rhogar","Torinn","Vrak"],["Emberscale","Ironscale","Stormclaw","Wyrmblood"]],
      "Half-Orc": [["Brakka","Drog","Gorza","Karg","Mog","Urzak"],["Bonebreaker","Ironjaw","Redfang","Wolfscar"]]
    },
    skyrimNames: {
      Nord: [["Alfhild","Brynjolf","Eirik","Hjalmar","Ragna","Svenja"],["Battle-Born","Frost-Blood","Snow-Strider","Wolf-Heart"]],
      Breton: [["Amaund","Corinne","Elodie","Lucien","Renard","Sabine"],["Beauchamp","Dufort","Montclair","Renoit"]],
      Imperial: [["Cassia","Decimus","Gaius","Julia","Marcellus","Valeria"],["Aventus","Carvain","Septima","Varian"]],
      Redguard: [["Azadi","Farida","Hakim","Nazir","Raiha","Zafira"],["al-Akir","Rihad","Sahan","Sentinel"]],
      "High Elf": [["Aelion","Calindil","Eranwe","Ondolemar","Vanus"],["Aelorin","Calion","Larethor","Valinor"]],
      "Wood Elf": [["Aenadil","Brelas","Erdan","Faevar","Liriel"],["Green-Bough","Leaf-Runner","Silverbark","Wildsong"]],
      "Dark Elf": [["Arvel","Dratha","Falen","Neloth","Seryn"],["Dren","Hlaalu","Redoran","Telvanni"]],
      Orc: [["Bagdur","Ghorza","Kharzug","Mogak","Urzoga"],["gro-Batul","gro-Khazgur","gra-Malog","gro-Orsinium"]],
      Khajiit: [["Dar'Jo","J'zargo","Kharjo","Ra'zirr","S'vasha"],["Bright-Claw","Dune-Walker","Night-Paw","Soft-Step"]],
      Argonian: [["Beem-Ja","Deeja","Jaree-Ra","Keeva","Veezara"],["Hides-the-Ashes","Reads-the-Stars","Walks-In-Mist"]]
    },
    origins: ["a crowded river port","a remote mountain village","a traveling theater company","an isolated forest enclave","a military border town","a monastery built over old ruins","a noble estate in decline","a mining settlement beneath red cliffs","a secluded academy","a frontier fort","a refugee camp that became a town","a fishing village threatened by storms"],
    goals: ["restore the family reputation","find a missing sibling","repay an impossible debt","map an uncharted ruin","protect a threatened community","recover a stolen relic","break a dangerous curse","expose a powerful fraud","prove a condemned ancestor innocent","master a dangerous gift","return a stolen heirloom","build a sanctuary for outcasts"],
    traits: ["careful and observant","boisterous but loyal","quietly compassionate","suspicious of strangers","curious to a fault","dry-witted and practical","formal and exacting","recklessly generous","patient until provoked","charming but evasive","methodical under pressure","fearlessly honest"],
    secrets: ["once served the enemy","carries a falsified identity","knows the location of a forbidden vault","is protecting the real culprit","owes a favor to a thieves guild","is heir to a forgotten title","possesses a dangerous map","receives letters from someone believed dead","is bound by an old magical oath","stole the object everyone is seeking"],
    fears: ["being forgotten","failing those who depend on them","deep water","losing control of their power","public disgrace","undead creatures","being trapped underground","betrayal by a close ally","returning to their birthplace","the cost of an old promise"],
    flaws: ["cannot walk away from a challenge","trusts charm too easily","keeps dangerous secrets","mistakes stubbornness for courage","holds grudges","overplans simple problems","refuses help until too late","is distracted by mysteries","judges others too quickly","values victory over diplomacy"],
    objectives: ["recover a relic before a rival faction","escort a scholar through dangerous territory","investigate disappearances near an abandoned shrine","break a curse afflicting a local family","rescue captives from a hidden stronghold","deliver a sealed object without opening it","identify what is poisoning the water supply","negotiate peace between feuding settlements","stop a ritual before the next full moon","locate a missing expedition","close a portal beneath a public building","track a creature that leaves no footprints"],
    locations: ["a flooded dwarven mine","a ruined hilltop observatory","catacombs beneath the market district","a forest where paths change overnight","a fortress trapped in permanent winter","an abandoned coastal village","a buried temple beneath farmland","a manor surrounded by unnatural fog","a volcanic cavern filled with glass","a lighthouse whose flame has turned black"],
    villains: ["a disgraced knight","a patient necromancer","a shapechanging spy","a merchant prince with hired blades","a cult leader claiming divine authority","an exiled mage","a corrupted forest guardian","an ambitious crime boss","a scholar possessed by an artifact","a monster that remembers every victim"],
    complications: ["the patron withheld a crucial fact","the apparent villain is protecting someone","another party has the same objective","the reward is stolen before payment","the location is slowly collapsing","a trusted guide changes sides","the law considers the party trespassers","success will anger a powerful faction","the relic chooses its own bearer","the deadline is earlier than claimed"],
    rewards: ["gold and a land grant","a rare enchanted weapon","access to a restricted library","a favor from a noble house","ownership of a small property","a map to another lost site","a magical charm with one charge","guild membership and safe lodging","forgiven debts and public recognition","a trained unusual mount"],
    placeAdjectives: ["Golden","Silver","Crowned","Wandering","Old","Painted","Restless","Moonlit","Laughing","Copper"],
    places: {
      Tavern: { nouns:["Cask","Tankard","Boar","Griffin","Fox"], specialties:["spiced ale and hot stew","music every market night","a private card room","regional drinks","a notorious eating challenge"], workers:["Bartender","Cook","Server"] },
      Inn: { nouns:["Lantern","Pillow","Traveler","Hearth","Waystone"], specialties:["safe rooms and hot baths","stabling with every room","an early breakfast","secure storage","guides for hire"], workers:["Innkeeper","Cook","Stablehand"] },
      Blacksmith: { nouns:["Anvil","Hammer","Forge","Coal","Bellows"], specialties:["custom weapons","armor repair","monster-part commissions","ceremonial blades","rush repairs"], workers:["Master smith","Apprentice","Metalworker"] },
      "Magic Shop": { nouns:["Rune","Star","Orb","Wand","Comet"], specialties:["spell components","minor enchanted objects","arcane identification","warding services","rare inks"], workers:["Arcanist","Apprentice mage","Clerk"] },
      Apothecary: { nouns:["Mortar","Herb","Briar","Vial","Thistle"], specialties:["healing draughts","rare herbs","antidotes","sleeping tonics","field remedies"], workers:["Apothecary","Herbalist","Gatherer"] },
      Bookshop: { nouns:["Quill","Tome","Page","Sage","Archive"], specialties:["rare maps","used spellbooks","local histories","translation services","private collections"], workers:["Bookseller","Scribe","Binder"] },
      Temple: { nouns:["Dawn","Bell","Flame","Mercy","Sanctuary"], specialties:["blessings and healing","sanctuary","religious records","funeral rites","pilgrim supplies"], workers:["Priest","Acolyte","Healer"] },
      Stable: { nouns:["Horseshoe","Saddle","Mare","Rein","Stallion"], specialties:["fresh mounts","animal boarding","carriage repair","messenger service","trained pack animals"], workers:["Stablemaster","Groom","Driver"] }
    },
    partyA: ["Ashen","Broken","Crimson","Emerald","Golden","Last","Silent","Silver","Stormbound","Wandering","Dawnward","Iron","Hidden","Unbroken","Wayward"],
    partyN: ["Arrows","Banners","Blades","Compasses","Crowns","Griffons","Lanterns","Ravens","Shields","Stars","Wolves","Sentinels","Seekers","Oathkeepers","Wayfinders"],
    mottos: ["No road untraveled.","Together against the dark.","Fortune favors the prepared.","By oath and iron.","We return with the answer.","None are left behind.","Truth before comfort.","Courage carries the day."],
    weaponTypes: ["Dagger","Longsword","Greatsword","Rapier","Warhammer","Battleaxe","Halberd","Spear","Shortbow","Longbow","Crossbow","Quarterstaff","Whip","Trident"],
    weaponNames: {
      Dagger:["Needle","Fang","Whisper","Thorn"], Longsword:["Oathblade","Kingsedge","Brightsteel","Dawnbite"], Greatsword:["Colossus","Titanfall","Doomcleaver","Warbrand"], Rapier:["Silverwit","Quickthorn","Duelists Grace","Viper"], Warhammer:["Stonefall","Oathbreaker","Thunderhead","Anvils Answer"], Battleaxe:["Skullsplitter","Red Crescent","Timberfall","Warhowl"], Halberd:["Gatekeeper","Long Reach","Sentinel","Crows Beak"], Spear:["Farpoint","Sky-Piercer","First Charge","Boars End"], Shortbow:["Quickstring","Hawkeye","Brushrunner","Swiftbranch"], Longbow:["Farshot","Eagles Reach","Greenwind","Cloudpiercer"], Crossbow:["Last Word","Boltbringer","Iron Click","Watchmans Rest"], Quarterstaff:["Wayfarer","Old Root","Pilgrims Guard","Oakwise"], Whip:["Serpents Kiss","Crackling Vine","Scorpion","Long Memory"], Trident:["Tidecaller","Sea Kings Due","Stormfork","Deepwater"]
    },
    rarities: ["Common","Uncommon","Rare","Very Rare","Legendary"],
    materials: ["Iron","Steel","Dwarven","Elven","Orcish","Glass","Ebony","Daedric","Dragonbone"],
    effects: ["deals extra radiant damage to undead","returns to its wielder when thrown","casts a protective ward once each day","grants advantage on initiative","creates thunder on a critical hit","marks a struck enemy with pale fire","stores one spell of 3rd level or lower","emits bright light on command","deals extra frost damage","warns of hidden creatures","cuts through nonmagical restraints","briefly silences a struck spellcaster"],
    itemForms: ["Amulet","Belt","Boots","Bottle","Bracelet","Brooch","Cape","Circlet","Coin","Crown","Gloves","Lantern","Mask","Mirror","Orb","Pendant","Quill","Satchel","Tome","Totem"],
    appearances: ["etched with interlocking silver runes","made from dark wood with brass fittings","wrapped in faded blue silk","shaped like a sleeping dragon","inlaid with cloudy green crystal","decorated with stars that shift position","carved from ivory-colored stone","polished so it never gathers dust"],
    powers: ["reveals invisible writing","creates a small extradimensional space","allows brief speech with animals","protects against extreme temperatures","changes color near poison","casts a convincing minor illusion","restores vitality once per day","allows underwater breathing","points toward the nearest shelter","records nearby sound","repairs one mundane object each dawn","produces food for one person each day"],
    drawbacks: ["attracts moths after sunset","speaks in its creators voice","becomes cold whenever used","must be complimented before functioning","leaves a faint glittering trail","causes dreams of an unknown city","works only while unobserved","changes the bearers hair color","refuses anyone who breaks a promise","quietly counts each use aloud"]
  };

  const generatorMap = { dnd:["Character Name","Backstory","Quest","Place","Party Name","NPC","Weapon","Magic Item"], skyrim:["Character Name","Weapon"] };
  let game = "dnd";
  let generator = "Character Name";
  let result = {};
  let seedText = "";

  function raceName(race, system="dnd") {
    const table = system === "dnd" ? DATA.dndNames : DATA.skyrimNames;
    const pair = table[race];
    return `${pick(pair[0])} ${pick(pair[1])}`;
  }

  function transformedName(system, seed, race, style) {
    if (!seed.trim()) return raceName(race, system);
    const table = system === "dnd" ? DATA.dndNames : DATA.skyrimNames;
    const flavor = pick(table[race][0]);
    const surname = pick(table[race][1]);
    const words = seed.trim().split(/\s+/);
    return words.map((word,index) => {
      const size = style === "Short" ? 3 : style === "Epic" ? 5 : 4;
      return index === 0 ? `${flavor.slice(0,3)}${word.slice(0,size)}` : `${word.slice(0,size)}${surname.slice(-3)}`;
    }).join(" ");
  }

  function currentRaces(){ return game === "dnd" ? DATA.dndRaces : DATA.skyrimRaces; }
  function currentRoles(){ return game === "dnd" ? DATA.classes : DATA.archetypes; }
  function roleLabel(){ return game === "dnd" ? "Class" : "Archetype"; }

  function buildControls() {
    const box = byId("controls");
    if (generator === "Character Name") {
      box.innerHTML = `<label class="field wide"><span>Original name / random seed</span><input id="seedInput" value="${seedText}"></label><label class="field"><span>Race</span><select id="raceInput">${options(currentRaces())}</select></label><label class="field"><span>${roleLabel()}</span><select id="roleInput">${options(currentRoles())}</select></label><label class="field"><span>Style</span><select id="styleInput">${options(DATA.styles)}</select></label><div class="checks"><label><input id="randomRace" type="checkbox"> Random race</label><label><input id="randomRole" type="checkbox"> Random ${roleLabel().toLowerCase()}</label></div>`;
    } else if (generator === "Backstory" || generator === "NPC") {
      box.innerHTML = `<label class="field"><span>Race</span><select id="raceInput"><option>Random</option>${options(DATA.dndRaces)}</select></label><label class="field"><span>Class</span><select id="classInput"><option>Random</option>${options(DATA.classes)}</select></label>`;
    } else if (generator === "Place") {
      box.innerHTML = `<label class="field"><span>Place type</span><select id="placeType">${options(Object.keys(DATA.places))}</select></label><label class="field"><span>Total staff</span><select id="staffCount">${options([1,2,3,4])}</select></label>`;
    } else if (generator === "Weapon") {
      box.innerHTML = `<label class="field"><span>Weapon type</span><select id="weaponType"><option>Random</option>${options(DATA.weaponTypes)}</select></label>`;
    } else box.innerHTML = "";
  }

  function selected(id, list) {
    const el = byId(id);
    return !el || el.value === "Random" ? pick(list) : el.value;
  }

  function generateAll() {
    if (generator === "Character Name") {
      const seedInput = byId("seedInput");
      seedText = seedInput.value.trim() || seedText;
      const race = byId("randomRace").checked ? pick(currentRaces()) : byId("raceInput").value;
      const role = byId("randomRole").checked ? pick(currentRoles()) : byId("roleInput").value;
      const style = byId("styleInput").value;
      result = { Name: transformedName(game,seedText,race,style), Seed: seedText || "Race-generated", Race: race, [roleLabel()]: role, Style: style };
    } else if (generator === "Backstory") {
      const race = selected("raceInput", DATA.dndRaces);
      result = { Name:raceName(race), Race:race, Class:selected("classInput",DATA.classes), Origin:pick(DATA.origins), Goal:pick(DATA.goals), Trait:pick(DATA.traits), Secret:pick(DATA.secrets), Fear:pick(DATA.fears), Flaw:pick(DATA.flaws) };
    } else if (generator === "NPC") {
      const race = selected("raceInput", DATA.dndRaces);
      result = { Name:raceName(race), Race:race, Class:selected("classInput",DATA.classes), Level:String(Math.floor(Math.random()*15)+1), Profession:pick(["Guard","Merchant","Scholar","Artisan","Guide","Healer","Courier","Scribe","Hunter","Sailor"]), Trait:pick(DATA.traits), Origin:pick(DATA.origins), Goal:pick(DATA.goals), Secret:pick(DATA.secrets), Fear:pick(DATA.fears), Flaw:pick(DATA.flaws) };
    } else if (generator === "Quest") {
      result = { Name:`The ${pick(DATA.partyA)} ${pick(["Relic","Oath","Vault","Crown","Road","Shadow"])}`, Objective:pick(DATA.objectives), Location:pick(DATA.locations), Villain:pick(DATA.villains), Complication:pick(DATA.complications), Reward:pick(DATA.rewards), "Quest giver":raceName(pick(DATA.dndRaces)) };
    } else if (generator === "Place") {
      const type = byId("placeType").value;
      const data = DATA.places[type];
      const staff = Number(byId("staffCount").value);
      result = { Name:`The ${pick(DATA.placeAdjectives)} ${pick(data.nouns)}`, Type:type, Specialty:pick(data.specialties), Atmosphere:pick(["warm and welcoming","orderly and expensive","crowded with travelers","quiet and discreet","bright and chaotic","favored by locals","tense but professional","old-fashioned and trusted"]), Rumor:pick(DATA.secrets), Owner:`${raceName(pick(DATA.dndRaces))} • ${data.workers[0]}`, Workers:Array.from({length:Math.max(0,staff-1)},(_,i)=>`${raceName(pick(DATA.dndRaces))} • ${data.workers[(i+1)%data.workers.length]}`).join("\n") || "None" };
    } else if (generator === "Party Name") {
      result = { Name:`The ${pick(DATA.partyA)} ${pick(DATA.partyN)}`, Type:pick(["Adventuring Company","Mercenary Band","Holy Order","Exploration Guild","Monster Hunters","Rebel Cell","Mage Circle","Treasure Seekers"]), Motto:pick(DATA.mottos), Reputation:pick(["Reliable professionals","Fearless but destructive","Famous negotiators","Monster specialists","Lucky survivors","Discreet problem-solvers","Protectors of common folk","Scholars with swords"]) };
    } else if (generator === "Weapon") {
      const type = selected("weaponType", DATA.weaponTypes);
      result = { Name:pick(DATA.weaponNames[type]), Type:type, [game === "skyrim" ? "Material" : "Rarity"]:pick(game === "skyrim" ? DATA.materials : DATA.rarities), Effect:pick(DATA.effects), Quirk:pick(DATA.traits), History:pick(DATA.origins) };
    } else {
      result = { Name:`${pick(DATA.placeAdjectives)} ${pick(DATA.itemForms)}`, Category:pick(["Wondrous Item","Ring","Wand","Armor","Tool","Potion","Scroll","Charm","Instrument"]), Rarity:pick(DATA.rarities), Appearance:pick(DATA.appearances), Power:pick(DATA.powers), Drawback:pick(DATA.drawbacks), Origin:pick(DATA.origins) };
    }
    render();
  }

  function rerollField(key) {
    if (generator === "Character Name") {
      if (key === "Seed") seedText = `${pick(DATA.dndNames.Human[0])} ${pick(DATA.dndNames.Human[1])}`;
      if (key === "Race") result.Race = pick(currentRaces());
      if (key === "Class") result.Class = pick(DATA.classes);
      if (key === "Archetype") result.Archetype = pick(DATA.archetypes);
      result.Seed = seedText || "Race-generated";
      result.Name = transformedName(game,seedText,result.Race,result.Style);
    } else {
      const previous = {...result};
      generateAll();
      const fresh = result;
      result = previous;
      result[key] = fresh[key];
      if ((generator === "Backstory" || generator === "NPC") && key === "Race") result.Name = raceName(result.Race);
      if ((generator === "Backstory" || generator === "NPC") && key === "Name") result.Name = raceName(result.Race);
      if (generator === "Weapon" && key === "Type") result.Name = pick(DATA.weaponNames[result.Type]);
      if (generator === "Weapon" && key === "Name") result.Name = pick(DATA.weaponNames[result.Type]);
    }
    render();
  }

  function resultText(){ return [byId("resultTitle").textContent,...Object.entries(result).map(([k,v])=>`\n${k.toUpperCase()}\n${v}`)].join("\n"); }
  function storageKey(){ return `forge:${game}:${generator}`; }
  function saved(){ try{return JSON.parse(localStorage.getItem(storageKey())||"[]")}catch{return[]} }

  function renderFavorites(){
    const list = saved();
    byId("favoritesList").innerHTML = list.map((item,index)=>`<li class="favorite-item"><pre>${item}</pre><button class="remove" data-remove="${index}">Remove</button></li>`).join("");
    byId("emptyFavorites").hidden = list.length > 0;
    document.querySelectorAll("[data-remove]").forEach(button=>button.addEventListener("click",()=>{const current=saved();current.splice(Number(button.dataset.remove),1);localStorage.setItem(storageKey(),JSON.stringify(current));renderFavorites();}));
  }

  function render(){
    byId("resultTitle").textContent = result.Name || generator;
    byId("resultFields").innerHTML = Object.entries(result).map(([key,value])=>`<div class="result-field ${String(value).length>65?"full":""}"><span class="result-label">${key}</span><div class="result-value">${value}</div>${key==="Style"?"":`<button class="reroll" type="button" data-key="${key}">↻</button>`}</div>`).join("");
    document.querySelectorAll("[data-key]").forEach(button=>button.addEventListener("click",()=>rerollField(button.dataset.key)));
    renderFavorites();
  }

  function populateGenerators(){
    byId("generatorType").innerHTML = options(generatorMap[game]);
    generator = generatorMap[game][0];
    buildControls();
    generateAll();
  }

  document.querySelectorAll(".tab").forEach(button=>button.addEventListener("click",()=>{
    game = button.dataset.game;
    document.querySelectorAll(".tab").forEach(tab=>tab.classList.toggle("active",tab===button));
    populateGenerators();
  }));
  byId("generatorType").addEventListener("change",()=>{generator=byId("generatorType").value;buildControls();generateAll();});
  byId("generateAll").addEventListener("click",generateAll);
  byId("copyButton").addEventListener("click",async()=>navigator.clipboard.writeText(resultText()));
  byId("favoriteButton").addEventListener("click",()=>{const list=saved(),text=resultText();if(!list.includes(text))list.unshift(text);localStorage.setItem(storageKey(),JSON.stringify(list.slice(0,30)));renderFavorites();});
  byId("clearFavorites").addEventListener("click",()=>{localStorage.removeItem(storageKey());renderFavorites();});

  populateGenerators();
});
