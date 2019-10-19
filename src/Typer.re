open Utils;
open Js.Global;

type op =
  | Init
  | Done
  | Text(string);

type t = {
  timeoutId: option(timeoutId),
  timeout: int,
  el: Document.dom,
  text: list(string),
  current: Js.Promise.t(op),
};

let wait_ = (ms: int, op) =>
  Js.Promise.make((~resolve, ~reject as _) => {
    Js.log("waiting...");
    setTimeout(() => resolve(. op), ms) |> ignore;
    ();
  });

let replaceNewlines = str => {
  str |> Js.String.replace("\n", "<br />");
};

let parseHtml = (idx, str) => {
  let substr = String.sub(str, 0, idx);
  switch (String.rindex(substr, '<')) {
  | foundIdx when foundIdx === idx - 1 =>
    switch (String.index_from(str, foundIdx, '>')) {
    | closingBracketPos =>
      let idx' = closingBracketPos + 1;
      let substr' = String.sub(str, 0, idx');
      (substr', idx');
    | exception _ =>
      Js.log("EXCEPTION!");
      (substr, idx);
    }
  | _ => (substr, idx)
  | exception Not_found => (substr, idx)
  };
};

let write_ = (idx: int, text: string, ~preserve: bool, t) => {
  let initialText = preserve ? Document.getInnerHtml(t.el) : "";
  Js.Promise.make((~resolve, ~reject as _) => {
    let rec writeRec = (idx: int, text: string, t) => {
      setTimeout(
        () =>
          if (idx <= String.length(text)) {
            let (parsed, idx) = parseHtml(idx, text);

            initialText
            ++ replaceNewlines(parsed)
            |> Document.setInnerHtml(t.el);

            writeRec(idx + 1, text, t) |> ignore;
          } else {
            Js.log("Next");
            Js.log(t.text);
            switch (t.text) {
            | [head, ...rest] =>
              Js.log3("writing next string", head, List.length(rest));
              resolve(. Text(head));
            | [] =>
              Js.log("empty array");
              resolve(. Done);
            };
          },
        t.timeout,
      );
    };
    Js.log2("__writing__", text);
    writeRec(idx, text, t) |> ignore;
  });
};
let make = el => {
  el,
  text: [],
  timeout: 60,
  timeoutId: None,
  current: Js.Promise.resolve(Init),
};

let write = (text, ~preserve: bool=false, t) => {
  let t' = {...t, text: [text, ...t.text]};
  let current =
    t.current
    |> Js.Promise.then_(o =>
         switch (o) {
         | Init => write_(~preserve, 0, text, t')
         | Text(_) => write_(~preserve, 0, text ++ " ", t')
         | Done =>
           Js.log("??????");
           Js.Promise.resolve(Done);
         }
       );

  {...t', current};
};

let wait = (ms, t) => {
  let current = t.current |> Js.Promise.then_(o => wait_(ms, o));
  {...t, current};
};

let waitForPromise = (promise: Js.Promise.t(unit), t) => {
  let current =
    t.current
    |> Js.Promise.then_(_ => promise)
    |> Js.Promise.then_(() => t.current);

  {...t, current};
};

let rec foo = x =>
  if (x <= 1) {
    0;
  } else {
    foo(x - 1);
  };

foo(3);
