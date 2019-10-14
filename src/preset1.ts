import { IColumnsCenterGrid, IGrid, IPreset, IRowsTopGrid } from '@sergeyzwezdin/pixelgrid/dist';

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
            opacity: 0.15,
            count: 12,
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
            color: '#2196F3',
            opacity: 0.15,
            count: 12,
            gutter: 32,
            width: 82
        } as IColumnsCenterGrid
    ],
    mediaQuery: '(min-width: 89rem) and (max-width: 119.99rem)'
};

export default [defaultPreset, xlgPreset, lgPreset];
