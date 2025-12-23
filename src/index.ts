import fs from 'fs';
import { tokenize } from './core/lexer';
import Parser from './core/parser';
import { evaluate } from './runtime/interpreter';
import Environment from './runtime/environment';

// A FUNÇÃO PRINCIPAL

export function main(args: string[]) {
    const userArgs = args.slice(2);

    if (userArgs.length === 0) {
        console.error("❌ Erro: Informe um arquivo .otaviux");
        process.exit(1);
    }

    const filename = userArgs[0];

    // VALIDAÇÃO DA EXTENSÃO
    if (!filename.endsWith(".otaviux")) {
        console.error("❌ Erro: O arquivo deve ter a extensão .otaviux");
        process.exit(1);
    }
    
    try {
        const sourceCode = fs.readFileSync(filename, 'utf-8');
        
        const parser = new Parser();
        const ast = parser.produceAST(sourceCode);

        // 1. Cria o ambiente Global
        const env = new Environment(undefined);

        // 2. Passa o ambiente para o evaluate
        const result = evaluate(ast, env);

        console.log("\nResultado:", result);
        
    } catch (err) {
        console.error(err);
    }
}