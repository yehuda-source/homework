const placeList = document.querySelector("#places");
const searchButton = document.querySelector("#search");
const searchInput = document.querySelector("#input");
let markers = [];
let bounds = new google.maps.LatLngBounds();

const geoNamesUrl = "https://secure.geonames.org/wikipediaSearchJSON?q=place&maxRows=number&username=lunargrid"

let searchResults = [];

const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
    google.maps.importLibrary("maps"),
    google.maps.importLibrary("marker")
]);
const infoWindow = new InfoWindow();
let map;
function initializeMap(lat, lng) {

    map = new /*google.maps.*/Map(document.getElementById('map'), {
        center: { lat: lat, lng: lng },
        zoom: 15,
        mapId: "DEMO_MAP_ID",
        //renderingType: 'VECTOR',
    });
    console.log(map)
    map.addListener('idle', e => {
        const center = map.getCenter()
        console.log('map center changed', center.lat(), center.lng())
    });
}
function addMarkerFromArr(arr) {
    arr.forEach(loc => {
        addMarker(loc)

    })
}
async function addMarker(loc) {
    console.log("adding marker" + loc.title)
    const marker = new /*google.maps.marker.*/AdvancedMarkerElement({
        map,
        position: { lat: loc.lat, lng: loc.lng }

    });
    markers.push(marker);
    bounds.extend(marker.position);
    let wikiThumb
    if ((wikiThumb = await getWikiThumb(loc.wikipediaUrl))) {
        console.log("changing marker icon")
        const markerImg = document.createElement("img");
        markerImg.className = "map-icon";
        console.log(wikiThumb)
        markerImg.src = wikiThumb;
        marker.append(markerImg)
    }
    marker.addListener("click", () => {
        let wikiUrl = loc.wikipediaUrl;
        if(!wikiUrl.startsWith("http")){
            wikiUrl = "https://" + wikiUrl
        }
        const infoContent = document.createElement("div");
        infoContent.className = "place-info";
        const placeTitle = document.createElement("h3");
        placeTitle.textContent = loc.title;
        infoContent.append(placeTitle);
        const placeSummary = document.createElement("p");
        placeSummary.textContent = loc.summary;
        infoContent.append(placeSummary);
        const wikiAnchor = document.createElement("a");
        wikiAnchor.href = wikiUrl;
        wikiAnchor.textContent = "wikipedia";
        infoContent.append(wikiAnchor);
        
        infoWindow.setContent(infoContent);
        infoWindow.open({
            anchor: marker
        })
    })

}

async function callGeoNames(name, number = 5) {
    let query = geoNamesUrl.replace("place", name);
    query = query.replace("number", number)
    try {
        const response = await fetch(query);
        const json = await response.json();
        console.log(json)
        return json
    } catch {
        console.log("error")

    }
}
async function onSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        console.log("no query entered")
        return
    }
    const json = await callGeoNames(query, 10);
    console.log(json.geonames)
    searchResults = json.geonames
    markers.forEach(marker => {
        marker.map = null;
    })
    markers = [];
    bounds = new google.maps.LatLngBounds();
    placeList.replaceChildren()
    addMarkerFromArr(json.geonames);
    map.fitBounds(bounds);

    let i = 0
    json.geonames.forEach(loc => {
        const placeItem  = document.createElement("li");
        placeItem.textContent = loc.title;
        placeItem.id = `${i}`;
        placeList.append(placeItem)
        //placeList.innerHTML += `<li id = ${i}>${loc.title}</li>`
        i++;
    });

}
async function getWikiThumb(wikipediaUrl) {
  const title = wikipediaUrl.split('/wiki/')[1];
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
  const data = await res.json();
  return data.thumbnail?.source;
}
searchButton.addEventListener("click", async () => {
    onSearch()
});
searchInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        onSearch()
    }
})
placeList.addEventListener("click", (e) => {
    map.moveCamera({ center: { lat: searchResults[e.target.id].lat, lng: searchResults[e.target.id].lng }, zoom: 15 });
    //addMarker(currentResults[e.target.value])yeshiva

})
initializeMap(40.7128, -74.0060)



