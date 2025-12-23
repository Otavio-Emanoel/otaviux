#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// Pegando os argumentos do terminal
// Se você digitar: otaviux teste.otx
// args[0] é o node, args[1] é o otaviux, args[2] é 'teste.otx'
const args = process.argv.slice(2);

if (args.length === 0) {
    console.error("❌ Erro: Por favor, informe um arquivo .otx para rodar.");
    console.log("👉 Uso: otaviux <arquivo>");
    process.exit(1);
}

const filename = args[0];

// Verifica se o arquivo existe
if (!fs.existsSync(filename)) {
    console.error(`❌ Erro: O arquivo '${filename}' não foi encontrado.`);
    process.exit(1);
}

// Lê o código fonte do arquivo .otx
const sourceCode = fs.readFileSync(filename, 'utf-8');

console.log("🚀 Rodando Otaviux...");
console.log("---------------------");

// AQUI VAI ENTRAR SEU COMPILADOR
// Por enquanto, vamos só mostrar o que ele leu
console.log(sourceCode);