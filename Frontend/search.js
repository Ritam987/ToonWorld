export function initSearch({ cartoons, onResults }) {
  const searchBox = document.getElementById("search");
  const noResults = document.getElementById("no-results");

  if (!searchBox || !noResults || !Array.isArray(cartoons) || !onResults) return;

  let searchTimeout;

  searchBox.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchText = searchBox.value.toLowerCase().trim();

      if (searchText === "") {
        onResults(cartoons);
        noResults.style.display = "none";
        return;
      }

      const filtered = cartoons.filter((c) =>
        c.title.toLowerCase().includes(searchText)
      );

      onResults(filtered);
      noResults.style.display = filtered.length > 0 ? "none" : "block";
    }, 300);
  });
}

