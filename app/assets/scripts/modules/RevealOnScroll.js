import waypoints from './../../../../node_modules/waypoints/lib/noframework.waypoints';

export default class RevealOnScroll {
    constructor(element, offset) {
        this.itemsToReveal = document.querySelectorAll(element);
        this.hideInitially();
        this.createWaypoints(offset);
    }

    hideInitially() {
        this.itemsToReveal.forEach(item => item.classList.add('reveal-item'));
    }

    createWaypoints(offset) {
        this.itemsToReveal.forEach((item) => {
            new Waypoint({
                element: item,
                handler() {
                    item.classList.add('reveal-item--is-visible');
                },
                offset
            });
        });
    }
}
