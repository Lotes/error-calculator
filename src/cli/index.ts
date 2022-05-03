import { Command } from 'commander';
import { Return } from '../language-server/generated/ast';
import { EpsilonRhoRhoLanguageMetaData } from '../language-server/generated/module';
import { createEpsilonRhoRhoServices } from '../language-server/epsilon-rho-rho-module';
import { extractAstNode } from './cli-util';
import { generateSolution } from './generator';

export const generateAction = async (fileName: string, opts: GenerateOptions): Promise<void> => {
    const services = createEpsilonRhoRhoServices().EpsilonRhoRho;
    const ret = await extractAstNode<Return>(fileName, services);
    generateSolution(ret, fileName, opts.verbose);
};

export type GenerateOptions = {
    verbose: boolean;
}

export default function(): void {
    const program = new Command();

    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);

    const fileExtensions = EpsilonRhoRhoLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-v, --verbose', 'Outputs every single calculation step')
        .description('Plots the solution for the given error calculation.')
        .action(generateAction);

    program.parse(process.argv);
}
