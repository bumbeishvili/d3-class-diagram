var svg = d3.select('#d3-class-diagram').append('svg')
    .attr({
      width: 940,
      height: 280,
      id: 'diagram'
    });
d3.classDiagram.addMarkers(svg.append('defs'));

var classes = [
  {
    x: 240, y: 20, width: 260,
    classname: 'User',
    attributes: [
      'microposts: Array[Micropost]',
      'relationships: Array[Relationship]',
      'followed_users: Array[User]',
      'reversed_relationships: Array[Relationship]',
      'followers: Array[User]',
    ]
  },
  {
    x: 560, y: 20, width: 140,
    classname: 'Micropost',
    attributes: [
      'user: User',
      'content: string',
      'id: integer'
    ],
    methods: [
      'hello: int'
    ]
  },
  {
    x: 40, y: 20, width: 160,
    classname: 'Relationship',
    attributes: [
      'follower : User',
      'followed : User'
    ]
  }
];

var boxes = d3.classDiagram.createClasses(classes);
svg.selectAll('text').attr('font-family', 'Noto Sans Japanese');

var connectors = [
  {
    points: [
      {x: boxes.User.rightX(), y: boxes.Micropost.midY()},
      {x: boxes.Micropost.x, y: boxes.Micropost.midY()}
    ],
    markerEnd: 'arrowhead'
  },
  {
    points: [
      {x: boxes.Relationship.rightX(), y: boxes.User.midY()},
      {x: boxes.User.x, y: boxes.User.midY()}
    ],
    markerEnd: 'filledDiamond'
  },
  {
    points: [
      {x: boxes.User.x, y: boxes.User.bottomY() - 20},
      {x: boxes.User.x - 20, y: boxes.User.bottomY() - 20},
      {x: boxes.User.x - 20, y: boxes.User.bottomY() + 20},
      {x: boxes.User.x + 20, y: boxes.User.bottomY() + 20},
      {x: boxes.User.x + 20, y: boxes.User.bottomY()}
    ],
    markerEnd: 'diamond'
  },
  {
    points: [
      {x: boxes.User.rightX(), y: boxes.User.bottomY() - 20},
      {x: boxes.User.rightX() + 20, y: boxes.User.bottomY() - 20},
      {x: boxes.User.rightX() + 20, y: boxes.User.bottomY() + 20},
      {x: boxes.User.rightX() - 20, y: boxes.User.bottomY() + 20},
      {x: boxes.User.rightX() - 20, y: boxes.User.bottomY()}
    ],
    markerEnd: 'diamond'
  }
];

d3.classDiagram.createConnectors(connectors);

d3.select("#generate")
    .on("click", writeDownloadLink);

function writeDownloadLink(){
  alert("hello")
  //get svg element.
  var svg = document.getElementById("diagram");

  //get svg source.
  var serializer = new XMLSerializer();
  var source = serializer.serializeToString(svg);

  //add name spaces.
  if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  }

  //add xml declaration
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

  //convert svg source to URI data scheme.
  var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

  //set url value to a element's href attribute.
  document.getElementById("diagram").href = url;
  console.log(url);
  //you can download svg file by right click menu.
}
