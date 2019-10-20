'use strict';

var out_of_memory = /* tuple */[
  "Out_of_memory",
  0
];

var sys_error = /* tuple */[
  "Sys_error",
  -1
];

var failure = /* tuple */[
  "Failure",
  -2
];

var invalid_argument = /* tuple */[
  "Invalid_argument",
  -3
];

var end_of_file = /* tuple */[
  "End_of_file",
  -4
];

var division_by_zero = /* tuple */[
  "Division_by_zero",
  -5
];

var not_found = /* tuple */[
  "Not_found",
  -6
];

var match_failure = /* tuple */[
  "Match_failure",
  -7
];

var stack_overflow = /* tuple */[
  "Stack_overflow",
  -8
];

var sys_blocked_io = /* tuple */[
  "Sys_blocked_io",
  -9
];

var assert_failure = /* tuple */[
  "Assert_failure",
  -10
];

var undefined_recursive_module = /* tuple */[
  "Undefined_recursive_module",
  -11
];

out_of_memory.tag = 248;

sys_error.tag = 248;

failure.tag = 248;

invalid_argument.tag = 248;

end_of_file.tag = 248;

division_by_zero.tag = 248;

not_found.tag = 248;

match_failure.tag = 248;

stack_overflow.tag = 248;

sys_blocked_io.tag = 248;

assert_failure.tag = 248;

undefined_recursive_module.tag = 248;
/*  Not a pure module */

function caml_create_bytes(len) {
  if (len < 0) {
    throw [
          invalid_argument,
          "String.create"
        ];
  }
  var result = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    result[i] = /* "\000" */0;
  }
  return result;
}

function caml_blit_bytes(s1, i1, s2, i2, len) {
  if (len > 0) {
    if (s1 === s2) {
      var s1$1 = s1;
      var i1$1 = i1;
      var i2$1 = i2;
      var len$1 = len;
      if (i1$1 < i2$1) {
        var range_a = (s1$1.length - i2$1 | 0) - 1 | 0;
        var range_b = len$1 - 1 | 0;
        var range = range_a > range_b ? range_b : range_a;
        for(var j = range; j >= 0; --j){
          s1$1[i2$1 + j | 0] = s1$1[i1$1 + j | 0];
        }
        return /* () */0;
      } else if (i1$1 > i2$1) {
        var range_a$1 = (s1$1.length - i1$1 | 0) - 1 | 0;
        var range_b$1 = len$1 - 1 | 0;
        var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
        for(var k = 0; k <= range$1; ++k){
          s1$1[i2$1 + k | 0] = s1$1[i1$1 + k | 0];
        }
        return /* () */0;
      } else {
        return 0;
      }
    } else {
      var off1 = s1.length - i1 | 0;
      if (len <= off1) {
        for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
          s2[i2 + i | 0] = s1[i1 + i | 0];
        }
        return /* () */0;
      } else {
        for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
          s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
        }
        for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
          s2[i2 + i$2 | 0] = /* "\000" */0;
        }
        return /* () */0;
      }
    }
  } else {
    return 0;
  }
}

function bytes_to_string(a) {
  var bytes = a;
  var len = a.length;
  var s = "";
  var s_len = len;
  if ( len <= 4096 && len === bytes.length) {
    return String.fromCharCode.apply(null, bytes);
  } else {
    var offset = 0;
    while(s_len > 0) {
      var next = s_len < 1024 ? s_len : 1024;
      var tmp_bytes = new Array(next);
      caml_blit_bytes(bytes, offset, tmp_bytes, 0, next);
      s = s + String.fromCharCode.apply(null, tmp_bytes);
      s_len = s_len - next | 0;
      offset = offset + next | 0;
    }    return s;
  }
}

function bytes_of_string(s) {
  var len = s.length;
  var res = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    res[i] = s.charCodeAt(i);
  }
  return res;
}
/* No side effect */

var id = /* record */[/* contents */0];

function caml_fresh_oo_id(param) {
  id[0] += 1;
  return id[0];
}

function create(str) {
  var v_001 = caml_fresh_oo_id();
  var v = /* tuple */[
    str,
    v_001
  ];
  v.tag = 248;
  return v;
}
/* No side effect */

var Exit = create("Pervasives.Exit");
/* No side effect */

function sub(s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          invalid_argument,
          "String.sub / Bytes.sub"
        ];
  }
  var r = caml_create_bytes(len);
  caml_blit_bytes(s, ofs, r, 0, len);
  return r;
}
/* No side effect */

function sub$1(s, ofs, len) {
  return bytes_to_string(sub(bytes_of_string(s), ofs, len));
}

function index_rec(s, lim, _i, c) {
  while(true) {
    var i = _i;
    if (i >= lim) {
      throw not_found;
    }
    if (s.charCodeAt(i) === c) {
      return i;
    } else {
      _i = i + 1 | 0;
      continue ;
    }
  }}

function index_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw [
          invalid_argument,
          "String.index_from / Bytes.index_from"
        ];
  }
  return index_rec(s, l, i, c);
}

function rindex_rec(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      throw not_found;
    }
    if (s.charCodeAt(i) === c) {
      return i;
    } else {
      _i = i - 1 | 0;
      continue ;
    }
  }}

function rindex(s, c) {
  return rindex_rec(s, s.length - 1 | 0, c);
}
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE

function parseHtml(idx, str) {
  var substr = sub$1(str, 0, idx);
  var exit = 0;
  var foundIdx;
  try {
    foundIdx = rindex(substr, /* "<" */60);
    exit = 1;
  }
  catch (exn){
    if (exn === not_found) {
      return /* tuple */[
              substr,
              idx
            ];
    } else {
      throw exn;
    }
  }
  if (exit === 1) {
    if (foundIdx === (idx - 1 | 0)) {
      var exit$1 = 0;
      var closingBracketPos;
      try {
        closingBracketPos = index_from(str, foundIdx, /* ">" */62);
        exit$1 = 2;
      }
      catch (exn$1){
        return /* tuple */[
                substr,
                idx
              ];
      }
      if (exit$1 === 2) {
        var idx$prime = closingBracketPos + 1 | 0;
        var substr$prime = sub$1(str, 0, idx$prime);
        return /* tuple */[
                substr$prime,
                idx$prime
              ];
      }
      
    } else {
      return /* tuple */[
              substr,
              idx
            ];
    }
  }
  
}

function write_(idx, text, preserve, t) {
  var initialText = preserve ? t[/* el */2].innerHTML : "";
  return new Promise((function (resolve, param) {
                var writeRec = function (idx, text, t) {
                  return setTimeout((function (param) {
                                if (idx <= text.length) {
                                  var match = parseHtml(idx, text);
                                  t[/* el */2].innerHTML = initialText + match[0].replace("\n", "<br />");
                                  writeRec(match[1] + 1 | 0, text, t);
                                  return /* () */0;
                                } else {
                                  var match$1 = t[/* text */3];
                                  if (match$1) {
                                    return resolve(/* Text */[match$1[0]]);
                                  } else {
                                    console.log("empty array");
                                    return resolve(/* Done */1);
                                  }
                                }
                              }), t[/* timeout */1]);
                };
                writeRec(idx, text, t);
                return /* () */0;
              }));
}

function appendCursor(el) {
  var style = document.createElement("style");
  style.innerHTML = "#re-typed-text:after {\n    animation: re-typed-blinker 0.7s step-end infinite;\n    content: '|';\n    color: white;\n    font-weight: bold;\n   }\n\n  @keyframes re-typed-blinker {\n   50% {\n    opacity: 0;\n   }\n  }";
  var textNode = document.createElement("span");
  textNode.id = "re-typed-text";
  el.appendChild(textNode);
  el.appendChild(style);
  return textNode;
}

function make(el) {
  el.innerHTML = "";
  var textEl = appendCursor(el);
  return /* record */[
          /* timeoutId */undefined,
          /* timeout */40,
          /* el */textEl,
          /* text : [] */0,
          /* current */Promise.resolve(/* Init */0)
        ];
}

function write(text, $staropt$star, t) {
  var preserve = $staropt$star !== undefined ? $staropt$star : false;
  var t$prime_000 = /* timeoutId */t[/* timeoutId */0];
  var t$prime_001 = /* timeout */t[/* timeout */1];
  var t$prime_002 = /* el */t[/* el */2];
  var t$prime_003 = /* text : :: */[
    text,
    t[/* text */3]
  ];
  var t$prime_004 = /* current */t[/* current */4];
  var t$prime = /* record */[
    t$prime_000,
    t$prime_001,
    t$prime_002,
    t$prime_003,
    t$prime_004
  ];
  var current = t[/* current */4].then((function (o) {
          if (typeof o === "number") {
            if (o !== 0) {
              return Promise.resolve(/* Done */1);
            } else {
              return write_(0, text, preserve, t$prime);
            }
          } else {
            return write_(0, " " + text, preserve, t$prime);
          }
        }));
  return /* record */[
          t$prime_000,
          t$prime_001,
          t$prime_002,
          t$prime_003,
          /* current */current
        ];
}

function wait(ms, t) {
  var current = t[/* current */4].then((function (o) {
          var ms$1 = ms;
          var op = o;
          return new Promise((function (resolve, param) {
                        console.log("waiting...");
                        setTimeout((function (param) {
                                return resolve(op);
                              }), ms$1);
                        return /* () */0;
                      }));
        }));
  return /* record */[
          /* timeoutId */t[/* timeoutId */0],
          /* timeout */t[/* timeout */1],
          /* el */t[/* el */2],
          /* text */t[/* text */3],
          /* current */current
        ];
}
/* No side effect */

// Generated by BUCKLESCRIPT VERSION 5.0.6, PLEASE EDIT WITH CARE

var match = document.querySelector("#root");

if (!(match == null)) {
  write("\nThis <span style=\"color:red;\">has red</b> words.", true, (function (eta) {
            return write("This text <b>has bold</b> and <i>italic</i> words.", undefined, eta);
          })(wait(500, write("\nAnd this one is also written on a new line.", true, wait(500, write("\nThis text is appended to the end of the previous line.", true, wait(1000, (function (eta) {
                                    return write("And yet another sentence.", undefined, eta);
                                  })(wait(2000, (function (eta) {
                                            return write("Some more text...", undefined, eta);
                                          })(wait(1000, (function (eta) {
                                                    return write("This is some test text to use as a demo.", undefined, eta);
                                                  })(make(match)))))))))))));
}
/* match Not a pure module */
