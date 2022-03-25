/******************************************************************************
 * This file was generated by langium-cli 0.3.0.
 * DO NOT EDIT MANUALLY!
 ******************************************************************************/

import { loadGrammar, Grammar } from 'langium';

let loadedEpsilonRhoRhoGrammar: Grammar | undefined;
export const EpsilonRhoRhoGrammar = (): Grammar => loadedEpsilonRhoRhoGrammar ||(loadedEpsilonRhoRhoGrammar = loadGrammar(`{
  "$type": "Grammar",
  "usedGrammars": [],
  "hiddenTokens": [],
  "imports": [],
  "rules": [
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Return",
      "hiddenTokens": [],
      "entry": true,
      "alternatives": {
        "$type": "Assignment",
        "feature": "left",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "arguments": [],
          "rule": {
            "$refText": "Expression"
          }
        },
        "elements": []
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "ExpressionTailLike",
      "hiddenTokens": [],
      "fragment": true,
      "alternatives": {
        "$type": "Assignment",
        "feature": "tail",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "arguments": [],
          "rule": {
            "$refText": "ExpressionTail"
          }
        },
        "cardinality": "?",
        "elements": []
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Expression",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "Term"
              }
            },
            "elements": []
          },
          {
            "$type": "RuleCall",
            "arguments": [],
            "rule": {
              "$refText": "ExpressionTailLike"
            }
          }
        ]
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "ExpressionTail",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "operator",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "+",
                  "elements": []
                },
                {
                  "$type": "Keyword",
                  "value": "-"
                }
              ]
            },
            "elements": []
          },
          {
            "$type": "Assignment",
            "feature": "right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "Term"
              }
            }
          },
          {
            "$type": "RuleCall",
            "arguments": [],
            "rule": {
              "$refText": "ExpressionTailLike"
            }
          }
        ]
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "TermTailLike",
      "hiddenTokens": [],
      "fragment": true,
      "alternatives": {
        "$type": "Assignment",
        "feature": "tail",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "arguments": [],
          "rule": {
            "$refText": "TermTail"
          }
        },
        "cardinality": "?",
        "elements": []
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Term",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "Factor"
              }
            },
            "elements": []
          },
          {
            "$type": "RuleCall",
            "arguments": [],
            "rule": {
              "$refText": "TermTailLike"
            }
          }
        ]
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "TermTail",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "operator",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "*",
                  "elements": []
                },
                {
                  "$type": "Keyword",
                  "value": "/"
                }
              ]
            },
            "elements": []
          },
          {
            "$type": "Assignment",
            "feature": "right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "Factor"
              }
            }
          },
          {
            "$type": "RuleCall",
            "arguments": [],
            "rule": {
              "$refText": "TermTailLike"
            }
          }
        ]
      }
    },
    {
      "$type": "ParserRule",
      "parameters": [],
      "name": "Factor",
      "hiddenTokens": [],
      "alternatives": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "arguments": [],
              "rule": {
                "$refText": "NUM"
              }
            },
            "elements": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "RuleCall",
                "arguments": [],
                "rule": {
                  "$refText": "PLUS_MINUS"
                },
                "elements": []
              },
              {
                "$type": "Assignment",
                "feature": "error",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "arguments": [],
                  "rule": {
                    "$refText": "NUM"
                  }
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      }
    },
    {
      "$type": "TerminalRule",
      "name": "NUM",
      "terminal": {
        "$type": "RegexToken",
        "regex": "[0-9]+(\\\\.[0-9]+)?",
        "elements": []
      }
    },
    {
      "$type": "TerminalRule",
      "name": "PLUS_MINUS",
      "terminal": {
        "$type": "RegexToken",
        "regex": "#",
        "elements": []
      }
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "terminal": {
        "$type": "RegexToken",
        "regex": "\\\\s+",
        "elements": []
      }
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "terminal": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\/",
        "elements": []
      }
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "terminal": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/[^\\\\n\\\\r]*",
        "elements": []
      }
    }
  ],
  "interfaces": [],
  "types": [],
  "isDeclared": true,
  "name": "EpsilonRhoRho"
}`));
