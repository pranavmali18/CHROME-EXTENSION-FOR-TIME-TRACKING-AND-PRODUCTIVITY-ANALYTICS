const productiveSites = ["github.com", "leetcode.com", "stackoverflow.com"];

chrome.storage.local.get(null, (data) => {
  const list = document.getElementById("list");

  for (let site in data) {
    const seconds = Math.floor(data[site] / 1000);
    const li = document.createElement("li");

    const type = productiveSites.includes(site)
      ? "✅ Productive"
      : "❌ Unproductive";

    li.textContent = `${site}: ${seconds}s (${type})`;
    list.appendChild(li);
  }
});
