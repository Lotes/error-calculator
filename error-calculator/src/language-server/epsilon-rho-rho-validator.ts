import { ValidationAcceptor, ValidationCheck, ValidationRegistry } from 'langium';
import { EpsilonRhoRhoAstType, Factor } from './generated/ast';
import type { EpsilonRhoRhoServices } from './epsilon-rho-rho-module';

/**
 * Map AST node types to validation checks.
 */
type EpsilonRhoRhoChecks = { [type in EpsilonRhoRhoAstType]?: ValidationCheck | ValidationCheck[] }

/**
 * Registry for validation checks.
 */
export class EpsilonRhoRhoValidationRegistry extends ValidationRegistry {
    constructor(services: EpsilonRhoRhoServices) {
        super(services);
        const validator = services.validation.EpsilonRhoRhoValidator;
        const checks: EpsilonRhoRhoChecks = {
            Factor: validator.checkFactorWithErrorHasProperDigits
        };
        this.register(checks, validator);
    }
}



export interface Digits {
    int: string;
    frac: string;
    precision: number;
}

/**
 * Implementation of custom validations.
 */
export class EpsilonRhoRhoValidator {

    checkFactorWithErrorHasProperDigits(factor: Factor, accept: ValidationAcceptor): void {
        const value = this.getDigits(factor.value);
        const error = factor.error ? this.getDigits(factor.error) : null;
        if (error) {
            if (error.precision > value.precision) {
                accept('error', 'The precision of the error is greater than the one for the value. The extra digits are pointless.', { node: factor, property: 'error' });
            }
        }
    }

    private getDigits(num: string): Digits {
      const periodIndex = num.indexOf(".");
      if(periodIndex == -1) {
        return {
            int: num,
            frac: "",
            precision: 0
        };
      } else {
        const frac = num.substring(periodIndex+1);
        return {
            int: num.substring(0, periodIndex),
            frac,
            precision: frac.length 
        };
      }
    }
}
