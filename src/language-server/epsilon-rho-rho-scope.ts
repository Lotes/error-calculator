import {
  AstNode,
  AstNodeDescription,
  DefaultScopeComputation,
  LangiumDocument,
  LangiumServices,
  MultiMap,
  PrecomputedScopes,
} from "langium";
import { Return } from "./generated/ast";

export class EpsilonRhoRhoScopeComputation extends DefaultScopeComputation {
  constructor(services: LangiumServices) {
    super(services);
  }

  async computeScope(
    document: LangiumDocument,
  ): Promise<PrecomputedScopes> {
    const model = document.parseResult.value as Return;
    const scopes = new MultiMap<AstNode, AstNodeDescription>();
    model.variables.forEach((v)=> {
      const name = v.name;
      scopes.add(model, this.descriptions.createDescription(v, name, document));
    });
    return Promise.resolve(scopes);
  }
}
