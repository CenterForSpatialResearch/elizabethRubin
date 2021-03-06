Promise.all([d3.csv("places.csv")])
.then(function(data){
	ready(data)
})
var map
function ready(data){

	var config = {
	    style: 'mapbox://styles/c4sr-gsapp/cl103op2j001515jz0abmtgia',
	    accessToken: 'pk.eyJ1IjoiYzRzci1nc2FwcCIsImEiOiJja2J0ajRtNzMwOHBnMnNvNnM3Ymw5MnJzIn0.fsTNczOFZG8Ik3EtO9LdNQ',
	    showMarkers: false,
	    theme: 'light',
	    title: '',
	    subtitle: '',
	    byline: '',
	    footer: '',
	    chapters: makeChapters(data[0])
	};
	//console.log(config)
	configMap(config)
	addPath(data[0])
	 
}
//chapter,name,lat ,lng,zoom,notes,link

function makeChapters(data){
	//console.log(data)
	var chapters = []
	for(var i in data){
		var place = data[i]
		if(place.name!=undefined){
			var chapter = {
				id:"chapter_"+i,
				alignment:"left",
				title:place.name,
				description:place.notes,
				location:{
					//center:[34,-73],
					center:[parseFloat(place.lng),parseFloat(place.lat)],
					zoom:place.zoom-2,
					pitch:0,
					bearing:0
				},

					onChapterEnter:[],
					onChapterExit:[]
			}
			chapters.push(chapter)
		}
	
	}
	//console.log(chapters)
	return chapters
}

function addPath(data){
	var coordinates = []
	for(var i in data){
		if(data[i].zoom>15){
		coordinates.push([parseFloat(data[i].lng),parseFloat(data[i].lat)])
		}
	}
//	console.log(coordinates)
	
	map.on('load', () => {
		
			map.addSource('route', {
			'type': 'geojson',
				'data': {
					'type': 'Feature',
					'properties': {},
					'geometry': {
						'type': 'LineString',
						'coordinates': coordinates
					}
				}
			});
			map.addLayer({
				'id': 'route',
				'type': 'line',
				'source': 'route',
				'layout': {
					'line-join': 'round',
					'line-cap': 'round'
				},
				'paint': {
					'line-color': '#00aeef',
					'line-width': 2
				}
			},"admin");
	
			var symbolDictionary = {
				house:"triangle",
				office:"square",
				park:"circle",
				armybase:"hexagon",
				airport:"hexagon",
				city:"star",
				country:"star"
			}
	
		 for(var i in data){
	 		if(data[i].name!=undefined){
	
	
	 			var title = data[i].name
	 			var index = i
	 			var coordinate = [parseFloat(data[i].lng),parseFloat(data[i].lat)]
	 			const el = document.createElement('div');
	 			  //el.className = symbolDictionary[data[i].type];
				  var type = symbolDictionary[data[i].type]
				  console.log(type)

				  
	 			  el.className = type+" icon"
				  
				d3.select("."+type).attr("background-image","url('icons/"+type+".png')")
				  
	 			  //console.log(data[i].type,symbolDictionary[data[i].type])
	 			  // make a marker for each feature and add to the map
	 			  new mapboxgl.Marker(el).setLngLat(coordinate).addTo(map);
	
	 			//addMarker(map,title,index, marker)
	 		}
	
	 	}
	});	
}

function addMarker(map,title,index, marker){
	map.addSource('points_'+index, {
	'type': 'geojson',
		'data': {
			'type': 'FeatureCollection',
			'features': [
				{
					// feature for Mapbox DC
					'type': 'Feature',
					'geometry': {
					'type': 'Point',
					'coordinates': [-77.03238901390978, 38.913188059745586]
					},
					'properties': {
						'title': title
					}
				}
			]
		}
	});
	
	map.addLayer({
		'id': 'points',
		'type': 'symbol',
		'source': 'points',
		'layout': {
			'icon-image': marker,
			'text-field': ['get', 'title'],
			'text-font': [
			'Open Sans Semibold',
			'Arial Unicode MS Bold'
			],
			'text-offset': [0, 1.25],
			'text-anchor': 'top'
		}
	});
	
}

function configMap(config){
	console.log(config)
	var layerTypes = {
	    'fill': ['fill-opacity'],
	    'line': ['line-opacity'],
	    'circle': ['circle-opacity', 'circle-stroke-opacity'],
	    'symbol': ['icon-opacity', 'text-opacity'],
	    'raster': ['raster-opacity'],
	    'fill-extrusion': ['fill-extrusion-opacity'],
	    'heatmap': ['heatmap-opacity']
	}

	var alignments = {
	    'left': 'lefty',
	    'center': 'centered',
	    'right': 'righty',
	    'full': 'fully'
	}

	function getLayerPaintType(layer) {
	    var layerType = map.getLayer(layer).type;
	    return layerTypes[layerType];
	}

	function setLayerOpacity(layer) {
	    var paintProps = getLayerPaintType(layer.layer);
	    paintProps.forEach(function(prop) {
	        var options = {};
	        if (layer.duration) {
	            var transitionProp = prop + "-transition";
	            options = { "duration": layer.duration };
	            map.setPaintProperty(layer.layer, transitionProp, options);
	        }
	        map.setPaintProperty(layer.layer, prop, layer.opacity, options);
	    });
	}

	var story = document.getElementById('story');
	var features = document.createElement('div');
	features.setAttribute('id', 'features');

	var header = document.createElement('div');

	if (config.title) {
	    var titleText = document.createElement('h1');
	    titleText.innerText = config.title;
	    header.appendChild(titleText);
	}

	if (config.subtitle) {
	    var subtitleText = document.createElement('h2');
	    subtitleText.innerText = config.subtitle;
	    header.appendChild(subtitleText);
	}

	if (config.byline) {
	    var bylineText = document.createElement('p');
	    bylineText.innerText = config.byline;
	    header.appendChild(bylineText);
	}

	if (header.innerText.length > 0) {
	    header.classList.add(config.theme);
	    header.setAttribute('id', 'header');
	    story.appendChild(header);
	}

	config.chapters.forEach((record, idx) => {
	    var container = document.createElement('div');
	    var chapter = document.createElement('div');

	    if (record.title) {
	        var title = document.createElement('h3');
	        title.innerText = record.title;
	        chapter.appendChild(title);
	    }

	    if (record.image) {
	        var image = new Image();
	        image.src = record.image;
	        chapter.appendChild(image);
	    }

	    if (record.description) {
	        var story = document.createElement('p');
	        story.innerHTML = record.description;
	        chapter.appendChild(story);
	    }

	    container.setAttribute('id', record.id);
	    container.classList.add('step');
	    if (idx === 0) {
	        container.classList.add('active');
	    }

	    chapter.classList.add(config.theme);
	    container.appendChild(chapter);
	    container.classList.add(alignments[record.alignment] || 'centered');
	    if (record.hidden) {
	        container.classList.add('hidden');
	    }
	    features.appendChild(container);
	});

	story.appendChild(features);

	var footer = document.createElement('div');

	if (config.footer) {
	    var footerText = document.createElement('p');
	    footerText.innerHTML = config.footer;
	    footer.appendChild(footerText);
	}

	if (footer.innerText.length > 0) {
	    footer.classList.add(config.theme);
	    footer.setAttribute('id', 'footer');
	    story.appendChild(footer);
	}

	mapboxgl.accessToken = config.accessToken;

	const transformRequest = (url) => {
	    const hasQuery = url.indexOf("?") !== -1;
	    const suffix = hasQuery ? "&pluginName=scrollytellingV2" : "?pluginName=scrollytellingV2";

	    return {
	      url: url + suffix
	    }
	}

	map = new mapboxgl.Map({
	    container: 'map',
	    style: config.style,
	    center: config.chapters[0].location.center,
	    zoom: config.chapters[0].location.zoom,	    //
		
	    bearing: config.chapters[0].location.bearing,
	    pitch: config.chapters[0].location.pitch,
	    interactive: false,
	    transformRequest: transformRequest
	});

	if (config.showMarkers) {
	    var marker = new mapboxgl.Marker({ color: config.markerColor });
	    marker.setLngLat(config.chapters[0].location.center).addTo(map);
	}

	// instantiate the scrollama
	var scroller = scrollama();

	map.on("load", function() {
	    
	    if (config.use3dTerrain) {
	        map.addSource('mapbox-dem', {
	            'type': 'raster-dem',
	            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
	            'tileSize': 512,
	            'maxzoom': 14
	        });
	        // add the DEM source as a terrain layer with exaggerated height
	        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

	        // add a sky layer that will show when the map is highly pitched
	        map.addLayer({
	            'id': 'sky',
	            'type': 'sky',
	            'paint': {
	                'sky-type': 'atmosphere',
	                'sky-atmosphere-sun': [0.0, 0.0],
	                'sky-atmosphere-sun-intensity': 15
	            }
	        });
	    };

	    // setup the instance, pass callback functions
	    scroller
	    .setup({
	        step: '.step',
	        offset: 0.5,
	        progress: true
	    })
	    .onStepEnter(response => {
	        var chapter = config.chapters.find(chap => chap.id === response.element.id);
			console.log(chapter)
	        response.element.classList.add('active');
	        map[chapter.mapAnimation || 'flyTo'](chapter.location);

	        if (config.showMarkers) {
	            marker.setLngLat(chapter.location.center);
	        }
	        if (chapter.onChapterEnter.length > 0) {
	            chapter.onChapterEnter.forEach(setLayerOpacity);
	        }
	        if (chapter.callback) {
	            window[chapter.callback]();
	        }
	        if (chapter.rotateAnimation) {
	            map.once('moveend', function() {
	                const rotateNumber = map.getBearing();
	                map.rotateTo(rotateNumber + 90, {
	                    duration: 24000, easing: function (t) {
	                        return t;
	                    }
	                });
	            });
	        }
	    })
	    .onStepExit(response => {
	        var chapter = config.chapters.find(chap => chap.id === response.element.id);
	        response.element.classList.remove('active');
	        if (chapter.onChapterExit.length > 0) {
	            chapter.onChapterExit.forEach(setLayerOpacity);
	        }
	    });
	});

	// setup resize event
	window.addEventListener('resize', scroller.resize);
}
