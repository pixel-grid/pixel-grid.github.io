import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import PhotoSwipe, { Item, Options } from 'photoswipe';

import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

const multiItemSlider: (mainElement: Element, onOpen?: () => void, onClose?: () => void) => (direction: 'left' | 'right') => void = (
    mainElement,
    onOpen,
    onClose
) => {
    if (mainElement) {
        const sliderWrapper: HTMLElement | null = mainElement.querySelector('.slider__wrapper');

        if (sliderWrapper) {
            const sliderItems: HTMLElement[] = Array.from(mainElement.querySelectorAll('.slider__item'));
            const sliderControlPrev: HTMLElement | null = mainElement.querySelector('.slider__control-prev');
            const sliderControlNext: HTMLElement | null = mainElement.querySelector('.slider__control-next');

            let positionLeftItem = 0;
            let transform = 0;
            let items: {
                item: HTMLElement;
                index: number;
                position: number;
                transform: number;
            }[] = [];

            items = sliderItems.map((item, index) => ({
                item,
                index,
                position: index,
                transform: 0
            }));

            const getWidth = () => {
                const wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width || '0');
                const itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width || '0');

                const step = (itemWidth / wrapperWidth) * 100;

                return {
                    wrapperWidth,
                    itemWidth,
                    step
                };
            };

            const getItemMin = () =>
                items.reduce(
                    (result: { item: HTMLElement; position: number; transform: number }, item) =>
                        item.position < result.position ? item : result,
                    {
                        item: {} as HTMLElement,
                        position: Number.MAX_SAFE_INTEGER,
                        transform: 0
                    }
                );

            const getItemMax = () =>
                items.reduce(
                    (result: { item: HTMLElement; position: number; transform: number }, item) =>
                        item.position > result.position ? item : result,
                    {
                        item: {} as HTMLElement,
                        position: Number.MIN_SAFE_INTEGER,
                        transform: 0
                    }
                );

            const getMin = () => items.reduce((result, item) => (item.position < result ? item.position : result), Number.MAX_SAFE_INTEGER);

            const getMax = () => items.reduce((result, item) => (item.position > result ? item.position : result), 0);

            const transformItem = (direction: 'left' | 'right') => {
                const { wrapperWidth, itemWidth, step } = getWidth();

                if (direction === 'right') {
                    positionLeftItem = positionLeftItem + 1;
                    const positionMax = getMax();

                    if (positionLeftItem + wrapperWidth / itemWidth - 1 > positionMax) {
                        const nextItem = getItemMin();
                        nextItem.position = positionMax + 1;
                        nextItem.transform += items.length * 100;
                        nextItem.item.style.transform = `translateX(${nextItem.transform}%)`;
                    }

                    transform -= step;
                } else if (direction === 'left') {
                    positionLeftItem = positionLeftItem - 1;
                    const positionMin = getMin();

                    if (positionLeftItem < positionMin) {
                        const nextItem = getItemMax();
                        nextItem.position = positionMin - 1;
                        nextItem.transform -= items.length * 100;
                        nextItem.item.style.transform = `translateX(${nextItem.transform}%)`;
                    }

                    transform += step;
                }

                sliderWrapper.style.transform = `translateX(${transform}%)`;
            };

            const buildGalleryImageList = () =>
                items.map((image) => {
                    const img = image.item.children[0];
                    return {
                        src: img.getAttribute('data-full-src'),
                        msrc: img.getAttribute('src'),
                        w: Number(img.getAttribute('data-w')),
                        h: Number(img.getAttribute('data-h'))
                    };
                }) as Item[];

            const openGallery = (index: number) => {
                const pswpElement = document.getElementsByClassName('pswp')[0] as HTMLElement;
                const images = buildGalleryImageList();
                const options = {
                    index,
                    galleryUID: 0,
                    shareEl: false,
                    getThumbBoundsFn: () => {
                        const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
                        const rect = items[index].item.getBoundingClientRect();
                        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                    }
                } as Options;

                const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, images, options);
                if (onClose) {
                    gallery.listen('close', () => {
                        if (onClose) {
                            onClose();
                        }
                    });
                }

                gallery.init();
                if (onOpen) {
                    onOpen();
                }
            };

            if (sliderControlPrev) {
                sliderControlPrev.addEventListener('click', () => transformItem('left'));
            }

            if (sliderControlNext) {
                sliderControlNext.addEventListener('click', () => transformItem('right'));
            }

            items.forEach((element, index) => {
                const img = element.item.querySelector('img');

                if (img) {
                    img.setAttribute('data-index', `${index}`);

                    img.addEventListener('click', (e: MouseEvent) => {
                        const target = e.target as HTMLElement;

                        if (target) {
                            const index = Number(target.getAttribute('data-index'));
                            const isMobile = window.matchMedia('screen and (max-width: 83.99rem)').matches;

                            if (isMobile) {
                                const position = element.position - element.transform / 100 - (positionLeftItem - element.transform / 100);

                                if (position === 1) {
                                    openGallery(index);
                                } else if (position < 1) {
                                    transformItem('left');
                                } else {
                                    transformItem('right');
                                }
                            } else {
                                openGallery(index);
                            }
                        }
                    });
                }
            });

            return transformItem;
        }
    }

    return () => console.warn('Slider is not initialized.');
};

document.querySelectorAll('.slider').forEach((element) => {
    let pause = false;
    let checked = false;
    const manipulate = multiItemSlider(
        element,
        () => {
            pause = true;

            const switchElement = document.getElementById('pluginenable') as HTMLInputElement;
            if (switchElement) {
                checked = switchElement.checked;

                if (switchElement.checked) {
                    switchElement.click();
                }
            }
        },
        () => {
            pause = false;

            if (checked) {
                const switchElement = document.getElementById('pluginenable') as HTMLInputElement;
                if (switchElement) {
                    switchElement.click();
                }
            }
        }
    );

    const autoPlay = element.hasAttributes() && Array.from(element.attributes).find((attr) => attr.name === 'data-autoplay');
    if (autoPlay && manipulate) {
        const interval = Number(autoPlay.value);
        const autoPlayDirection = Array.from(element.attributes).find((attr) => attr.name === 'data-autoplay-direction');
        if (interval) {
            const direction: 'left' | 'right' = autoPlayDirection
                ? autoPlayDirection.value === 'left' || autoPlayDirection.value === 'right'
                    ? autoPlayDirection.value
                    : 'right'
                : 'right';

            setInterval(() => {
                if (pause === false) {
                    manipulate(direction);
                }
            }, interval);
        }
    }
});
