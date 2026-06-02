(function () {
  function flatten(children, output) {
    children.forEach(function (child) {
      if (Array.isArray(child)) flatten(child, output);
      else if (child !== null && child !== undefined && child !== false) output.push(child);
    });
    return output;
  }

  var svgTags = {
    svg: true,
    g: true,
    defs: true,
    clipPath: true,
    text: true,
    rect: true,
    line: true,
    path: true
  };

  var svgAttrs = {
    clipPath: "clip-path",
    className: "class",
    preserveAspectRatio: "preserveAspectRatio",
    strokeLinecap: "stroke-linecap",
    strokeLinejoin: "stroke-linejoin",
    strokeWidth: "stroke-width",
    textAnchor: "text-anchor",
    vectorEffect: "vector-effect",
    viewBox: "viewBox"
  };

  function renderNode(node, inSvg) {
    if (node === null || node === undefined || node === false) {
      return document.createTextNode("");
    }

    if (Array.isArray(node)) {
      var fragment = document.createDocumentFragment();
      node.forEach(function (child) {
        fragment.appendChild(renderNode(child, inSvg));
      });
      return fragment;
    }

    if (typeof node === "string" || typeof node === "number") {
      return document.createTextNode(String(node));
    }

    if (typeof node.type === "function") {
      return renderNode(node.type(node.props || {}), inSvg);
    }

    var type = node.type || "div";
    var isSvg = inSvg || svgTags[type];
    var element = isSvg
      ? document.createElementNS("http://www.w3.org/2000/svg", type)
      : document.createElement(type);
    var props = node.props || {};

    Object.keys(props).forEach(function (key) {
      if (key === "children" || props[key] === null || props[key] === undefined) return;
      if (isSvg && svgAttrs[key]) element.setAttribute(svgAttrs[key], props[key]);
      else if (key === "className") element.setAttribute("class", props[key]);
      else if (key === "htmlFor") element.setAttribute("for", props[key]);
      else if (key === "style" && typeof props[key] === "object") Object.assign(element.style, props[key]);
      else if (/^on[A-Z]/.test(key) && typeof props[key] === "function") {
        element.addEventListener(key.slice(2).toLowerCase(), props[key]);
      } else if (props[key] === true) {
        element.setAttribute(key, "");
      } else if (props[key] !== false) {
        element.setAttribute(key, props[key]);
      }
    });

    flatten([props.children], []).forEach(function (child) {
      element.appendChild(renderNode(child, isSvg && type !== "foreignObject"));
    });

    return element;
  }

  if (!window.React) {
    window.React = {
      createElement: function (type, props) {
        var children = Array.prototype.slice.call(arguments, 2);
        return {
          type: type,
          props: Object.assign({}, props || {}, { children: flatten(children, []) })
        };
      }
    };
  }

  if (!window.ReactDOM) {
    window.ReactDOM = {
      createRoot: function (container) {
        return {
          render: function (tree) {
            container.innerHTML = "";
            container.appendChild(renderNode(tree));
            if (typeof window.__afterStudioRender === "function") {
              requestAnimationFrame(window.__afterStudioRender);
            }
          }
        };
      }
    };
  }
})();
