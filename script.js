const creatureWrap = document.getElementById('creature-wrap');
const creatureID = document.getElementById('creature-id');
const creatureName = document.getElementById('creature-name');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

const hideCreature = () => {
    if (!(creatureWrap.classList.contains('hidden'))) {
        creatureWrap.classList.add('hidden');
    }
}

const showCreature = () => {
    if (creatureWrap.classList.contains('hidden')) {
        creatureWrap.classList.remove('hidden');
    }
}

const setDisplay = (creature = undefined) => {
    types.innerHTML = "";
    if (!creature) {
        creatureName.textContent = "";
        creatureID.textContent = "";
        weight.textContent = "";
        height.textContent = "";
        hp.textContent = "";
        attack.textContent = "";
        defense.textContent = "";
        specialAttack.textContent = "";
        specialDefense.textContent = "";
        speed.textContent = "";
        hideCreature();
    }
    else {
        creatureName.textContent = `${creature.name.toUpperCase()}`;
        creatureID.textContent = `#${creature.id}`;
        weight.textContent = `${creature.weight}`;
        height.textContent = `${creature.height}`;
        hp.textContent = creature.stats[0].base_stat;
        attack.textContent = creature.stats[1].base_stat;
        defense.textContent = creature.stats[2].base_stat;
        specialAttack.textContent = creature.stats[3].base_stat;
        specialDefense.textContent = creature.stats[4].base_stat;
        speed.textContent = creature.stats[5].base_stat;
        creature.types.forEach((type) => {
            types.innerHTML += `<span class=${type.name}>${type.name.toUpperCase()}</span>`
        })
        showCreature();
    }
}

const getCreature = async () => {
    try {
        const nameOrId = searchInput.value.toLowerCase();
        const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${nameOrId}`);
        const creature = await response.json();
        setDisplay(creature);
    } catch (e) {
        setDisplay();
        alert('Creature not found');
        console.log(e);
    }
}

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')
        getCreature();
})

searchButton.addEventListener('click', getCreature);