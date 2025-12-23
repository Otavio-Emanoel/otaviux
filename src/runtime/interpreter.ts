import { RuntimeValue, NumberVal, MK_NULL, MK_NUMBER } from "./values";
import { BinaryExpr, NumericLiteral, Program, Stmt } from "../core/ast";

// Resolve operações matemáticas (10 + 5)
function eval_numeric_binary_expr(lhs: NumberVal, rhs: NumberVal, operator: string): NumberVal {
  
    if (operator == "+") 
        return MK_NUMBER(lhs.value + rhs.value);
    else if (operator == "-") 
        return MK_NUMBER(lhs.value - rhs.value);
    else if (operator == "*") 
        return MK_NUMBER(lhs.value * rhs.value);
    else if (operator == "/" || operator == "%") {
        // TODO: Checar divisão por zero no futuro
        return MK_NUMBER(lhs.value / rhs.value);
    } 
    else {
        return MK_NUMBER(0);
    }
}

// Avalia expressões binárias genéricas
function eval_binary_expr(binop: BinaryExpr): RuntimeValue {
  const lhs = evaluate(binop.left);
  const rhs = evaluate(binop.right);

  // Se ambos forem números, fazemos conta
  if (lhs.type == "number" && rhs.type == "number") {
    return eval_numeric_binary_expr(lhs as NumberVal, rhs as NumberVal, binop.operator);
  }

  // Por enquanto, se não for número, retornamos null
  return MK_NULL();
}

function eval_program(program: Program): RuntimeValue {
  let lastEvaluated: RuntimeValue = MK_NULL();

  // Executa cada linha do código, de cima para baixo
  for (const statement of program.body) {
    lastEvaluated = evaluate(statement);
  }

  return lastEvaluated;
}

// A FUNÇÃO PRINCIPAL
export function evaluate(astNode: Stmt): RuntimeValue {
  
  switch (astNode.kind) {
    case "NumericLiteral":
      return MK_NUMBER((astNode as NumericLiteral).value);

//    case "NullLiteral":
//        return MK_NULL();

    case "BinaryExpr":
      return eval_binary_expr(astNode as BinaryExpr);

    case "Program":
      return eval_program(astNode as Program);

    default:
      console.error("Este nó AST ainda não foi configurado para interpretação:", astNode);
      process.exit(1);
  }
}