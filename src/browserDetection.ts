const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

if (isIE11) {
    document.body.classList.add('browser_ie11');
}
