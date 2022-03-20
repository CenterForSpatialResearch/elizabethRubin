 // var path = "M477.38,230.73c11.47-3.27,44.58-14.46,49.81-15.3,19.74-3.17,41,3,55.14,16.12,4.08,3.78,12.23,23.54,12.69,28.88,1.42,16.42,7.38,32.84,8.81,49.26,1.77,20.45-1.73,37.78-10.2,56.74-4.31,9.66-15.33,20.88-24.25,27.32-5.68,4.1-12.39,6.82-19.19,9.05-39.48,12.94-82.63,12-124.53,11.57-15.84-.15-32,.12-47,5-22,7.17-45.47,8.5-68.64,10.83s-85.78,6.34-98.11-43.51c-9.72-39.31,38.49-89.26,7.66-139.27-7.87-12.76-34-35-27.68-55.13,2.51-8,13.36-13.59,21.83-14.36,34.8-3.19,67.93,54.77,140.11,53.23C399.92,230.17,438.21,241.88,477.38,230.73Z" //transform="translate(-190.48 -177.29)"
var triangle="M98.31,214.85l-1.48-2.57L96,210.87l-1.48-2.55-1.88,3.26-1.89,3.27h7.54Z"// transform="translate(-70.59 -184.02)"/><path class="cls-1"
var star="M80.85,210.45l-1.17,1.13-1.13,1.11.26,1.53.28,1.63-2.84-1.49-2.83,1.49.3-1.74.24-1.42-2.3-2.24,2-.29,1.18-.17.9-1.83.51-1,.6,1.21.82,1.67Z" 	
var circle="M114.31,214.94l1-1.75.91-1.59-1.07-1.86-.85-1.47h-3.85l-.89,1.55-1,1.78.85,1.49,1.07,1.85h3.85Z"  
	
var  path1 ="M543.78,192.94C540.7,202.45,484.93,223,469,247c-16.73,25.18-72,82.56-183.81,79.66-26.29-.68-75.86-7.18-99.76-18.13-73.43-33.66-90.92-111.73-96-125C85.74,173.76,21,103,19.84,81.6c-.74-13.7,12-20.37,23.48-27.8s25.56-5.64,39.16-7.36c39.47-5,170-13.06,195.49-12,41.54,1.66,84.61,8.93,125.26,16.8,38.18,7.39,74.73,63.63,105.47,86C527.45,150.89,555.92,155.51,543.78,192.94Z" //transform="translate(-19.31 -33.82)"
// transform="translate(-190.01 -85.38)"/><path class="cls-1" 

var fillColors=["#568d99","#74b59b","#e0a926","#da4c27"]
var panel = 0    
var currentScrollTop = d3.select('#currentScrollTop')
var panelSize =500//window.innerHeight

var width = 1400
var height = 1000
var margin = 20
var networkGrid = 70
var line = d3.line()
// Create the SVG
var nodeCoordsDictionary
var nodeData = null
var linkData = null
var offset = 20
var xOffset = -140


var scrollTop = 0
var newScrollTop = 0

var svg = d3.select("#network").append("svg").attr("width",width).attr("height",height)
  
Promise.all([d3.csv("network_data_nodes.csv"),d3.csv("network_data_links.csv")])
    .then(function(data){
	//	console.log(data[0])
		
	 nodeCoordsDictionary = nodeDictionary(data[0])
	  links = data[1]
		linkData = data[1]
	  drawLinks(links,nodeCoordsDictionary)
	   nodeData =data[0]
		drawNodes(data[0])      //
	  d3.selectAll("text").style("opacity",0)
		
		
	drawDotGrid(45,700,4*networkGrid,7*networkGrid+40,svg,"700 Journalists and Family Members")
		
	drawDotGrid(5,9,9*networkGrid,6*networkGrid+30,svg,"Family Members")
	drawDotGrid(5,9,3*networkGrid+10,5*networkGrid+30,svg,"9 other journalists")
	drawDotGrid(8,40,11*networkGrid+10,4*networkGrid+30,svg,"40 staff")
	drawDotGrid(20,270,11*networkGrid+10,5*networkGrid+30,svg,"Afghan Journalists")
	drawDotGrid(3,3,11*networkGrid+10,7*networkGrid+30,svg,"3 safe houses")
		
		//var coords = [[5,1],[6,2],[8,3],[7,5],[5,4],[2,6],[3,3],[4,2]]
		
		var coordNames = ["Funding","Luke Mogulson","Scott Shadian","Blumenthal","Elizabeth Rubin","Ilaha Eli Omar","Hazami","9 other journalists","Funding"]
		drawBlob(coordNames,"#568d99",100,100,svg)
		
		var blob2Names = ["Habib","Abbas Dollar","Shawn","Shawn Guest House","700 Journalists and Family Members","Ghayour","Family Members","700 Journalists and Family Members blank","Habib Guest House"]
		
		drawBlob(blob2Names,"#e0a926",100,100,svg)
		
		var blob3Names = ["Ghayour","Najib Sharifi","40 staff blank","3 safe houses blank","3 safe houses"]
		drawBlob(blob3Names,"#74b59b",100,100,svg)
		
		
		//da4c27
		var blob4Names = ["Ghayour","Family Members","Ghayour"]
		drawBlob(blob4Names,"#da4c27",100,100,svg)
		
		
		for(var i in nodeData){
			
			if(nodeData[i].label!=undefined){
				var chapterPanel = d3.select("#content").append("div").attr("class","panel")
				.attr("id","panel_"+i)
				.style("height",(panelSize-100)+"px")
				.style("width","300px")
				.style("padding","20px")
				.style("padding-top","80px")
				.style("font-size","14px")
				//.style("position","relative")
				//.style("float","right")
				//.attr("id","panel_"+cleanString(nodeData[i].label))
				var panelTitle = chapterPanel.append("div").attr("class","panelTitle").html(nodeData[i].label)
				.style("padding","20px")
				.style("font-size","24px")
				
				var panelContent = chapterPanel.append("div").attr("class","panelContent")
				.style("padding","20px")
				.style("border","1px dotted black")
				.style("background-color","rgba(255,255,255,.8)")

				panelContent.html(nodeData[i].notes)
			}
		}
		
        //set the public variable publicData to our dataset that was just loaded, now it is available for any function outside of this promise
        //publicData = data[0]//remember that even if we load just 1 dataset this way, it is still in an array of length 1
	  //  blobs(path1);
      //  drawBarChart()
        // step0()

       //blobs(path1,"path1");
      // blobs(path2,"path2");
      // blobs(path3,"path3");
      // blobs(path4,"path4");
})

function drawBlob(coordinates,color,x,y,svg){
	var formattedCoords = []
	for(var i in coordinates){
		var coordName = coordinates[i]
		var coords = nodeCoordsDictionary[cleanString(coordName)].coords
		//console.log(coords)
		formattedCoords.push([coords[0]*networkGrid,coords[1]*networkGrid])
	}
	//console.log(formattedCoords)
	
	var linkPath = d3.line().curve(d3.curveLinearClosed)//.curve(d3.curveBasisClosed)	
	var path = svg//.append("g")//.selectAll("#_"+cleanString(source)+"_"+cleanString(target))
	.append("path")
	.attr("d",function(){
			return linkPath(formattedCoords)
	})
	.attr('fill', color)
	.attr("stroke",color)
	.attr("stroke-width",60)
	.attr("stroke-linecap","round")
	.attr("opacity",.2)
	.attr("transform","translate("+xOffset+","+offset+")")
}

function drawDotGrid(w,count,startX,startY,svg,divName){
	var r = 3
	//console.log(nodeCoordsDictionary[cleanString(divName)].chapter)
	svg.append("rect").attr("width",w*(r*2+2)).attr("height",Math.ceil(count/w)*(r*2+2))
	.attr("x",startX-4)
	.attr("y",startY-4)
	.attr("fill","white")
	for(var i =0; i<count; i++){
		var x = i%w
		var y = Math.floor(i/w)
		svg.append("circle")
		.attr("r",r)
		.attr("cx",x*(r*2+2)+startX)
		.attr("cy",y*(r*2+2)+startY)
		.attr("class","dots")
		.attr("chapter",nodeCoordsDictionary[cleanString(divName)].chapter)
		.attr("id",function(d){
			//console.log(i)
			return cleanString(divName)+"_"+i
		})
		.attr("opacity",0)
	}
}
function transitionDotGrid(chapter){
	//console.log(chapter)
	var dotChapter = d3.selectAll(".dots")//.remove()
	 .each(function(d){
	 //	console.log(d)
	 	var dotChapter = d3.select(this).attr("chapter")
		 var dotIndex = d3.select(this).attr("id").split("_")[1]
		// console.log(dotIndex)
	 	//console.log(dotChapter)
		 if(dotChapter<chapter){
		 	d3.select(this).transition().delay(dotIndex).attr("opacity",.8)
		 }else if(dotChapter==chapter){
		 	d3.select(this).transition().delay(dotIndex).attr("opacity",1)
		 }else{
		 	d3.select(this).transition().delay(1000-dotIndex).attr("opacity",0)
		 }
	 })
}
	
function nodeDictionary(data){
	var formatted ={}
	for(var i in data){
		if(data[i].label!=undefined){
			var key = cleanString(data[i].label)
			var coords = [parseInt(data[i].x),parseInt(data[i].y)]
			var chapter = data[i].chapter
			formatted[key]={coords:coords,chapter:chapter}
		}
	}
	return formatted
}

function cleanString(string){
	var string = string.replace(/[^\w\s]/gi, '')
	return string.split(" ").join("").split("%").join("")
}
	

function drawLinks(links,nodes){
	var linkPath = d3.line()//.curve(d3.curveBasis)	
	var cellSize =  networkGrid 
	
	// console.log(links)
// 	console.log(nodes)
	for(var l in links){
		var link = links[l]
		var source = link.source
		var target = link.target
		if(source!=undefined && target!=undefined){
		//console.log(source,cleanString(target))
			var sourceCoords = nodes[cleanString(source)].coords
			var targetCoords = nodes[cleanString(target)].coords
			// console.log([target])
// 			console.log(nodes)
// 			console.log(targetCoords)
			var lineData = [[sourceCoords[0]*cellSize+xOffset,sourceCoords[1]*cellSize+offset],
			[targetCoords[0]*cellSize+xOffset,targetCoords[1]*cellSize+offset]]
			
			
		//	console.log(lineData)
			var path = svg//.append("g")//.selectAll("#_"+cleanString(source)+"_"+cleanString(target))
			.append("path")
			.attr("id","_"+cleanString(source)+"_"+cleanString(target))
			.attr("d",function(){
 					return linkPath(lineData)
			})
			.attr('stroke', "black")
			
			var pathLength = path.node().getTotalLength();			
			path.attr("pathLength",pathLength)
			//.attr("stroke-dasharray", pathLength + " " + pathLength)
			.attr("stroke-dasharray",pathLength+" "+pathLength)//pathLength + " " + pathLength)
			.attr("stroke-dashoffset",pathLength)
			//.attr("stroke-dashoffset",0)
		}
	}
}
function drawNodes(data){
	//console.log(data)
	var cellSize =  networkGrid
	
	svg.selectAll(".nodes")
	.data(data)
	.enter()
	.append("text")
	.style("font-size","12px")
	.text(function(d){
		if(d.type=="blank"){
			return ""
		}else{
			return d.label
		}
	})
	.attr("x",function(d){
		return d.x*cellSize+xOffset
	})
	.style("text-anchor","middle")
	.attr("y",function(d){
		return d.y*cellSize+3+offset
	})
	.style("stroke","rgba(255,255,255,1)")
	.style("stroke-width","8px")
	.style("font-size",function(d){
		if(d.label=="Ghayour"){//}||d.label=="Elizabeth Rubin"){
			return "18px"
		}else if(d.type=="group"){
			return "18px"
		}
		else if(d.type=="city"){
			return "24px"
		}
	})
	.style("font-style",function(d){
		if(d.type=="group"){
					return "italic"
				}
	})
	.style("font-weight",function(d){
		if(d.label=="Ghayour"||d.label=="Elizabeth Rubin"){
			return 400
		}
	})
	.attr("id",function(d){return "_"+cleanString(d.label)+"_halo"})
	
	
	svg.selectAll(".nodes")
	.data(data)
	.enter()
	.append("text")
	.style("font-size","12px")
	.text(function(d){
		if(d.type=="blank"){
			return ""
		}else{
			return d.label
		}
	})
	.attr("x",function(d){
		return d.x*cellSize+xOffset
	})
	.style("text-anchor","middle")
	.attr("y",function(d){
		return d.y*cellSize+3+offset
	})
	.style("font-size",function(d){
		if(d.label=="Ghayour"){//}||d.label=="Elizabeth Rubin"){
			return "18px"
		}else if(d.type=="group"){
			return "18px"
		}
		else if(d.type=="city"){
			return "24px"
		}
	})
	.style("font-style",function(d){
		if(d.type=="group"){
					return "italic"
				}
	})
	.style("font-weight",function(d){
		if(d.label=="Ghayour"||d.label=="Elizabeth Rubin"){
			return 400
		}
	})
	.attr("id",function(d){return "_"+cleanString(d.label)})
	

	
		// svg.selectAll(".nodesMarkers")
	// 	.data(data)
	// 	.enter()
	// 	.append("circle")
	// 	// .attr("d",function(d){
	// // 		console.log(d.type)
	// // 		return triangle
	// // 	})
	// 		.attr("r",function(d){
	// 			if(d.label=="Ghayour"){//}||d.label=="Elizabeth Rubin"){
	// 				return 5
	// 			}else{
	// 				return 3
	// 			}
	// 		})
	// 	// .attr("transform",
	// 	// 	function(d){
	// 	// 		return 	"translate("+d.coords.split(",")[0]*cellSize+","+d.coords.split(",")[1]*cellSize+")"
	// 	// 	}
	// 	// )
	// 	 .attr("cx",function(d){
	//  		return d.coords.split(",")[0]*cellSize
	//  	})
	//  	.attr("cy",function(d){
	//  		return d.coords.split(",")[1]*cellSize
	//  	})
}
  
  // This function will animate the path over and over again
function blobs(pathData,divName) {
  // Add the line
  var path = svg.append("path")
      .attr("d", pathData)// line(data))
      .attr("fill", "none")
      .attr("stroke-width", 1)
      .attr("stroke", "black")
	  .attr("id",divName)
	
  
  // Get the length of the path, which we will use for the intial offset to "hide"
  // the graph
  var pathLength = path.node().getTotalLength();
  console.log(pathLength)
  
  path.attr("pathLength",pathLength)
    // Animate the path by setting the initial offset and dasharray and then transition the offset to 0
    path.attr("stroke-dasharray", pathLength + " " + pathLength)
      //  .attr("stroke-dashoffset", pathLength)
          // .transition()
        //   .ease(d3.easeLinear)
          .attr("stroke-dashoffset",pathLength)// pathLength)//newScrollTop/pathLength*pathLength)
  
          // .duration(pathData.length*20)
 //          .on("end", function(d){
 //          	d3.select(this).style("fill","red").attr("fill-opacity",.2)
 //          }); // this will repeat the animation after waiting 1 second
    
};
  
function setOpacityNodes(chapter){
	//console.log(chapter)
	for(var i in nodeData){
		if(parseInt(nodeData[i].chapter)<chapter){
		//	console.log(nodeId)
			if(nodeData[i].label!=undefined){
				var nodeId = cleanString(nodeData[i].label)
				d3.selectAll("#_"+nodeId).transition().style("opacity",1)
				.style("font-weight",200)//.style("fill","black")
				d3.selectAll("#_"+nodeId+"_halo").style("opacity",1)
				.style("fill","black")
			}
		}else if(parseInt(nodeData[i].chapter)==chapter){
		//	console.log(nodeId)
			if(nodeData[i].label!=undefined){
				var nodeId = cleanString(nodeData[i].label)
				d3.selectAll("#_"+nodeId).transition().style("opacity",1)
				.style("font-weight",400)//.style("fill","red")
				d3.selectAll("#_"+nodeId+"_halo").style("opacity",1)
			}
		}
		else{
			if(nodeData[i].label!=undefined){
				var nodeId = cleanString(nodeData[i].label)
				d3.selectAll("#_"+nodeId).style("opacity",0)
				d3.selectAll("#_"+nodeId+"_halo").style("opacity",0)
			}
		}
	}
}

function transitionLinks(chapter){
	// console.log(nodeCoordsDictionary)
// 	console.log(chapter)
	for(var i in linkData){
		if(linkData[i].source!=undefined){
			var source = linkData[i].source
			var target = linkData[i].target
		//	console.log(source,target)
			var linkId = "_"+cleanString(source)+"_"+cleanString(target)
			//console.log(linkId)
		
			var linkChapter = parseInt(nodeCoordsDictionary[cleanString(source)].chapter)
		//	console.log(linkChapter)
			
			var pathLength = d3.select("#"+linkId).attr("pathLength")
			if(linkChapter<chapter){
			//	console.log(scrollTop)
				//if showing chpater, then show just the whole line
				d3.selectAll("#"+linkId).style("opacity",.6)
				.transition().duration(1000).attr("stroke-dashoffset",0)//.attr("stroke","black")
			}else if(linkChapter==chapter){
				//show the percentage of the line that is scrolled through
				var percentScroll = panelSize/(scrollTop-(chapter-1)*panelSize)
				// console.log(percentScroll)
// 				console.log(scrollTop)
				d3.selectAll("#"+linkId).transition().ease(d3.easeLinear)
				.attr("stroke-dashoffset",0)
				.attr("opacity",1)//.attr("stroke","red")
			}else{
				//show no line, transition to none
				d3.selectAll("#"+linkId).transition()
				.attr("stroke-dashoffset",pathLength)//.style("opacity",0)
			
			}
		}
		
		
	}
}

function step0(){
	setOpacityNodes(0)
    console.log("do step0")
  //  blobs(path2,"path2");
}

function step1(){
	setOpacityNodes(6)
    console.log("do step1")
   // blobs(path3,"path3");
}

function step2(){
	setOpacityNodes(15)
    console.log("do step2")    
  //  blobs(path4,"path4");
}
function step3(){
	setOpacityNodes(20)
    console.log("do step3")
    //blobs(path1,"path1");
}
function step4(){
	setOpacityNodes(30)
    console.log("do step4")
    //blobs(path1,"path1");
}
function step5(){
	setOpacityNodes(40)
    console.log("do step5")
    //blobs(path1,"path1");
}


//here we list all the functions we have above, but just the names without the parenthesis so we don't trigger the functions now
var listOfStepFunctions =[step0,step1,step2,step3,step4,step5]


//whenever the container scrolls, we need to get how far it has scrolled and save it to the variable newScrollTop
d3.select('#container')
.on("scroll.scroller", function() {
    newScrollTop = d3.select('#container').node().scrollTop
	var chapter = Math.floor(scrollTop/panelSize)
	//console.log(newScrollTop)
		//
	// d3.select("#path2").attr("stroke-dashoffset", newScrollTop)
	// d3.select("#path3").attr("stroke-dashoffset", newScrollTop)
	// d3.select("#path").attr("stroke-dashoffset", newScrollTop)
	// d3.select("#path4").attr("stroke-dashoffset", newScrollTop)
		//
	// blobTransitions("#path2", newScrollTop)
	// blobTransitions("#path3", newScrollTop)
});

function blobTransitions(blobId, scrolltop){
	var pathLength = d3.select(blobId).attr("pathLength")
	//console.log(pathLength)
	//.attr("stroke-dasharray",pathLength+" "+pathLength)
	
	if(scrolltop>pathLength){
		d3.select(blobId).attr("fill",fillColors[0]).attr("opacity",.2)
	}else{
		d3.select(blobId).attr("fill","none")
		d3.select(blobId).attr("stroke-dashoffset",scrolltop)//pathLength-(scrolltop%pathLength))
	}
}


//the render function ties everything together
function render(){
//each panel is the size of the window height
    
  if (scrollTop !== newScrollTop) {//if the scroller has moved
      
      if(scrollTop<newScrollTop){//if the new value is smaller, then it is scrolling down
          scrollTop = newScrollTop//set the scroller place to its new placement
          //console.log("down")//if it is going down, we need to add 1 to the panel number because we want to trigger the next panel
          var panelNumber = Math.ceil(scrollTop/panelSize)+1//therefore which panel we are on is the scroller's place divided by panel height
      }else{
          //console.log("up")
          scrollTop = newScrollTop//set the scroller place to its new placement
          var panelNumber = Math.floor(scrollTop/panelSize)//therefore which panel we are on is the scroller's place divided by panel height
      }
      
      if(panel!=panelNumber){//if this panel number has changed
          panel = panelNumber//set the panel number to this new number so we can keep track
		  setOpacityNodes(panel)
		  transitionLinks(panel)
		  //transitionLinks(panel)
		   transitionDotGrid(panel)
		  
		  d3.selectAll(".panel").style("opacity",.2)
		  d3.select("#panel_"+(panel-1)).style("opacity",1)
       //   listOfStepFunctions[panel]()//do the function that is associated with that panel number, we add the () to the end of the name to trigger the function
      }
	  // if(panel==1){
  // 		  blobTransitions("#path1", scrollTop)
  // 	  }
    currentScrollTop.text(scrollTop)
  }
  window.requestAnimationFrame(render)//we continue to call this function recursively because we always need to check where the scroller is
}

window.requestAnimationFrame(render)




  
