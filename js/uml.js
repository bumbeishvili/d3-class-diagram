var svg = d3.select('#d3-class-diagram').append('svg')
    .attr({
      width: 1024,
      height: 768,
      id: 'diagram'
    });
svg.append("text").attr("id", "hfeng").append("textPath").attr("xlink:href", "#curve").text("here I am");

d3.classDiagram.addMarkers(svg.append('defs'));

var classes = [
  {
    x: 40, y: 320, width: 190,
    classname: 'Aggregate',
    methods: [
      'iterator()'
    ]
  },

  {
    x: 340, y: 320, width: 190,
    classname: 'Iterator',
    methods: [
      'hasNext()',
      'next()'
    ]
  },

  {
    x: 40, y: 520, width: 190,
    classname: 'ConcreteAggregate',
    methods: [
      'iterator()'
    ]
  },

  {
    x: 340, y: 520, width: 190,
    classname: 'ConcreteIterator',
    attributes: [
      'aggregate'
    ],
    methods: [
      'hasNext()',
      'next()'
    ]
  },
];

var boxes = d3.classDiagram.createClasses(classes);
svg.selectAll('text').attr('font-family', 'Noto Sans Japanese');

var connectors = [
  {
    points: [
      {x: boxes.Aggregate.rightX(), y: boxes.Iterator.midY()},
      {x: boxes.Iterator.x, y: boxes.Iterator.midY()}
    ],
    markerEnd: 'arrowhead'
  },

  {
    points: [
      {x: boxes.ConcreteAggregate.rightX(), y: boxes.ConcreteIterator.midY()},
      {x: boxes.ConcreteIterator.x, y: boxes.ConcreteIterator.midY()}
    ],
    markerEnd: 'diamond'
  },

  {
    points: [
      {x: boxes.ConcreteAggregate.midX(), y: boxes.ConcreteAggregate.y},
      {x: boxes.ConcreteAggregate.midX(), y: boxes.Aggregate.bottomY()}
    ],
    dashline: true,
    markerEnd: 'triangle'
  },
  {
    points: [
      {x: boxes.Iterator.midX(), y: boxes.ConcreteIterator.y},
      {x: boxes.Iterator.midX(), y: boxes.Iterator.bottomY()}
    ],
    dashline: true,
    markerEnd: 'triangle'
  }
];

d3.classDiagram.createConnectors(connectors);
