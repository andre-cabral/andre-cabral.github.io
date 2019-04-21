var stagesTesouro = [
    [//stage 1
        {
            iconCorrect: 'img/icon_marujo_1.gif',
            soundCorrect: 'coin',
            text: 'Nosso marujo está em (<span class="n-color">N4</span>, <span class="l-color">L2</span>) e ele encontrou uma pista sobre o tesouro, vamos falar com ele!',
            squareCorrect: 'N4L2',
            mapImageClass: 'map1',
            propPosition: 'N2L5'
        },{
            iconCorrect: 'img/icon_chave.gif',
            soundCorrect: 'coin',
            text: '"Avistei algo brilhando em (<span class="s-color">S3</span>, <span class="l-color">L6</span>) e tinha a cor de ouro."',
            squareCorrect: 'S3L6',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: '{{icon_chest}}',
            soundCorrect: 'coin',
            text: '"O tesouro é apenas uma chave de ouro capitão?" Claro que não marujo, essa chave abre o baú que está enterrado em (<span class="n-color">N3</span>, <span class="o-color">O3</span>).',
            squareCorrect: 'N3O3',
            mapImageClass: '',
            propPosition: ''
        }
    ],//end stage 1


    [//start stage 2
        
        {
            iconCorrect: 'img/icon_marujo_3.gif',
            soundCorrect: 'coin',
            text: 'Enviamos dois marujos para olhar a região, um deles está na praia (<span class="n-color">N2</span>, <span class="o-color">O1</span>), vamos conversar com ele.',
            squareCorrect: 'N2O1',
            mapImageClass: 'map2',
            propPosition: 'N3O1'
        },{
            iconCorrect: 'img/icon_marujo_2.gif',
            soundCorrect: 'coin',
            text: '"Procurei por toda a praia e não encontrei nada, a nossa maruja (<span class="s-color">S4</span>, <span class="l-color">L6</span>) ficou encarregada de procurar no mato, talvez ela teve maior sucesso."',
            squareCorrect: 'S4L6',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: 'img/icon_chave.gif',
            soundCorrect: 'coin',
            text: '"Sim, avistei um objeto (<span class="s-color">S3</span>, <span class="l-color">L1</span>) sobre aquele morro. Tome cuidado para subir pois as rochas me parecem escorregadias!"',
            squareCorrect: 'S3L1',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: '{{icon_chest}}',
            soundCorrect: 'coin',
            text: 'De acordo com o meu mapa o baú está escondido (<span class="n-color">N1</span>, <span class="l-color">L5</span>) próximo de algumas árvores.',
            squareCorrect: 'N1L5',
            mapImageClass: '',
            propPosition: ''
        }
    ],//end stage 2

    [//stage 3
        {
            iconCorrect: 'img/icon_marujo_4.gif',
            soundCorrect: 'coin',
            text: 'A sorte está do nosso lado, temos que tomar cuidado com essa região montanhosa, espero que nosso marujo (<span class="n-color">N1</span>, <span class="o-color">O2</span>) esteja seguro.',
            squareCorrect: 'N1O2',
            mapImageClass: 'map3',
            propPosition: 'S2O1'
        },{
            iconCorrect: 'img/icon_papagaio.gif',
            soundCorrect: 'coin',
            text: 'Capitão mandei o nosso papagaio voar sobre a montanha para ter uma vista melhor, ele está sobre aquela árvore (<span class="n-color">N3</span>, <span class="l-color">L4</span>).',
            squareCorrect: 'N3L4',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: 'img/icon_chave.gif',
            soundCorrect: 'coin',
            text: '"Papagaio quer biscoito, papagaio vê (<span class="n-color">N4</span>, <span class="o-color">O5</span>), papagaio quer biscoito!"',
            squareCorrect: 'N4O5',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: '{{icon_chest}}',
            soundCorrect: 'coin',
            text: 'Cavar na areia vai ser mais fácil. O baú deve estar por perto, vamos nessa direção (<span class="s-color">S4</span>, <span class="l-color">L6</span>)!',
            squareCorrect: 'S4L6',
            mapImageClass: '',
            propPosition: ''
        }
    ],//end stage 3

    [//stage 4
        {
            iconCorrect: 'img/icon_marujo_1.gif',
            soundCorrect: 'coin',
            text: 'Marujo o que está fazendo parado (<span class="n-color">N2</span>, <span class="l-color">L3</span>)? Não é hora de descanso...',
            squareCorrect: 'N2L3',
            mapImageClass: 'map4',
            propPosition: 'N1L2'
        },{
            iconCorrect: 'img/icon_garrafa.gif',
            soundCorrect: 'coin',
            text: '"Mas Capitão, pode parecer estranho, mas acho que avistei a chave em alto mar (<span class="s-color">S2</span>, <span class="l-color">L5</span>)"',
            squareCorrect: 'S2L5',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: 'img/icon_chave.gif',
            soundCorrect: 'coin',
            text: 'Não é a chave, é uma garrafa com uma mensagem "Deixei a chave para trás (<span class="s-color">S4</span>, <span class="o-color">O1</span>), não sei onde está o baú, preciso encontrar o mapa"',
            squareCorrect: 'S4O1',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: '{{icon_chest}}',
            soundCorrect: 'coin',
            text: 'Mais alguém esteve atrás do nosso tesouro, mas apenas com esse mapa é possivel encontrar o verdadeiro local do baú (<span class="n-color">N3</span>, <span class="o-color">O5</span>).',
            squareCorrect: 'N3O5',
            mapImageClass: '',
            propPosition: ''
        }
    ],//end stage 4

    [//stage 5
        {
            iconCorrect: 'img/icon_marujo_2.gif',
            soundCorrect: 'coin',
            text: 'Precisamos apenas da última chave, vamos ver se conseguimos encontra-la por perto (<span class="s-color">S5</span>, <span class="o-color">O1</span>).',
            squareCorrect: 'S5O1',
            mapImageClass: 'map5',
            propPosition: 'S1L2'
        },{
            iconCorrect: 'img/icon_papagaio.gif',
            soundCorrect: 'coin',
            text: '"Capitão essa área está limpa, pode ser que o papagaio (<span class="n-color">N2</span>, <span class="o-color">O3</span>) tenha avistado algo."',
            squareCorrect: 'N2O3',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: 'img/icon_marujo_3.gif',
            soundCorrect: 'coin',
            text: '"Papagaio quer biscoito, papagaio vê (<span class="s-color">S4</span>, <span class="l-color">L3</span>), papagaio quer biscoito!"',
            squareCorrect: 'S4L3',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: 'img/icon_chave.gif',
            soundCorrect: 'coin',
            text: '"A última chave está ali (<span class="s-color">S2</span>, <span class="l-color">L6</span>) com ela vamos completar nossa aventura com sucesso!"',
            squareCorrect: 'S2L6',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: '{{icon_chest}}',
            soundCorrect: 'coin',
            text: 'Parabéns marujos, nossa missão está cumprida. Com o último baú (<span class="s-color">S1</span>, <span class="o-color">O4</span>) estamos ricos, poderemos aproveitar os mares por toda a vida. Vamos retornar ao navio!',
            squareCorrect: 'S1O4',
            mapImageClass: '',
            propPosition: ''
        }
    ],//end stage 5
];


var stagesResgate = [
    [//stage resgate 1
        {
            iconCorrect: 'img/icon_marujo_2.gif',
            soundCorrect: 'coin',
            text: 'As pegadas começam aqui no pier e seguem 4 quadrados em direção ao leste.',
            squareCorrect: 'N3L4',
            mapImageClass: 'map2',
            propPosition: 'N3O1'
        },{
            iconCorrect: 'img/icon_marujo_4.gif',
            soundCorrect: 'coin',
            text: '"Capitão, acabamos nos separando e um de nós seguiu 5 quadrados ao sul do pier."',
            squareCorrect: 'S3O1',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: 'img/icon_garrafa.gif',
            soundCorrect: 'coin',
            text: '"Finalmente o resgate chegou." Outra mensagem na garrafa está flutuando 2 quadrados ao norte do pier.',
            squareCorrect: 'N5O1',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: 'img/icon_marujo_1.gif',
            soundCorrect: 'coin',
            text: '"A maré subiu e fiquei ilhado nas rochas estou 2 ao sul e 4 quadrados ao oeste do pier, espero que alguém possa me salvar!"',
            squareCorrect: 'N1O5',
            mapImageClass: '',
            propPosition: ''
        }
    ],//end stage resgate 1


    [//start stage resgate 2
        {
            iconCorrect: 'img/icon_papagaio.gif',
            soundCorrect: 'coin',
            text: 'Essa pena é do papagaio, ele sobrevoou por perto, vamos 2 quadrados ao oeste dessa âncora.',
            squareCorrect: 'N1O1',
            mapImageClass: 'map4',
            propPosition: 'N1L2'
        },{
            iconCorrect: 'img/icon_marujo_3.gif',
            soundCorrect: 'coin',
            text: '"Papagaio vê, 3 ao norte daqui!"',
            squareCorrect: 'N4O1',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: 'img/icon_marujo_1.gif',
            soundCorrect: 'coin',
            text: 'Fiquei sem fôlego, falei para eles continuarem que depois eu os alcanço. Eles seguiram para o oeste, devem estar a 4 quadrados de distância daqui.',
            squareCorrect: 'N4O5',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: 'img/icon_marujo_4.gif',
            soundCorrect: 'coin',
            text: '"Capitão tem mais alguém a 5 quadrados para o sul."',
            squareCorrect: 'S2O5',
            mapImageClass: '',
            propPosition: ''
        }
    ],//end stage resgate 2

    [//stage resgate 3
        {
            iconCorrect: 'img/icon_papagaio.gif',
            soundCorrect: 'coin',
            text: 'Papagaio nos ajude a encontrar os últimos marujos, alguém esteve perto dessa flor roxa e exótica, voe para 4 quadrados a oeste daqui.',
            squareCorrect: 'S1O3',
            mapImageClass: 'map5',
            propPosition: 'S1L2'
        },{
            iconCorrect: 'img/icon_marujo_3.gif',
            soundCorrect: 'coin',
            text: '"1 ao norte e 3 ao oeste daqui, papagaio vê!"',
            squareCorrect: 'N1O6',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: 'img/icon_garrafa.gif',
            soundCorrect: 'coin',
            text: '"Capitão, avistei uma mensagem em (<span class="n-color">N4</span>, <span class="o-color">O1</span>), faltam resgatar apenas mais 2 marujos, vamos-lá!"',
            squareCorrect: 'N4O1',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: 'img/icon_marujo_2.gif',
            soundCorrect: 'coin',
            text: '"Se alguém encontrar essa carta, eu estive próximo a uma flor e caminhei 4 ao leste e 1 ao sul, envie ajuda."',
            squareCorrect: 'S2L6',
            mapImageClass: '',
            propPosition: ''
        },{
            iconCorrect: 'img/icon_marujo_4.gif',
            soundCorrect: 'coin',
            text: '"Estavamos próximo da flor, quando nos separamos. O último marujo perdido caminhou 2 quadrados ao sul e 3 para oeste. Vamos atrás dele!"',
            squareCorrect: 'S3O2',
            mapImageClass: '',
            propPosition: ''
        }
    ]// end stage resgate 3
];