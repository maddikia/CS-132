/**
 * CS 132
 * CP 2: Harry Potter Typing Test
 * 
 * Client-side JS for the HP typing test game.
 */

(function() {
    "use strict";

    let timerId = null;
    let secondsElapsed = 0;

    const TIMER_DELAY = 1000;

    const TEXT_SHORT = [
        '"Funny stuff on the news," Mr. Dursley mumbled. "Owls... shooting stars... and there were a lot of funny-looking people in town today..."',
        '"You\'re saying it wrong," Harry heard Hermione snap. "It\'s Wing-gar-dium Levi-o-sa, make the \'gar\' nice and long."',
        '"HAVE YOU GONE MAD?" Ron bellowed. "ARE YOU A WITCH OR NOT?"',
    ]

    const TEXT_LONG = [
        "Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you'd expect to be involved in anything strange or mysterious, because they just didn't hold with such nonsense.",
        '"Yes, thirteen-and-a-half inches. Yew. Curious indeed how these things happen. The wand chooses the wizard, remember.... I think we must expect great things from you, Mr. Potter.... After all, He-Who-Must-Not-Be-Named did great things -- terrible, yes, but great."',
        '"Severus?" Quirrell laughed, and it wasn\'t his usual quivering treble, either, but cold and sharp. "Yes, Severus does seem the type, doesn\'t he? So useful to have him swooping around like an overgrown bat. Next to him, who would suspect p-p-poor, st-stuttering P-Professor Quirrell?"'
    ]

    const HOUSES = ['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin']

    /**
     * Initializes listeners for the page.
     */
    function init() {
        qs('#start-btn').addEventListener('click', startTypingTest);
        qs('#reset-btn').addEventListener('click', reset);
        qs('#gen-btn').addEventListener('click', addHouseCrest);
        qs('#input').addEventListener('input', verifyText);

        let lengthBtns = qsa('#length-opt button');
        for (let i = 0; i < lengthBtns.length; i++) {
            lengthBtns[i].addEventListener('click', toggleLength);
        }

        qs('#input').disabled = true;
    }

    /**
     * Toggles between text length options.
     * NOTE: This is similar to something I wrote for HW2. 
     */
    function toggleLength() {
        let curr = qs('#length-opt button.selected');
        curr.classList.remove('selected');
        this.classList.add('selected');
    }

    /**
     * Initializes the game.
     */
    function startTypingTest() {
        let length = qs('#length-opt button.selected');
        let textArray = length.value === 'easy' ? TEXT_SHORT : TEXT_LONG; 
        let text = textArray[Math.floor(Math.random() * textArray.length)];
        qs('#quote').textContent = text;

        qs('#input').value = '';
        qs('#input').disabled = false;

        qs('#start-btn').classList.toggle('hidden');
        qs('#reset-btn').classList.toggle('hidden');
        qs('#result').classList.add('hidden');

        timerId = setInterval(advanceTimer, TIMER_DELAY);
        secondsElapsed = 0;
    }

    /**
     * Advances the timer by one second.
     */
    function advanceTimer() {
        secondsElapsed++;
    }

    /**
     * Resets the game.
     */
    function reset() {
        qs('#input').disabled = true;
        qs('#quote').textContent = '';
        qs('#start-btn').classList.toggle('hidden');
        qs('#reset-btn').classList.toggle('hidden');

        clearInterval(timerId);
        timerId = null;
    }

    /**
     * Verifies the user's input against the quote.
     */
    function verifyText() {
        let input = qs('#input').value;
        let quote = qs('#quote').textContent;

        if (input === quote) {
            reset();

            let numWords = quote.split(' ').length;
            let wpm = Math.round(numWords / (secondsElapsed / 60));
            let result = qs('#result');
            result.textContent = `You achieved 100% accuracy with a WPM of ${wpm}!`;
            result.classList.remove('hidden');
        }
    }

    /**
     * Adds a random house crest the page.
     * To be honest, I added this to get appendChild in there. 
     */
    function addHouseCrest() {
        let house = HOUSES[Math.floor(Math.random() * HOUSES.length)];
        let img = gen('img');
        img.src = `imgs/${house}.png`;
        qs('#gen-crests').appendChild(img);
    }

    init();

})();