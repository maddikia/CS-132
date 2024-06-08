/**
 * CS 132
 * CP 3: D&D Character Building: Race Selection Tool
 * 
 * Client-side JS for the Dungeons & Dragons race information tool. 
 */

(function() {
    "use strict";

    const BASE_URL = "https://www.dnd5eapi.co/api/";

    /**
     * Initializes the page.
     */
    function init() {
        // Pre-load the first race info and add event listener
        qs('#race').addEventListener('change', getRaceInfo);
        getRaceInfo();
    }

    /**
     * Fetches race info from the D&D 5e API.
     */
    function getRaceInfo() {
        let race = qs('#race').value;
        let url = `${BASE_URL}races/${race}`;
        fetch(url)
            .then(checkStatus)
            .then(response => response.json())
            .then(makeRaceCard)
            .catch(handleError);
    }

    /**
     * Makes and displays an information card for the provided D&D race.
     * @param {JSON} data - JSON representation of a D&D race
     */
    function makeRaceCard(data) {
        let card = gen('div');
        card.id = 'card';

        let name = gen('h2');
        name.textContent = data.name;
        card.appendChild(name);

        let abilityBonuses = gen('p');
        let bonusStr = data.ability_bonuses
                           .map(bonus => `${bonus.ability_score.name} +${bonus.bonus}`)
                           .join(', ');
        abilityBonuses.textContent = `Ability Bonuses: ${bonusStr}`;
        card.appendChild(abilityBonuses);

        let lang = gen('p');
        let langStr = data.languages.map(lang => lang.name).join(', ');
        lang.textContent = `Languages: ${langStr}`;
        card.appendChild(lang);

        let basicInfo = gen('p');
        let infoText = `Speed: ${data.speed} • Size: ${data.size}`;
        basicInfo.textContent = infoText;
        card.appendChild(basicInfo);

        let profStr = data.starting_proficiencies.map(prof => prof.name).join(', ');
        if (profStr) { // Some races don't have starting proficiencies
            let profs = gen('p');
            profs.textContent = `Starting Proficiencies: ${profStr}`;
            card.appendChild(profs);
        }

        let alignment = gen('p');
        alignment.textContent = data.alignment;
        card.appendChild(alignment);

        // Add or replace the card 
        let oldCard = qs('#card');
        if (oldCard) {
            qs('#race-information').replaceChild(card, oldCard);
        } else {
            qs('#race-information').appendChild(card);
        }
    }

    /**
     * Handles errors when fetching race info.
     */
    function handleError(err) {
        let errorCard = gen('p');
        errorCard.id = 'card';
        errorCard.textContent = 'Error getting race info. Please try again later.';
        
        // Add or replace the card (to make sure this can be replaced)
        let oldCard = qs('#card');
        if (oldCard) {
            qs('#race-information').replaceChild(errorCard, oldCard);
        } else {
            qs('#race-information').appendChild(errorCard);
        }
    }

    /**
     * Checks the status of a response. Used for every fetch call.
     */
    function checkStatus(response) {
        if (!response.ok) {
        throw Error("Error in request: " + response.statusText);
        }
        return response; // a Response object
    }

    init();

})();