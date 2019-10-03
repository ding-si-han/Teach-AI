export { thunk } from './thunk';
export { MainDOMSource } from './MainDOMSource';
/**
 * A factory for the DOM driver function.
 *
 * Takes a `container` to define the target on the existing DOM which this
 * driver will operate on, and an `options` object as the second argument. The
 * input to this driver is a stream of virtual DOM objects, or in other words,
 * Snabbdom "VNode" objects. The output of this driver is a "DOMSource": a
 * collection of Observables queried with the methods `select()` and `events()`.
 *
 * **`DOMSource.select(selector)`** returns a new DOMSource with scope
 * restricted to the element(s) that matches the CSS `selector` given. To select
 * the page's `document`, use `.select('document')`. To select the container
 * element for this app, use `.select(':root')`.
 *
 * **`DOMSource.events(eventType, options)`** returns a stream of events of
 * `eventType` happening on the elements that match the current DOMSource. The
 * event object contains the `ownerTarget` property that behaves exactly like
 * `currentTarget`. The reason for this is that some browsers doesn't allow
 * `currentTarget` property to be mutated, hence a new property is created. The
 * returned stream is an *xstream* Stream if you use `@cycle/xstream-run` to run
 * your app with this driver, or it is an RxJS Observable if you use
 * `@cycle/rxjs-run`, and so forth.
 *
 * **options for DOMSource.events**
 *
 * The `options` parameter on `DOMSource.events(eventType, options)` is an
 * (optional) object with two optional fields: `useCapture` and
 * `preventDefault`.
 *
 * `useCapture` is by default `false`, except it is `true` for event types that
 * do not bubble. Read more here
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 * about the `useCapture` and its purpose.
 *
 * `preventDefault` is by default `false`, and indicates to the driver whether
 * `event.preventDefault()` should be invoked. This option can be configured in
 * three ways:
 *
 * - `{preventDefault: boolean}` to invoke preventDefault if `true`, and not
 * invoke otherwise.
 * - `{preventDefault: (ev: Event) => boolean}` for conditional invocation.
 * - `{preventDefault: NestedObject}` uses an object to be recursively compared
 * to the `Event` object. `preventDefault` is invoked when all properties on the
 * nested object match with the properties on the event object.
 *
 * Here are some examples:
 * ```typescript
 * // always prevent default
 * DOMSource.select('input').events('keydown', {
 *   preventDefault: true
 * })
 *
 * // prevent default only when `ENTER` is pressed
 * DOMSource.select('input').events('keydown', {
 *   preventDefault: e => e.keyCode === 13
 * })
 *
 * // prevent defualt when `ENTER` is pressed AND target.value is 'HELLO'
 * DOMSource.select('input').events('keydown', {
 *   preventDefault: { keyCode: 13, ownerTarget: { value: 'HELLO' } }
 * });
 * ```
 *
 * **`DOMSource.elements()`** returns a stream of arrays containing the DOM
 * elements that match the selectors in the DOMSource (e.g. from previous
 * `select(x)` calls).
 *
 * **`DOMSource.element()`** returns a stream of DOM elements. Notice that this
 * is the singular version of `.elements()`, so the stream will emit an element,
 * not an array. If there is no element that matches the selected DOMSource,
 * then the returned stream will not emit anything.
 *
 * @param {(String|HTMLElement)} container the DOM selector for the element
 * (or the element itself) to contain the rendering of the VTrees.
 * @param {DOMDriverOptions} options an object with two optional properties:
 *
 *   - `modules: array` overrides `@cycle/dom`'s default Snabbdom modules as
 *     as defined in [`src/modules.ts`](./src/modules.ts).
 * @return {Function} the DOM driver function. The function expects a stream of
 * VNode as input, and outputs the DOMSource object.
 * @function makeDOMDriver
 */
export { makeDOMDriver } from './makeDOMDriver';
/**
 * A factory function to create mocked DOMSource objects, for testing purposes.
 *
 * Takes a `mockConfig` object as argument, and returns
 * a DOMSource that can be given to any Cycle.js app that expects a DOMSource in
 * the sources, for testing.
 *
 * The `mockConfig` parameter is an object specifying selectors, eventTypes and
 * their streams. Example:
 *
 * ```js
 * const domSource = mockDOMSource({
 *   '.foo': {
 *     'click': xs.of({target: {}}),
 *     'mouseover': xs.of({target: {}}),
 *   },
 *   '.bar': {
 *     'scroll': xs.of({target: {}}),
 *     elements: xs.of({tagName: 'div'}),
 *   }
 * });
 *
 * // Usage
 * const click$ = domSource.select('.foo').events('click');
 * const element$ = domSource.select('.bar').elements();
 * ```
 *
 * The mocked DOM Source supports isolation. It has the functions `isolateSink`
 * and `isolateSource` attached to it, and performs simple isolation using
 * classNames. *isolateSink* with scope `foo` will append the class `___foo` to
 * the stream of virtual DOM nodes, and *isolateSource* with scope `foo` will
 * perform a conventional `mockedDOMSource.select('.__foo')` call.
 *
 * @param {Object} mockConfig an object where keys are selector strings
 * and values are objects. Those nested objects have `eventType` strings as keys
 * and values are streams you created.
 * @return {Object} fake DOM source object, with an API containing `select()`
 * and `events()` and `elements()` which can be used just like the DOM Driver's
 * DOMSource.
 *
 * @function mockDOMSource
 */
export { mockDOMSource, MockedDOMSource } from './mockDOMSource';
/**
 * The hyperscript function `h()` is a function to create virtual DOM objects,
 * also known as VNodes. Call
 *
 * ```js
 * h('div.myClass', {style: {color: 'red'}}, [])
 * ```
 *
 * to create a VNode that represents a `DIV` element with className `myClass`,
 * styled with red color, and no children because the `[]` array was passed. The
 * API is `h(tagOrSelector, optionalData, optionalChildrenOrText)`.
 *
 * However, usually you should use "hyperscript helpers", which are shortcut
 * functions based on hyperscript. There is one hyperscript helper function for
 * each DOM tagName, such as `h1()`, `h2()`, `div()`, `span()`, `label()`,
 * `input()`. For instance, the previous example could have been written
 * as:
 *
 * ```js
 * div('.myClass', {style: {color: 'red'}}, [])
 * ```
 *
 * There are also SVG helper functions, which apply the appropriate SVG
 * namespace to the resulting elements. `svg()` function creates the top-most
 * SVG element, and `svg.g`, `svg.polygon`, `svg.circle`, `svg.path` are for
 * SVG-specific child elements. Example:
 *
 * ```js
 * svg({attrs: {width: 150, height: 150}}, [
 *   svg.polygon({
 *     attrs: {
 *       class: 'triangle',
 *       points: '20 0 20 150 150 20'
 *     }
 *   })
 * ])
 * ```
 *
 * @function h
 */
export { h } from 'snabbdom/h';
import hh from './hyperscript-helpers';
export var svg = hh.svg;
export var a = hh.a;
export var abbr = hh.abbr;
export var address = hh.address;
export var area = hh.area;
export var article = hh.article;
export var aside = hh.aside;
export var audio = hh.audio;
export var b = hh.b;
export var base = hh.base;
export var bdi = hh.bdi;
export var bdo = hh.bdo;
export var blockquote = hh.blockquote;
export var body = hh.body;
export var br = hh.br;
export var button = hh.button;
export var canvas = hh.canvas;
export var caption = hh.caption;
export var cite = hh.cite;
export var code = hh.code;
export var col = hh.col;
export var colgroup = hh.colgroup;
export var dd = hh.dd;
export var del = hh.del;
export var dfn = hh.dfn;
export var dir = hh.dir;
export var div = hh.div;
export var dl = hh.dl;
export var dt = hh.dt;
export var em = hh.em;
export var embed = hh.embed;
export var fieldset = hh.fieldset;
export var figcaption = hh.figcaption;
export var figure = hh.figure;
export var footer = hh.footer;
export var form = hh.form;
export var h1 = hh.h1;
export var h2 = hh.h2;
export var h3 = hh.h3;
export var h4 = hh.h4;
export var h5 = hh.h5;
export var h6 = hh.h6;
export var head = hh.head;
export var header = hh.header;
export var hgroup = hh.hgroup;
export var hr = hh.hr;
export var html = hh.html;
export var i = hh.i;
export var iframe = hh.iframe;
export var img = hh.img;
export var input = hh.input;
export var ins = hh.ins;
export var kbd = hh.kbd;
export var keygen = hh.keygen;
export var label = hh.label;
export var legend = hh.legend;
export var li = hh.li;
export var link = hh.link;
export var main = hh.main;
export var map = hh.map;
export var mark = hh.mark;
export var menu = hh.menu;
export var meta = hh.meta;
export var nav = hh.nav;
export var noscript = hh.noscript;
export var object = hh.object;
export var ol = hh.ol;
export var optgroup = hh.optgroup;
export var option = hh.option;
export var p = hh.p;
export var param = hh.param;
export var pre = hh.pre;
export var progress = hh.progress;
export var q = hh.q;
export var rp = hh.rp;
export var rt = hh.rt;
export var ruby = hh.ruby;
export var s = hh.s;
export var samp = hh.samp;
export var script = hh.script;
export var section = hh.section;
export var select = hh.select;
export var small = hh.small;
export var source = hh.source;
export var span = hh.span;
export var strong = hh.strong;
export var style = hh.style;
export var sub = hh.sub;
export var sup = hh.sup;
export var table = hh.table;
export var tbody = hh.tbody;
export var td = hh.td;
export var textarea = hh.textarea;
export var tfoot = hh.tfoot;
export var th = hh.th;
export var thead = hh.thead;
export var title = hh.title;
export var tr = hh.tr;
export var u = hh.u;
export var ul = hh.ul;
export var video = hh.video;
//# sourceMappingURL=index.js.map