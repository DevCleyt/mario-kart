class Personagem {
  nome;
  velocidade;
  manobrabilidade;
  poder;
  pontos;

  constructor(nome, velocidade, manobrabilidade, poder) {
    this.nome = nome;
    this.velocidade = velocidade;
    this.manobrabilidade = manobrabilidade;
    this.poder = poder;
    this.pontos = 0;
  }
}

// 🎮 Personagens
const mario = new Personagem("Mario", 4, 3, 3);
const bowser = new Personagem("Bowser", 5, 2, 5);
const yoshi = new Personagem("Yoshi", 3, 4, 3);
const donkeyKong = new Personagem("Donkey Kong", 2, 2, 5);
const princesaPeach = new Personagem("Princesa Peach", 3, 5, 2);
const luigi = new Personagem("Luigi", 4, 3, 3);

// Lista de jogadores
const players = [
  mario,
  bowser,
  yoshi,
  donkeyKong,
  princesaPeach,
  luigi
];

// 🎲 Dado
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// 🏁 Tipo de bloco
function getRandomBlock() {
  const random = Math.random();

  if (random < 0.33) return "RETA";
  if (random < 0.66) return "CURVA";
  return "CONFRONTO";
}

// 📢 Log do dado
function logRollResult(character, atributo, diceResult, attributeValue) {
  console.log(
    `${character.nome} 🎲 rolou ${diceResult} + ${attributeValue} (${atributo})`
  );
}

// 🎲 Sorteio de jogadores
function sortearJogadores(lista) {
  const index1 = Math.floor(Math.random() * lista.length);
  let index2;

  do {
    index2 = Math.floor(Math.random() * lista.length);
  } while (index1 === index2);

  return [lista[index1], lista[index2]];
}

// 🏎 Engine da corrida
async function playRaceEngine(caracter1, caracter2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 ===== Rodada ${round} =====`);

    const block = getRandomBlock();
    console.log(`Bloco sorteado: ${block}\n`);

    const diceResult1 = rollDice();
    const diceResult2 = rollDice();

    let total1 = 0;
    let total2 = 0;

    if (block === "RETA") {
      total1 = diceResult1 + caracter1.velocidade;
      total2 = diceResult2 + caracter2.velocidade;

      logRollResult(caracter1, "Velocidade", diceResult1, caracter1.velocidade);
      logRollResult(caracter2, "Velocidade", diceResult2, caracter2.velocidade);
    }

    if (block === "CURVA") {
      total1 = diceResult1 + caracter1.manobrabilidade;
      total2 = diceResult2 + caracter2.manobrabilidade;

      logRollResult(caracter1, "Manobrabilidade", diceResult1, caracter1.manobrabilidade);
      logRollResult(caracter2, "Manobrabilidade", diceResult2, caracter2.manobrabilidade);
    }

    if (block === "CONFRONTO") {
      total1 = diceResult1 + caracter1.poder;
      total2 = diceResult2 + caracter2.poder;

      logRollResult(caracter1, "Poder", diceResult1, caracter1.poder);
      logRollResult(caracter2, "Poder", diceResult2, caracter2.poder);
    }

    console.log(`\nResultado da rodada:`);
    console.log(`${caracter1.nome}: ${total1}`);
    console.log(`${caracter2.nome}: ${total2}`);

    if (total1 > total2) {
      console.log(`🏆 ${caracter1.nome} venceu a rodada!`);
      caracter1.pontos++;

      if (block === "CONFRONTO" && caracter2.pontos > 0) {
        caracter2.pontos--;
        console.log(`💥 ${caracter2.nome} perdeu 1 ponto por derrota no confronto!`);
      }
    } 
    else if (total2 > total1) {
      console.log(`🏆 ${caracter2.nome} venceu a rodada!`);
      caracter2.pontos++;

      if (block === "CONFRONTO" && caracter1.pontos > 0) {
        caracter1.pontos--;
        console.log(`💥 ${caracter1.nome} perdeu 1 ponto por derrota no confronto!`);
      }
    } 
    else {
      console.log("🤝 Empate!");
    }

    console.log(`\n📊 Placar Atual:`);
    console.log(`${caracter1.nome}: ${caracter1.pontos}`);
    console.log(`${caracter2.nome}: ${caracter2.pontos}`);
  }

  console.log("\n🏁 ===== RESULTADO FINAL =====");

  if (caracter1.pontos > caracter2.pontos) {
    console.log(`🏆 ${caracter1.nome} é o grande vencedor!`);
  } 
  else if (caracter2.pontos > caracter1.pontos) {
    console.log(`🏆 ${caracter2.nome} é o grande vencedor!`);
  } 
  else {
    console.log("🤝 A corrida terminou empatada!");
  }
}

// 🚀 Execução principal
(async function main() {
  const [jogadorA, jogadorB] = sortearJogadores(players);

  console.log(
    `🏁🚨 ${jogadorA.nome} e ${jogadorB.nome} estão iniciando uma corrida...\n`
  );

  await playRaceEngine(jogadorA, jogadorB);
})();