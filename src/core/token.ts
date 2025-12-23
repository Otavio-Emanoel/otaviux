// src/core/token.ts

// O "DNA" da linguagem. Tudo o que ela sabe que existe.
export enum TokenType {
  // Tipos de dados
  Number,       // 123, 4.5
  Identifier,   // nomeVariavel, funcaoTeste
  String,       // "Olá Mundo"

  // Palavras Reservadas (Keywords)
  Let,          // let (para variáveis)
  Fn,           // fn (para funções)
  Return,       // return
  Class,        // class
  If,           // if
  Else,         // else
  
  // Operadores e Símbolos
  Equals,       // =
  OpenParen,    // (
  CloseParen,   // )
  OpenBrace,    // {
  CloseBrace,   // }
  BinaryOperator, // +, -, *, /
  
  // Controle
  EOF,          // Fim do Arquivo (End Of File)
}

// A estrutura de um Token único
export interface Token {
  value: string; // O valor real (ex: "100", "otavio")
  type: TokenType; // O tipo (ex: Number, Identifier)
}