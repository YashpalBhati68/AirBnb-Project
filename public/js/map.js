// Initialize the map and set view to your location
const map = L.map("map").setView([28.6139, 77.209], 13); // Delhi coords

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Add a marker
L.marker([28.6139, 77.209]).addTo(map).bindPopup("Delhi").openPopup();


{/* <script>
    // Initialize the map
    const map = L.map("map").setView([28.6139, 77.209], 13); // Delhi

    // Better tile style (Humanitarian OSM)
    L.tileLayer(
      "https://{s}.tile.openstreetmap.fr/hot/%7Bz%7D/%7Bx%7D/%7By%7D.png",
      {
        attribution:
          "&copy; OpenStreetMap contributors, Tiles style by Humanitarian OSM",
      }
    ).addTo(map);

    // Custom icon
    const customIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    // Marker with custom icon
    L.marker([28.6139, 77.209], { icon: customIcon })
      .addTo(map)
      .bindPopup("Delhi")
      .openPopup();

    // Circle around the marker
    L.circle([28.6139, 77.209], {
      color: "blue",
      fillColor: "#30a3ec",
      fillOpacity: 0.3,
      radius: 1000,
    }).addTo(map);

    // Reposition zoom control
    map.zoomControl.setPosition("bottomright");

    // Popup on click anywhere
    map.on("click", function (e) {
      L.popup()
        .setLatLng(e.latlng)
        .setContent("You clicked at " + e.latlng.toString())
        .openOn(map);
    });
  </script> */}