import colors from "colors";
import {
  Expression,
  Factor,
  Number,
  Return,
  Term,
} from "../language-server/generated/ast";

class ErrorNumber {
  static negate(left: ErrorNumber) {
    return new ErrorNumber(-left.value, left.error);
  }
  constructor(public value: number, public error: number) {}
  toString() {
    return `${this.value}#${this.error}`;
  }
  get relativeError() {
    return this.error / this.value;
  }
  static add(lhs: ErrorNumber, rhs: ErrorNumber): ErrorNumber {
    const value = lhs.value + rhs.value;
    const error = lhs.error + rhs.error;
    return new ErrorNumber(value, error);
  }
  static subtract(lhs: ErrorNumber, rhs: ErrorNumber): ErrorNumber {
    const value = lhs.value - rhs.value;
    const error = lhs.error + rhs.error;
    return new ErrorNumber(value, error);
  }
  static multiply(lhs: ErrorNumber, rhs: ErrorNumber): ErrorNumber {
    const value = lhs.value * rhs.value;
    const relativeError = lhs.relativeError + rhs.relativeError;
    return new ErrorNumber(value, value * relativeError);
  }
  static divide(lhs: ErrorNumber, rhs: ErrorNumber): ErrorNumber {
    const value = lhs.value / rhs.value;
    const relativeError = lhs.relativeError + rhs.relativeError;
    return new ErrorNumber(value, value * relativeError);
  }
}

class StackFrame {
  constructor(
    private locals: ErrorNumber[],
    private variables: { [name: string]: ErrorNumber },
    private parentFrame: StackFrame|undefined = undefined
  ) {}
  defineVariable(name: string, num: ErrorNumber) { this.variables[name] = num; }
  getVariable(name: string): ErrorNumber { return this.variables[name] || this.parentFrame?.getVariable(name) }
  push(num: ErrorNumber) { this.locals.push(num); } 
  pop(): ErrorNumber { return this.locals.pop()!; } 
}

class SolutionGeneratingVisitor {
  private stack: StackFrame = new StackFrame([], {});
  private get currentFrame() {
    return this.stack;
  }
  constructor(private verbose: boolean) {}
  visitReturn(ret: Return): void {
    ret.variables.forEach((variable) => {
      const name = variable.name;
      const num = this.currentFrame.pop();
      this.currentFrame.defineVariable(name, num);
    });
    this.visitExpression(ret.left);
    const result = this.currentFrame.pop();
    console.log(colors.bgRed(colors.white(result.toString())));
    console.log("DONE");
  }
  visitExpression(expression: Expression) {
    let tail = expression.tail;
    this.visitTerm(expression.left);
    while (tail != null) {
      this.visitTerm(tail.right);
      const isAddition = tail.operator === "+";
      const right = this.currentFrame.pop();
      const left = this.currentFrame.pop();
      const result = isAddition
        ? ErrorNumber.add(left, right)
        : ErrorNumber.subtract(left, right);
      this.currentFrame.push(result);
      if (this.verbose) {
        console.log(colors.red(`${isAddition ? "ADD" : "SUB"}`));
      }
      tail = tail.tail;
    }
  }
  visitTerm(term: Term): void {
    let tail = term.tail;
    this.visitFactor(term.left);
    while (tail != null) {
      this.visitFactor(tail.right);
      const isMultiplication = tail.operator === "*";
      const right = this.currentFrame.pop();
      const left = this.currentFrame.pop();
      const result = isMultiplication
        ? ErrorNumber.multiply(left, right)
        : ErrorNumber.divide(left, right);
      this.currentFrame.push(result);
      if (this.verbose) {
        console.log(colors.red(`${isMultiplication ? "MUL" : "DIV"}`));
      }
      tail = tail.tail;
    }
  }
  visitFactor(factor: Factor): void {
    if (factor.expression != null) {
      this.visitExpression(factor.expression);
    } else if (factor.negated != null) {
      this.visitFactor(factor.negated);
      const left = this.currentFrame.pop();
      const result = ErrorNumber.negate(left);
      this.currentFrame.push(result);
      if (this.verbose) {
        console.log(colors.red(`NEG`));
      }
    } else if (factor.num != null) {
      this.visitNumber(factor.num);
    } else {
      const name = factor.varUsage.ref?.name!;
      const num = this.currentFrame.getVariable(name);
      this.currentFrame.push(num);
    }
  }
  visitNumber(num: Number) {
    const value = parseFloat(num.value);
    const error = parseFloat(num.error ?? 0);
    this.currentFrame.push(new ErrorNumber(value, error));
    if (this.verbose) {
      console.log(colors.green(`PUSH (${value}, ${error})`));
    }
  }
}

export function generateSolution(
  ret: Return,
  filePath: string,
  verbose: boolean
): void {
  const visitor = new SolutionGeneratingVisitor(verbose);
  visitor.visitReturn(ret);
}
