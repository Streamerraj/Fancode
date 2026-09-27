const events = [
  {
    id: "demo-live-cricket",
    sport: "cricket",
    title: "Live Cricket Event",
    date: "Live now",
    status: "LIVE",
    playable: true,
    stream: "YOUR_AUTHORIZED_MPD_URL"
  },
  {
    id: "demo-upcoming-cricket",
    sport: "cricket",
    title: "Upcoming Cricket Match",
    date: "Today • 7:30 PM",
    status: "UPCOMING",
    playable: false
  },
  {
    id: "demo-football",
    sport: "football",
    title: "Football Live Event",
    date: "Live now",
    status: "LIVE",
    playable: true,
    stream: "YOUR_AUTHORIZED_MPD_URL"
  },
  {
    id: "demo-tennis",
    sport: "tennis",
    title: "Tennis Match",
    date: "Tomorrow • 6:00 PM",
    status: "UPCOMING",
    playable: false
  }
];

const container = document.getElementById("events");
const count = document.getElementById("eventCount");

function render(filter = "all") {
  const list = filter === "all" ? events : events.filter(e => e.sport === filter);
  count.textContent = `${list.length} event${list.length === 1 ? "" : "s"}`;

  if (!list.length) {
    container.innerHTML = '<div class="empty">No events available.</div>';
    return;
  }

  container.innerHTML = list.map(e => `
    <article class="card">
      <div class="card-top">
        <span class="sport">${e.sport}</span>
        <span class="status ${e.status === "LIVE" ? "live" : "upcoming"}">${e.status}</span>
      </div>
      <div class="card-body">
        <div class="title">${e.title}</div>
        <div class="meta">${e.date}</div>
        ${
          e.playable
          ? `<a class="watch" href="player.html?id=${encodeURIComponent(e.id)}">Watch Now</a>`
          : `<span class="watch disabled">Not Live</span>`
        }
      </div>
    </article>
  `).join("");
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    render(button.dataset.filter);
  });
});

render();
