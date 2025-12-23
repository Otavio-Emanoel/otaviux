
# Otaviux

Otaviux é uma linguagem/interpretador em TypeScript (WIP). No estado atual, o projeto já faz:

- Lexer (tokenização)
- Parser (AST) com precedência aritmética
- Runtime com `Environment` (variáveis) + `Interpreter` (avaliação)

## Estado atual (o que funciona)

### Tipos e valores

- `number`
- `null`

### Expressões

- Literais numéricos: `10`, `42`
- Identificadores: `x`, `y`
- Parênteses: `(10 + 2) * 3`
- Operadores binários: `+`, `-`, `*`, `/`

### Declaração de variáveis

Somente com `let` e com atribuição obrigatória:

```otaviux
let x = 100
let y = 50
x + y
```

## Como rodar

### Pré-requisitos

- Node.js + npm

### Instalar dependências

```bash
npm install
```

### Build (necessário para rodar o binário)

O binário `bin/otaviux` carrega o arquivo compilado em `dist/`, então você precisa compilar antes:

```bash
npm run build
```

### Executar um arquivo .otaviux

```bash
node bin/otaviux examples/teste-3.otaviux
```

### Rodar em modo dev (sem build)

```bash
npm run dev -- examples/teste-3.otaviux
```

## Exemplos

- `examples/teste-2.otaviux` (funciona): aritmética com precedência
- `examples/teste-3.otaviux` (funciona): variáveis + expressão final
- `examples/teste-1.otaviux` (ainda NÃO funciona): contém `fn`/blocos, que ainda não foram implementados no parser/runtime

## Estrutura do projeto

- `src/core/`
	- `lexer.ts`: tokeniza o código fonte
	- `token.ts`: enum de tokens
	- `ast.ts`: tipos/formatos dos nós da AST
	- `parser.ts`: constrói a AST a partir dos tokens
- `src/runtime/`
	- `values.ts`: tipos de valores em runtime e macros (`MK_NUMBER`, `MK_NULL`)
	- `environment.ts`: escopo/variáveis (`declareVar`, `lookupVar`)
	- `interpreter.ts`: avalia a AST usando um `Environment`

## Limitações conhecidas (importante)

- Números: o lexer atual lê apenas dígitos (inteiros). `4.5` ainda não é tokenizado.
- `%`: o parser trata `%` como operador multiplicativo, mas o lexer ainda não tokeniza `%`.
- `const`: o parser tem um trecho que menciona `TokenType.Const`, mas esse token não existe ainda.
- Palavras-chave já tokenizadas mas não implementadas no parser/runtime: `fn`, `return`, `class`, `if`, `else`.
- Sem ponto e vírgula. As instruções são lidas em sequência (ex.: `let x = 1 let y = 2 x + y`).
- Sem atribuição/redeclaração além de `let` (não existe `x = 2` por enquanto).

## Docs

Documentação detalhada está em `docs/`:

- `docs/sintaxe.md`
- `docs/arquitetura.md`
- `docs/exemplos.md`
- `docs/roadmap.md`

