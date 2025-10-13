      
      const nowPlayingText = document.getElementById("nowPlayingText");
      let currentTrack = null
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

        const tracksDiv = document.getElementById("tracks");
        const playlistDiv = document.getElementById("playlist");
        

        let audioPlayers = [];
        let score = 0;
        const FAVORITE_COUNTS_KEY = "favoriteCounts"; 
const USER_FAVORITES_KEY = "userFavorites";   


function loadFavoriteCounts() {
    try {
        return JSON.parse(localStorage.getItem(FAVORITE_COUNTS_KEY)) || {};
    } catch {
        return {};
    }
}
function loadUserFavorites() {
    try {
        return JSON.parse(localStorage.getItem(USER_FAVORITES_KEY)) || {};
    } catch {
        return {};
    }
}
function saveFavoriteCounts(obj) {
    localStorage.setItem(FAVORITE_COUNTS_KEY, JSON.stringify(obj));
}
function saveUserFavorites(obj) {
    localStorage.setItem(USER_FAVORITES_KEY, JSON.stringify(obj));
}


let favoriteCounts = loadFavoriteCounts();
let userFavorites = loadUserFavorites();

                
        tracks.forEach((track, index) => {
            const div = document.createElement("div");
            div.className = "track";
            div.draggable = true;
            div.ondragstart = (e) => {
                e.dataTransfer.setData("text", index);
            };
                const isFav = !!userFavorites[track.name];
                const starChar = isFav ? "★" : "☆";
                const starTitle = isFav ? "Unfavorite" : "Favorite";
            div.innerHTML = `
                <div class="track-info" style="display:flex; justify-content:space-between; align-items:center;">   
                <span style="font-weight:600;">${track.name}</span>
                <button class="fav-btn" data-index="${index}" title="${starTitle}" aria-label="${starTitle}" style="font-size:18px; background:transparent; border:none; cursor:pointer;">
                <span class="star">${starChar}</span>
                </button>
                </div>
                <div>
                    <button onclick="playTrack(${index})">Play</button>
                    <button onclick="pauseTrack(${index})">Pause</button>
                    <button onclick="resetTrack(${index})">Reset</button>
                </div>
            `;
            tracksDiv.appendChild(div);

            const audio = new Audio(track.url);
            audioPlayers.push(audio);
        });
        

tracksDiv.addEventListener("click", (e) => {
    const btn = e.target.closest(".fav-btn");
    if (!btn) return;
    const index = parseInt(btn.getAttribute("data-index"), 10);
    if (Number.isNaN(index)) return;
    toggleFavorite(index, btn);
});

function toggleFavorite(trackIndex, buttonElement) {
    const t = tracks[trackIndex];
    const name = t.name;
    
    favoriteCounts = favoriteCounts || {};
    userFavorites = userFavorites || {};

    if (userFavorites[name]) {
        
        favoriteCounts[name] = Math.max((favoriteCounts[name] || 1) - 1, 0);
        delete userFavorites[name];

    } else {
        
        favoriteCounts[name] = (favoriteCounts[name] || 0) + 1;
        userFavorites[name] = true;

    }

    saveFavoriteCounts(favoriteCounts);
    saveUserFavorites(userFavorites);
}

        
        function playTrack(i) {
            audioPlayers.forEach((audio, index) => {
                if (index !== i) audio.pause();
            });
            audioPlayers[i].play();
            currentTrack = tracks[i].name;
            nowPlayingText.innerHTML = `
                    <span class="music-icon">🎵</span>
                    Now Playing: ${currentTrack}
                    `;
                    
        }
        function pauseTrack(i) {
            audioPlayers[i].pause();

            if (currentTrack === tracks[i].name) {
                nowPlayingText.innerHTML=`
                    <span class="music-icon">🎵</span>
                    Now Playing: ...
                    `;;
               
            }
        }

        audioPlayers.forEach((audio,index) => {
            audio.addEventListener("ended",() => {
                if (currentTrack === tracks[index].name){
                    
                    nowPlayingText.innerHTML = `
                    <span class="music-icon">🎵</span>
                    Now Playing: ...
                    `;
                }
            })
        })

        function resetTrack(i) {
            audioPlayers.forEach((audio,index) => {
                if (index !== i) audio.pause();
            })

            audioPlayers[i].pause();       
            audioPlayers[i].currentTime = 0; 
            audioPlayers[i].play()
            currentTrack = tracks[i].name;
            nowPlayingText.innerHTML = `
                <span class="music-icon">🎵</span>
                Now Playing: ${currentTrack}
                `;
}

        
        function showSection(id) {
            document.getElementById("browse").classList.add("hidden");
            document.getElementById(id).classList.remove("hidden");
        }

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    
    Array.from(tracksDiv.children).forEach((trackDiv, index) => {
        const trackName = tracks[index].name.toLowerCase();
        if (trackName.includes(query)) {
            trackDiv.style.display = "flex"; 
        } else {
            trackDiv.style.display = "none"; 
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
const themeBtn = document.getElementById("themeBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");


if (localStorage.getItem("darkTheme") === "enabled") {
    document.body.classList.add("dark-theme");
}


if (localStorage.getItem("themeUnlocked") === "true") {
    themeBtn.style.display = "inline-block";
}
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("darkTheme", "enabled");
        } else {
            localStorage.setItem("darkTheme", "disabled");
        }
    });
});


themeBtn.onclick = () => {
    document.body.classList.toggle("dark-theme");

    
    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("darkTheme", "enabled");
    } else {
        localStorage.setItem("darkTheme", "disabled");
    }
};
