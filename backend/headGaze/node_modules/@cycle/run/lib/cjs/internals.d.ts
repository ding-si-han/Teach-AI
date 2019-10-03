import { DisposeFunction, Drivers, SinkProxies, Sources } from './types';
export declare function makeSinkProxies<D extends Drivers>(drivers: D): SinkProxies<D>;
export declare function callDrivers<D extends Drivers>(drivers: D, sinkProxies: SinkProxies<D>): Sources<D>;
export declare function adaptSources<So>(sources: So): So;
export declare function replicateMany<Si extends any>(sinks: Si, sinkProxies: SinkProxies<Si>): DisposeFunction;
export declare function disposeSinkProxies<Si>(sinkProxies: SinkProxies<Si>): void;
export declare function disposeSources<So>(sources: So): void;
export declare function isObjectEmpty(obj: any): boolean;
