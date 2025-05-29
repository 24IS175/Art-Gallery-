const saveProfile = () => {
  const name = document.getElementById('artistName').value;
  localStorage.setItem('artistName', name);
  alert('Profile saved!');
};

/* JavaScript: upload.js */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("artist").value = localStorage.getItem("artistName") || "";

  document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const artist = document.getElementById("artist").value;
    const file = document.getElementById("image").files[0];

    const reader = new FileReader();
    reader.onload = function () {
      const artworks = JSON.parse(localStorage.getItem("artworks") || "[]");
      artworks.push({ title, artist, image: reader.result });
      localStorage.setItem("artworks", JSON.stringify(artworks));
      alert("Artwork uploaded successfully!");
      location.href = "gallery.html";
    };
    reader.readAsDataURL(file);
  });
});

/* JavaScript: gallery.js */
document.addEventListener("DOMContentLoaded", () => {
  const artworks = JSON.parse(localStorage.getItem("artworks") || "[]");
  const container = document.getElementById("artworks");
  const searchArt = document.getElementById("searchArt");
  const searchArtist = document.getElementById("searchArtist");

  const displayArtworks = (filtered) => {
    container.innerHTML = "";
    filtered.forEach(({ title, artist, image }) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${image}" alt="${title}">
        <p><strong>${title}</strong><br>by ${artist}</p>
        <a href="${image}" download>Download</a>
      `;
      container.appendChild(div);
    });
  };

  const filter = () => {
    const artText = searchArt.value.toLowerCase();
    const artistText = searchArtist.value.toLowerCase();
    const filtered = artworks.filter(({ title, artist }) =>
      title.toLowerCase().includes(artText) && artist.toLowerCase().includes(artistText)
    );
    displayArtworks(filtered);
  };

  searchArt.addEventListener("input", filter);
  searchArtist.addEventListener("input", filter);

  displayArtworks(artworks);
});
