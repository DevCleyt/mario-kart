
(async function main() {
  console.log(
    `🏁🚨 ${player1.nome} e ${player2.nome} estão iniciando uma corrida...\n`
  );

  await playRaceEngine(player1, player2);
})();