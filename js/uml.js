var svg = d3.select('#d3-class-diagram').append('svg')
    .attr({
      width: 1024,
      height: 768,
      id: 'diagram'
    });
d3.classDiagram.addMarkers(svg.append('defs'));

var classes = [
  {
    x: 40, y: 320, width: 190,
    classname: '<<Interface>>\nAggregate',
    methods: [
      'iterator()'
    ]
  },

  {
    x: 340, y: 320, width: 190,
    classname: '<<Interface>>\nIterator',
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
