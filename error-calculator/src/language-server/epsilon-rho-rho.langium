grammar EpsilonRhoRho

entry Return: factor=Factor;

Factor:
    value=NUM (PLUS_MINUS error=NUM)?
    ;

terminal NUM returns string: /[0-9]+(\.[0-9]+)?/;
terminal PLUS_MINUS: /#/;

hidden terminal WS: /\s+/;
hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
