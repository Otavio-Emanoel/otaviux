import fs from 'fs';
import { tokenize } from './core/lexer';

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
        
        console.log(`🔨 Lendo ${filename}...`);
        
        // CHAMA O LEXER
        const tokens = tokenize(sourceCode);
        
        console.log("✅ Tokens gerados com sucesso:");
        console.log(tokens);
        
    } catch (err) {
        console.error(`❌ Erro ao ler arquivo: ${filename}`);
        process.exit(1);
    }
}