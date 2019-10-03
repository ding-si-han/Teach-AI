# OpenCV.js

_This is a fork published to npm. See the [original](https://www.npmjs.com/package/opencv.js) for support etc._

## Modifications

To use [solvePnP](https://docs.opencv.org/3.4.5/d9/d0c/group__calib3d.html#ga549c2075fac14829ff4a58bc931c033d) and [projectPoints](https://docs.opencv.org/3.4.5/d9/d0c/group__calib3d.html#ga1019495a2c8d1743ed5cc23fa0daff8c) methods in [calib3d](https://docs.opencv.org/3.4.5/d9/d0c/group__calib3d.html) module [that was not exposed to OpenCV.js v3.4.5](https://github.com/opencv/opencv/blob/3.4.5/platforms/js/build_js.py#L117), I made the [these modifications](https://github.com/mjyc/opencv/commit/1a75b08aa420062d66185efb61a456cbc4b1b430).

Then, I built a **asm.js** version of `opencv.js` by following [the instructions](https://docs.opencv.org/3.4.5/d4/da1/tutorial_js_setup.html) (essentially, this command: `python ./platforms/js/build_js.py build_js
 --disable_wasm`) and copied the output `./build_js/bin/opencv.js` file into [`./platforms/js/opencv.js/`](https://github.com/mjyc/opencv/tree/js3.4.5_calib3d/platforms/js/opencv.js) folder.

Finally, I copied other informative files from the [original opencv.js npm pkg](https://www.npmjs.com/package/opencv.js) and updated `README.md` file.

## Thanks

I thank [ganwenyao](https://github.com/ganwenyao) for demonstrating [how to export a module in JavaScript](https://github.com/ganwenyao/opencv_js) and [huningxin](https://github.com/huningxin) and [ucisysarch](https://github.com/ucisysarch) for leaving handful of notes, e.g., [here](https://github.com/huningxin/opencv) and [here](https://github.com/ucisysarch/opencvjs).
