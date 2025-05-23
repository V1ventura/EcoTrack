document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
      duration: 1000, // Tempo de duração da animação em milissegundos
    });
  });
  

var map = L.map('map', {
  maxBounds: [[-85, -180], [85, 180]], 
  minZoom: 2, 
}).setView([20, 0], 2); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


var plasticPollution = [
  { lat: -33.9249, lon: 18.4241, info: "Alto nível de poluição plástica em Cidade do Cabo." },
  { lat: 35.6762, lon: 139.6503, info: "Nível moderado de poluição plástica em Tóquio." },
  { lat: 40.7128, lon: -74.0060, info: "Alta poluição plástica em Nova York." },
  { lat: 51.5074, lon: -0.1278, info: "Nível moderado de poluição plástica em Londres." },
  { lat: -34.9285, lon: 138.6007, info: "Alerta de poluição plástica em Adelaide." }
];

var conservationActions = [
  { lat: -14.2350, lon: -51.9253, info: "Área de Conservação no Brasil." },
  { lat: 55.3781, lon: -3.4360, info: "Área de Conservação no Reino Unido." },
  { lat: 51.5074, lon: -0.1278, info: "Campanhas de conscientização em Londres." },
  { lat: -22.9068, lon: -43.1729, info: "Ações de limpeza de praias no Rio de Janeiro." },
  { lat: 38.7223, lon: -9.1393, info: "Atividades de conservação em Lisboa." }
];

var marineHealth = [
  { lat: -8.7832, lon: -55.4915, info: "Alta biodiversidade na Amazônia." },
  { lat: 27.9878, lon: 86.9250, info: "Biodiversidade crítica no Himalaia." },
  { lat: -20.9176, lon: 142.7028, info: "Recifes de corais ameaçados na Grande Barreira." },
  { lat: 1.3521, lon: 103.8198, info: "Esforços de conservação em Cingapura." },
  { lat: -33.8568, lon: 151.2153, info: "Projeto de restauração marinha em Sydney." }
];


function createMarkers(data) {
  var markers = [];
  data.forEach(function(item) {
      var marker = L.marker([item.lat, item.lon]).addTo(map);
      marker.bindPopup(item.info); 
      markers.push(marker);
  });
  return markers;
}


function createDetailedMarkers(data, type) {
  var markers = [];
  data.forEach(function(item) {
      var marker = L.marker([item.lat, item.lon]).addTo(map);
      let info = "";

      if (type === 'plastic') {
          info = "Poluição Plástica: " + item.info;
      } else if (type === 'conservation') {
          info = "Ação de Conservação: " + item.info;
      } else if (type === 'marine-health') {
          info = "Saúde Marinha: " + item.info;
      }

      marker.bindPopup(info); 
      markers.push(marker);
  });
  return markers;
}


var currentMarkers = createMarkers(plasticPollution);


function clearMarkers() {
  currentMarkers.forEach(function(marker) {
      map.removeLayer(marker);
  });
}


function changeFilter(value) {
  clearMarkers(); 

  if (value === 'plastic') {
      currentMarkers = createDetailedMarkers(plasticPollution, 'plastic');
  } else if (value === 'conservation') {
      currentMarkers = createDetailedMarkers(conservationActions, 'conservation');
  } else if (value === 'marine-health') {
      currentMarkers = createDetailedMarkers(marineHealth, 'marine-health');
  }
}


var filterButton = document.getElementById('filter-button');
var filters = document.getElementById('filters');


filterButton.addEventListener('click', function() {

  if (filters.style.display === 'none' || filters.style.display === '') {
      filters.style.display = 'block'; 
      filterButton.textContent = 'Ocultar Filtros'; 
  } else {
      filters.style.display = 'none'; 
      filterButton.textContent = 'Mostrar Filtros'; 
  }
});


document.querySelectorAll('input[name="filter"]').forEach(function(input) {
  input.addEventListener('change', function() {
      changeFilter(this.value);
  });
});

AOS.init({
  duration: 1000, 
});

const links = document.querySelectorAll('a[href^="#"]');


links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); 

        const targetID = this.getAttribute('href'); 
        const targetElement = document.querySelector(targetID); 

        targetElement.scrollIntoView({
            behavior: 'smooth', 
            block: 'start' 
        });
    });
});
document.querySelector('.hamburger').addEventListener('click', function() {
  document.querySelector('nav').classList.toggle('active');
});
