import waypoints from './../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'smoothscroll';

export default class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector('.site-header');
        this.headerTriggerElement = document.querySelector(
            '.large-hero__title'
        );
        this.pageSections = document.querySelectorAll('.page-section');
        this.headerLinks = document.querySelectorAll('.site-header__nav a');
        this.lazyImages = document.querySelectorAll('.lazyload');
        this.createHeaderWaypoint();
        this.createPageSectionWaypoints();
        this.addSmoothScroll();
        this.refreshWaypoints();
    }

    refreshWaypoints() {
        this.lazyImages.forEach((img) =>
            img.addEventListener('load', () => Waypoint.refreshAll())
        );
    }

    addSmoothScroll() {
        this.headerLinks.forEach((link) =>
            link.addEventListener('click', (e) => {
                e.preventDefault();
                smoothScroll(document.querySelector(link.getAttribute('href')));
            })
        );
    }

    createHeaderWaypoint() {
        const that = this;
        new Waypoint({
            element: that.headerTriggerElement,
            handler(direction) {
                if (direction === 'down') {
                    that.siteHeader.classList.add('site-header--dark');
                } else {
                    that.siteHeader.classList.remove('site-header--dark');
                }
            }
        });
    }

    createPageSectionWaypoints() {
        const that = this;
        this.pageSections.forEach((currentPageSection) => {
            new Waypoint({
                element: currentPageSection,
                handler(direction) {
                    if (direction === 'down') {
                        const matchingHeaderLink = currentPageSection.getAttribute(
                            'data-matching-link'
                        );
                        that.headerLinks.forEach((link) =>
                            link.classList.remove('is-current-link')
                        );
                        document
                            .querySelector(matchingHeaderLink)
                            .classList.add('is-current-link');
                    }
                },
                offset: '18%'
            });

            new Waypoint({
                element: currentPageSection,
                handler(direction) {
                    if (direction === 'up') {
                        const matchingHeaderLink = currentPageSection.getAttribute(
                            'data-matching-link'
                        );
                        that.headerLinks.forEach((link) =>
                            link.classList.remove('is-current-link')
                        );
                        document
                            .querySelector(matchingHeaderLink)
                            .classList.add('is-current-link');
                    }
                },
                offset: '-40%'
            });
        });
    }
}
