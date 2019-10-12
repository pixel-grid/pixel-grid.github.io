declare global {
    interface Document {
        documentMode: any;
    }
}

import './index.pcss';
import './browserDetection';
import 'mdn-polyfills/Array.from';
import 'mdn-polyfills/Array.prototype.find';
import 'mdn-polyfills/String.prototype.startsWith';
import 'mdn-polyfills/NodeList.prototype.forEach';

// import all css files

const css = require.context('./', true, /\.(p)?css$/);
css.keys()
    .filter((key) => !key.startsWith('./mixin/'))
    .forEach(css);

// import all ts files

const js = require.context('./', true, /\.ts$/);
js.keys().forEach(js);
