import './index.pcss';
import 'mdn-polyfills/Array.from';
import 'mdn-polyfills/Array.prototype.find';

import { initializeGrid } from '@sergeyzwezdin/pixelgrid';
import page1Preset from './preset1';
import page2Preset from './preset2';
import page3Preset from './preset3';
import page4Preset from './preset4';
import page5Preset from './preset5';
import page6Preset from './preset6';
import page7Preset from './preset7';

// import all css files

const css = require.context('./', true, /\.(p)?css$/);
css.keys()
    .filter((key) => !key.startsWith('./mixin/'))
    .forEach(css);

// import all ts files

const js = require.context('./', true, /\.ts$/);
js.keys().forEach(js);

// grid

const showGrid = (page: string | null) => {
    if (page === '1') {
        initializeGrid(page1Preset);
    } else if (page === '2') {
        initializeGrid(page2Preset);
    } else if (page === '3') {
        initializeGrid(page3Preset);
    } else if (page === '4') {
        initializeGrid(page4Preset);
    } else if (page === '5') {
        initializeGrid(page5Preset);
    } else if (page === '6') {
        initializeGrid(page6Preset);
    } else if (page === '7') {
        initializeGrid(page7Preset);
    }
};

const element = Array.from(document.body.childNodes).find((e) => e.nodeType === 1) as HTMLElement;
if (element) {
    showGrid(element.getAttribute('data-grid'));
}
