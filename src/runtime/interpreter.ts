import { RuntimeValue, NumberVal, MK_NULL, MK_NUMBER } from "./values";
import { BinaryExpr, NumericLiteral, Program, Stmt, Identifier, VariableDeclaration } from "../core/ast";
import Environment from "./environment";

function eval_program(program: Program, env: Environment): RuntimeValue {
  let lastEvaluated: RuntimeValue = MK_NULL();
  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env);
  }
  return lastEvaluated;
}


function eval_binary_expr(binop: BinaryExpr, env: Environment): RuntimeValue {
  const lhs = evaluate(binop.left, env);
  const rhs = evaluate(binop.right, env);
  if (lhs.type === "number" && rhs.type === "number") {
    switch (binop.operator) {
      case "+":
        return MK_NUMBER((lhs as NumberVal).value + (rhs as NumberVal).value);
      case "-":
        return MK_NUMBER((lhs as NumberVal).value - (rhs as NumberVal).value);
      case "*":
        return MK_NUMBER((lhs as NumberVal).value * (rhs as NumberVal).value);
      case "/":
        // TODO: Checar divisão por zero
        return MK_NUMBER((lhs as NumberVal).value / (rhs as NumberVal).value);
      case "%":
        return MK_NUMBER((lhs as NumberVal).value % (rhs as NumberVal).value);
      default:
        return MK_NULL();
    }
  }
  return MK_NULL();
}

function eval_identifier(ident: Identifier, env: Environment): RuntimeValue {
  return env.lookupVar(ident.symbol);
}

function eval_var_declaration(declaration: VariableDeclaration, env: Environment): RuntimeValue {
  const value = declaration.value ? evaluate(declaration.value, env) : MK_NULL();
  return env.declareVar(declaration.identifier, value);
}


// --- FUNÇÃO PRINCIPAL ATUALIZADA ---
export function evaluate(astNode: Stmt, env: Environment): RuntimeValue {
  switch (astNode.kind) {
    case "NumericLiteral":
      return MK_NUMBER((astNode as NumericLiteral).value);
    case "Identifier":
      return eval_identifier(astNode as Identifier, env);
    case "BinaryExpr":
      return eval_binary_expr(astNode as BinaryExpr, env);
    case "Program":
      return eval_program(astNode as Program, env);
    case "VariableDeclaration":
      return eval_var_declaration(astNode as VariableDeclaration, env);
    default:
      console.error("Nó não implementado:", astNode);
      process.exit(1);
  }
}