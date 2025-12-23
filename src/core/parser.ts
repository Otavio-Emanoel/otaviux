import { Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier, VariableDeclaration } from "./ast";
import { tokenize } from "./lexer";
import { Token, TokenType } from "./token";

export default class Parser {
  private tokens: Token[] = [];

  // Verifica se ainda tem tokens para ler
  private not_eof(): boolean {
    return this.tokens[0].type != TokenType.EOF;
  }

  // Retorna o token atual sem avançar
  private at() {
    return this.tokens[0];
  }

  // Remove o token atual da lista e avança para o próximo
  private eat() {
    return this.tokens.shift() as Token;
  }

  // A função principal que inicia tudo
  public produceAST(sourceCode: string): Program {
    this.tokens = tokenize(sourceCode);
    
    const program: Program = {
      kind: "Program",
      body: [],
    };

    // Enquanto não chegar no fim do arquivo, leia as instruções
    while (this.not_eof()) {
      program.body.push(this.parse_stmt());
    }

    return program;
  }

  // Lida com Expressões (Equation)
  // A ordem aqui define a "Precedência Matemática"
  private parse_expr(): Expr {
    return this.parse_additive_expr();
  }

  // Lida com + e -
  // (Left) + (Right)
  private parse_additive_expr(): Expr {
    let left = this.parse_multiplicative_expr();

    while (this.at().value == "+" || this.at().value == "-") {
      const operator = this.eat().value;
      const right = this.parse_multiplicative_expr();
      
      // Cria o nó da operação e joga o antigo 'left' para dentro dele
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }

    return left;
  }

  // Lida com * e / (Tem prioridade sobre soma, por isso é chamado primeiro)
  private parse_multiplicative_expr(): Expr {
    let left = this.parse_primary_expr();

    while (this.at().value == "/" || this.at().value == "*" || this.at().value == "%") {
      const operator = this.eat().value;
      const right = this.parse_primary_expr();

      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }

    return left;
  }

  // Lida com os valores base (Números, Variáveis e Parênteses)
  private parse_primary_expr(): Expr {
    const tk = this.at().type;

    switch (tk) {
      case TokenType.Identifier:
        return { kind: "Identifier", symbol: this.eat().value } as Identifier;

      case TokenType.Number:
        return { 
            kind: "NumericLiteral", 
            value: parseFloat(this.eat().value) 
        } as NumericLiteral;

      case TokenType.OpenParen: {
        this.eat(); // come o (
        const value = this.parse_expr();
        this.eat(); // come o ), espera-se que ele esteja lá
        return value;
      }

      default:
        console.error("Token inesperado encontrado durante o parse:", this.at());
        process.exit(1);
    }
  }

  // Lida com Declarações
  private parse_stmt(): Stmt {
    // Se o token atual for "let", parseia declaração
    if (this.at().type == TokenType.Let) {
      return this.parse_var_declaration();
    }

    // Se não, continua sendo uma expressão normal
    return this.parse_expr();
  }

  // LET IDENT = EXPR;
  private parse_var_declaration(): Stmt {
    // @ts-ignore
    const isConstant = this.eat().type == TokenType.Const; 
    const identifier = this.eat().value; // Pega o nome da variável

    if (this.at().type == TokenType.Equals) {
      this.eat(); // come o "="
      const declaration = {
        kind: "VariableDeclaration",
        identifier,
        value: this.parse_expr(), // A expressão depois do igual (ex: 10 + 5)
        constant: false,
      } as VariableDeclaration;
      
      return declaration;
    }

    // Se não tiver "=", ex: "let x;", apenas declara como undefined (future feature)
    throw "Erro: Otaviux ainda exige que você atribua valor (ex: let x = 10)";
  }
}