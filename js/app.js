// initialize our map
function initMap() {
  // initialize our map
  if (map) {
    map.off();
    map.remove();
  }
  map = L.map("map", {
    center: [47.32341, 67.240768], //center map to jkuat
    zoom: 5, //set the zoom level
  });

  //add openstreet baselayer to the map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  L.Routing.control({
    router: L.Routing.mapbox(
      "eyJ1IjoicG9seWF0b21pY2lvbiIsImEiOiJjbDJiaTg4eXUwZmltM2xwOXdpeWN0bjd0In0.ZnOeC3NJy6ucfdlGpl3HMA"
    ),
  });
}
// get data from cities.json
async function getCitiesData() {
  const response = await fetch("./data/cities.json");
  const Cities = await response.json();
  CITIES = Cities.map((city, index) => {
    city.index = index;
    city.isChosen = false;
    return city;
  });
  initCitiesList();
  return CITIES;
}

function initCitiesList() {
  CITIES.forEach((city) => {
    $(".cities-list").append(`<li id="${city.index}"> ${city.city} </li>`);
  });
  $(".cities-list").simsCheckbox();
  CITIES.forEach((city) => {
    $(`#${city.index}`).click((e) => {
      console.log(e)
      var id = e.target.id;
      CITIES[id].isChosen = !CITIES[id].isChosen;
    });
  });
}

function initGraph() {
  initMap();

  cities = CITIES.filter((city) => city.isChosen);
  console.log(cities);

  graph = new Graph(cities.length);
  calculateDistances();
  var res = graph.MST();
  console.log(res);
  visualizeMST(res.result);
}

function calculateDistances() {
  console.log(cities);

  cities.forEach((city, index) => {
    let start = {
      id: index,
      city: city.city,
      cord: L.latLng(city.lat, city.lng),
    };

    cities.forEach((anotherCity, index1) => {
      if (city.city == anotherCity.city) return;

      let destination = {
        id: index1,
        city: anotherCity.city,
        cord: L.latLng(anotherCity.lat, anotherCity.lng),
      };

      getDistanceBetweenTwoCities(start, destination);
    });
  });
  console.log(graph);
}

function getDistanceBetweenTwoCities(location1, location2) {
  let distance = calcCrow(
    location1.cord.lat,
    location1.cord.lng,
    location2.cord.lat,
    location2.cord.lng
  );

  graph.add_edge({
    a: location1.id,
    b: location2.id,
    w: distance,
  });
  graph.add_edge({
    a: location2.id,
    b: location1.id,
    w: distance,
  });
}

//This function takes in latitude and longitude of two location
// and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

async function visualizeMST(edges) {
  for (let edge of edges) {
    getRealDistanceBetweenTwoCities(edge.a, edge.b);
    // 
    await delay(1000)
  }
}

function delay(t) {
  return new Promise((resolve) => setTimeout(resolve, t));
}

function getRealDistanceBetweenTwoCities(locationId1, locationId2) {
  let location1 = cities[locationId1];
  let location2 = cities[locationId2];

  let start = {
    city: location1.city,
    cord: L.latLng(location1.lat, location1.lng),
  };
  let destination = {
    city: location2.city,
    cord: L.latLng(location2.lat, location2.lng),
  };

  L.marker(start.cord).addTo(map);
  L.marker(destination.cord).addTo(map);
  L.polyline.antPath([start.cord, destination.cord]).addTo(map);

// comment

  L.Routing.control({
    waypoints: [start.cord, destination.cord],
    routeWhileDragging: false,
    lineOptions: {
      styles: [{ color: "red", opacity: 1, weight: 2 }],
    },
    showAlternatives: false,
  })
    .addTo(map);
}

var map;
var routes = {};
var graph = null;
var CITIES = [];
var cities = [];

getCitiesData();

$(document).ready(function () {
  $("#startEngine").click(initGraph);
});
