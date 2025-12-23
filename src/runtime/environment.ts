import { RuntimeValue } from "./values";

export default class Environment {
  private parent?: Environment;
  private variables: Map<string, RuntimeValue>;

  constructor(parentENV?: Environment) {
    // Se tiver um pai, guardamos ele (será útil para funções depois)
    this.parent = parentENV; 
    this.variables = new Map();
  }

  public declareVar(varname: string, value: RuntimeValue): RuntimeValue {
    if (this.variables.has(varname)) {
      throw `Não é possível declarar a variável ${varname}. Ela já foi definida.`;
    }

    this.variables.set(varname, value);
    return value;
  }

  public lookupVar(varname: string): RuntimeValue {
    const env = this.resolve(varname);
    return env.variables.get(varname) as RuntimeValue;
  }

  public resolve(varname: string): Environment {
    if (this.variables.has(varname)) {
      return this;
    }

    if (this.parent == undefined) {
      throw `Não foi possível resolver a variável '${varname}' porque ela não existe.`;
    }

    return this.parent.resolve(varname);
  }
}