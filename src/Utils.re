module Animation = {
  type animationFrameId;

  [@bs.val]
  external requestAnimationFrame: (float => unit) => animationFrameId =
    "requestAnimationFrame";

  [@bs.val]
  external cancelAnimationFrame: animationFrameId => unit =
    "cancelAnimationFrame";
};

module Document = {
  type dom;

  [@bs.scope "document"] [@bs.val] external body: dom = "body";

  [@bs.send] external appendChild: (dom, dom) => unit = "appendChild";

  [@bs.scope "document"] [@bs.val]
  external createElement: string => dom = "createElement";

  [@bs.set] external setClassName: (dom, string) => unit = "className";

  [@bs.set] external setId: (dom, string) => unit = "id";

  [@bs.get] external getInnerHtml: dom => string = "innerHTML";

  [@bs.set] external setInnerHtml: (dom, string) => unit = "innerHTML";

  [@bs.scope "document"] [@bs.val] [@bs.return nullable]
  external querySelector: string => option(dom) = "querySelector";
};
