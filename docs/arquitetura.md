# Arquitetura (pipeline)

## Visão geral

O Otaviux hoje funciona como um interpretador simples em 3 passos:

1. **Lexer**: converte o código fonte em uma lista de tokens.
2. **Parser**: converte tokens em uma AST (árvore sintática).
3. **Interpreter (runtime)**: avalia a AST e produz um `RuntimeValue`.

## Componentes

### Core

- `src/core/lexer.ts`
  - Lê o código caractere a caractere.
  - Gera tokens (números, identificadores, operadores, parênteses e algumas keywords).

- `src/core/parser.ts`
  - Constrói `Program` (raiz) com `body: Stmt[]`.
  - Implementa precedência: `*`/`/` (e `%` no parser) acima de `+`/`-`.
  - Suporta `let <ident> = <expr>`.

- `src/core/ast.ts`
  - Define os tipos dos nós da AST:
    - `Program`
    - `NumericLiteral`
    - `Identifier`
    - `BinaryExpr`
    - `VariableDeclaration`

### Runtime

- `src/runtime/values.ts`
  - Define `RuntimeValue` e os tipos suportados hoje: `number` e `null`.
  - Funções utilitárias:
    - `MK_NUMBER(n)`
    - `MK_NULL()`

- `src/runtime/environment.ts`
  - Implementa escopo com `Map<string, RuntimeValue>`.
  - Permite:
    - `declareVar(name, value)`
    - `lookupVar(name)`
  - Tem suporte a ambiente pai (`parent`) para escopos aninhados no futuro.

- `src/runtime/interpreter.ts`
  - Avalia a AST.
  - Todas as avaliações recebem um `env: Environment`.

## CLI

- `src/index.ts`: lê um arquivo `.otaviux`, cria `Environment` global e chama `evaluate(ast, env)`.
- `bin/otaviux`: executável Node que chama `dist/index.js` (exige `npm run build`).
