grammar EpsilonRhoRho

entry Return: left=Expression;

fragment ExpressionTailLike: tail=ExpressionTail?;
Expression: left=Term ExpressionTailLike;
ExpressionTail: operator=('+'|'-') right=Term ExpressionTailLike;

fragment TermTailLike: tail=TermTail?;
Term: left=Factor TermTailLike;
TermTail: operator=('*'|'/') right=Factor TermTailLike;

Factor:
    num=Number
    | '(' expression=Expression ')'
    | '-' negated=Factor
    ;

Number: value=NUM (PLUS_MINUS error=NUM)?;

terminal NUM: /[0-9]+(\.[0-9]+)?/;
terminal PLUS_MINUS: /#/;

hidden terminal WS: /\s+/;
hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
