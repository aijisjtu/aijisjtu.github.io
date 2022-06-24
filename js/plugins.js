// Avoid `console` errors in browsers that lack a console.
(function () {
    "use strict";
    var method,
        noop = function () {
        },
        methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ],
        length = methods.length,
        console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/**
 *  jQuery plugin bundle for Dr. Meixia Tao's website
 *
 *  jQuery.contentExpand,
 *  jQuery.menuPin,
 *  jQuery.notesNav
 *
 *  Copyright (c) 2013 Yang Zhang <zhangyang93@rocketmail.com>
 *
 *  Released under the MIT and GPL Licenses.
 *
 */

(function ($) {

    "use strict";

    $.contentExpand = function (elements, index, options) {
        var defaults = {
                showNum: 4
            },
            plugin = this,
            settings = {},
            $elements = $(elements);
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            mainHandler();
        };
        var mainHandler = function () {
            if ($elements.length > 0) {
                var lis = $elements.find("li");
                if (lis.length > plugin.settings.showNum) {
                    for (var i = plugin.settings.showNum; i < lis.length; i++) {
                        lis.eq(i).addClass("hidden");
                    }
                    $elements.append('<button class="melissa-button" data-display="expand">' + (lis.length - plugin.settings.showNum).toString() + ' More</button>');
                    $elements.find('button[data-display="expand"]').on("click", function () {
                        lis.each(function (index, element) {
                            $(element).removeClass("hidden");
                        });
                        this.remove();
                    });
                }
            }
        };
        plugin.init();
    };

    $.fn.contentExpand = function (index, options) {
        return this.each(function () {
            if (undefined === $(this).data('contentExpand')) {
                var plugin = new $.contentExpand(this, index, options);
                $(this).data('contentExpand', plugin);
            }
        });
    };

    $.tableExpand = function (elements, index, options) {
        var defaults = {
                showNum: 5
            },
            plugin = this,
            settings = {},
            $elements = $(elements);
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            mainHandler();
        };
        var mainHandler = function () {
            if ($elements.length > 0) {
                var trs = $elements.find("tr");
                if (trs.length > plugin.settings.showNum) {
                    for (var i = plugin.settings.showNum; i < trs.length; i++) {
                        trs.eq(i).addClass("hidden");
                    }
                }
            }
            $elements.find("a[data-display='table']").on("click", function (e) {
                e.preventDefault();
                if ($(document).find(".bg-shadow").length === 0) {
                    $('<div class="bg-shadow"><div class="full-table-wrap">' +
                        '<h2 class="ui-font"><span>Updates</span>' +
                        '<span data-dismiss="close"><a href="#">脳</a></span></h2>' +
                        '<table class="melissa-table stripped">' +
                        '<tbody></tbody></table></div></div>').insertAfter("div#melissa-footer");
                } else {
                    $(document).find(".bg-shadow").removeClass("hidden");
                }
                var tBody = $(".full-table-wrap tbody");
                if (tBody.html() === "") {
                    var tableContent = $(document).find("table.melissa-table > tbody > tr");
                    tableContent.each(function (index, element) {
                        var $element = $(element);
                        tBody.append($element.clone());
                        tBody.find(".hidden").each(function (index, element) {
                            $(element).removeClass("hidden");
                        });
                    });
                }
                $(document).find(".full-table-wrap [data-dismiss='close'] > a").on("click", function (e) {
                    e.preventDefault();
                    $(document).find(".bg-shadow").addClass("hidden");
                    tBody.html("");
                });
            });
        };
        plugin.init();
    };

    $.fn.tableExpand = function (index, options) {
        return this.each(function () {
            if (undefined === $(this).data('tableExpand')) {
                var plugin = new $.tableExpand(this, index, options);
                $(this).data('tableExpand', plugin);
            }
        });
    };


    $.menuPin = function (elements, index, options) {
        var defaults = {
                topMargin: 60
            },
            plugin = this,
            settings = {},
            $elements = $(elements),
            $window = $(window);
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            mainHandler(index);
        };
        var mainHandler = function (index) {
            var scrollY = $window.scrollTop();
            $window.on("scroll", function () {
                scrollY = $window.scrollTop();
                if (scrollY > plugin.settings.topMargin) {
                    $elements.css("margin-top", (scrollY - plugin.settings.topMargin).toString() + "px");
                } else {
                    $elements.css("margin-top", 0);
                }
            });
        };
        plugin.init();
    };

    $.fn.menuPin = function (index, options) {
        return this.each(function () {
            if (undefined === $(this).data('menuPin')) {
                var plugin = new $.menuPin(this, index, options);
                $(this).data('menuPin', plugin);
            }
        });
    };


    $.notesNav = function (elements, index, options) {
        var defaults = {
                showNum: 4
            },
            plugin = this,
            settings = {},
            $elements = $(elements);
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            mainHandler();
        };
        var mainHandler = function () {
            var arr = $elements.find("a"), target = $(document).find("[data-nav='target']");
            arr.each(function () {
                $(this).on("click",
                    function (e) {
                        e.preventDefault();
                        target.attr("src", $(this).attr("href"));
                    });
            });
        };
        plugin.init();
    };

    $.fn.notesNav = function (index, options) {
        return this.each(function () {
            if (undefined === $(this).data('notesNav')) {
                var plugin = new $.notesNav(this, index, options);
                $(this).data('notesNav', plugin);
            }
        });
    };

    $.tableRow = function (elements, index, options) {
        var defaults = {},
            plugin = this,
            settings = {},
            $elements = $(elements);
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            mainHandler();
        };
        var mainHandler = function () {
            var rows = $elements.find("a[data-display='row']");
            var content = $(document).find(".row-more");

            $(rows).each(function (index, element) {
                $(element).on("click", function (e) {
                    e.preventDefault();
                    $(document).find(".bg-shadow").removeClass("hidden");
                    $(content[index]).removeClass("hidden");
                });
            });

            $(document).find(".row-more-wrap [data-dismiss='close'] > a").on("click", function (e) {
                e.preventDefault();
                $(document).find(".bg-shadow").addClass("hidden");
                content.each(function (index, element) {
                    $(element).addClass("hidden");
                });
            });
        };
        plugin.init();
    };

    $.fn.tableRow = function (index, options) {
        return this.each(function () {
            if (undefined === $(this).data('tableRow')) {
                var plugin = new $.tableRow(this, index, options);
                $(this).data('tableRow', plugin);
            }
        });
    };

})(jQuery);

// jQuery++
(function () {

    var event = jQuery.event,

    //helper that finds handlers by type and calls back a function, this is basically handle
    // events - the events object
    // types - an array of event types to look for
    // callback(type, handlerFunc, selector) - a callback
    // selector - an optional selector to filter with, if there, matches by selector
    //     if null, matches anything, otherwise, matches with no selector
        findHelper = function (events, types, callback, selector) {
            var t, type, typeHandlers, all, h, handle,
                namespaces, namespace,
                match;
            for (t = 0; t < types.length; t++) {
                type = types[t];
                all = type.indexOf(".") < 0;
                if (!all) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    namespace = new RegExp("(^|\\.)" + namespaces.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
                }
                typeHandlers = (events[type] || []).slice(0);

                for (h = 0; h < typeHandlers.length; h++) {
                    handle = typeHandlers[h];

                    match = (all || namespace.test(handle.namespace));

                    if (match) {
                        if (selector) {
                            if (handle.selector === selector) {
                                callback(type, handle.origHandler || handle.handler);
                            }
                        } else if (selector === null) {
                            callback(type, handle.origHandler || handle.handler, handle.selector);
                        }
                        else if (!handle.selector) {
                            callback(type, handle.origHandler || handle.handler);

                        }
                    }


                }
            }
        };

    /**
     * Finds event handlers of a given type on an element.
     * @param {HTMLElement} el
     * @param {Array} types an array of event names
     * @param {String} [selector] optional selector
     * @return {Array} an array of event handlers
     */
    event.find = function (el, types, selector) {
        var events = ( $._data(el) || {} ).events,
            handlers = [],
            t, liver, live;

        if (!events) {
            return handlers;
        }
        findHelper(events, types, function (type, handler) {
            handlers.push(handler);
        }, selector);
        return handlers;
    };
    /**
     * Finds all events.  Group by selector.
     * @param {HTMLElement} el the element
     * @param {Array} types event types
     */
    event.findBySelector = function (el, types) {
        var events = $._data(el).events,
            selectors = {},
        //adds a handler for a given selector and event
            add = function (selector, event, handler) {
                var select = selectors[selector] || (selectors[selector] = {}),
                    events = select[event] || (select[event] = []);
                events.push(handler);
            };

        if (!events) {
            return selectors;
        }
        //first check live:
        /*$.each(events.live || [], function( i, live ) {
         if ( $.inArray(live.origType, types) !== -1 ) {
         add(live.selector, live.origType, live.origHandler || live.handler);
         }
         });*/
        //then check straight binds
        findHelper(events, types, function (type, handler, selector) {
            add(selector || "", type, handler);
        }, null);

        return selectors;
    };
    event.supportTouch = "ontouchend" in document;

    $.fn.respondsTo = function (events) {
        if (!this.length) {
            return false;
        } else {
            //add default ?
            return event.find(this[0], $.isArray(events) ? events : [events]).length > 0;
        }
    };
    $.fn.triggerHandled = function (event, data) {
        event = (typeof event == "string" ? $.Event(event) : event);
        this.trigger(event, data);
        return event.handled;
    };
    /**
     * Only attaches one event handler for all types ...
     * @param {Array} types llist of types that will delegate here
     * @param {Object} startingEvent the first event to start listening to
     * @param {Object} onFirst a function to call
     */
    event.setupHelper = function (types, startingEvent, onFirst) {
        if (!onFirst) {
            onFirst = startingEvent;
            startingEvent = null;
        }
        var add = function (handleObj) {

                var bySelector, selector = handleObj.selector || "";
                if (selector) {
                    bySelector = event.find(this, types, selector);
                    if (!bySelector.length) {
                        $(this).delegate(selector, startingEvent, onFirst);
                    }
                }
                else {
                    //var bySelector = event.find(this, types, selector);
                    if (!event.find(this, types, selector).length) {
                        event.add(this, startingEvent, onFirst, {
                            selector: selector,
                            delegate: this
                        });
                    }

                }

            },
            remove = function (handleObj) {
                var bySelector, selector = handleObj.selector || "";
                if (selector) {
                    bySelector = event.find(this, types, selector);
                    if (!bySelector.length) {
                        $(this).undelegate(selector, startingEvent, onFirst);
                    }
                }
                else {
                    if (!event.find(this, types, selector).length) {
                        event.remove(this, startingEvent, onFirst, {
                            selector: selector,
                            delegate: this
                        });
                    }
                }
            };
        $.each(types, function () {
            event.special[this] = {
                add: add,
                remove: remove,
                setup: function () {
                },
                teardown: function () {
                }
            };
        });
    };
})(jQuery);

(function ($) {
    var isPhantom = /Phantom/.test(navigator.userAgent),
        supportTouch = !isPhantom && "ontouchend" in document,
        scrollEvent = "touchmove scroll",
    // Use touch events or map it to mouse events
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove",
        data = function (event) {
            var d = event.originalEvent.touches ?
                event.originalEvent.touches[ 0 ] :
                event;
            return {
                time: (new Date).getTime(),
                coords: [ d.pageX, d.pageY ],
                origin: $(event.target)
            };
        };

    /**
     * @add jQuery.event.swipe
     */
    var swipe = $.event.swipe = {
        /**
         * @attribute delay
         * Delay is the upper limit of time the swipe motion can take in milliseconds.  This defaults to 500.
         *
         * A user must perform the swipe motion in this much time.
         */
        delay: 500,
        /**
         * @attribute max
         * The maximum distance the pointer must travel in pixels.  The default is 75 pixels.
         */
        max: 75,
        /**
         * @attribute min
         * The minimum distance the pointer must travel in pixels.  The default is 30 pixels.
         */
        min: 30
    };

    $.event.setupHelper([

    /**
     * @hide
     * @attribute swipe
     */
        "swipe",
    /**
     * @hide
     * @attribute swipeleft
     */
        'swipeleft',
    /**
     * @hide
     * @attribute swiperight
     */
        'swiperight',
    /**
     * @hide
     * @attribute swipeup
     */
        'swipeup',
    /**
     * @hide
     * @attribute swipedown
     */
        'swipedown'], touchStartEvent, function (ev) {
        var
        // update with data when the event was started
            start = data(ev),
            stop,
            delegate = ev.delegateTarget || ev.currentTarget,
            selector = ev.handleObj.selector,
            entered = this;

        function moveHandler(event) {
            if (!start) {
                return;
            }
            // update stop with the data from the current event
            stop = data(event);

            // prevent scrolling
            if (Math.abs(start.coords[0] - stop.coords[0]) > 10) {
                event.preventDefault();
            }
        };

        // Attach to the touch move events
        $(document.documentElement).bind(touchMoveEvent, moveHandler)
            .one(touchStopEvent, function (event) {
                $(this).unbind(touchMoveEvent, moveHandler);
                // if start and stop contain data figure out if we have a swipe event
                if (start && stop) {
                    // calculate the distance between start and stop data
                    var deltaX = Math.abs(start.coords[0] - stop.coords[0]),
                        deltaY = Math.abs(start.coords[1] - stop.coords[1]),
                        distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                    // check if the delay and distance are matched
                    if (stop.time - start.time < swipe.delay && distance >= swipe.min) {
                        var events = ['swipe'];
                        // check if we moved horizontally
                        if (deltaX >= swipe.min && deltaY < swipe.min) {
                            // based on the x coordinate check if we moved left or right
                            events.push(start.coords[0] > stop.coords[0] ? "swipeleft" : "swiperight");
                        } else
                        // check if we moved vertically
                        if (deltaY >= swipe.min && deltaX < swipe.min) {
                            // based on the y coordinate check if we moved up or down
                            events.push(start.coords[1] < stop.coords[1] ? "swipedown" : "swipeup");
                        }

                        // trigger swipe events on this guy
                        $.each($.event.find(delegate, events, selector), function () {
                            this.call(entered, ev, {start: start, end: stop})
                        })

                    }
                }
                // reset start and stop
                start = stop = undefined;
            })
    });

})(jQuery);

(function ($, window, undefined) {

    'use strict';

    // global
    var $window = $(window),
        Modernizr = window.Modernizr;

    // https://gist.github.com/edankwan/4389601
    Modernizr.addTest('csstransformspreserve3d', function () {
        var prop = Modernizr.prefixed('transformStyle');
        var val = 'preserve-3d';
        var computedStyle;
        if (!prop) return false;

        prop = prop.replace(/([A-Z])/g, function (str, m1) {
            return '-' + m1.toLowerCase();
        }).replace(/^ms-/, '-ms-');

        Modernizr.testStyles('#modernizr{' + prop + ':' + val + ';}', function (el, rule) {
            computedStyle = window.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : '';
        });

        return (computedStyle === val);
    });

    /*
     * debouncedresize: special jQuery event that happens once after a window resize
     */
    var $event = $.event,
        $special,
        resizeTimeout;

    $special = $event.special.debouncedresize = {
        setup: function () {
            $(this).on("resize", $special.handler);
        },
        teardown: function () {
            $(this).off("resize", $special.handler);
        },
        handler: function (event, execAsap) {
            // Save the context
            var context = this,
                args = arguments,
                dispatch = function () {
                    // set correct event type
                    event.type = "debouncedresize";
                    $event.dispatch.apply(context, args);
                };

            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }

            execAsap ?
                dispatch() :
                resizeTimeout = setTimeout(dispatch, $special.threshold);
        },
        threshold: 150
    };

    $.BookBlock = function (options, element) {
        this.$el = $(element);
        this._init(options);
    };

    // the options
    $.BookBlock.defaults = {
        // vertical or horizontal flip
        orientation: 'vertical',
        // ltr (left to right) or rtl (right to left)
        direction: 'ltr',
        // speed for the flip transition in ms
        speed: 1000,
        // easing for the flip transition
        easing: 'ease-in-out',
        // if set to true, both the flipping page and the sides will have an overlay to simulate shadows
        shadows: true,
        // opacity value for the "shadow" on both sides (when the flipping page is over it)
        // value : 0.1 - 1
        shadowSides: 0.2,
        // opacity value for the "shadow" on the flipping page (while it is flipping)
        // value : 0.1 - 1
        shadowFlip: 0.1,
        // if we should show the first item after reaching the end
        circular: false,
        // if we want to specify a selector that triggers the next() function. example: 麓#bb-nav-next麓
        nextEl: '',
        // if we want to specify a selector that triggers the prev() function
        prevEl: '',
        // autoplay. If true it overwrites the circular option to true
        autoplay: false,
        // time (ms) between page switch, if autoplay is true
        interval: 3000,
        // callback after the flip transition
        // old is the index of the previous item
        // page is the current item麓s index
        // isLimit is true if the current page is the last one (or the first one)
        onEndFlip: function (old, page, isLimit) {
            return false;
        },
        // callback before the flip transition
        // page is the current item麓s index
        onBeforeFlip: function (page) {
            return false;
        }
    };

    $.BookBlock.prototype = {
        _init: function (options) {
            // options
            this.options = $.extend(true, {}, $.BookBlock.defaults, options);
            // orientation class
            this.$el.addClass('bb-' + this.options.orientation);
            // items
            this.$items = this.$el.children('.bb-item').hide();
            // total items
            this.itemsCount = this.$items.length;
            // current item麓s index
            this.current = 0;
            // previous item麓s index
            this.previous = -1;
            // show first item
            this.$current = this.$items.eq(this.current).show();
            // get width of this.$el
            // this will be necessary to create the flipping layout
            this.elWidth = this.$el.width();
            var transEndEventNames = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'msTransition': 'MSTransitionEnd',
                'transition': 'transitionend'
            };
            this.transEndEventName = transEndEventNames[Modernizr.prefixed('transition')] + '.bookblock';
            // support css 3d transforms && css transitions && Modernizr.csstransformspreserve3d
            this.support = Modernizr.csstransitions && Modernizr.csstransforms3d && Modernizr.csstransformspreserve3d;
            // initialize/bind some events
            this._initEvents();
            // start slideshow
            if (this.options.autoplay) {
                this.options.circular = true;
                this._startSlideshow();
            }
        },
        _initEvents: function () {

            var self = this;

            if (this.options.nextEl !== '') {
                $(this.options.nextEl).on('click.bookblock touchstart.bookblock', function () {
                    self._action('next');
                    return false;
                });
            }

            if (this.options.prevEl !== '') {
                $(this.options.prevEl).on('click.bookblock touchstart.bookblock', function () {
                    self._action('prev');
                    return false;
                });
            }

            $window.on('debouncedresize', function () {
                // update width value
                self.elWidth = self.$el.width();
            });

        },
        _action: function (dir, page) {
            this._stopSlideshow();
            this._navigate(dir, page);
        },
        _navigate: function (dir, page) {

            if (this.isAnimating) {
                return false;
            }

            // callback trigger
            this.options.onBeforeFlip(this.current);

            this.isAnimating = true;
            // update current value
            this.$current = this.$items.eq(this.current);

            if (page !== undefined) {
                this.current = page;
            }
            else if (dir === 'next' && this.options.direction === 'ltr' || dir === 'prev' && this.options.direction === 'rtl') {
                if (!this.options.circular && this.current === this.itemsCount - 1) {
                    this.end = true;
                }
                else {
                    this.previous = this.current;
                    this.current = this.current < this.itemsCount - 1 ? this.current + 1 : 0;
                }
            }
            else if (dir === 'prev' && this.options.direction === 'ltr' || dir === 'next' && this.options.direction === 'rtl') {
                if (!this.options.circular && this.current === 0) {
                    this.end = true;
                }
                else {
                    this.previous = this.current;
                    this.current = this.current > 0 ? this.current - 1 : this.itemsCount - 1;
                }
            }

            this.$nextItem = !this.options.circular && this.end ? this.$current : this.$items.eq(this.current);

            if (!this.support) {
                this._layoutNoSupport(dir);
            } else {
                this._layout(dir);
            }

        },
        _layoutNoSupport: function (dir) {
            this.$items.hide();
            this.$nextItem.show();
            this.end = false;
            this.isAnimating = false;
            var isLimit = dir === 'next' && this.current === this.itemsCount - 1 || dir === 'prev' && this.current === 0;
            // callback trigger
            this.options.onEndFlip(this.previous, this.current, isLimit);
        },
        // creates the necessary layout for the 3d structure
        _layout: function (dir) {

            var self = this,
            // basic structure: 1 element for the left side.
                $s_left = this._addSide('left', dir),
            // 1 element for the flipping/middle page
                $s_middle = this._addSide('middle', dir),
            // 1 element for the right side
                $s_right = this._addSide('right', dir),
            // overlays
                $o_left = $s_left.find('div.bb-overlay'),
                $o_middle_f = $s_middle.find('div.bb-flipoverlay:first'),
                $o_middle_b = $s_middle.find('div.bb-flipoverlay:last'),
                $o_right = $s_right.find('div.bb-overlay'),
                speed = this.end ? 400 : this.options.speed;

            this.$items.hide();
            this.$el.prepend($s_left, $s_middle, $s_right);

            $s_middle.css({
                transitionDuration: speed + 'ms',
                transitionTimingFunction: this.options.easing
            }).on(this.transEndEventName, function (event) {
                if ($(event.target).hasClass('bb-page')) {
                    self.$el.children('.bb-page').remove();
                    self.$nextItem.show();
                    self.end = false;
                    self.isAnimating = false;
                    var isLimit = dir === 'next' && self.current === self.itemsCount - 1 || dir === 'prev' && self.current === 0;
                    // callback trigger
                    self.options.onEndFlip(self.previous, self.current, isLimit);
                }
            });

            if (dir === 'prev') {
                $s_middle.addClass('bb-flip-initial');
            }

            // overlays
            if (this.options.shadows && !this.end) {

                var o_left_style = (dir === 'next') ? {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear' + ' ' + this.options.speed / 2 + 'ms'
                    } : {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear',
                        opacity: this.options.shadowSides
                    },
                    o_middle_f_style = (dir === 'next') ? {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear'
                    } : {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear' + ' ' + this.options.speed / 2 + 'ms',
                        opacity: this.options.shadowFlip
                    },
                    o_middle_b_style = (dir === 'next') ? {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear' + ' ' + this.options.speed / 2 + 'ms',
                        opacity: this.options.shadowFlip
                    } : {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear'
                    },
                    o_right_style = (dir === 'next') ? {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear',
                        opacity: this.options.shadowSides
                    } : {
                        transition: 'opacity ' + this.options.speed / 2 + 'ms ' + 'linear' + ' ' + this.options.speed / 2 + 'ms'
                    };

                $o_middle_f.css(o_middle_f_style);
                $o_middle_b.css(o_middle_b_style);
                $o_left.css(o_left_style);
                $o_right.css(o_right_style);

            }

            setTimeout(function () {
                // first && last pages lift slightly up when we can't go further
                $s_middle.addClass(self.end ? 'bb-flip-' + dir + '-end' : 'bb-flip-' + dir);

                // overlays
                if (self.options.shadows && !self.end) {

                    $o_middle_f.css({
                        opacity: dir === 'next' ? self.options.shadowFlip : 0
                    });

                    $o_middle_b.css({
                        opacity: dir === 'next' ? 0 : self.options.shadowFlip
                    });

                    $o_left.css({
                        opacity: dir === 'next' ? self.options.shadowSides : 0
                    });

                    $o_right.css({
                        opacity: dir === 'next' ? 0 : self.options.shadowSides
                    });

                }
            }, 25);
        },
        // adds the necessary sides (bb-page) to the layout
        _addSide: function (side, dir) {
            var $side;

            switch (side) {
                case 'left':
                    /*
                     <div class="bb-page" style="z-index:102;">
                     <div class="bb-back">
                     <div class="bb-outer">
                     <div class="bb-content">
                     <div class="bb-inner">
                     dir==='next' ? [content of current page] : [content of next page]
                     </div>
                     </div>
                     <div class="bb-overlay"></div>
                     </div>
                     </div>
                     </div>
                     */
                    $side = $('<div class="bb-page"><div class="bb-back"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">' + ( dir === 'next' ? this.$current.html() : this.$nextItem.html() ) + '</div></div><div class="bb-overlay"></div></div></div></div>').css('z-index', 102);
                    break;
                case 'middle':
                    /*
                     <div class="bb-page" style="z-index:103;">
                     <div class="bb-front">
                     <div class="bb-outer">
                     <div class="bb-content">
                     <div class="bb-inner">
                     dir==='next' ? [content of current page] : [content of next page]
                     </div>
                     </div>
                     <div class="bb-flipoverlay"></div>
                     </div>
                     </div>
                     <div class="bb-back">
                     <div class="bb-outer">
                     <div class="bb-content">
                     <div class="bb-inner">
                     dir==='next' ? [content of next page] : [content of current page]
                     </div>
                     </div>
                     <div class="bb-flipoverlay"></div>
                     </div>
                     </div>
                     </div>
                     */
                    $side = $('<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">' + (dir === 'next' ? this.$current.html() : this.$nextItem.html()) + '</div></div><div class="bb-flipoverlay"></div></div></div><div class="bb-back"><div class="bb-outer"><div class="bb-content" style="width:' + this.elWidth + 'px"><div class="bb-inner">' + ( dir === 'next' ? this.$nextItem.html() : this.$current.html() ) + '</div></div><div class="bb-flipoverlay"></div></div></div></div>').css('z-index', 103);
                    break;
                case 'right':
                    /*
                     <div class="bb-page" style="z-index:101;">
                     <div class="bb-front">
                     <div class="bb-outer">
                     <div class="bb-content">
                     <div class="bb-inner">
                     dir==='next' ? [content of next page] : [content of current page]
                     </div>
                     </div>
                     <div class="bb-overlay"></div>
                     </div>
                     </div>
                     </div>
                     */
                    $side = $('<div class="bb-page"><div class="bb-front"><div class="bb-outer"><div class="bb-content"><div class="bb-inner">' + ( dir === 'next' ? this.$nextItem.html() : this.$current.html() ) + '</div></div><div class="bb-overlay"></div></div></div></div>').css('z-index', 101);
                    break;
            }

            return $side;
        },
        _startSlideshow: function () {
            var self = this;
            this.slideshow = setTimeout(function () {
                self._navigate('next');
                if (self.options.autoplay) {
                    self._startSlideshow();
                }
            }, this.options.interval);
        },
        _stopSlideshow: function () {
            if (this.options.autoplay) {
                clearTimeout(this.slideshow);
                this.options.autoplay = false;
            }
        },
        // public method: flips next
        next: function () {
            this._action(this.options.direction === 'ltr' ? 'next' : 'prev');
        },
        // public method: flips back
        prev: function () {
            this._action(this.options.direction === 'ltr' ? 'prev' : 'next');
        },
        // public method: goes to a specific page
        jump: function (page) {

            page -= 1;

            if (page === this.current || page >= this.itemsCount || page < 0) {
                return false;
            }

            var dir;
            if (this.options.direction === 'ltr') {
                dir = page > this.current ? 'next' : 'prev';
            }
            else {
                dir = page > this.current ? 'prev' : 'next';
            }
            this._action(dir, page);

        },
        // public method: goes to the last page
        last: function () {
            this.jump(this.itemsCount);
        },
        // public method: goes to the first page
        first: function () {
            this.jump(1);
        },
        // public method: check if isAnimating is true
        isActive: function () {
            return this.isAnimating;
        },
        // public method: dynamically adds new elements
        // call this method after inserting new "bb-item" elements inside the BookBlock
        update: function () {
            var $currentItem = this.$items.eq(this.current);
            this.$items = this.$el.children('.bb-item');
            this.itemsCount = this.$items.length;
            this.current = $currentItem.index();
        },
        destroy: function () {
            if (this.options.autoplay) {
                this._stopSlideshow();
            }
            this.$el.removeClass('bb-' + this.options.orientation);
            this.$items.show();

            if (this.options.nextEl !== '') {
                $(this.options.nextEl).off('.bookblock');
            }

            if (this.options.prevEl !== '') {
                $(this.options.prevEl).off('.bookblock');
            }

            $window.off('debouncedresize');
        }
    }

    var logError = function (message) {
        if (window.console) {
            window.console.error(message);
        }
    };

    $.fn.bookblock = function (options) {
        if (typeof options === 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var instance = $.data(this, 'bookblock');
                if (!instance) {
                    logError("cannot call methods on bookblock prior to initialization; " +
                        "attempted to call method '" + options + "'");
                    return;
                }
                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    logError("no such method '" + options + "' for bookblock instance");
                    return;
                }
                instance[ options ].apply(instance, args);
            });
        }
        else {
            this.each(function () {
                var instance = $.data(this, 'bookblock');
                if (instance) {
                    instance._init();
                }
                else {
                    instance = $.data(this, 'bookblock', new $.BookBlock(options, this));
                }
            });
        }
        return this;
    };

})(jQuery, window);