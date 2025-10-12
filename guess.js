
const tracks = [
    { name: "Enter Pharloom", url: "music/enterpharloom.mp3" },
    { name: "Moss Grotto", url: "music/mossgrotto.mp3" },
    { name: "Strive", url: "music/strive.mp3" },
    { name: "Bone Bottom", url: "music/bonebottom.mp3" },
    { name: "The Marrow",  url: "music/marrow.mp3" },
    { name: "Bell Beast",  url: "music/bellbeast.mp3" },
    { name: "Repose",  url: "music/repose.mp3" },
    { name: "Deep Docks",  url: "music/deepdocks.mp3" },
    { name: "Lace",  url: "music/lace.mp3" },
    { name: "Far Fields",  url: "music/farfields.mp3" },
    { name: "Fourth Chorus",  url: "music/fourthchorus.mp3" },
    { name: "Greymoor",  url: "music/greymoor.mp3" },
    { name: "Incisive Battle",  url: "music/ibattle.mp3" },
    { name: "Bellhart",  url: "music/bellhart.mp3" },
    { name: "Widow",  url: "music/widow.mp3" },
    { name: "Shellwood",  url: "music/shellwood.mp3" },
    { name: "Sister Splinter",  url: "music/splinter.mp3" },
    { name: "Hunter's Trail",  url: "music/trail.mp3" },
    { name: "Sinner's Road",  url: "music/sroad.mp3" },
    { name: "Cut Through",  url: "music/cut.mp3" },
    { name: "Bilewater",  url: "music/bilewater.mp3" },
    { name: "The Mist",  url: "music/mist.mp3" },
    { name: "Phantom",  url: "music/phantom.mp3" },
    { name: "The Slab",  url: "music/slab.mp3" },
    { name: "Red Maiden",  url: "music/maiden.mp3" },
    { name: "Mount Fay",  url: "music/fay.mp3" },
    { name: "Blasted Steps",  url: "music/steps.mp3" },
    { name: "Last Judge",  url: "music/lastjudge.mp3" },
    { name: "Underworks",  url: "music/underworks.mp3" },
    { name: "Choral Chambers",  url: "music/chambers.mp3" },
    { name: "Songclave",  url: "music/songclave.mp3" },
    { name: "Cogwork Dancers",  url: "music/dancers.mp3" },
    { name: "Cogwork Core",  url: "music/core.mp3" },
    { name: "Whispering Vaults",  url: "music/vaults.mp3" },
    { name: "Trobbio",  url: "music/trobbio.mp3" },
    { name: "High Halls",  url: "music/halls.mp3" },
    { name: "The Choir",  url: "music/choir.mp3" },
    { name: "Awakening",  url: "music/awakening.mp3" },
    { name: "Dark Descent",  url: "music/dark.mp3" },
    { name: "Reprieve",  url: "music/rep.mp3" },
    { name: "Nyleth", url: "music/nyleth.mp3"},
    { name: "Skarrsinger Karmelita",  url: "music/sk.mp3" },
    { name: "Sands of Karak",  url: "music/sok.mp3" },
    { name: "Crust King Khann",  url: "music/ckk.mp3" },
    { name: "Lost Verdania",  url: "music/lv.mp3" },
    { name: "Clover Dancers",  url: "music/cd.mp3" },
    { name: "Fleatopia",  url: "music/fleatopia.mp3" },
    { name: "Tormented Trobbio",  url: "music/tt.mp3" },
    { name: "Red Memory",  url: "music/rm.mp3" },
    { name: "Last Dive",  url: "music/ld.mp3" },
    { name: "Lost Lace",  url: "music/ll.mp3" },
    { name: "Sister of Void",  url: "music/sov.mp3" },
    { name: "Silksong",  url: "music/silksong.mp3" }
];


const audioPlayer = document.getElementById("audioPlayer");
const choicesDiv = document.getElementById("choices");
const resultDiv = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

let correctTrack = null;


function getRandomTrack() {
    return tracks[Math.floor(Math.random() * tracks.length)];
}


function generateChoices(correct) {
    const choices = [correct.name];
    while (choices.length < 4) {
        const random = getRandomTrack().name;
        if (!choices.includes(random)) {
            choices.push(random);
        }
    }
    
    return choices.sort(() => Math.random() - 0.5);
}


function loadNewTrack() {
    resultDiv.textContent = "";
    choicesDiv.innerHTML = "";

    
    correctTrack = getRandomTrack();

    
    audioPlayer.src = correctTrack.url;
    audioPlayer.play();

    
    const answerChoices = generateChoices(correctTrack);
    answerChoices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.onclick = () => checkAnswer(choice);
        choicesDiv.appendChild(btn);
    });
}


function checkAnswer(selected) {
    if (selected === correctTrack.name) {
        resultDiv.textContent = "Correct!";
    } else {
        resultDiv.textContent = `Wrong! The answer was: ${correctTrack.name}`;
    }
}


nextBtn.onclick = loadNewTrack;


loadNewTrack();
