grammar EpsilonRhoRho

entry Return: left=Term;


fragment TermTailLike: tail=TermTail?;
Term:
    left=Factor TermTailLike
    ;

TermTail:
    operator=('*'|'/') right=Factor TermTailLike
    ;

Factor:
    value=NUM (PLUS_MINUS error=NUM)?
    ;

terminal NUM: /[0-9]+(\.[0-9]+)?/;
terminal PLUS_MINUS: /#/;

hidden terminal WS: /\s+/;
hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
