# Roadmap (WIP)

Checklist simples do que falta para virar uma linguagem mais completa.

## Lexer

- [ ] Tokenizar `%`
- [ ] Tokenizar decimais (ex.: `4.5`)
- [ ] Melhorar identificadores (permitir `_`, dígitos após primeira letra)
- [ ] Strings (`"texto"`)

## Parser

- [ ] Corrigir/implementar `const`
- [ ] Atribuição/re-atribuição (ex.: `x = 2`)
- [ ] Blocos `{ ... }`
- [ ] Funções (`fn`, parâmetros, `return`)
- [ ] `if/else`

## Runtime

- [ ] `const` (bloquear reatribuição)
- [ ] `assignVar` no `Environment`
- [ ] Escopos (ambiente filho para blocos/funções)
- [ ] Builtins (ex.: `print`)

## CLI

- [ ] Melhorar mensagens de erro (linha/coluna)
- [ ] Modo REPL
