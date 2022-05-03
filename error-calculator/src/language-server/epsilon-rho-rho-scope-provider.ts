import { AstNode, DefaultScopeProvider, LangiumServices, Scope } from "langium";

export class PhilyraScopeProvider extends DefaultScopeProvider {
  constructor(services: LangiumServices) {
    super(services);
  }

  getScope(node: AstNode, referenceId: string): Scope {
      
  }
}
