import './index.pcss';
import 'mdn-polyfills/Array.from';
import 'mdn-polyfills/Array.prototype.find';

// import all css files

const css = require.context('./', true, /\.(p)?css$/);
css.keys()
    .filter((key) => !key.startsWith('./mixin/'))
    .forEach(css);

// import all ts files

const js = require.context('./', true, /\.ts$/);
js.keys().forEach(js);
