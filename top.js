
const themeBtn = document.getElementById("themeBtn");
if (localStorage.getItem("darkTheme") === "enabled") {
    document.body.classList.add("dark-theme");
}
themeBtn.onclick = () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("darkTheme", "enabled");
    } else {
        localStorage.setItem("darkTheme", "disabled");
    }
};


document.addEventListener("DOMContentLoaded", () => {
  
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

  const FAVORITE_COUNTS_KEY = "favoriteCounts";
  const USER_FAVORITES_KEY = "userFavorites";

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

  const topList = document.getElementById("topList");
  if (!topList) {
    console.error("top.js: #topList element not found. Make sure your top.html has <div id=\"topList\"></div>");
    return;
  }


  let previewAudio = new Audio();
  previewAudio.addEventListener("ended", () => { previewAudio.src = ""; });

  function renderLeaderboard() {
    favoriteCounts = loadFavoriteCounts();
    userFavorites = loadUserFavorites();

    const list = tracks.map(t => ({
      name: t.name,
      url: t.url,
      count: favoriteCounts[t.name] || 0
    }));

    
    list.sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.name.localeCompare(b.name);
    });

    
    topList.innerHTML = "";
    list.forEach((item, idx) => {
      const row = document.createElement("div");
      row.className = "leader-row";
      row.style = "display:flex; align-items:center; justify-content:space-between; padding:10px; border-bottom:1px solid rgba(255,76,76,0.08);";

      const left = document.createElement("div");
      left.style = "display:flex; align-items:center; gap:12px;";

      const rank = document.createElement("div");
      rank.textContent = `${idx + 1}.`;
      rank.style = "width:30px; text-align:right; color:#ffdfdf;";

      const title = document.createElement("div");
      title.textContent = item.name;
      title.style = "font-weight:600; color:#fff;";

      left.appendChild(rank);
      left.appendChild(title);

      const right = document.createElement("div");
      right.style = "display:flex; align-items:center; gap:10px;";

      
      const starBtn = document.createElement("button");
      starBtn.className = "top-fav-btn";
      starBtn.dataset.name = item.name;
      starBtn.style = "background:transparent; border:none; cursor:pointer; font-size:18px;";
      const isFav = !!userFavorites[item.name];
      starBtn.innerHTML = isFav ? "★" : "☆";
      starBtn.title = isFav ? "Unfavorite" : "Favorite";

      
      const playBtn = document.createElement("button");
      playBtn.textContent = "Preview";
      playBtn.style = "padding:6px 10px; border:none;border-radius:5px;	color: #c0c0ff;background:#4444ff;";

      
      const countBadge = document.createElement("div");
      countBadge.textContent = `${item.count}`;
      countBadge.style = "min-width:36px; text-align:center; padding:6px; border-radius:8px; background:rgba(255,76,76,0.12);";

      right.appendChild(starBtn);
      right.appendChild(playBtn);
      right.appendChild(countBadge);

      row.appendChild(left);
      row.appendChild(right);
      topList.appendChild(row);

      
      playBtn.addEventListener("click", () => {
          if (previewAudio.src !== location.origin + "/" + item.url) {
   
            if (previewAudio.src) {
              previewAudio.pause();
              previewAudio.currentTime = 0;
            }
            previewAudio.src = item.url;
            previewAudio.play();
          } else {
    
          if (previewAudio.paused) {
            previewAudio.play();
          } else {
            previewAudio.pause();
          }
        }


        
      });

      starBtn.addEventListener("click", () => {
        toggleFavoriteByName(item.name);
      });
    });
  }

  function toggleFavoriteByName(name) {
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

    
    renderLeaderboard();
  }

 
  renderLeaderboard();

  
  window.addEventListener("storage", (e) => {
    if (e.key === FAVORITE_COUNTS_KEY || e.key === USER_FAVORITES_KEY) {
      renderLeaderboard();
    }
  });

}); 


