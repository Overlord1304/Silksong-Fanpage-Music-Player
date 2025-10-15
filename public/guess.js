document.addEventListener("DOMContentLoaded", () => {
const themeBtn = document.getElementById("themeBtn");
let score = 0; 
const scoreDiv = document.getElementById("score");
const tracks = [
    { name: "Enter Pharloom", url: "public/music/enterpharloom.mp3" },
    { name: "Moss Grotto", url: "public/music/mossgrotto.mp3" },
    { name: "Strive", url: "public/music/strive.mp3" },
    { name: "Bone Bottom", url: "public/music/bonebottom.mp3" },
    { name: "The Marrow", url: "public/music/marrow.mp3" },
    { name: "Bell Beast", url: "public/music/bellbeast.mp3" },
    { name: "Repose", url: "public/music/repose.mp3" },
    { name: "Deep Docks", url: "/public/music/deepdocks.mp3" },
    { name: "Lace", url: "public/music/lace.mp3" },
    { name: "Far Fields", url: "public/music/farfields.mp3" },
    { name: "Fourth Chorus", url: "public/music/fourthchorus.mp3" },
    { name: "Greymoor", url: "public/music/greymoor.mp3" },
    { name: "Incisive Battle", url: "public/music/ibattle.mp3" },
    { name: "Bellhart", url: "public/music/bellhart.mp3" },
    { name: "Widow", url: "public/music/widow.mp3" },
    { name: "Shellwood", url: "public/music/shellwood.mp3" },
    { name: "Sister Splinter", url: "public/music/splinter.mp3" },
    { name: "Hunter's Trail", url: "public/music/trail.mp3" },
    { name: "Sinner's Road", url: "public/music/sroad.mp3" },
    { name: "Cut Through", url: "public/music/cut.mp3" },
    { name: "Bilewater", url: "public/music/bilewater.mp3" },
    { name: "The Mist", url: "public/music/mist.mp3" },
    { name: "Phantom", url: "public/music/phantom.mp3" },
    { name: "The Slab", url: "public/music/slab.mp3" },
    { name: "Red Maiden", url: "public/music/maiden.mp3" },
    { name: "Mount Fay", url: "public/music/fay.mp3" },
    { name: "Blasted Steps", url: "public/music/steps.mp3" },
    { name: "Last Judge", url: "public/music/lastjudge.mp3" },
    { name: "Underworks", url: "public/music/underworks.mp3" },
    { name: "Choral Chambers", url: "public/music/chambers.mp3" },
    { name: "Songclave", url: "public/music/songclave.mp3" },
    { name: "Cogwork Dancers", url: "public/music/dancers.mp3" },
    { name: "Cogwork Core", url: "public/music/core.mp3" },
    { name: "Whispering Vaults", url: "public/music/vaults.mp3" },
    { name: "Trobbio", url: "public/music/trobbio.mp3" },
    { name: "High Halls", url: "public/music/halls.mp3" },
    { name: "The Choir", url: "public/music/choir.mp3" },
    { name: "Awakening", url: "public/music/awakening.mp3" },
    { name: "Dark Descent", url: "public/music/dark.mp3" },
    { name: "Reprieve", url: "public/music/rep.mp3" },
    { name: "Nyleth", url: "public/music/nyleth.mp3"},
    { name: "Skarrsinger Karmelita", url: "public/music/sk.mp3" },
    { name: "Sands of Karak", url: "public/music/sok.mp3" },
    { name: "Crust King Khann", url: "public/music/ckk.mp3" },
    { name: "Lost Verdania", url: "public/music/lv.mp3" },
    { name: "Clover Dancers", url: "public/music/cd.mp3" },
    { name: "Fleatopia", url: "public/music/fleatopia.mp3" },
    { name: "Tormented Trobbio", url: "public/music/tt.mp3" },
    { name: "Red Memory", url: "public/music/rm.mp3" },
    { name: "Last Dive", url: "public/music/ld.mp3" },
    { name: "Lost Lace", url: "public/music/ll.mp3" },
    { name: "Sister of Void", url: "public/music/sov.mp3" },
    { name: "Silksong", url: "public/music/silksong.mp3" }
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

if (localStorage.getItem("darkTheme") === "enabled") {
    document.body.classList.add("dark-theme");
}


function checkAnswer(selected) {
    if (selected === correctTrack.name) {
        score++;
        scoreDiv.textContent = `Score: ${score}`;
        resultDiv.textContent = "✅ Correct!";
        loadNewTrack()
        if (score >= 15) {
            themeBtn.style.display = "inline-block";
            localStorage.setItem("themeUnlocked","true");
        }
    } else {
        score = 0;
        scoreDiv.textContent = `Score: ${score}`;
        resultDiv.textContent = `❌ Wrong! The answer was: ${correctTrack.name}`;
        loadNewTrack()
    }
}

themeBtn.onclick = () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("darkTheme", "enabled");
    } else {
        localStorage.setItem("darkTheme", "disabled");
    }
};
nextBtn.onclick = loadNewTrack;


loadNewTrack();
});