# Sintaxe (estado atual)

Esta documentação descreve a sintaxe que **já está implementada** hoje no lexer/parser/runtime.

## Gramática (aproximação)

```ebnf
Program        := Stmt* EOF
Stmt           := VarDecl | Expr
VarDecl        := "let" Identifier "=" Expr

Expr           := Additive
Additive       := Multiplicative ( ("+" | "-") Multiplicative )*
Multiplicative := Primary ( ("*" | "/" | "%") Primary )*
Primary        := Number | Identifier | "(" Expr ")"
```

Observações importantes:

- Não existe `;` (ponto e vírgula).
- As instruções são lidas em sequência: depois que uma expressão termina, o próximo token pode iniciar outra instrução.

## Tokens / léxico

- Identificadores: somente letras (`a-z`/`A-Z`).
  - Ainda não aceita `_`, dígitos em nomes, acentos, etc.
- Números: somente sequência de dígitos (`0-9`).
  - O tipo no runtime é `number`, mas **o lexer atual não tokeniza decimais** (ex.: `4.5`).
- Operadores: `+`, `-`, `*`, `/`.
- Parênteses: `(` e `)`.

## Variáveis

Declaração com atribuição obrigatória:

```otaviux
let x = 10
let y = 5
x + y
```

- Variáveis são armazenadas no `Environment`.
- Não existe reatribuição (`x = 2`) por enquanto.

## Palavras-chave (ainda não implementadas)

O lexer reconhece as palavras abaixo como tokens, mas o parser/runtime ainda não dão suporte:

- `fn`
- `return`
- `class`
- `if`
- `else`

## Limitações atuais

- `%`: o parser possui suporte na precedência, mas o lexer ainda não gera token para `%`.
- Não existe `const` (apesar de haver referência no parser).
- Não existe string, boolean, arrays, objetos, etc.
