import { DefaultScopeProvider, LangiumServices } from "langium";

export class EpsilonRhoRhoScopeProvider extends DefaultScopeProvider {
  constructor(services: LangiumServices) {
    super(services);
  }
}
