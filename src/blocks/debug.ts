const debugEnabled = true;

if (debugEnabled) {
    const xlg = document.createElement('div');
    xlg.setAttribute('data-text', 'xlg: screen and (min-width: 120em)');
    xlg.classList.add('debug-xlg');
    document.body.insertBefore(xlg, document.body.firstChild);

    const lg = document.createElement('div');
    lg.setAttribute('data-text', 'lg: screen and (min-width: 89em) and (max-width: 119.99em)');
    lg.classList.add('debug-lg');
    document.body.insertBefore(lg, document.body.firstChild);

    const md = document.createElement('div');
    md.setAttribute('data-text', 'md: screen and (min-width: 84em) and (max-width: 88.99em)');
    md.classList.add('debug-md');
    document.body.insertBefore(md, document.body.firstChild);

    const sm = document.createElement('div');
    sm.setAttribute('data-text', 'sm: screen and (min-width: 40em) and (max-width: 83.99em)');
    sm.classList.add('debug-sm');
    document.body.insertBefore(sm, document.body.firstChild);

    const xs = document.createElement('div');
    xs.setAttribute('data-text', 'xs: screen and (min-width: 30em) and (max-width: 39.99em)');
    xs.classList.add('debug-xs');
    document.body.insertBefore(xs, document.body.firstChild);

    const xxs = document.createElement('div');
    xxs.setAttribute('data-text', 'xxs: screen and (max-width: 29.99em)');
    xxs.classList.add('debug-xxs');
    document.body.insertBefore(xxs, document.body.firstChild);

    const width = document.createElement('div');
    width.classList.add('debug-width');
    document.body.insertBefore(width, document.body.firstChild);

    const updateResponsiveBreakText = (element: HTMLElement) => {
        const text = element.getAttribute('data-text') || '';
        const fontSize = parseFloat(window.getComputedStyle(document.body).getPropertyValue('font-size'));
        element.innerText = text.replace(/[\d\.]+em/gi, (t) => `${t} / ${fontSize * parseFloat(t)}px`);
    };
    const updateWidthText = (element: HTMLElement) => {
        element.innerText = `Width: ${window.innerWidth}px, Font size: ${window
            .getComputedStyle(document.body)
            .getPropertyValue('font-size')}`;
    };

    const throttle = function(type: string, name: string) {
        let running = false;
        window.addEventListener(type, () => {
            if (running) {
                return;
            }
            running = true;
            requestAnimationFrame(() => {
                window.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        });
    };

    throttle('resize', 'optimizedResize');

    updateResponsiveBreakText(xlg);
    updateResponsiveBreakText(lg);
    updateResponsiveBreakText(md);
    updateResponsiveBreakText(sm);
    updateResponsiveBreakText(xs);
    updateResponsiveBreakText(xxs);
    updateWidthText(width);

    window.addEventListener('optimizedResize', () => {
        updateResponsiveBreakText(xlg);
        updateResponsiveBreakText(lg);
        updateResponsiveBreakText(md);
        updateResponsiveBreakText(sm);
        updateResponsiveBreakText(xs);
        updateResponsiveBreakText(xxs);
        updateWidthText(width);
    });
}
