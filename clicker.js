/**
 * @name JS Dom Clicker
 * @author Blockman_#0431
 */

function isElem(e) {
  return e instanceof Element;
}

function isNum(n) {
  return !isNaN(Number(n));
}

function isStr(s) {
  return typeof s === "string";
}

function getElemByPos(x, y) {
  var zInd = (el) => +getComputedStyle(el, null).getPropertyValue("zIndex");
  var inside = [...document.all].filter(function (el) {
    var p = el.getBoundingClientRect();
    return (
      x > p.left && x < p.left + p.width && y > p.top && y < p.top + p.height
    );
  });
  inside.sort((a, b) => (zInd(a) > zInd(b) ? 1 : -1));
  return inside[0] ?? null;
}

function runMouseEvent(el, event, props = {}) {
  var e = props.event ?? new MouseEvent(event, props);
  return el.dispatchEvent(e);
}

function runKeyEvent(el, event, props = {}) {
  var e = props.event ?? new KeyboardEvent(event, props);
  return el.dispatchEvent(e);
}

export function mouseClick(x, y) {
  var target = isElem(x) ? x : getElemByPos(x, y);
  if (target) runMouseEvent(target, "click");
  return !!target;
}

export function mouseDown(x, y) {
  var target = isElem(x) ? x : getElemByPos(x, y);
  if (target) runMouseEvent(target, "mousedown");
  return !!target;
}

export function mouseMove(x, y) {
  var target = isElem(x) ? x : getElemByPos(x, y);
  if (target) runMouseEvent(target, "mousemove");
  return !!target;
}

export function mouseUp(x, y) {
  var target = isElem(x) ? x : getElemByPos(x, y);
  if (target) runMouseEvent(target, "mouseup");
  return !!target;
}

export function keyDown(x, y, key) {
  var target = isElem(x) ? x : getElemByPos(x, y);
  var code =
    key !== void 0
      ? isStr(key)
        ? key.charCodeAt()
        : key
      : isStr(y)
      ? y.charCodeAt()
      : y;
  if (target)
    runKeyEvent(target, "keydown", {
      keyCode: code,
      key: String.fromCharCode(code)
    });
  return !!target;
}

export function keyUp(x, y, key) {
  var target = isElem(x) ? x : getElemByPos(x, y);
  var code =
    key !== void 0
      ? isStr(key)
        ? key.charCodeAt()
        : key
      : isStr(y)
      ? y.charCodeAt()
      : y;
  if (target)
    runKeyEvent(target, "keyup", {
      keyCode: code,
      key: String.fromCharCode(code)
    });
  return !!target;
}

export function keyPress(x, y, key) {
  var kd = keyDown(...arguments);
  var ku = keyUp(...arguments);
  return !!(kd && ku);
}

export async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
