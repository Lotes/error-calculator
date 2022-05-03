grammar EpsilonRhoRho

entry Return: variables+=Variable* left=Expression;

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
    | varUsage=[Variable]
    ;
Variable: 'var' name=ID '=' Expression ';';
Number: value=NUM (PLUS_MINUS error=NUM)?;

terminal NUM: /[0-9]+(\.[0-9]+)?/;
terminal PLUS_MINUS: '#';
terminal ID: /[a-zA-Z_][a-zA-Z_0-9]*/;

hidden terminal WS: /\s+/;
hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
