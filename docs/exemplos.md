# Exemplos

## Rodar exemplos

Após compilar:

```bash
npm run build
node bin/otaviux examples/teste-3.otaviux
```

Ou em modo dev:

```bash
npm run dev -- examples/teste-3.otaviux
```

## Exemplos existentes

### examples/teste-2.otaviux (funciona)

```otaviux
10 + 5 * 2
```

Demonstra precedência (`*` antes de `+`).

### examples/teste-3.otaviux (funciona)

```otaviux
let x = 100
let y = 50
x + y
```

Demonstra variáveis e lookup por identificador.

### examples/teste-1.otaviux (ainda não funciona)

```otaviux
let x = 45 + 5
fn soma(a b) {
   x + a
}
```

Motivo: `fn`/blocos/parâmetros ainda não foram implementados no parser/runtime.
