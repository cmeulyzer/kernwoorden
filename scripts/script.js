// var allwords = ["aap", "aar", "baan", "baas", "been", "beer", "beet", "ben", "bes", "boom", "boon", "boor", "boos", "boot", "een", "eet", "en", "in", "is", "maar", "maat", "mee", "meen", "meer", "mees", "meet", "mep", "mes", "met", "min", "mis", "naam", "naar", "nee", "neem", "neer", "net", "noot", "oom", "oor", "paar", "peen", "peer", "pen", "pet", "pim", "pit", "poot", "raam", "raap", "raar", "ree", "reep", "rem", "room", "roos", "saar", "sim", "sis", "teen", "vaar", "vaar", "vaas", "vaat", "veer", "ven", "ver", "vet", "vin", "vis", "voor"];
var kern1 = ["aan", "aap", "aar", "en", "is", "maan", "maar", "mep", "mes", "mis", "paar", "pen", "raam", "raap", "raar", "rem", "saar", "sim", "sis", "vaar", "vaas", "ver", "vis"];
var kern2 = ["aan", "aap", "aas", "baan", "baas", "been", "beer", "beet", "ben", "bes", "boom", "boon", "boor", "boos", "boot", "een", "eet", "en", "in", "is", "maan", "maar", "maat", "mee", "meen", "meer", "mees", "meet", "men", "mes", "met", "min", "mis", "naam", "naar", "nee", "neem", "neer", "net", "noot", "oom", "oor", "paar", "peen", "peer", "pen", "pet", "pim", "pin", "pit", "poot", "raam", "raap", "raar", "ree", "reep", "rem", "ren", "room", "roos", "saar", "sim", "sis", "teen", "tim", "tin", "tip", "toos", "vaar", "vaas", "vaat", "vee", "veer", "ven", "ver", "vet", "vin", "vis", "voor"];
var kern3 = ["aan", "baan", "baas", "beek", "been", "beer", "beet", "bek", "ben", "bes", "bij", "bijt", "boe", "boek", "boem", "boen", "boer", "boon", "boor", "boos", "boot", "daan", "daar", "den", "dijk", "dik", "dit", "doe", "doek", "doen", "does", "doet", "door", "doos", "en", "ik", "kaak", "kaas", "keer", "kijk", "kin", "kip", "koe", "koek", "koen", "kook", "koop", "maak", "maan", "maar", "maat", "men", "mes", "met", "mij", "mijn", "mis", "moe", "moek", "moer", "moes", "moet", "naam", "naar", "oor", "pen", "pet", "pijn", "pijp", "pin", "pit", "poen", "poos", "poot", "raak", "raam", "raap", "raar", "reep", "rek", "rem", "ren", "rij", "rijk", "rijm", "rijp", "rik", "rit", "roe", "roep", "roer", "roet", "rook", "room", "roos", "soep", "tik", "toe", "toos", "vaar", "vaat", "veer", "ver", "vet", "voer", "voet", "voor", "zaak", "zee", "zeem", "zeep", "zeer", "zes", "zet", "zij", "zijn", "zin", "zit", "zoek", "zoem", "zoen", "zoet", "zoon"];

var words = [];
var currentIndex = -1;
var score = 0;
var incorrect = false;
var mistakes = [];

updateWords();

function evaluate(element) {
    var answer = element.getAttribute("id");
    if (answer === words[currentIndex]) {
        if (incorrect === false) {
            score++;
        }
        element.src = "images/correct.png";
        setTimeout(setQuestion, 600);
    } else {
        incorrect = true;
        element.src = "images/wrong.png";
        mistakes.push(words[currentIndex]);
    }
}

function setQuestion() {
    if (currentIndex !== -1) {
        document.querySelector("form").style.display = "none";
    } else {
        document.querySelector("form").style.display = "inline";
    }
    UpdateProgress();
    incorrect = false;
    // Resetting the figure element
    document.querySelector("#answerImages").remove();
    document.getElementById("readWord").innerText = "";
    var figureEl = document.createElement("figure");
    figureEl.id = "answerImages";
    document.getElementById("answers").appendChild(figureEl);
    // Showing the word to be read
    currentIndex++;
    if (currentIndex >= words.length) {
        showResult();
        return;
    }
    document.getElementById("readWord").innerText = words[currentIndex];

    // Displaying 4 possible answers / images
    var images = [words[currentIndex]];
    for (var i = 0; i < 3; i++) {
        // Adding a word to images
        var randomItem = words[Math.floor(Math.random() * words.length)];
        var randomItemIsInImages = images.indexOf(randomItem) !== -1;
        while (randomItemIsInImages) {
            randomItem = words[Math.floor(Math.random() * words.length)];
            randomItemIsInImages = images.indexOf(randomItem) !== -1;
        }
        images.push(randomItem);
    }
    images.sort(function () { return 0.5 - Math.random() });

    for (var i = 0; i < 4; i++) {
        var newImg = document.createElement("img");
        newImg.height = 250;
        newImg.alt = "Foto van een " + images[i];
        newImg.src = "images/kern/" + images[i] + ".jpg";
        newImg.id = images[i];
        document.getElementById("answerImages").appendChild(newImg);
        newImg.addEventListener("click", function () { evaluate(this); });
    }
}

function showResult() {
    RemoveProgress();
    AddResetLink();
    document.querySelector("#readWord").innerHTML
        = "Resultaat : " + score + " / " + words.length
        + " = " + score / words.length * 100 + "%";
    document.querySelector("#reset").addEventListener("click", resetTest);
    document.querySelector("#reset").style.visibility = "visible";
    document.querySelector("h2").remove();

    // Toon fouten
    for (var key in mistakes) {
        if (mistakes.hasOwnProperty(key)) {
            var element = mistakes[key];
            var mistakeLi = document.createElement("li");
            mistakeLi.innerText = element;
            document.querySelector("#fouten ol").appendChild(mistakeLi);
        }
    }

    document.getElementById("fouten").style.display = "block";

}

function resetTest() {
    var instructions = document.createElement("h2");
    instructions.innerText = "Kies de tekening die het best bij het woord past.";
    var art = document.querySelector("article");
    art.insertBefore(instructions, art.childNodes[2]);

    document.querySelector("#reset").style.visibility = "hidden";
    words.sort(function () { return 0.5 - Math.random() });
    currentIndex = -1;
    score = 0;

    // div and remove mistakes from list
    var listToClear = document.querySelectorAll("#fouten li");
    listToClear.forEach(function (element) {
        element.remove();
        console.log(element);
    }, this);
    // Hide mistakes 
    document.getElementById("fouten").style.display = "none";
    // Remove mistakes from array
    mistakes = [];

    setQuestion();
}

// Update progress icons (after answering a question)
function UpdateProgress() {
    if (currentIndex === -1) {
        if (document.getElementById("progress") !== null) {
            document.getElementById("progress").remove();
        }
        var progressfigure = document.createElement("figure");
        progressfigure.id = "progress";
        document.querySelector("article").insertBefore(progressfigure, document.querySelector("footer"));

        for (var i = 0; i < words.length; i++) {
            var icon = document.createElement("img");
            icon.src = "./images/undefined.png";
            icon.height = 40;
            document.querySelector("#progress").appendChild(icon);
        }
    } else {
        var icons = document.querySelectorAll("#progress img");
        for (var i = 0; i < icons.length; i++) {
            if (i === currentIndex) {
                if (incorrect === false) {
                    icons[i].src = "./images/correct.png";
                } else {
                    icons[i].src = "./images/wrong.png";
                }
            }
        }
    }
}

function RemoveProgress() {
    document.querySelector("#progress").remove();
}

function AddResetLink() {
    var resetLink = document.createElement("div");
    resetLink.id = "reset";
    document.querySelector("article").insertBefore(resetLink, document.querySelector("footer"));
    var resetSpan = document.createElement("span");
    resetSpan.innerText = "Opnieuw proberen";
    resetLink.appendChild(resetSpan);
}

function removeCheckboxes() {
    document.querySelector("form").style.display = "none";
}

function updateWords() {
    words = [];
    currentIndex = -1;
    var k1Selected = document.getElementById("kern1").checked;
    var k2Selected = document.getElementById("kern2").checked;
    var k3Selected = document.getElementById("kern3").checked;

    if (k1Selected || k2Selected || k3Selected) {
        if (k1Selected) {
            words = words.concat(kern1);
        }
        if (k2Selected) {
            words = words.concat(kern2);
        }
        if (k3Selected) {
            words = words.concat(kern3);
        }
    } else {
        alert("Minstens één kern aanduiden aub");
        document.getElementById("kern1").checked = true;
        document.getElementById("kern2").checked = true;
        document.getElementById("kern3").checked = true;
        updateWords();
    }
    words = removeDuplicates(words);
    words.sort(function () { return 0.5 - Math.random() });
    currentIndex = -1;
    logWordsLenght();
    setQuestion();
}

function removeDuplicates(duplicatesArr) {
    var noDuplicatesArr = [];
    for (var i = 0; i < duplicatesArr.length; i++) {
        if (noDuplicatesArr.indexOf(duplicatesArr[i]) === -1) {
            noDuplicatesArr.push(duplicatesArr[i]);
        }
    }
    return noDuplicatesArr;
}

function logWordsLenght() {
    console.log("k1: " + kern1.length);
    console.log("k2: " + kern2.length);
    console.log("k3: " + kern3.length);
    console.log("words: " + words.length);
}