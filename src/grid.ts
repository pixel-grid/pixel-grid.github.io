import {
    IColumnsCenterGrid,
    IColumnsStretchGrid,
    IGrid,
    IPreset,
    IRowsTopGrid,
    destroyGrid,
    initializeGrid
} from '@sergeyzwezdin/pixelgrid';

let token: { root: HTMLElement; resizeHandler: () => void } | undefined;

const showGrid = () => {
    const defaultPreset: IPreset = {
        grids: [
            {
                type: 'grid',
                color: '#78909C',
                opacity: 0.2,
                size: 8
            } as IGrid,

            {
                type: 'rows-top',
                color: '#78909C',
                opacity: 0.2,
                gutter: 8,
                height: 8,
                offset: 8
            } as IRowsTopGrid
        ]
    };

    const xlgPreset = {
        grids: [
            {
                type: 'columns-center',
                color: '#03A9F4',
                opacity: 0.25,
                count: 12,
                gutter: 32,
                width: 92
            } as IColumnsCenterGrid
        ],
        mediaQuery: '(min-width: 120em)'
    };

    const lgPreset = {
        grids: [
            {
                type: 'columns-center',
                color: '#2196F3',
                opacity: 0.25,
                count: 12,
                gutter: 32,
                width: 82
            } as IColumnsCenterGrid
        ],
        mediaQuery: '(min-width: 89em) and (max-width: 119.99em)'
    };

    const mdPreset = {
        grids: [
            {
                type: 'columns-stretch',
                color: '#3F51B5',
                opacity: 0.25,
                count: 12,
                gutter: 16,
                margin: 16
            } as IColumnsStretchGrid
        ],
        mediaQuery: '(min-width: 84em) and (max-width: 88.99em)'
    };

    const smPreset = {
        grids: [
            {
                type: 'columns-stretch',
                color: '#673AB7',
                opacity: 0.25,
                count: 12,
                gutter: 8,
                margin: 16
            } as IColumnsStretchGrid
        ],
        mediaQuery: '(min-width: 40em) and (max-width: 83.99em)'
    };

    const xsPreset = {
        grids: [
            {
                type: 'columns-stretch',
                color: '#9C27B0',
                opacity: 0.25,
                count: 12,
                gutter: 8,
                margin: 16
            } as IColumnsStretchGrid
        ],
        mediaQuery: '(min-width: 30em) and (max-width: 39.99em)'
    };

    const xxsPreset = {
        grids: [
            {
                type: 'columns-stretch',
                color: '#E91E63',
                opacity: 0.25,
                count: 12,
                gutter: 8,
                margin: 8
            } as IColumnsStretchGrid
        ],
        mediaQuery: '(max-width: 29.99em)'
    };
    token = initializeGrid([defaultPreset, xlgPreset, lgPreset, mdPreset, smPreset, xsPreset, xxsPreset], { zIndex: 10000, useRem: true });
};

const hideGrid = () => {
    if (token) {
        destroyGrid(token);
        token = undefined;
    }
};

const switchElement = document.getElementById('pluginenable');
const trynowElement = document.getElementById('trynow');

// "Try it" switch
if (switchElement) {
    switchElement.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLInputElement;
        if (target) {
            if (target.checked) {
                showGrid();

                if (trynowElement) {
                    trynowElement.innerText = 'Remove grid';
                }
            } else {
                hideGrid();

                if (trynowElement) {
                    trynowElement.innerText = 'Try it now';
                }
            }
        }
    });
}

// "Try it now" button
if (trynowElement && switchElement) {
    trynowElement.addEventListener('click', () => {
        switchElement.click();
    });
}
