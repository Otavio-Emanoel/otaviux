// src/core/lexer.ts
import { Token, TokenType } from "./token";

// Lista de palavras que a linguagem já conhece e não podem ser nomes de variáveis
const KEYWORDS: Record<string, TokenType> = {
  "let": TokenType.Let,
  "fn": TokenType.Fn,
  "return": TokenType.Return,
  "class": TokenType.Class,
  "if": TokenType.If,
  "else": TokenType.Else,
};

// Verifica se é uma letra (para nomes de variáveis)
function isAlpha(src: string) {
  return src.toUpperCase() != src.toLowerCase();
}

// Verifica se é número
function isInt(src: string) {
  const c = src.charCodeAt(0);
  const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
  return c >= bounds[0] && c <= bounds[1];
}

// Verifica se é um caractere ignorável (espaço, tab, quebra de linha)
function isSkippable(src: string) {
  return src == " " || src == "\n" || src == "\t" || src == "\r";
}

export function tokenize(sourceCode: string): Token[] {
  const tokens: Token[] = [];
  
  // Divide o código em uma lista de caracteres
  const src = sourceCode.split("");

  // Loop até acabar o arquivo
  while (src.length > 0) {
    
    // 1. Lida com Símbolos Simples (parênteses, chaves, operadores)
    if (src[0] == "(") {
      tokens.push({ type: TokenType.OpenParen, value: src.shift()! });
    } else if (src[0] == ")") {
      tokens.push({ type: TokenType.CloseParen, value: src.shift()! });
    } else if (src[0] == "{") {
      tokens.push({ type: TokenType.OpenBrace, value: src.shift()! });
    } else if (src[0] == "}") {
      tokens.push({ type: TokenType.CloseBrace, value: src.shift()! });
    } else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/") {
      tokens.push({ type: TokenType.BinaryOperator, value: src.shift()! });
    } else if (src[0] == "=") {
      tokens.push({ type: TokenType.Equals, value: src.shift()! });
    } 
    
    // 2. Lida com Números (ex: 1234)
    else if (isInt(src[0])) {
      let num = "";
      while (src.length > 0 && isInt(src[0])) {
        num += src.shift();
      }
      tokens.push({ type: TokenType.Number, value: num });
    } 
    
    // 3. Lida com Identificadores e Palavras Chave (ex: "let", "fn", "variavel")
    else if (isAlpha(src[0])) {
      let ident = "";
      while (src.length > 0 && isAlpha(src[0])) {
        ident += src.shift();
      }
      
      // Verifica se é uma palavra reservada ou uma variável do usuário
      const reserved = KEYWORDS[ident];
      if (reserved) {
        tokens.push({ type: reserved, value: ident });
      } else {
        tokens.push({ type: TokenType.Identifier, value: ident });
      }
    } 
    
    // 4. Ignora Espaços
    else if (isSkippable(src[0])) {
      src.shift();
    } 
    
    // 5. Erro: Caractere desconhecido
    else {
      console.log("Caractere não reconhecido: ", src[0]);
      process.exit(1);
    }
  }

  tokens.push({ type: TokenType.EOF, value: "EndOfFile" });
  return tokens;
}