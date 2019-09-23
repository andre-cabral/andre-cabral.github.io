var requirements= {

  igreja: [
    {//igreja 1
      igreja: 0,
      mercado: 0,
      transporte: 0,
      industria: 0,
      moradia: 0
    },
    {//igreja 2
      igreja: 0,
      mercado: 0,
      transporte: 0,
      industria: 0,
      moradia: 1
    },
    {//igreja 3
      igreja: 0,
      mercado: 1,
      transporte: 1,
      industria: 0,
      moradia: 3
    }
  ],

  mercado: [
    {//mercado 1
      igreja: 0,
      mercado: 0,
      transporte: 0,
      industria: 0,
      moradia: 0
    },
    {//mercado 2
      igreja: 0,
      mercado: 0,
      transporte: 1,
      industria: 1,
      moradia: 1
    },
    {//mercado 3
      igreja: 0,
      mercado: 0,
      transporte: 2,
      industria: 3,
      moradia: 3
    }
  ],

  transporte: [
    {//transporte 1
      igreja: 0,
      mercado: 0,
      transporte: 0,
      industria: 0,
      moradia: 0
    },
    {//transporte 2
      igreja: 0,
      mercado: 0,
      transporte: 0,
      industria: 0,
      moradia: 1
    },
    {//transporte 3
      igreja: 0,
      mercado: 0,
      transporte: 0,
      industria: 0,
      moradia: 2
    },
  ],

  industria: [
    {//industria 1
      igreja: 0,
      mercado: 0,
      transporte: 0,
      industria: 0,
      moradia: 0
    },
    {//industria 2
      igreja: 0,
      mercado: 0,
      transporte: 1,
      industria: 0,
      moradia: 1
    },
    {//industria 3
      igreja: 0,
      mercado: 2,
      transporte: 3,
      industria: 0,
      moradia: 3
    }
  ],

  moradia: [
    {//moradia 1
      igreja: 0,
      mercado: 0,
      transporte: 0,
      industria: 0,
      moradia: 0
    },
    {//moradia 2
      igreja: 0,
      mercado: 0,
      transporte: 0,
      industria: 0,
      moradia: 0
    },
    {//moradia 3
      igreja: 2,
      mercado: 2,
      transporte: 2,
      industria: 2,
      moradia: 0
    }
  ]
};

var blocks= {
  igreja: [
    {//igreja 1
      igreja: [],
      mercado: [],
      transporte: [],
      industria: [1],
      moradia: []
    },
    {//igreja 2
      igreja: [],
      mercado: [],
      transporte: [2],
      industria: [],
      moradia: []
    },
    {//igreja 3
      igreja: [],
      mercado: [2,3],
      transporte: [],
      industria: [2,3],
      moradia: []
    }
  ],

  mercado: [
    {//mercado 1
      igreja: [],
      mercado: [],
      transporte: [],
      industria: [],
      moradia: []
    },
    {//mercado 2
      igreja: [],
      mercado: [],
      transporte: [],
      industria: [2],
      moradia: []
    },
    {//mercado 3
      igreja: [2],
      mercado: [],
      transporte: [3],
      industria: [],
      moradia: []
    }
  ],

  transporte: [
    {//transporte 1
      igreja: [],
      mercado: [],
      transporte: [],
      industria: [1],
      moradia: []
    },
    {//transporte 2
      igreja: [1],
      mercado: [],
      transporte: [],
      industria: [],
      moradia: []
    },
    {//transporte 3
      igreja: [],
      mercado: [1],
      transporte: [],
      industria: [],
      moradia: [3]
    },
  ],

  industria: [
    {//industria 1
      igreja: [],
      mercado: [],
      transporte: [],
      industria: [],
      moradia: []
    },
    {//industria 2
      igreja: [],
      mercado: [],
      transporte: [],
      industria: [],
      moradia: [1]
    },
    {//industria 3
      igreja: [2],
      mercado: [2],
      transporte: [],
      industria: [],
      moradia: []
    }
  ],

  moradia: [
    {//moradia 1
      igreja: [],
      mercado: [],
      transporte: [],
      industria: [],
      moradia: []
    },
    {//moradia 2
      igreja: [],
      mercado: [],
      transporte: [],
      industria: [1],
      moradia: []
    },
    {//moradia 3
      igreja: [1],
      mercado: [],
      transporte: [],
      industria: [],
      moradia: []
    }
  ]
};