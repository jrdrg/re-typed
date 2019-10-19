type t;

let make: Utils.Document.dom => t;

let wait: (int, t) => t;

let waitForPromise: (Js.Promise.t(unit), t) => t;

let write: (string, ~preserve: bool=?, t) => t;
