
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
      row.id = "row"

      const left = document.createElement("div");
      left.style = "display:flex; align-items:center; gap:12px;";

      const rank = document.createElement("div");
      rank.textContent = `${idx + 1}.`;
      rank.id = "rank"

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
      playBtn.id = "playbtn"

      
      const countBadge = document.createElement("div");
      countBadge.textContent = `${item.count}`;
      countBadge.id = "countbdg"

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



