import colors from "colors";
import { Factor, Return, Term } from "../language-server/generated/ast";

class ErrorNumber {
  constructor(public value: number, public error: number) {}
  toString() {
    return `${this.value}#${this.error}`;
  }
  get relativeError() {
    return this.error / this.value;
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
type StackFrame = ErrorNumber[];

class SolutionGeneratingVisitor {
  private stack: StackFrame[] = [[]];
  private get currentFrame() {
    return this.stack[this.stack.length - 1];
  }
  constructor(private verbose: boolean) {}
  visitReturn(ret: Return): void {
    this.visitTerm(ret.left);
    const result = this.currentFrame.pop()!;
    console.log(result.toString());
    console.log("DONE");
  }
  visitTerm(term: Term): void {
    let tail = term.tail;
    this.visitFactor(term.left);
    while (tail != null) {
      this.visitFactor(tail.right);
      const isMultiplication = tail.operator === "*";
      const right = this.currentFrame.pop()!;
      const left = this.currentFrame.pop()!;
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
    const value = parseFloat(factor.value);
    const error = parseFloat(factor.error ?? 0);
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
