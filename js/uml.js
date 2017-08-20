var svg = d3.select('#d3-class-diagram').append('svg')
    .attr({
      width: 900,
      height: 600,
      id: 'diagram'
    });

d3.classDiagram.addMarkers(svg.append('defs'));

var classes = [
  {
    x: 340, y: 420, width: 190,
    classname: 'Client'
  },

  {
    x: 340, y: 20, width: 190,
    classname: 'Command',
    interface: true,
    methods: [
      'execute()'
    ]
  },
  {
    x: 700, y: 20, width: 190,
    classname: 'Invoker'
  },


  {
    x: 40, y: 220, width: 190,
    classname: 'Receiver',
    methods: [
      'action()'
    ]
  },

  {
    x: 340, y: 220, width: 190,
    classname: 'ConcreteCommand',
    attributes: [
      'receiver'
    ],
    methods: [
      'execute()'
    ]
  },
];

var boxes = d3.classDiagram.createClasses(classes);
svg.selectAll('text').attr('font-family', 'Noto Sans Japanese');
svg.append("text").append("textPath").attr("xlink:href", "#100").attr("startOffset", "30%").attr("font-size", "12").text("creates");

var connectors = [
  {
    points: [
      {x: boxes.Client.midX(), y: boxes.Client.y},
      {x: boxes.Client.midX(), y: boxes.ConcreteCommand.bottomY()}
    ],

    markerEnd: 'arrowhead'
  },

  {
    points: [
      {x: boxes.Receiver.rightX(), y: boxes.ConcreteCommand.midY()},
      {x: boxes.ConcreteCommand.x, y: boxes.ConcreteCommand.midY()}
    ],
    markerEnd: 'diamond'
  },

  {
    points: [
      {x: boxes.Command.rightX(), y: boxes.Invoker.midY()},
      {x: boxes.Invoker.x, y: boxes.Invoker.midY()}
    ],
    markerEnd: 'diamond'
  },


  {
    points: [
      {x: boxes.Command.midX(), y: boxes.ConcreteCommand.y},
      {x: boxes.Command.midX(), y: boxes.Command.bottomY()}
    ],
    dashline: true,
    markerEnd: 'triangle'
  }
];

d3.classDiagram.createConnectors(connectors);
