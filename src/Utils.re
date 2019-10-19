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

  [@bs.scope "document"] [@bs.val] [@bs.return nullable]
  external querySelector: string => option(dom) = "querySelector";

  [@bs.scope "document"] [@bs.val]
  external createElement: string => dom = "createElement";

  [@bs.get] external getInnerHtml: dom => string = "innerHTML";
  [@bs.set] external setInnerHtml: (dom, string) => unit = "innerHTML";
};
