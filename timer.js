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
const startDate = new Date("September 4, 2025 00:00:00"); 

function updateTimer() {
	const now = new Date();
	let diff = now - startDate; 

	
	const seconds = Math.floor(diff / 1000) % 60;
	const minutes = Math.floor(diff / (1000 * 60)) % 60;
	const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));

	document.getElementById("timer").textContent =
		`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}


setInterval(updateTimer, 1000);
updateTimer()