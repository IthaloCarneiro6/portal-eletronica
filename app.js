const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
const categories = [
  {
    nome: "Sensores",
    itens: [
      {
        nome: "Sensor de Distância Ultrassônico",
        slug: "sensor-ultrassonico",
        imagem: "/images/sensor-ultrassonico.png",
        imagemAlt: "Sensor ultrassônico HC-SR04 sobre fundo claro: placa azul com dois cilindros metálicos cobertos por tela, marcados T (transmissor) e R (receptor), um cristal oscilador entre eles e quatro pinos na parte inferior identificados como Vcc, Trig, Echo e GND.",
        video: "/videos/sensor-ultrassonico.mp4",
        legenda: "/videos/sensor-ultrassonico.vtt",
        descricao: "Mede distâncias usando ondas sonoras.",
        texto:
          "O sensor emite uma onda ultrassônica e mede o tempo que o eco leva para retornar. Com esse tempo, é possível estimar a distância até um objeto. É muito usado em robôs e sistemas de detecção de obstáculos.",
        icone: "◉",
      },
    ],
  },
  {
    nome: "Atuadores",
    itens: [
      {
        nome: "Buzzer",
        slug: "buzzer",
        imagem: "/images/buzzer.png",
        imagemAlt: "Buzzer piezoelétrico: pequeno cilindro preto visto de lado, com o topo liso e dois terminais metálicos finos saindo da parte de baixo.",
        video: "/videos/buzzer.mp4",
        legenda: "/videos/buzzer.vtt",
        descricao: "Transforma sinais elétricos em som.",
        texto:
          "O buzzer produz som quando recebe um sinal elétrico. Dependendo do tipo, ele pode emitir um tom fixo ou reproduzir frequências diferentes controladas pelo circuito. É útil para alertas e sinalizações sonoras.",
        icone: "◖",
      },
    ],
  },
  {
    nome: "Componentes eletrônicos",
    itens: [
      {
        nome: "Resistores",
        descricao: "Controlam a corrente em um circuito.",
        icone: "≋",
      },
      {
        nome: "LEDs",
        descricao: "Emitem luz ao receber corrente elétrica.",
        icone: "✳",
      },
    ],
  },
  {
    nome: "Módulos eletrônicos",
    itens: [
      {
        nome: "Display LCD",
        slug: "display-lcd",
        imagem: "/images/display-lcd.png",
        imagemAlt: "Display LCD 16x2 em placa verde, levemente inclinado, com tela amarelo-esverdeada exibindo o texto “16 x 2 LCD” em caracteres formados por pontinhos e uma fileira de 16 pinos de conexão na borda superior.",
        video: "/videos/display-lcd.mp4",
        legenda: "/videos/display-lcd.vtt",
        descricao: "Exibe informações em uma pequena tela.",
        texto:
          "Um display LCD usa cristais líquidos para controlar a passagem de luz e formar caracteres ou imagens. Em projetos eletrônicos, ele recebe dados de uma placa controladora para mostrar mensagens, leituras e instruções.",
        icone: "▤",
      },
    ],
  },
  {
    nome: "Placas e microcontroladores",
    itens: [
      {
        nome: "Arduino Uno",
        slug: "arduino-uno",
        imagem: "/images/arduino-uno.png",
        imagemAlt: "Placa Arduino Uno azul vista de cima: conector USB e entrada de energia à esquerda, botão de reset no canto superior, fileira de pinos digitais de 0 a 13 na borda de cima, pinos de energia e analógicos A0 a A5 na borda de baixo e o chip microcontrolador ATmega328P, preto e retangular, no centro.",
        video: "/videos/arduino-uno.mp4",
        legenda: "/videos/arduino-uno.vtt",
        descricao: "Uma placa para criar projetos interativos.",
        texto:
          "O Arduino Uno é uma placa com microcontrolador que executa instruções programadas. Ele pode ler sinais de sensores e controlar saídas, como LEDs e motores, ajudando a criar protótipos de automação e robótica.",
        icone: "∞",
      },
      {
        nome: "ESP32",
        descricao: "Microcontrolador com conectividade sem fio.",
        icone: "▦",
      },
    ],
  },
  {
    nome: "Equipamentos e instrumentos",
    itens: [
      {
        nome: "Multímetro",
        descricao: "Instrumento para medições elétricas.",
        icone: "◴",
      },
    ],
  },
  {
    nome: "Materiais e acessórios",
    itens: [
      {
        nome: "Protoboard",
        descricao: "Permite montar circuitos sem solda.",
        icone: "▥",
      },
      {
        nome: "Jumpers",
        descricao: "Fios para conectar pontos de um circuito.",
        icone: "⌁",
      },
    ],
  },
];
const itens = categories.flatMap((c) =>
  c.itens.map((item) => ({ ...item, categoria: c.nome })),
);
app.get("/", (req, res) =>
  res.render("home", { categorias: categories.length, total: itens.length }),
);
app.get("/catalogo", (req, res) => {
  const q = String(req.query.q || "").trim();
  const busca = q.toLocaleLowerCase("pt-BR");
  const filtradas = categories
    .map((c) => ({
      ...c,
      itens: c.itens.filter((i) =>
        `${i.nome} ${c.nome}`.toLocaleLowerCase("pt-BR").includes(busca),
      ),
    }))
    .filter((c) => c.itens.length);
  res.render("catalogo", { categories: filtradas, q });
});
app.get("/componentes/:slug", (req, res) => {
  const item = itens.find((i) => i.slug === req.params.slug);
  if (!item) return res.status(404).send("Componente não encontrado");
  res.render("componente", { item });
});
app.get("/login", (req, res) => res.render("login"));
app.get("/admin/componentes", (req, res) => res.render("admin", { itens }));
app.get("/admin/componentes/novo", (req, res) =>
  res.render("admin-form", { item: null, categories }),
);
app.get("/admin/componentes/:id/editar", (req, res) => {
  const id = Number(req.params.id);
  const item = Number.isInteger(id) && id >= 0 ? itens[id] : undefined;
  if (!item) return res.status(404).send("Componente não encontrado");
  res.render("admin-form", { item, categories });
});
app.get("/admin/categorias", (req, res) =>
  res.render("admin-categorias", { categories }),
);
app.listen(process.env.PORT || 3000, () =>
  console.log(
    `Portal disponível em http://localhost:${process.env.PORT || 3000}`,
  ),
);
