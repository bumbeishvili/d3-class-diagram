var svg = d3.select('#d3-class-diagram').append('svg')
    .attr({
      width: 600,
      height: 400,
      id: 'diagram'
    });

d3.classDiagram.addMarkers(svg.append('defs'));

var classes = [
  {
    x: 40, y: 20, width: 190,
    classname: 'Receiver',
    methods: [
      'command()'
    ]
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
    x: 40, y: 220, width: 190,
    classname: 'ConcreteReceiver',
    methods: [
      'command()'
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
      {x: boxes.Receiver.rightX(), y: boxes.Command.midY()},
      {x: boxes.Command.x, y: boxes.Command.midY()}
    ],
    markerEnd: 'arrowhead'
  },

  {
    points: [
      {x: boxes.ConcreteReceiver.rightX(), y: boxes.ConcreteCommand.midY()},
      {x: boxes.ConcreteCommand.x, y: boxes.ConcreteCommand.midY()}
    ],
    markerEnd: 'diamond'
  },

  {
    points: [
      {x: boxes.ConcreteReceiver.midX(), y: boxes.ConcreteReceiver.y},
      {x: boxes.ConcreteReceiver.midX(), y: boxes.Receiver.bottomY()}
    ],
    dashline: true,
    markerEnd: 'triangle'
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
