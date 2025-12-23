export type ValueType = "null" | "number";

export interface RuntimeValue {
  type: ValueType;
}

// Representa o valor Nulo (quando algo não retorna nada)
export interface NullVal extends RuntimeValue {
  type: "null";
  value: null;
}

// Representa um Número
export interface NumberVal extends RuntimeValue {
  type: "number";
  value: number;
}

// Macros (atalhos) para criar valores rápido
export function MK_NUMBER(n: number = 0): NumberVal {
  return { type: "number", value: n };
}

export function MK_NULL(): NullVal {
  return { type: "null", value: null };
}