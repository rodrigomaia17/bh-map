/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var ListRenderer = __webpack_require__(1);
	var Handler = __webpack_require__(2);
	var data = __webpack_require__(4);

	function removeAllClasses(className) {
	  Array.prototype.forEach.call(document.querySelectorAll('.' + className), function (element) {
	    element.classList.remove(className);
	  });
	}

	function clearActive(hash) {
	  removeAllClasses('active');
	  document.querySelector('section[role=navigation] a[href="#'+hash +'"]').classList.add('active');
	  document.getElementById(hash).classList.add('active');
	}

	function init() {
	  var rooms = new ListRenderer('rooms', data.bh.rooms);
	  var areas = new ListRenderer('areas', data.bh.areas);
	  var handler = new Handler('room-details');

	  rooms.render();
	  areas.render();

	  handler.init(clearActive);
	}

	window.addEventListener('load', init);


/***/ },
/* 1 */
/***/ function(module, exports) {

	function addHighlighListeners(link, svg) {
	  link.addEventListener('mouseover', function () {
	    svg.classList.add('highlight');
	  });

	  link.addEventListener('mouseleave', function () {
	    svg.classList.remove('highlight');
	  });

	  svg.addEventListener('mouseover', function () {
	    link.classList.add('highlight');
	    svg.classList.add('highlight');
	  });

	  svg.addEventListener('mouseleave', function () {
	    link.classList.remove('highlight');
	    svg.classList.remove('highlight');
	  });
	}

	module.exports = function ListView (id, items) {
	  var self, ul;

	  self = {};
	  ul = document.getElementById(id);

	  if (!ul) {
	    throw new Error('no list element to render');
	  }

	  if (!items) {
	    throw new Error('no items to render into list');
	  }

	  self.render = function () {
	    items.forEach(function (item) {
	      var li, a, svg;

	      li = document.createElement('li');
	      a = document.createElement('a');
	      svg = document.getElementById(item.id);

	      a.href = '#' + item.id;
	      a.innerHTML = item.name;
	      li.appendChild(a);
	      ul.appendChild(li);
	      svg.classList.add(id);

	      addHighlighListeners(a, svg);
	    });
	  };

	  return self;
	};



/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var DetailView = __webpack_require__(3);
	var data = __webpack_require__(4);

	module.exports = function (containerId) {
	  var self = {};
	  var container = document.getElementById(containerId);

	  function clearPreviousView() {
	    if (!container) { return; }

	    while (container.firstChild) {
	      container.removeChild(container.firstChild);
	    }
	  }

	  function addNewView(hash, roomData) {
	    var view, template, roomView;

	    template = document.getElementById('room-details-template');
	    view = document.importNode(template.content, true);

	    if (roomData) {
	      roomView = new DetailView(view, roomData);
	      container.appendChild(roomView.render());
	    }
	  }

	  function changeView(hash, callback) {
	    clearPreviousView();
	    if (hash) {
	      function byId(room) { return room.id === hash; }

	      addNewView(hash, data.bh.rooms.filter(byId)[0]);
	      callback(hash);
	    }
	  }

	  self.init = function (afterChangeCallback) {
	    window.addEventListener('hashchange', function (e) {

	      var hash = e.newURL.split('#')[1];
	      changeView(hash, afterChangeCallback);
	    });

	    changeView(window.location.hash.slice(1), afterChangeCallback);
	  };

	  return self;
	};



/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function DetailView (view, data) {
	  var self;

	  self = {};

	  self.render = function () {
	    var specs;
	    view.querySelector('h1').innerHTML = data.name;
	    view.querySelector('section[role=note] p').innerHTML = data.description;
	    specs = view.querySelector('section[role=definition]');

	    data.specs.forEach(function (spec) {
	      var li = document.createElement('li');
	      li.innerHTML = spec;
	      specs.querySelector('ul').appendChild(li);
	    });

	    return view;
	  };

	  return self;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	var bh = bh || {};

	bh.rooms = [
	  {
	    id: 'grace-hopper',
	    name: 'Grace Hopper',
	    description: 'Nascida em 9 de dezembro de 1906, Rear Admiral Grace Hopper foi uma oficial naval dos Estados Unidos e uma das primeiras programadoras da história. Ela foi a desenvolvedora do primeiro compilador para uma linguagem de programação e no final de seu serviço ela era a oficial mais velha servindo a marinha dos Estados Unidos.',
	    specs: [ 'Video Conference', '6 People' ]
	  },
	  {
	    id: 'ada-lovelace',
	    name: 'Ada Lovelace',
	    description: 'Nascida em Londres em 1815, foi matemática e escritora. Seu trabalho mais notável foi o algoritmo que escreveu para ser executado na máquina analítica de Charles Babbage, sendo então considerada a primeira pessoa a criar um programa de computador da história.',
	    specs: [ 'Video Conference', '6 People' ]
	  },
	  {
	    id: 'alan-turing',
	    name: 'Alan Turing',
	    description: 'Nascido em 23 de junho de 1912, Alan Mathison Turing foi um matemático, lógico, criptoanalista e cientista da computação britânico. Foi influente no desenvolvimento da ciência da computação e na formalização do conceito de algoritmo e computação com a máquina de Turing, desempenhando um papel importante na criação do computador moderno.',
	    specs: [ 'Video Conference', '6 People' ]
	  },
	  {
	    id: 'aaron-swartz',
	    name: 'Aaron Swartz',
	    description: 'Aaron Swartz foi um ThoughtWorker, programdor, escritor, ativista de internet e organizador político. Trabalhou na especificação do RSS, criação do Reddit e também era membro do Centro Experimental de Ética da Universidade de Harvard. Preso por realizar downloads da revista científica JSTOR, Aaron cometeu sucídio aos 26 anos. Aaron utilizou a tecnologia de uma forma brilhante e corajosa para empoderar pessoas e democratizar o acesso a informações, como veículos para expressão, e ferramentas para organizar movimentos.',
	    specs: [ 'Video Conference', '6 People' ]
	  },
	  {
	    id: 'malala-yousafzai',
	    name: 'Malala Yousafzai',
	    description: 'Malala Yousafza é uma ativista paquistanesa e a pessoa mais nova a ser laureada com um Prêmio Nobel. É conhecida principalmente pela defesa dos direitos humanos das mulheres e do acesso à educação na sua região natal no Paquistão, onde as jovens são impedidas de frequentar a escola. O ativismo de Malala tornou-se um movimento internacional. Em 2012 Malala sofreu uma tentativa de assassinato. Três tiros foram disparados e um a atingiu na testa. Após o atentado Malala recebeu apoio internacional à sua causa e este movimento impulsionou o a retificação da primeira lei de direito à educação no Paquistão.',
	    specs: [ '2~4 People' ]
	  },
	  {
	    id: 'dandara',
	    name: 'Dandara',
	    description: 'Guerreira negra do período colonial do Brasil, esposa de Zumbi dos Palmares e mãe de três filhos. Dominava técnicas de capoeira e teria lutado ao lado de negros contra a escravidão no Brasil. Em Belo Horizonte, seu nome é conhecido pela Comunidade Dandara, uma ocupação rururbana que iniciou com 150 famílias e hoje possui mais de 980 moradias.',
	    specs: [ '2~4 People' ]
	  },
	  {
	    id: 'maria-da-penha',
	    name: 'Maria da Penha',
	    description: 'Maria da Penha Maia Fernandes foi vítima de violência doméstica e lutou para que seu agressor fosse condenado. Líder de movimentos de defesa dos direitos das mulheres, teve seu nome cunhado na Lei 11.340/06 que visa aumentar o rigor das punições sobre crimes domésticos, normalmente aplicada aos homens que agridem fisica e psicologicamente a mulher ou esposa.',
	    specs: [ 'Video Conference', '8 People' ]
	  },
	  {
	    id: 'chica-da-silva',
	    name: 'Chica da Silva',
	    description: 'Mineira e escrava alforriada, mãe de 13 filhos em um relacionamento com contratador de diamantes, o que lhe conferiu prestígio social, notável na época por ser típico de mulheres brancas.',
	    specs: [ 'Video Conference', '8 People' ]
	  },
	  {
	    id: 'luca-bastos',
	    name: 'Luca Bastos',
	    description: 'Um dos luminares da comunidade de tecnologia do Brasil e da ThoughtWorks. Esposo, pai, erudito, poeta, programador, velejador, corredor, e tantas outras coisas mais, ele influenciou a indústria no Brasil, colocando sua grande experiência a serviço do desenvolvimento de pessoas e suas conexões, da criação de uma cultura de tecnologia que considerava os fatores humanos e, na ThoughtWorks foi um grande polarizador, um grande guru, um grande sábio que nos ajudou a fazer e responder as questões difíceis sobre o que é ser uma empresa de cem anos.',
	    specs: [ 'Video Conference', 'Projector', '50 People' ]
	  },
	  {
	    id: 'inconfidentes',
	    name: 'Inconfidentes',
	    description: 'A Inconfidência Mineira foi um movimento de luta do povo brasileiro contra a opressão do governo português no período colonial. Os Inconfidentes, ao idealizarem uma nova república traduziram o termo latin "Libertas Quæ Sera Tamen" em "Liberdade ainda que tardia" e a expressão original foi utilizada na bandeira da Capitania das Minas Gerais, se tornando a bandeira do estado.',
	    specs: [ '2~4 People' ]
	  },
	  {
	    id: 'velho-chico',
	    name: 'Velho Chico',
	    description: 'De Minas Gerais a Alagoas, o Rio São Francisco leva vida e riqueza através de suas águas e desempenha um importante papel socioeconômico para os estados e, principalmente, para as cidades em sua margem.',
	    specs: [ '2~4 People' ]
	  },
	  {
	    id: 'aleijadinho',
	    name: 'Aleijadinho',
	    description: 'Antônio Francisco Lisboa foi um artista da época do Brasil colonial e seu estilo relacionado ao Barroco e Rococó pode ser notado em centenas de obras em igrejas de Ouro Preto. Dentre suas principais obras estão Os Profetas, em Congonhas. Seu apelido Aleijadinho foi em função de uma doença degenerativa, que fez com que perdesse os dedos das mãos sendo necessário amarrar as ferramentas em suas mãos para poder trabalhar.',
	    specs: [ '2~4 People' ]
	  }
	];

	bh.areas = [
	  {
	    id: 'entrance',
	    name: 'Entrance'
	  },
	  {
	    id: 'project-area',
	    name: 'Project Area'
	  },
	  {
	    id: 'ops',
	    name: 'Operations'
	  },
	  {
	    id: 'wc-ffa',
	    name: 'WC Free For All'
	  },
	  {
	    id: 'wc',
	    name: 'WC'
	  },
	  {
	    id: 'lounge',
	    name: 'Lounge'
	  },
	];

	exports.bh = bh;


/***/ }
/******/ ]);