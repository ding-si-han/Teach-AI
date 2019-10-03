function getGlobal() {
    var globalObj;
    if (typeof window !== 'undefined') {
        globalObj = window;
    }
    else if (typeof global !== 'undefined') {
        globalObj = global;
    }
    else {
        globalObj = this;
    }
    globalObj.Cyclejs = globalObj.Cyclejs || {};
    globalObj = globalObj.Cyclejs;
    globalObj.adaptStream = globalObj.adaptStream || (function (x) { return x; });
    return globalObj;
}
export function setAdapt(f) {
    getGlobal().adaptStream = f;
}
export function adapt(stream) {
    return getGlobal().adaptStream(stream);
}
//# sourceMappingURL=adapt.js.map