/******************************************************************************
 * This file was generated by langium-cli 0.3.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import { LangiumGeneratedServices, LangiumGeneratedSharedServices, LangiumSharedServices, LangiumServices, LanguageMetaData, Module } from 'langium';
import { EpsilonRhoRhoAstReflection } from './ast';
import { EpsilonRhoRhoGrammar } from './grammar';

export const EpsilonRhoRhoLanguageMetaData: LanguageMetaData = {
    languageId: 'epsilon-rho-rho',
    fileExtensions: ['.err'],
    caseInsensitive: false
};

export const EpsilonRhoRhoGeneratedSharedModule: Module<LangiumSharedServices, LangiumGeneratedSharedServices> = {
    AstReflection: () => new EpsilonRhoRhoAstReflection()
};

export const EpsilonRhoRhoGeneratedModule: Module<LangiumServices, LangiumGeneratedServices> = {
    Grammar: () => EpsilonRhoRhoGrammar(),
    LanguageMetaData: () => EpsilonRhoRhoLanguageMetaData,
    parser: {}
};
