/**
 * Processa um treino finalizado para calcular e atualizar as paeHours dos jogadores participantes.
 *
 * @async
 * @param {object} trainData - O objeto do treino, contendo AttendedPlayers e Status.
 *                             Espera-se que trainData.Status seja "ENDED".
 * @param {object} dbModels - Um objeto contendo seus modelos de banco de dados.
 *                            Espera-se que contenha dbModels.UserModel para o modelo de usuário.
 * @returns {Promise<void>}
 * @throws {Error} Se houver um erro ao interagir com o banco de dados.
 */
async function processarTreinoParaPaeHours(trainData, dbModels) {
  if (!trainData || typeof trainData !== 'object') {
    console.error("processarTreinoParaPaeHours: trainData inválido.");
    return;
  }

  if (!dbModels || !dbModels.UserModel) {
    console.error("processarTreinoParaPaeHours: dbModels.UserModel não fornecido.");
    return;
  }
  const UserModel = dbModels.UserModel;

  if (trainData.Status !== "ENDED") {
    console.log(`Treino ${trainData._id || 'ID Desconhecido'}: Status não é ENDED. paeHours não serão processadas.`);
    return;
  }

  if (!trainData.AttendedPlayers || trainData.AttendedPlayers.length === 0) {
    console.log(`Treino ${trainData._id || 'ID Desconhecido'}: Sem jogadores participantes. paeHours não serão processadas.`);
    return;
  }

  console.log(`Processando paeHours para o treino finalizado: ${trainData._id || 'ID Desconhecido'}`);

  for (const attendance of trainData.AttendedPlayers) {
    const { PlayerId, EntranceTimestamp, ExitTimestamp } = attendance;

    if (!PlayerId || typeof EntranceTimestamp !== 'number' || typeof ExitTimestamp !== 'number') {
      console.warn(`Dados de participação incompletos para o treino ${trainData._id}: PlayerId=${PlayerId}. Pulando.`);
      continue;
    }

    if (ExitTimestamp <= EntranceTimestamp) {
      console.warn(`Timestamps inválidos para PlayerId ${PlayerId} no treino ${trainData._id}: ExitTimestamp (${ExitTimestamp}) não é maior que EntranceTimestamp (${EntranceTimestamp}). Pulando.`);
      continue;
    }

    try {
      const duracaoMs = ExitTimestamp - EntranceTimestamp;
      const duracaoHoras = duracaoMs / (1000 * 60 * 60); // Converte milissegundos para horas

      const player = await UserModel.findById(PlayerId).exec();

      if (player) {
        const paeHoursAtuais = player.paeHours || 0;
        const novasPaeHours = paeHoursAtuais + duracaoHoras;

        await UserModel.findByIdAndUpdate(PlayerId, { $set: { paeHours: novasPaeHours } }).exec();

        console.log(`PlayerId ${PlayerId}: paeHours atualizadas de ${paeHoursAtuais.toFixed(2)} para ${novasPaeHours.toFixed(2)} (adicionadas ${duracaoHoras.toFixed(2)} horas).`);
      } else {
        console.warn(`PlayerId ${PlayerId} não encontrado no banco de dados (coleção Usuários). Não foi possível atualizar paeHours para o treino ${trainData._id}.`);
      }
    } catch (error) {
      console.error(`Erro ao processar paeHours para PlayerId ${PlayerId} no treino ${trainData._id}:`, error);
    }
  }
}

module.exports = {
  processarTreinoParaPaeHours,
};
