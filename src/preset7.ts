import { IColumnsCenterGrid, IGrid, IPreset, IRowsTopGrid } from '@sergeyzwezdin/pixelgrid/dist';

const defaultPreset: IPreset = {
    grids: [
        {
            type: 'rows-top',
            color: '#455A64',
            opacity: 0.2,
            gutter: 41,
            height: 48,
            offset: 96,
            count: 8
        } as IRowsTopGrid
    ]
};

const xlgPreset = {
    grids: [
        {
            type: 'columns-center',
            color: '#736F6F',
            opacity: 0.15,
            count: 9,
            gutter: 32,
            width: 92
        } as IColumnsCenterGrid
    ],
    mediaQuery: '(min-width: 120rem)'
};

const lgPreset = {
    grids: [
        {
            type: 'columns-center',
            color: '#736F6F',
            opacity: 0.15,
            count: 9,
            gutter: 32,
            width: 82
        } as IColumnsCenterGrid
    ],
    mediaQuery: '(min-width: 89rem) and (max-width: 119.99rem)'
};

export default [defaultPreset, xlgPreset, lgPreset];
