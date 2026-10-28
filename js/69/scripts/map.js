const placeList = document.querySelector("#places");
const searchButton = document.querySelector("#search");
const searchInput = document.querySelector("#input");
const clearButton = document.querySelector("#clearButton")
let markers = [];
let bounds = new google.maps.LatLngBounds();

const geoNamesUrl = "https://secure.geonames.org/wikipediaSearchJSON?q=place&maxRows=number&username=lunargrid"

let searchResults = [];
let savedResults = [];
let allResults = [];

const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
    google.maps.importLibrary("maps"),
    google.maps.importLibrary("marker")
]);
const infoWindow = new InfoWindow();
let map = ""



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
        if (!wikiUrl.startsWith("http")) {
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
        if (!response.ok) {
            throw new Error("cannot get geonames rsults")
        }
        const json = await response.json();
        console.log(json)
        return json
    } catch (e) {
        console.log(e)
    }
}
async function onSearch() {
    const query = searchInput.value.trim();
    if (!query) {
        console.log("no query entered")
        return
    }

    const places = searchCache(query);
    if (places) {
        console.log("found result in cache")
        searchResults = places;

    }
    else {
        const json = await callGeoNames(query, 10);
        console.log(json.geonames);
        searchResults = json.geonames;
        searchResults = searchResults.filter(result => {
            for (let j = 0; j < allResults.length; j++) {

                if (allResults[j].title === result.title) {
                    return false;

                }
            }
            return true;

        })
        if (!searchResults) {
            return;
        }
        cacheResults(query);
    }

    allResults.push(...searchResults)
    // markers.forEach(marker => {
    //    marker.map = null;
    //})
    //markers = [];
    bounds = new google.maps.LatLngBounds();
    //placeList.replaceChildren()
    addMarkerFromArr(searchResults);
    map.fitBounds(bounds);
    addResultsToAside(searchResults);


}
async function getWikiThumb(wikipediaUrl) {
    const title = wikipediaUrl.split('/wiki/')[1];
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
    const data = await res.json();
    return data.thumbnail?.source;
}

function addResultsToAside(results) {

    results.forEach(loc => {

        const placeItem = document.createElement("li");
        placeItem.textContent = loc.title;
        placeItem.dataset.lat = loc.lat;
        placeItem.dataset.lng = loc.lng

        placeList.append(placeItem)
        //placeList.innerHTML += `<li id = ${i}>${loc.title}</li>`

    });
}
function cacheResults(query) {
    let object;

    let data = {
        query: query,
        results: []
    };
    searchResults.forEach(place => {
        object = {};
        object.title = place.title;
        object.summary = place.summary;
        object.wikipediaUrl = place.wikipediaUrl;
        object.lat = place.lat;
        object.lng = place.lng;
        data.results.push(object)


        console.log("savedresults:");
        console.log(savedResults)
    })
    console.log("saved query to cache")
    savedResults = JSON.parse(localStorage.getItem("savedResults")) || []
    savedResults.push(data);
    localStorage.setItem("savedResults", JSON.stringify(savedResults))
}

function searchCache(query) {
    let retval = ""
    savedResults = JSON.parse(localStorage.getItem("savedResults")) || []
    savedResults.forEach(search => {
        console.log("search.query query")
        console.log(search.query + query)
        if (search.query === query) {
            retval = search.results
        }
    })
    return retval
}

function initializeAsideFromCache() {
    savedResults = JSON.parse(localStorage.getItem("savedResults")) || []
    if (savedResults.length === 0) {
        return
    }
    savedResults.forEach(query => {
        addResultsToAside(query.results)
        addMarkerFromArr(query.results)
    });
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
    const place = e.target.closest("li")
    if (!place) {
        return
    }
    const lat = Number(place.dataset.lat);
    const lng = Number(place.dataset.lng)
    map.moveCamera({ center: { lat, lng }, zoom: 15 });
});

clearButton.addEventListener("click", () => {
    localStorage.setItem("savedResults", JSON.stringify([]));
    markers.forEach(marker => {
        marker.map = null;
    })
    markers = [];
    placeList.replaceChildren()
    savedResults = [];
    allResults = [];
    searchResults = [];
    bounds = new google.maps.LatLngBounds()
})
initializeMap(40.7128, -74.0060)
initializeAsideFromCache()



