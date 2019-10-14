import { IColumnsCenterGrid, IGrid, IPreset, IRowsTopGrid } from '@sergeyzwezdin/pixelgrid/dist';

const defaultPreset: IPreset = {
    grids: [
        {
            type: 'grid',
            color: '#999999',
            opacity: 0.15,
            size: 8
        } as IGrid,

        {
            type: 'rows-top',
            color: '#455A64',
            opacity: 0.2,
            gutter: 40,
            height: 32,
            offset: 160,
            count: 6
        } as IRowsTopGrid
    ]
};

const xlgPreset = {
    grids: [
        {
            type: 'columns-center',
            color: '#AAAAAA',
            opacity: 0.15,
            count: 12,
            gutter: 32,
            width: 92
        } as IColumnsCenterGrid,
        {
            type: 'columns-center',
            color: '#736F6F',
            opacity: 0.15,
            count: 6,
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
            color: '#AAAAAA',
            opacity: 0.15,
            count: 12,
            gutter: 32,
            width: 82
        } as IColumnsCenterGrid,
        {
            type: 'columns-center',
            color: '#736F6F',
            opacity: 0.15,
            count: 6,
            gutter: 32,
            width: 82
        } as IColumnsCenterGrid
    ],
    mediaQuery: '(min-width: 89rem) and (max-width: 119.99rem)'
};

export default [defaultPreset, xlgPreset, lgPreset];
