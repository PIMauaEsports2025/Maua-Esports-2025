const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Adicionar middleware CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(bodyParser.json());

// --- Authentication Middleware ---
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== 'Bearer frontendmauaesports') {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

// --- Load Default Data from JSON Files ---
let defaultTrains, defaultModalities;
try {
    defaultTrains = require('./defaultTrains.json');
    defaultModalities = require('./defaultModalities.json');
    console.log('Dados padrão carregados com sucesso');
} catch (error) {
    console.error('Erro ao carregar dados padrão:', error);
    process.exit(1);
}

// In-memory copies for runtime
let trains = JSON.parse(JSON.stringify(defaultTrains));
let modalities = JSON.parse(JSON.stringify(defaultModalities));

// --- Reset Data Every 24 Hours ---
function resetData() {
    trains = JSON.parse(JSON.stringify(defaultTrains));
    modalities = JSON.parse(JSON.stringify(defaultModalities));
    console.log('Data has been reset to default values.');
}
setInterval(resetData, 24 * 60 * 60 * 1000);

// Função para formatar expressão CRON em formato legível
function formatarCronParaLegivel(cronExpression) {
    try {
        // Formato CRON: segundos minutos horas dia-do-mês mês dia-da-semana
        const partes = cronExpression.split(' ');
        if (partes.length !== 6) {
            console.warn('Expressão CRON inválida:', cronExpression);
            return cronExpression;
        }

        const [segundos, minutos, horas, diaMes, mes, diaSemana] = partes;
        
        const diasSemana = {
            '0': 'Domingo',
            '1': 'Segunda-feira',
            '2': 'Terça-feira',
            '3': 'Quarta-feira',
            '4': 'Quinta-feira',
            '5': 'Sexta-feira',
            '6': 'Sábado'
        };

        const meses = {
            '1': 'Janeiro',
            '2': 'Fevereiro',
            '3': 'Março',
            '4': 'Abril',
            '5': 'Maio',
            '6': 'Junho',
            '7': 'Julho',
            '8': 'Agosto',
            '9': 'Setembro',
            '10': 'Outubro',
            '11': 'Novembro',
            '12': 'Dezembro'
        };

        // Formatar horário com zeros à esquerda
        const horario = `${horas.padStart(2, '0')}:${minutos.padStart(2, '0')}`;
        
        // Formatar dia da semana
        const diaSemanaFormatado = diaSemana === '*' ? '' : ` (${diasSemana[diaSemana]})`;
        
        // Formatar mês
        const mesFormatado = mes === '*' ? '' : ` de ${meses[mes]}`;
        
        // Formatar dia do mês
        const diaFormatado = diaMes === '*' ? '' : ` dia ${diaMes}`;

        return `${horario}${diaFormatado}${mesFormatado}${diaSemanaFormatado}`;
    } catch (error) {
        console.error('Erro ao formatar CRON:', error);
        return cronExpression;
    }
}

// Função para formatar os treinos agendados de uma modalidade
function formatarTreinosAgendados(modalidade) {
    try {
        if (modalidade.ScheduledTrainings && Array.isArray(modalidade.ScheduledTrainings)) {
            modalidade.ScheduledTrainings = modalidade.ScheduledTrainings.map(training => {
                if (training.Start && training.End) {
                    return {
                        ...training,
                        Start: formatarCronParaLegivel(training.Start),
                        End: formatarCronParaLegivel(training.End)
                    };
                }
                return training;
            });
        }
        return modalidade;
    } catch (error) {
        console.error('Erro ao formatar treinos agendados:', error);
        return modalidade;
    }
}

// --- API Routes ---

// GET /trains/all
app.get('/trains/all', authenticate, (req, res) => {
    console.log('Recebida requisição GET /trains/all');
    console.log('Query params:', req.query);
    
    let filteredTrains = [...trains]; // Criar uma cópia do array
    const startTimestampGt = req.query['StartTimestamp>'];
    const startTimestampLt = req.query['StartTimestamp<'];
    const status = req.query['Status'];

    console.log('Dados antes da filtragem:', filteredTrains);

    if (startTimestampGt) {
        filteredTrains = filteredTrains.filter(t => t.StartTimestamp > Number(startTimestampGt));
    }
    if (startTimestampLt) {
        filteredTrains = filteredTrains.filter(t => t.StartTimestamp < Number(startTimestampLt));
    }
    if (status) {
        filteredTrains = filteredTrains.filter(t => t.Status === status);
    }

    console.log('Dados após filtragem:', filteredTrains);
    console.log(`Retornando ${filteredTrains.length} treinos`);
    
    res.json(filteredTrains);
});

// GET /modality/all
app.get('/modality/all', authenticate, (req, res) => {
    console.log('Recebida requisição GET /modality/all');
    const tag = req.query['Tag'];
    const result = {};
    
    for (const key in modalities) {
        if (modalities.hasOwnProperty(key)) {
            const mod = modalities[key];
            // Busca case-insensitive e parcial
            if (!tag || mod.Tag.toLowerCase().includes(tag.toLowerCase())) {
                // Formata os treinos agendados antes de enviar
                const modalidadeFormatada = formatarTreinosAgendados(JSON.parse(JSON.stringify(mod)));
                console.log('Modalidade formatada:', modalidadeFormatada);
                result[key] = modalidadeFormatada;
            }
        }
    }
    
    console.log(`Retornando ${Object.keys(result).length} modalidades`);
    res.json(result);
});

// PATCH /modality
app.patch('/modality', authenticate, (req, res) => {
    const { _id, ScheduledTrainings } = req.body;
    if (!_id) {
        return res.status(400).json({ error: 'Missing _id in request body' });
    }
    if (!modalities[_id]) {
        return res.status(404).json({ error: 'Modality not found' });
    }
    if (!Array.isArray(ScheduledTrainings)) {
        return res.status(400).json({ error: 'ScheduledTrainings must be an array' });
    }
    
    const cronRegex = /^(\d{1,2}|\*)\s+(\d{1,2}|\*)\s+(\d{1,2}|\*)\s+(\d{1,2}|\*)\s+(\d{1,2}|\*)\s+(\d{1,2}|\*)$/;
    
    for (const training of ScheduledTrainings) {
        if (!training.Start || !training.End) {
            return res.status(400).json({ error: 'Each ScheduledTraining must have Start and End' });
        }
        if (!cronRegex.test(training.Start)) {
            return res.status(400).json({ error: `Invalid CRON expression for Start: ${training.Start}` });
        }
        if (!cronRegex.test(training.End)) {
            return res.status(400).json({ error: `Invalid CRON expression for End: ${training.End}` });
        }
    }

    modalities[_id].ScheduledTrainings = ScheduledTrainings;
    res.json({ message: 'Item updated' });
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Total de modalidades carregadas: ${Object.keys(modalities).length}`);
    console.log(`Total de treinos carregados: ${trains.length}`);
});


