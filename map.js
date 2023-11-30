const sidebar = document.getElementById("spaces-sidenav");
const mapElement = document.getElementById("map");
const icon = document.getElementById("open-nav");
let userMarker;
const markers = []; 
let currentRoute;
let currentPopup;


//map initialization
const map = L.map('map').setView([37.98081780210681, -121.30860006178807], 20);


const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

function openNav() {
  
  document.getElementById("spaces-sidenav").style.width = "350px";
  document.getElementById("map").style.marginLeft = "350px";
  document.querySelector('.hamburger').classList.add('hide');
}

function closeNav() {
   
  document.getElementById("spaces-sidenav").style.width = "0";
  document.getElementById("map").style.marginLeft = "0";
  document.querySelector('.hamburger').classList.remove('hide'); 
}



// Get user location
let userLatLng;

navigator.geolocation.getCurrentPosition(position => {
  const userLocation = {
    lat: position.coords.latitude, 
    lng: position.coords.longitude
  };
  
  userMarker = L.marker(userLocation)
    .addTo(map)
    .bindPopup('You are here! Select a Building in the sidebar')
    .openPopup();
  
  userLatLng = userMarker.getLatLng();
  
}, error => {
  // Handle location access error
  switch (error.code) {
      case error.PERMISSION_DENIED:
        console.error("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.error("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.error("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.error("An unknown error occurred while trying to get user location.");
        break;
      default:
        console.error("An unexpected error occurred.");
        break;
      
  }
   userLatLng = L.latLng(37.98081780210681, -121.30860006178807);
    userMarker = L.marker(userLatLng)
      .addTo(map)
      .bindPopup('Unable to get your current location. Using default location.')
      .openPopup();
});
// Donot change this code 
L.marker([37.98081780210681, -121.30860006178807]).addTo(map)
    .bindPopup('Welcome to University of the Pacifc!.')
    .openPopup();

    var buildings = [
  {
    name: 'University Library',
    loc: [37.97965438553815, -121.30923204124174], 
    popup: 'University Library',
     rooms: ['ROOM 123', 'ROOM 107', 'ROOM 108', 'ROOM110','ROOM111','ROOM112','ROOM113'],
    makerSpaces: [
    {name: 'CUBE', description: ' The Cube works with faculty, students, and staff across the university to incorporate digital tools into research, teaching, and learning. '},
    {name: 'SIERRA LAB', description: 'Innovation Space for Students on Various Technologies and Virtual Reality.'},
  ],
},
  {
    name: 'Weber Hall', 
  loc: [37.981096869854824, -121.30919963343946], 
  popup: 'Weber Hall',
  rooms: ['ROOM 123', 'ROOM 107', 'ROOM 108', 'ROOM110'],
    makerSpaces: [
    {name: 'E-SPORTS LAB', description: 'E-Sports Development Lab'},
    {name: 'BUSINESS LAB', description: 'Business and Decision making skills development...'},
 ]
},  
  {
    name: 'Ceramics Studio', 
    loc: [37.97547316805742, -121.31360165473795], 
    popup: 'Ceramics Studio',
   rooms: ['No Study Spaces'],
    makerSpaces: [
    {name: 'Ceramics Studio', description: 'The Ceramics Studio is currently undergoing a re-fit to support the return of Ceramics courses in Fall,2022.Re-fit includes rehabilitation of ceramic wheels, air filtration upgrades, installation of card-swipe access, and lighting upgrades to support student safety and success.'},
     {name: 'Sculpture Studio', description: 'The Sculpture Studio supports hands-on exploration of the concepts, creative potential, and a variety of media (clay, wood, plaster, metal, etc.). In Summer, 2022 the Sculpture Studio will be relocated to the DeMarcus Brown Scene Shop to provide a larger space for classes.'},//need to check with yusif
  ],
},
  {
    name: 'Don and DeRosa University Center', 
    loc: [37.98153639207796, -121.31216436624912], 
    popup: 'Don and DeRosa University Center',
   rooms: ['ROOM 123', 'ROOM 107', 'ROOM 108', 'ROOM110'],
    makerSpaces: [
    {name: 'SPACE1', description: '3D printing'},
    {name: 'SPACE2', description: 'Laser cutting'},
  ],
},
  {
    name: 'Demarcus Brown Studio Theatre',
     loc: [37.97662847883658, -121.31227125942947], 
    popup: 'Demarcus Brown Studio Theatre',
    rooms: ['ROOM 123', 'ROOM 107', 'ROOM 108', 'ROOM110'],
    makerSpaces: [
    {name: 'COSTUME LAB', description: 'The Costume Shop provides sewing equipment and clothing material needed to create costumes for performances.'},
    {name: 'THEATRICAL MAKEUP', description: 'The Theatrical Makeup Studio provides and environment conducive to application of theatrical makeup for various performances.'},
     {name: 'MOTION CAPTURE STUDIO', description: 'The Motion Capture Studio utilizes state-of-the-art motion capture and analysis systems to digitally record the movement of humans which can be used for animation or visual effects.'},
      {name: 'MEDIA X LAB', description: 'The Media-X Lab is a computer lab with state-of-the-art Windows computers capable of processing advanced graphics where students are challenged to create interpretive design solutions for complex interactive problems.'},
       {name: 'SCENE SHOP', description: 'The Scene Shop provides woodcutting equipment, tools, and material needed to create scenes for performances.'}
  ],
},
  {
    name: 'Betchel International Center',
    loc: [37.97909204623361, -121.3128946000047], 
    popup: 'Betchel International Center',
    rooms: ['ROOM 123', 'ROOM 107', 'ROOM 108', 'ROOM110'],
    makerSpaces: [
    {name: 'SPACE1', description: '3D printing'},
    {name: 'SPACENAME', description: 'Need top add description'},
  ],
},
  {
    name: 'John Chambers Technology Center',
    loc: [37.97899484584462, -121.31115176457075],
     popup: 'John Chambers Technology Center',
     rooms: ['ROOM 123', 'ROOM 107', 'ROOM 108', 'ROOM110'],
    makerSpaces: [
    {name: 'TIES', description: 'The Technological and Entrepreneurship Space (TIES) Lab was established in South Campus in 2015 to support the Technological and Entrepreneurship (TIE) program. The TIES Lab contains rapid prototyping machines, a CNC mill, laser cutter, and other equipment to support the &quot;making&quot; of prototypes.'}
  ],
    },
  {
    name: 'Long Theater',
    loc: [37.97761372808533, -121.31290962516363],
     popup: 'Long Theater',
     rooms: ['ROOM 123', 'ROOM 107', 'ROOM 108', 'ROOM110'],
    makerSpaces: [
    {name: 'Live Performance & Production Studio & Theater', description: 'The Live Performance &amp; Production Studio &amp; Theater has facilities for performances in front of live audiences and a large green-screen studio where students can record performances and add visual effects for motion picture productions.'}
  ],
    },
  {
    name: 'Jeannette Powell Art Center',
     loc: [37.97586376726748, -121.31312589579042], 
     popup: 'Jeannette Powell Art Center',
     rooms: ['No Study Rooms'],
    makerSpaces: [
    {name: 'Mac Lab', description: 'The Mac Lab is a computer lab with iMac computers where students form various AMPD courses learn and implement coursework on state of the art systems.'},
    {name: 'Surface Lab', description: 'The Surface Lab is a computer lab with Microsoft Surface computers having adjustable 28” touch screen displays which enhance the artistic computer experience.'},
    {name: 'Printmaking', description: 'Printmaking Studio coursework examines historical and aesthetic development of processes, materials and techniques of printmaking where students apply that knowledge to achieve basic mastery of the printmaking process.'},
    {name: 'Drawing & Painting', description: 'The Drawing &amp; Painting Studio hosts coursework which encompasses a variety of artistic styles to develop skills such as drawing of the human body, oil painting, watercolors, artistic intent, personal imagery, and aesthetic judgement.'},
    {name: 'Print Lab', description: 'The Print Lab enables graphic design students to utilize state-of-the art hardware and software to develop creative solutions for publishing printed materials.'},
    {name: 'Photo Studio', description: 'The Photo Studio provides an environment where students learn the theory, process, and aesthetics of digital photography to create and edit images for printing and publishing.'},
    {name: 'Graphic Design', description: 'The Graphic Design Studio provides a hands-on experience where students learn methods and procedures of efficient production practices, including typographic issues, image adjustment, digital file format preparation and related technologies for the graphic design student.'},
  ],
    },
  {
    name: 'Pacific Geosciences Center', 
    loc: [37.97557659470853, -121.31251618885622], 
    popup: 'Pacific Geosciences Center',
    rooms: ['No Study Halls'],
    makerSpaces: [
    {name: 'Reynolds Gallery', description: 'The Reynolds Gallery is the University premier art exhibition space and welcomes visitors from the University, region, and beyond. The Reynolds Gallery is a key member of Central Valley art community.'}
    
  ],
},

  //...
];

buildings.forEach(building => {

  const marker = L.marker(building.loc)
    .addTo(map)
    .bindPopup(building.name);

  marker.building = building;

  markers.push(marker);
  
  // Show route on click
  marker.on('click', function() {
    const buildingLatLng = marker.getLatLng();
    getRoute(userLatLng, buildingLatLng);
  });
  
});

// start of implementing the new feature routing if any issues in functionality check here

// Routing function
function getRoute(start, end) {
    if(currentRoute) {
    map.removeControl(currentRoute);
  }
  const router = L.Routing.osrmv1(); 

 currentRoute = L.Routing.control({
    waypoints: [start, end],
    router: router,
     geometry: 'shortest'
  }).addTo(map);

  currentRoute.route();
}

// Populate building select
const select = document.getElementById('buildingSelect');
// Clearing existing route on new selection
select.addEventListener('change', () => {

  // Clear old route
  if(currentRoute) {
    map.removeControl(currentRoute);
  }

  // Get new route
  const name = select.value;
  const marker = markers.find(m => m.building.name === name);
  
  if (marker) {
    showRooms(marker); 
  }

});

buildings.forEach(b => {
  const option = document.createElement('option');
  option.text = b.name;
  option.value = b.name;
  select.appendChild(option); 
});

// Show study rooms or maker spaces
select.addEventListener('change', () => {

  const name = select.value;
  const marker = markers.find(m => m.building.name === name);

  if (marker) {
    showRooms(marker);
  }
  
});

function showRooms(marker) {

  const building = marker.building;
  
  let html = '';

  if (building.rooms) {
    const rooms = marker.building.rooms.map(r => `<li>${r}</li>`); 
    html += `<h3>Study Rooms</h3><ul>${rooms.join('')}</ul>`;
  }

  if (building.makerSpaces) {
    const spaces = marker.building.makerSpaces.map(s => `<li>${s.name}</li>`);
    html += `<h3>Maker Spaces</h3><ul>${spaces.join('')}</ul>`;
  }
  

 html += `
    <button class="getdirections-button"
      onclick="getRoute([${userLatLng.lat}, ${userLatLng.lng}], [${marker.getLatLng().lat}, ${marker.getLatLng().lng}])"
    >
      Get Directions
    </button>
  `;

marker.bindPopup(html).openPopup();
}

function showStudyRooms() {
   const marker = getCurrentMarker();
  
  let html = '';
//HTML code for the popup directly in js
  if (marker.building.rooms) {
    const rooms = marker.building.rooms.map(r => `<li>${r}</li>`);
    html += `<h3>Study Rooms</h3><ul>${rooms.join('')}</ul>`;
  }
  html += `
    <button class="getdirections-button"
      onclick="getRoute([${userLatLng.lat}, ${userLatLng.lng}], [${marker.getLatLng().lat}, ${marker.getLatLng().lng}])"
    >
      Get Directions
    </button>
  `;

  marker.bindPopup(html).openPopup();

}

function showMakerSpaces() {

  const marker = getCurrentMarker();

  let html = '';

  if (marker.building.makerSpaces) {
    const spaces = marker.building.makerSpaces.map(space => {
      return `
      
        <li>${space.name}</li>
        <p class="makerspace-description">${space.description}</p>
      `;
    });

    html += `<h3>Maker Spaces</h3><ul>${spaces.join('')}</ul>`;
  }
  html += `
    <button class="getdirections-button"
      onclick="getRoute([${userLatLng.lat}, ${userLatLng.lng}], [${marker.getLatLng().lat}, ${marker.getLatLng().lng}])"
    >
      Get Directions
    </button>
  `;

  marker.bindPopup(html).openPopup();

}

//  current marker on building name and select in dropdown
function getCurrentMarker() {
    return markers.find(m => m.building.name === select.value);
}
function recenterMap() {
    map.setView([37.98081780210681, -121.30860006178807], 20); 
}