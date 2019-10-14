if (process.env.DEBUG) {
    const { default: enableDebug } = require('responsive-debug');

    enableDebug([
        {
            name: 'xlg',
            mediaQuery: 'screen and (min-width: 120em)'
        },
        {
            name: 'lg',
            mediaQuery: 'screen and (min-width: 89em) and (max-width: 119.99em)'
        },
        {
            name: 'md',
            mediaQuery: 'screen and (min-width: 84em) and (max-width: 88.99em)'
        },
        {
            name: 'sm',
            mediaQuery: 'screen and (min-width: 40em) and (max-width: 83.99em)'
        },
        {
            name: 'xs',
            mediaQuery: 'screen and (min-width: 30em) and (max-width: 39.99em)'
        },
        {
            name: 'xxs',
            mediaQuery: 'screen and (max-width: 29.99em)'
        }
    ]);
}
