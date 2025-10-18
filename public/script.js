
let audioPlayers = [];
let trackVolumes = [];
let currentTrack = null;
let trackSeekIntervals = [];
document.addEventListener("DOMContentLoaded", () => {
  const nowPlayingText = document.getElementById("nowPlayingText");
  const tracksDiv = document.getElementById("skongTracks");
  const searchInput = document.getElementById("searchInput");
  const themeBtn = document.getElementById("themeBtn");
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  const FAVORITE_COUNTS_KEY = "favoriteCounts";
  const USER_FAVORITES_KEY = "userFavorites";
  
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

  function loadFavoriteCounts() {
    try { return JSON.parse(localStorage.getItem(FAVORITE_COUNTS_KEY)) || {}; }
    catch { return {}; }
  }
  function loadUserFavorites() {
    try { return JSON.parse(localStorage.getItem(USER_FAVORITES_KEY)) || {}; }
    catch { return {}; }
  }
  function saveFavoriteCounts(obj) { localStorage.setItem(FAVORITE_COUNTS_KEY, JSON.stringify(obj)); }
  function saveUserFavorites(obj) { localStorage.setItem(USER_FAVORITES_KEY, JSON.stringify(obj)); }

  let favoriteCounts = loadFavoriteCounts();
  let userFavorites = loadUserFavorites();

  
  if (!tracksDiv) {
    console.warn("No #tracks element found — skipping track list rendering.");
  } else {
    tracks.forEach((track, index) => {
      const div = document.createElement("div");
      div.className = "track";
      div.draggable = false;
      div.ondragstart = (e) => e.dataTransfer.setData("text", index);

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
        <div style="margin-top:10px; display:flex; gap:8px;">
          <button class="player-btn" data-action="play" data-index="${index}">Play</button>
          <button class="player-btn" data-action="pause" data-index="${index}">Pause</button>
          <button class="player-btn" data-action="reset" data-index="${index}">Reset</button>
        </div>
       <div class="seek-controls" id="seek-${index}" style="display:none; margin-top:5px; display:flex; align-items:center; gap:6px;">
         <button class="seek-btn" onclick="rewindTrack(${index})" style="cursor:pointer;appearance:none; -webkit-appearance:none;background: none; border:none;">⏪</button>
         <input type="range" min="0" max="100" value="0"
            oninput="seekTrack(${index}, this.value)" style="flex:1;">
          <button class="seek-btn" onclick="fastForwardTrack(${index})" style="cursor:pointer;appearance:none; -webkit-appearance:none; background: none; border:none;">⏩</button>
       </div>

        </div>
        <div class="volume-controls" id="volume-${index}" style="display:none; margin-top:5px; gap:6px; align-items:center;">
          <button onclick="changeVolume(${index}, -0.1)" style="background:none; border:none; cursor:pointer;">-</button>
          <input type="range" min="0" max="1" step="0.01" value="1"
            oninput="setVolume(${index}, this.value)" style="flex:1; height:4px;">
          <button onclick="changeVolume(${index}, 0.1)" style="background:none; border:none; cursor:pointer;">+</button>
        </div>
      `;
      tracksDiv.appendChild(div);

      const audio = new Audio(track.url);
      audio.volume = 1;
      audioPlayers.push(audio);
      trackVolumes.push(1);

      audio.addEventListener("ended", () => {
        if (currentTrack === track.name && nowPlayingText) {
          nowPlayingText.innerHTML = `<span class="music-icon">🎵</span> Now Playing: ...`;
                  
        }
      });
    });
  }


  if (tracksDiv) {
    tracksDiv.addEventListener("click", (e) => {
      const favBtn = e.target.closest(".fav-btn");
      if (favBtn) {
        const index = parseInt(favBtn.getAttribute("data-index"), 10);
        if (!Number.isNaN(index)) toggleFavorite(index, favBtn);
        return;
      }

      const playerBtn = e.target.closest(".player-btn");
      if (playerBtn) {
        const action = playerBtn.getAttribute("data-action");
        const idx = parseInt(playerBtn.getAttribute("data-index"), 10);
        if (Number.isNaN(idx)) return;
        if (action === "play") playTrack(idx);
        if (action === "pause") pauseTrack(idx);
        if (action === "reset") resetTrack(idx);
      }
    });
  }

 
  function toggleFavorite(trackIndex, buttonElement) {
    const t = tracks[trackIndex];
    const name = t.name;
    favoriteCounts = loadFavoriteCounts();
    userFavorites = loadUserFavorites();

    if (userFavorites[name]) {
      favoriteCounts[name] = Math.max((favoriteCounts[name] || 1) - 1, 0);
      delete userFavorites[name];
    } else {
      favoriteCounts[name] = (favoriteCounts[name] || 0) + 1;
      userFavorites[name] = true;
    }

    saveFavoriteCounts(favoriteCounts);
    saveUserFavorites(userFavorites);

    if (buttonElement) {
      const starSpan = buttonElement.querySelector(".star");
      if (starSpan) starSpan.textContent = userFavorites[name] ? "★" : "☆";
      buttonElement.title = userFavorites[name] ? "Unfavorite" : "Favorite";
    }
  }

  
  if (searchInput && tracksDiv) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      Array.from(tracksDiv.children).forEach((trackDiv, index) => {
        const trackName = (tracks[index] && tracks[index].name || "").toLowerCase();
        trackDiv.style.display = trackName.includes(query) ? "flex" : "none";
      });
    });
  }

 
  if (localStorage.getItem("darkTheme") === "enabled") document.body.classList.add("dark-theme");
  if (themeBtn) {
    if (localStorage.getItem("themeUnlocked") === "true") themeBtn.style.display = "inline-block";
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      localStorage.setItem("darkTheme", document.body.classList.contains("dark-theme") ? "enabled" : "disabled");
    });
  }
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      localStorage.setItem("darkTheme", document.body.classList.contains("dark-theme") ? "enabled" : "disabled");
    });
  }

  window.tracks = tracks
  window.addEventListener("storage", (e) => {
    if ([FAVORITE_COUNTS_KEY, USER_FAVORITES_KEY, "__lastFavUpdate"].includes(e.key)) {
      favoriteCounts = loadFavoriteCounts();
      userFavorites = loadUserFavorites();
      if (tracksDiv) {
        document.querySelectorAll(".track").forEach((row, i) => {
          const name = tracks[i]?.name;
          if (!name) return;
          const span = row.querySelector(".star");
          const btn = row.querySelector(".fav-btn");
          if (span) span.textContent = userFavorites[name] ? "★" : "☆";
          if (btn) btn.title = userFavorites[name] ? "Unfavorite" : "Favorite";
        });
      }
    }
  });
}); 


function playTrack(i) {
  audioPlayers.forEach((audio, index) => {
    if (index !== i) { audio.pause(); hideVolume(index);document.querySelectorAll(".track")[index].classList.remove("active-track"); }
  });
  audioPlayers[i].play();
  currentTrack = tracks[i].name
  console.log(currentTrack)
  document.getElementById("nowPlayingText").innerHTML = `<span class="music-icon">🎵</span> Now Playing: ${currentTrack}`;
  audioPlayers[i].volume = trackVolumes[i] ?? 1;
  showVolume(i);
  showSeek(i)
  document.querySelectorAll(".track")[i].classList.add("active-track");
}

function pauseTrack(i) {
  audioPlayers[i]?.pause();

  if (document.getElementById("nowPlayingText").innerHTML.includes(audioPlayers[i]?.src.split("/").pop())) {
    document.getElementById("nowPlayingText").innerHTML = `<span class="music-icon">🎵</span> Now Playing: ...`;
  }
}

function resetTrack(i) {
  audioPlayers.forEach((audio, index) => { if (index !== i) audio.pause(); hideVolume(index); });
  audioPlayers[i].pause();
  audioPlayers[i].currentTime = 0;
  audioPlayers[i].play();
  currentTrack = tracks[i].name
  document.getElementById("nowPlayingText").innerHTML = `<span class="music-icon">🎵</span> Now Playing: ${currentTrack}`;
  showSeek(i)
  showVolume(i);
}


function setVolume(i, value) {
  value = parseFloat(value);
  trackVolumes[i] = value;
  audioPlayers[i].volume = value;
}

function changeVolume(i, delta) {
  let v = trackVolumes[i] ?? 1;
  v = Math.min(1, Math.max(0, v + delta));
  trackVolumes[i] = v;
  audioPlayers[i].volume = v;

  const slider = document.querySelector(`#volume-${i} input[type="range"]`);
  if (slider) slider.value = v;
}

function showSeek(i) {
  
  const div = document.getElementById(`seek-${i}`);
  if (!div) return;
  div.style.display = "flex";

  if (trackSeekIntervals[i]) clearInterval(trackSeekIntervals[i]);
  trackSeekIntervals[i] = setInterval(() => {
    const audio = audioPlayers[i];
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      div.querySelector("input").value = percent;
    }
  }, 200);
}

function hideSeek(i) {
  const div = document.getElementById(`seek-${i}`);
  if (div) div.style.display = "none";
  if (trackSeekIntervals[i]) {
    clearInterval(trackSeekIntervals[i]);
    trackSeekIntervals[i] = null;
  }
}

function hideAllSeek() {
  document.querySelectorAll(".seek-controls").forEach(el => el.style.display = "none");
  for (let i in trackSeekIntervals) {
    clearInterval(trackSeekIntervals[i]);
    trackSeekIntervals[i] = null;
  }
}
function seekTrack(i, value) {
  const audio = audioPlayers[i];
  if (audio.duration > 0) {
    audio.currentTime = (parseFloat(value) / 100) * audio.duration;
  }
}

function showVolume(i) {

  hideAllVolume()

  const volDiv = document.getElementById(`volume-${i}`);
  if (volDiv) volDiv.style.display = "flex";
}

function hideVolume(i) {
  const volDiv = document.getElementById(`volume-${i}`);
  if (volDiv) volDiv.style.display = "none";
}
function hideAllVolume() {
  document.querySelectorAll(".volume-controls").forEach(el => el.style.display = "none");
}
function rewindTrack(i) {
  const audio = audioPlayers[i];
  if (!audio) return;
  audio.currentTime = Math.max(0, audio.currentTime - 10);
}
function fastForwardTrack(i) {
  const audio = audioPlayers[i];
  if (!audio) return;
  audio.currentTime = Math.min(audio.duration,audio.currentTime + 10)

}

