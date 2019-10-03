export { thunk, Thunk, ThunkData } from './thunk';
export { VNode, VNodeData } from 'snabbdom/vnode';
export { DOMSource, EventsFnOptions } from './DOMSource';
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
export { makeDOMDriver, DOMDriverOptions } from './makeDOMDriver';
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
export { mockDOMSource, MockConfig, MockedDOMSource } from './mockDOMSource';
export { CycleDOMEvent } from './EventDelegator';
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
import { HyperScriptHelperFn, SVGHelperFn } from './hyperscript-helpers';
export declare const svg: SVGHelperFn;
export declare const a: HyperScriptHelperFn;
export declare const abbr: HyperScriptHelperFn;
export declare const address: HyperScriptHelperFn;
export declare const area: HyperScriptHelperFn;
export declare const article: HyperScriptHelperFn;
export declare const aside: HyperScriptHelperFn;
export declare const audio: HyperScriptHelperFn;
export declare const b: HyperScriptHelperFn;
export declare const base: HyperScriptHelperFn;
export declare const bdi: HyperScriptHelperFn;
export declare const bdo: HyperScriptHelperFn;
export declare const blockquote: HyperScriptHelperFn;
export declare const body: HyperScriptHelperFn;
export declare const br: HyperScriptHelperFn;
export declare const button: HyperScriptHelperFn;
export declare const canvas: HyperScriptHelperFn;
export declare const caption: HyperScriptHelperFn;
export declare const cite: HyperScriptHelperFn;
export declare const code: HyperScriptHelperFn;
export declare const col: HyperScriptHelperFn;
export declare const colgroup: HyperScriptHelperFn;
export declare const dd: HyperScriptHelperFn;
export declare const del: HyperScriptHelperFn;
export declare const dfn: HyperScriptHelperFn;
export declare const dir: HyperScriptHelperFn;
export declare const div: HyperScriptHelperFn;
export declare const dl: HyperScriptHelperFn;
export declare const dt: HyperScriptHelperFn;
export declare const em: HyperScriptHelperFn;
export declare const embed: HyperScriptHelperFn;
export declare const fieldset: HyperScriptHelperFn;
export declare const figcaption: HyperScriptHelperFn;
export declare const figure: HyperScriptHelperFn;
export declare const footer: HyperScriptHelperFn;
export declare const form: HyperScriptHelperFn;
export declare const h1: HyperScriptHelperFn;
export declare const h2: HyperScriptHelperFn;
export declare const h3: HyperScriptHelperFn;
export declare const h4: HyperScriptHelperFn;
export declare const h5: HyperScriptHelperFn;
export declare const h6: HyperScriptHelperFn;
export declare const head: HyperScriptHelperFn;
export declare const header: HyperScriptHelperFn;
export declare const hgroup: HyperScriptHelperFn;
export declare const hr: HyperScriptHelperFn;
export declare const html: HyperScriptHelperFn;
export declare const i: HyperScriptHelperFn;
export declare const iframe: HyperScriptHelperFn;
export declare const img: HyperScriptHelperFn;
export declare const input: HyperScriptHelperFn;
export declare const ins: HyperScriptHelperFn;
export declare const kbd: HyperScriptHelperFn;
export declare const keygen: HyperScriptHelperFn;
export declare const label: HyperScriptHelperFn;
export declare const legend: HyperScriptHelperFn;
export declare const li: HyperScriptHelperFn;
export declare const link: HyperScriptHelperFn;
export declare const main: HyperScriptHelperFn;
export declare const map: HyperScriptHelperFn;
export declare const mark: HyperScriptHelperFn;
export declare const menu: HyperScriptHelperFn;
export declare const meta: HyperScriptHelperFn;
export declare const nav: HyperScriptHelperFn;
export declare const noscript: HyperScriptHelperFn;
export declare const object: HyperScriptHelperFn;
export declare const ol: HyperScriptHelperFn;
export declare const optgroup: HyperScriptHelperFn;
export declare const option: HyperScriptHelperFn;
export declare const p: HyperScriptHelperFn;
export declare const param: HyperScriptHelperFn;
export declare const pre: HyperScriptHelperFn;
export declare const progress: HyperScriptHelperFn;
export declare const q: HyperScriptHelperFn;
export declare const rp: HyperScriptHelperFn;
export declare const rt: HyperScriptHelperFn;
export declare const ruby: HyperScriptHelperFn;
export declare const s: HyperScriptHelperFn;
export declare const samp: HyperScriptHelperFn;
export declare const script: HyperScriptHelperFn;
export declare const section: HyperScriptHelperFn;
export declare const select: HyperScriptHelperFn;
export declare const small: HyperScriptHelperFn;
export declare const source: HyperScriptHelperFn;
export declare const span: HyperScriptHelperFn;
export declare const strong: HyperScriptHelperFn;
export declare const style: HyperScriptHelperFn;
export declare const sub: HyperScriptHelperFn;
export declare const sup: HyperScriptHelperFn;
export declare const table: HyperScriptHelperFn;
export declare const tbody: HyperScriptHelperFn;
export declare const td: HyperScriptHelperFn;
export declare const textarea: HyperScriptHelperFn;
export declare const tfoot: HyperScriptHelperFn;
export declare const th: HyperScriptHelperFn;
export declare const thead: HyperScriptHelperFn;
export declare const title: HyperScriptHelperFn;
export declare const tr: HyperScriptHelperFn;
export declare const u: HyperScriptHelperFn;
export declare const ul: HyperScriptHelperFn;
export declare const video: HyperScriptHelperFn;
