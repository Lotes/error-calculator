import { ValidationAcceptor, ValidationCheck, ValidationRegistry } from 'langium';
import { EpsilonRhoRhoAstType, Person } from './generated/ast';
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
            Person: validator.checkPersonStartsWithCapital
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class EpsilonRhoRhoValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
