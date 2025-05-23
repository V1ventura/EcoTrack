document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

const ctx = document.getElementById('dataChart').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Temperatura (°C)',
                        data: [],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.4
                    }, {
                        label: 'Salinidade (ppt)',
                        data: [],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monitoramento Marinho - Salvador, Baía de Todos os Santos',
                            color: '#e0e0e0',
                            font: {
                                size: 16
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            ticks: { color: '#e0e0e0' }
                        },
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            ticks: { color: '#e0e0e0' }
                        }
                    }
                }
            });
    
            const cityData = {
                salvador: {
                    sea: "Baía de Todos os Santos",
                    baseTemp: 26,
                    baseSalinity: 35,
                    basePH: 8.1,
                    baseOxygen: 6
                },
                rio: {
                    sea: "Baía de Guanabara",
                    baseTemp: 24,
                    baseSalinity: 33,
                    basePH: 7.9,
                    baseOxygen: 5.5
                },
                santos: {
                    sea: "Baía de Santos",
                    baseTemp: 22,
                    baseSalinity: 32,
                    basePH: 8.0,
                    baseOxygen: 5.8
                }
            };
    
            const infoTexts = {
                sensors: {
                    title: "Sensores Aquáticos Avançados",
                    short: "Sensores aquáticos avançados monitoram a saúde dos ecossistemas marinhos, coletando dados como temperatura, acidez e qualidade da água. Esses dispositivos interconectados ajudam a entender os impactos das mudanças climáticas e a promover a preservação dos oceanos.",
                    detailed: "Nossa rede de sensores aquáticos avançados representa o estado da arte em monitoramento marinho..."
                },
                buoys: {
                    title: "Rede de Boias Inteligentes",
                    short: "Nossa rede de boias inteligentes fornece dados oceanográficos e meteorológicos críticos.",
                    detailed: "Nossa rede de boias inteligentes representa uma revolução no monitoramento oceânico..."
                },
                drones: {
                    title: "Drones Aquáticos Autônomos",
                    short: "Nossa frota de drones aquáticos autônomos explora as profundezas dos oceanos, coletando dados em áreas de difícil acesso.",
                    detailed: "Nossa frota de drones aquáticos autônomos representa o pináculo da exploração oceânica moderna..."
                },
                ai: {
                    title: "Inteligência Artificial Preditiva",
                    short: "Nossa IA preditiva analisa enormes volumes de dados coletados para prever tendências, identificar anomalias e gerar insights acionáveis.",
                    detailed: "Nossa plataforma de Inteligência Artificial Preditiva é o cérebro por trás da nossa operação de monitoramento marinho..."
                },
                future: {
                    title: "Tecnologias Futuras",
                    short: "Estamos desenvolvendo tecnologias revolucionárias como nanorobôs aquáticos para monitoramento em nível microscópico...",
                    detailed: "Na vanguarda da inovação em monitoramento marinho, estamos desenvolvendo tecnologias que parecem saídas da ficção científica..."
                }
            };
    
            let currentService = 'sensors';
    
            function updateServiceInfo(service) {
                const serviceInfo = infoTexts[service];
                const title = document.getElementById('serviceTitle');
                const description = document.getElementById('serviceDescription');
                const infoContainer = document.getElementById('serviceInfo');
    
                infoContainer.style.opacity = 0;
                setTimeout(() => {
                    title.textContent = serviceInfo.title;
                    description.textContent = serviceInfo.short;
                    infoContainer.style.opacity = 1;
                    infoContainer.style.animation = 'fadeIn 0.5s ease forwards';
                }, 300);
    
                document.getElementById('detailedTitle').textContent = serviceInfo.title;
                document.getElementById('detailedText').textContent = serviceInfo.detailed;
    
                updateChartLabels(service);
    
                if (service === 'ai' || service === 'future') {
                    chart.data.labels = [];
                    chart.data.datasets[0].data = [];
                    chart.data.datasets[1].data = [];
                    chart.options.plugins.title.text = 'Dados não disponíveis para este serviço';
                } else {
                    chart.options.plugins.title.text = `Monitoramento Marinho - ${document.getElementById('citySelect').value.charAt(0).toUpperCase() + document.getElementById('citySelect').value.slice(1)}, ${cityData[document.getElementById('citySelect').value].sea}`;
                }
                chart.update();
            }
    
            function updateChartLabels(service) {
                switch(service) {
                    case 'sensors':
                        chart.data.datasets[0].label = 'Temperatura (°C)';
                        chart.data.datasets[1].label = 'Salinidade (ppt)';
                        break;
                    case 'buoys':
                        chart.data.datasets[0].label = 'Altura das Ondas (m)';
                        chart.data.datasets[1].label = 'Velocidade do Vento (km/h)';
                        break;
                    case 'drones':
                        chart.data.datasets[0].label = 'Profundidade (m)';
                        chart.data.datasets[1].label = 'Visibilidade (m)';
                        break;
                    case 'ai':
                        chart.data.datasets[0].label = 'Precisão de Previsão (%)';
                        chart.data.datasets[1].label = 'Anomalias Detectadas';
                        break;
                    case 'future':
                        chart.data.datasets[0].label = 'Eficiência Energética (%)';
                        chart.data.datasets[1].label = 'Inovação Tecnológica';
                        break;
                }
                chart.update();
            }
    
            function updateData() {
                const now = new Date();
                const selectedCity = document.getElementById('citySelect').value;
                const cityInfo = cityData[selectedCity];
    
                if (currentService !== 'ai' && currentService !== 'future') {
                    chart.data.labels.push(now.toLocaleTimeString());
                }
    
                switch(currentService) {
                    case 'sensors':
                        chart.data.datasets[0].data.push(cityInfo.baseTemp + Math.random() * 2 - 1);
                        chart.data.datasets[1].data.push(cityInfo.baseSalinity + Math.random() * 0.5 - 0.25);
                        break;
                    case 'buoys':
                        chart.data.datasets[0].data.push(Math.random() * 3 + 1);
                        chart.data.datasets[1].data.push(Math.random() * 20 + 10);
                        break;
                    case 'drones':
                        chart.data.datasets[0].data.push(Math.random() * 100 + 50);
                        chart.data.datasets[1].data.push(Math.random() * 10 + 5);
                        break;
                    case 'ai':
                    case 'future':
                        break;
                }
    
                if (chart.data.labels.length > 10 && currentService !== 'ai' && currentService !== 'future') {
                    chart.data.labels.shift();
                    chart.data.datasets[0].data.shift();
                    chart.data.datasets[1].data.shift();
                }
    
                chart.update();
    
                document.getElementById('tempValue').textContent = (cityInfo.baseTemp + Math.random() * 2 - 1).toFixed(1) + '°C';
                document.getElementById('salinityValue').textContent = (cityInfo.baseSalinity + Math.random() * 0.5 - 0.25).toFixed(1) + ' ppt';
                document.getElementById('phValue').textContent = (cityInfo.basePH + Math.random() * 0.2 - 0.1).toFixed(2);
                document.getElementById('oxygenValue').textContent = (cityInfo.baseOxygen + Math.random() * 1 - 0.5).toFixed(1) + ' mg/L';
    
                updateAIInsights();
            }
    
            setInterval(updateData, 2000);
    
            function updateAIInsights() {
                const insights = [
                    "Detectada uma anomalia térmica na Baía de Todos os Santos. Possível indicação de correntes anormais.",
                    "Padrões de corrente sugerem um aumento na temperatura da água nos próximos meses em Salvador.",
                    "Níveis de microplásticos 15% acima do normal detectados na costa de Salvador.",
                    "Mudança na rota migratória das baleias jubarte observada próximo à costa da Bahia.",
                    "Leve aumento na acidificação detectado na Baía de Todos os Santos. Monitorando impacto nos recifes locais.",
                    "Pequeno bloom de algas previsto para a próxima semana na costa de Salvador. Alertando autoridades.",
                    "Comportamento incomum observado em cardumes de peixes na Baía de Todos os Santos. Investigando causas.",
                    "Níveis de oxigênio dissolvido estáveis na zona costeira de Salvador. Condições favoráveis para a vida marinha.",
                    "Detecção de padrões de pesca irregular próximo à costa da Bahia. Notificando órgãos de fiscalização.",
                    "Previsão de ondas mais altas que o normal para o próximo fim de semana em Salvador. Alertando surfistas e banhistas."
                ];
                document.getElementById('aiText').textContent = insights[Math.floor(Math.random() * insights.length)];
            }
    
            document.querySelectorAll('.service-button').forEach(button => {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.service-button').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    currentService = this.dataset.service;
                    updateServiceInfo(currentService);
                    chart.data.labels = [];
                    chart.data.datasets[0].data = [];
                    chart.data.datasets[1].data = [];
                    chart.update();
                });
            });
    
            document.getElementById('citySelect').addEventListener('change', updateCity);
    
            function updateCity() {
                const selectedCity = document.getElementById('citySelect').value;
                const cityInfo = cityData[selectedCity];
                document.getElementById('seaName').textContent = cityInfo.sea;
                chart.options.plugins.title.text = `Monitoramento Marinho - ${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}, ${cityInfo.sea}`;
                updateData();
            }
    
            updateServiceInfo('sensors');
            updateCity();
            


  
let scene, camera, renderer, globe, raycaster, mouse;

const oceanData = {
  'Oceano Atlântico': {
    color: 0x1e90ff,
    info: {
      curiosidades: 'É o segundo maior oceano do mundo e separa as Américas da Europa e África.',
      poluicao: {
        nivel: 'Alto',
        percentual: 75,
        detalhes: 'O Atlântico sofre com altos níveis de poluição, especialmente nas áreas costeiras densamente povoadas.'
      },
      lixos: {
        principais: ['Plásticos', 'Microplásticos', 'Poluição por óleo', 'Esgoto não tratado', 'Produtos químicos industriais'],
        detalhes: 'Estima-se que mais de 8 milhões de toneladas de plástico entrem no Atlântico anualmente. A poluição por óleo de navios e plataformas petrolíferas é uma preocupação constante.'
      },
      impactos: 'A poluição está causando a morte de vida marinha, alterando ecossistemas e afetando as economias costeiras. Há relatos de "zonas mortas" onde a vida aquática não consegue sobreviver devido à falta de oxigênio causada pela poluição.',
      iniciativas: 'Vários países estão implementando proibições de plásticos de uso único. Projetos de limpeza de praias e oceanos estão ganhando força, como o The Ocean Cleanup.'
    }
  },
  'Oceano Pacífico': {
    color: 0x4169e1,
    info: {
      curiosidades: 'É o maior e mais profundo oceano do planeta, contendo a Fossa das Marianas.',
      poluicao: {
        nivel: 'Muito Alto',
        percentual: 90,
        detalhes: 'O Pacífico contém a infame "Grande Mancha de Lixo do Pacífico", uma área de concentração de detritos marinhos no Pacífico Norte.'
      },
      lixos: {
        principais: ['Plásticos', 'Microplásticos', 'Redes de pesca abandonadas', 'Lixo eletrônico', 'Poluentes químicos'],
        detalhes: 'A Grande Mancha de Lixo do Pacífico cobre uma área estimada em 1,6 milhão de km². Cerca de 80% do lixo vem de fontes terrestres, enquanto 20% vem de navios.'
      },
      impactos: 'A vida marinha está ingerindo e ficando presa em detritos plásticos. Espécies como tartarugas marinhas, aves marinhas e mamíferos marinhos são particularmente afetados. Os microplásticos estão entrando na cadeia alimentar.',
      iniciativas: 'Organizações como a Ocean Voyages Institute estão realizando missões de limpeza em grande escala. Inovações em materiais biodegradáveis estão sendo desenvolvidas para substituir plásticos.'
    }
  },
  'Oceano Índico': {
    color: 0x0000cd,
    info: {
      curiosidades: 'É o terceiro maior oceano e contém importantes rotas de comércio marítimo.',
      poluicao: {
        nivel: 'Alto',
        percentual: 70,
        detalhes: 'O Oceano Índico enfrenta desafios únicos devido à alta densidade populacional em suas costas e ao rápido desenvolvimento industrial em muitos países da região.'
      },
      lixos: {
        principais: ['Plásticos', 'Detritos industriais', 'Poluição por petróleo', 'Esgoto não tratado', 'Fertilizantes agrícolas'],
        detalhes: 'Estima-se que 5 países asiáticos (China, Indonésia, Filipinas, Vietnã e Sri Lanka) sejam responsáveis por mais da metade do plástico que entra nos oceanos.'
      },
      impactos: 'A poluição está ameaçando ecossistemas únicos, como os recifes de coral do Mar Vermelho e do Oceano Índico ocidental. A pesca excessiva combinada com a poluição está causando um declínio significativo nas populações de peixes.',
      iniciativas: 'A Associação das Nações do Sudeste Asiático (ASEAN) adotou um acordo para reduzir a poluição marinha. Projetos de restauração de manguezais estão sendo implementados para ajudar a filtrar poluentes.'
    }
  },
  'Oceano Ártico': {
    color: 0x00bfff,
    info: {
      curiosidades: 'É o menor e menos profundo dos oceanos, grande parte coberto por gelo.',
      poluicao: {
        nivel: 'Moderado',
        percentual: 45,
        detalhes: 'Embora menos poluído que outros oceanos devido à sua localização remota, o Ártico enfrenta ameaças únicas devido às mudanças climáticas e ao aumento da atividade humana.'
      },
      lixos: {
        principais: ['Microplásticos', 'Poluentes químicos persistentes', 'Petróleo', 'Metais pesados', 'Detritos de pesca'],
        detalhes: 'Pesquisas recentes descobriram concentrações significativas de microplásticos no gelo marinho ártico. Poluentes orgânicos persistentes (POPs) se acumulam na região devido às correntes atmosféricas e oceânicas.'
      },
      impactos: 'A poluição está afetando a vida selvagem ártica, incluindo ursos polares, focas e aves marinhas. O derretimento do gelo está liberando poluentes anteriormente presos, reintroduzindo-os no ambiente.',
      iniciativas: 'O Conselho do Ártico está trabalhando em estratégias para prevenir a poluição marinha. Há esforços para regular o tráfego marítimo e a exploração de recursos na região.'
    }
  },
  'Oceano Antártico': {
    color: 0x87cefa,
    info: {
      curiosidades: 'Também conhecido como Oceano Austral, circunda a Antártida.',
      poluicao: {
        nivel: 'Baixo a Moderado',
        percentual: 30,
        detalhes: 'Embora menos poluído que outros oceanos, o Antártico não está imune aos impactos globais da poluição.'
      },
      lixos: {
        principais: ['Microplásticos', 'Detritos de pesca', 'Poluentes químicos persistentes', 'Lixo de navios e estações de pesquisa'],
        detalhes: 'Mesmo nesta região remota, foram encontrados microplásticos e fibras sintéticas em amostras de água e gelo. Redes de pesca abandonadas representam uma ameaça à vida marinha.'
      },
      impactos: 'A poluição está afetando espécies únicas da Antártida, como pinguins, baleias e focas. Há preocupações sobre como os poluentes podem afetar o krill, base da cadeia alimentar antártica.',
      iniciativas: 'O Tratado da Antártida e seu Protocolo de Proteção Ambiental fornecem um quadro para a proteção do ambiente antártico. Há esforços para limitar o turismo e regular as atividades de pesquisa para minimizar o impacto ambiental.'
    }
  }
};

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(6, 64, 64); 
  const material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/land_ocean_ice_cloud_2048.jpg'),
    bumpMap: new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/earth_bumpmap.jpg'),
    bumpScale: 0.05,
    specularMap: new THREE.TextureLoader().load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/earth_specular_2048.jpg'),
    specular: new THREE.Color('grey')
  });
  
  globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  camera.position.z = 12; 

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('click', onMouseClick, false);
  window.addEventListener('resize', onWindowResize, false);

  const closeButton = document.querySelector('.close-button');
  closeButton.addEventListener('click', hideOceanInfo);

  animate();
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick(event) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(globe);

  if (intersects.length > 0) {
    const intersection = intersects[0];
    const lat = 90 - Math.acos(intersection.point.y / 6) * 180 / Math.PI; 
    const lon = (Math.atan2(intersection.point.z, intersection.point.x) * 180 / Math.PI + 180) % 360 - 180;

    let selectedOcean = getOceanAtCoordinates(lat, lon);
    if (selectedOcean) {
      showOceanInfo(selectedOcean);
    }
  }
}

function getOceanAtCoordinates(lat, lon) {
  if (lat > 60) return 'Oceano Ártico';
  if (lat < -60) return 'Oceano Antártico';
  if (lon >= -90 && lon <= 20) return 'Oceano Atlântico';
  if ((lon > 20 && lon <= 180) || (lon < -140 && lon >= -180)) return 'Oceano Índico';
  return 'Oceano Pacífico';
}

function showOceanInfo(oceanName) {
  const info = oceanData[oceanName].info;
  const infoContent = document.getElementById('info-content');
  infoContent.innerHTML = `
    <h2>${oceanName}</h2>
    <p><strong>Curiosidades:</strong> ${info.curiosidades}</p>
    <h3>Poluição</h3>
    <p><strong>Nível:</strong> ${info.poluicao.nivel}</p>
    <div class="pollution-meter">
      <div class="pollution-level" style="width: ${info.poluicao.percentual}%; background-color: ${getPollutionColor(info.poluicao.percentual)};">
        ${info.poluicao.percentual}%
      </div>
    </div>
    <p>${info.poluicao.detalhes}</p>
    <h3>Principais Lixos</h3>
    <ul>
      ${info.lixos.principais.map(lixo => `<li>${lixo}</li>`).join('')}
    </ul>
    <p><strong>Detalhes:</strong> ${info.lixos.detalhes}</p>
    <h3>Impactos</h3>
    <p>${info.impactos}</p>
    <h3>Iniciativas</h3>
    <p>${info.iniciativas}</p>
  `;
  const infoDiv = document.getElementById('info');
  infoDiv.classList.add('active');
}

function hideOceanInfo() {
  const infoDiv = document.getElementById('info');
  infoDiv.classList.remove('active');
}

function getPollutionColor(percentage) {
  const green = Math.floor((100 - percentage) * 2.55);
  const red = Math.floor(percentage * 2.55);
  return `rgb(${red}, ${green}, 0)`;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.001;
  renderer.render(scene, camera);
}

init();
