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
    | exception _ => (substr, idx)
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
            switch (t.text) {
            | [head, ..._rest] => resolve(. Text(head))
            | [] =>
              Js.log("empty array");
              resolve(. Done);
            };
          },
        t.timeout,
      );
    };
    writeRec(idx, text, t) |> ignore;
  });
};

let appendCursor = el => {
  let style = Document.createElement("style");
  ".re-typed-text:after {
    animation: re-typed-blinker 0.7s step-end infinite;
    content: '|';
    color: white;
    font-weight: bold;
   }

  @keyframes re-typed-blinker {
   50% {
    opacity: 0;
   }
  }"
  |> Document.setInnerHtml(style);

  let textNode = Document.createElement("span");
  Document.setClassName(textNode, "re-typed-text");

  el->Document.appendChild(textNode);
  el->Document.appendChild(style);

  textNode;
};

let make = el => {
  Document.setInnerHtml(el, "");
  let textEl = appendCursor(el);
  {
    el: textEl,
    text: [],
    timeout: 40,
    timeoutId: None,
    current: Js.Promise.resolve(Init),
  };
};

let write = (text, ~preserve: bool=false, t) => {
  let t' = {...t, text: [text, ...t.text]};
  let current =
    t.current
    |> Js.Promise.then_(o =>
         switch (o) {
         | Init => write_(~preserve, 0, text, t')
         | Text(_) => write_(~preserve, 0, " " ++ text, t')
         | Done => Js.Promise.resolve(Done)
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
