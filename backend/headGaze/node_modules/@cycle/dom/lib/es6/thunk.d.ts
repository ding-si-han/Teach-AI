import { VNode, VNodeData } from 'snabbdom/vnode';
export interface ThunkData extends VNodeData {
    fn(): VNode;
    args: Array<any>;
}
export interface Thunk extends VNode {
    data: ThunkData;
}
export declare function thunk(sel: string, fn: Function, args: Array<any>): Thunk;
export declare function thunk(sel: string, key: any, fn: Function, args: Array<any>): Thunk;
export default thunk;
