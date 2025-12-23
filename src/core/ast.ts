// src/core/ast.ts

// Tipos de Nós que nossa árvore pode ter
export type NodeType = 
  | "Program" 
  | "NumericLiteral" 
  | "Identifier" 
  | "BinaryExpr"
  | "VariableDeclaration";

// Interface base para qualquer nó da árvore
export interface Stmt {
  kind: NodeType;
}

// O Programa em si (a raiz da árvore)
// Ele contém uma lista de instruções
export interface Program extends Stmt {
  kind: "Program";
  body: Stmt[];
}

// Expressões (Coisas que retornam valor, tipo contas ou variáveis)
export interface Expr extends Stmt {}

// Uma operação binária (ex: 10 - 5 ou A + B)
export interface BinaryExpr extends Expr {
  kind: "BinaryExpr";
  left: Expr;       // O lado esquerdo (10)
  right: Expr;      // O lado direito (5)
  operator: string; // O operador (-)
}

// Um Identificador (nome de variável, ex: x, resultado)
export interface Identifier extends Expr {
  kind: "Identifier";
  symbol: string;
}

// Um Número (ex: 42)
export interface NumericLiteral extends Expr {
  kind: "NumericLiteral";
  value: number;
}

export interface VariableDeclaration extends Stmt {
  kind: "VariableDeclaration";
  constant: boolean;
  identifier: string;
  value?: Expr; // O valor pode ser vazio (ex: let x;)
}