const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { Client } = require('pg');

// Configura a porta serial
const port = new SerialPort({
  path: 'COM3', //
  baudRate: 9600
});

// Adiciona um listener para o evento de erro
port.on('error', (err) => {
  console.error('Erro na porta serial:', err.message);
});

// Configura o parser para ler dados da porta serial
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Listener para dados recebidos
parser.on('data', (data) => {
  console.log('Dados recebidos:', data);
});

// Função para enviar dados para o Arduino
function enviarDadosParaArduino(dados) {
  port.write(dados + '\n', (err) => {
    if (err) {
      return console.log('Erro ao enviar dados:', err.message);
    }
    console.log('Dados enviados:', dados);
  });
}

// Configura o cliente PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost', 
  database: 'WolvesBD', 
  password: 'admin', 
  port: 5432, 
});

// Conecta ao banco de dados
client.connect();

// Função para buscar a quantidade de equipamentos disponíveis no banco de dados
function buscarEquipamentosDisponiveis() {
  client.query("SELECT COUNT(*) AS count FROM equipamentos WHERE status = 'disponivel'", (err, res) => {
    if (err) {
      return console.error('Erro ao buscar dados:', err.message);
    }
    let equipamentosDisponiveis = res.rows[0].count;
    enviarDadosParaArduino(equipamentosDisponiveis.toString());
  });
}

// Envia os dados para o Arduino a cada 10 segundos
setInterval(() => {
  buscarEquipamentosDisponiveis();
}, 10000);