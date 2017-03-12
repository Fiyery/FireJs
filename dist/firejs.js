'use strict';
/**
 * Main class.
 */
var FireJs = (function () {
    /**
     * Setup of object.
     */
    function FireJs() {
        this.datalist = {};
    }
    /**
     * Execute the callback function when the page is loaded.
     */
    FireJs.prototype.ready = function (callback) {
        if (callback && typeof callback === 'function') {
            document.addEventListener("DOMContentLoaded", callback);
        }
    };
    /**
     * Get the HTML elements with CSS selector.
     */
    FireJs.prototype.get = function (query) {
        var res = document.querySelectorAll(query);
        var list = new FireElements();
        switch (res.length) {
            case 0:
                list = null;
                break;
            case 1:
                list.push(this.new(res[0]));
                break;
            default:
                [].forEach.call(res, function (e) {
                    list.push(this.new(e));
                }, this);
        }
        return list;
    };
    /**
     * Create a FireElement from HTMLElement.
     */
    FireJs.prototype.new = function (e) {
        if (!e || !(e instanceof HTMLElement)) {
            return null;
        }
        var el = e;
        if (el.firejs_id && this.datalist[el.firejs_id]) {
            // If element is known, it was loaded from datalist.
            return this.datalist[el.firejs_id];
        }
        else {
            var f = new FireElement(e, this);
            // Add to datalist elements.
            this.datalist[f.getProperty('firejs_id')] = f;
            return f;
        }
    };
    return FireJs;
}());
/**
 * Array class contains the FireElements and send to then the calls.
 */
var FireElements = (function () {
    function FireElements() {
        /**
         * Container of FireElement.
         */
        this.list = [];
    }
    /**
     * Get number of elements.
     */
    FireElements.prototype.size = function () {
        return this.list.length;
    };
    /**
     * Add element to the list.
     * @param e FireElement
     */
    FireElements.prototype.push = function (e) {
        this.list.push(e);
        return this;
    };
    /**
     * Walk the lsit of elements with callback.
     * @param callback Function
     */
    FireElements.prototype.each = function (callback) {
        if (callback && typeof callback === 'function') {
            this.list.forEach(function (e) {
                callback(e);
            });
        }
        return this;
    };
    /**
     * Get the parents.
     */
    FireElements.prototype.parent = function () {
        var list = new FireElements();
        this.each(function (e) {
            if (e.parent()) {
                list.push(e.parent());
            }
        });
        return (list.size() > 0) ? (list) : (null);
    };
    /**
     * Get the chidren element.
     */
    FireElements.prototype.children = function () {
        var list = new FireElements();
        this.each(function (e) {
            e.children().each(function (child) {
                list.push(child);
            });
        });
        return list;
    };
    /**
     * Delete on or  de la liste
     */
    FireElements.prototype.not = function (elements) {
        var list = new FireElements();
        var _loop_1 = function(i) {
            var e = this_1[i];
            if (elements.element) {
                if (elements.element !== e.element) {
                    list.push(e);
                }
            }
            else {
                var find_1 = false;
                elements.forEach(function (el) {
                    if (el.element === e.element) {
                        find_1 = true;
                    }
                });
                if (find_1 === false) {
                    list.push(e);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.size(); i++) {
            _loop_1(i);
        }
        return list;
    };
    /**
     * Get the next element.
     */
    FireElements.prototype.next = function () {
        var list = new FireElements();
        this.each(function (e) {
            list.push(e.next());
        });
        return list;
    };
    /**
     * Get the previous element.
     */
    FireElements.prototype.prev = function () {
        var list = new FireElements();
        this.each(function (e) {
            list.push(e.prev());
        });
        return list;
    };
    /**
     * Find elements in children nodes.
     */
    FireElements.prototype.find = function (query) {
        var list = new FireElements();
        this.each(function (el) {
            el.find(query).each(function (e) {
                list.push(e);
            });
        });
        return list;
    };
    /**
     * Listen a event and execute the callback function when event triggering.
     */
    FireElements.prototype.on = function (event, callback) {
        this.each(function (e) {
            e.on(event, callback);
        });
        return this;
    };
    /**
     * Check if the element has the attribut.
     */
    FireElements.prototype.has = function (name) {
        var bool = true;
        this.each(function (e) {
            bool = bool && e.has(name);
        });
        return bool;
    };
    /**
     * Define a attribut and its value.
     */
    FireElements.prototype.set = function (name, value) {
        this.each(function (e) {
            e.set(name, value);
        });
        return this;
    };
    /**
     * Get value of attribut
     */
    FireElements.prototype.get = function (name) {
        var params = [];
        this.each(function (e) {
            params.push(e.get(name));
        });
        return params;
    };
    /**
     * Check if the element has the class.
     */
    FireElements.prototype.hasClass = function (name) {
        var bool = true;
        this.each(function (e) {
            bool = bool && e.hasClass(name);
        });
        return bool;
    };
    /**
     * Add the class.
     */
    FireElements.prototype.addClass = function (name) {
        this.each(function (e) {
            e.addClass(name);
        });
        return this;
    };
    /**
     * Remove the class.
     */
    FireElements.prototype.removeClass = function (name) {
        this.each(function (e) {
            e.removeClass(name);
        });
        return this;
    };
    /**
     * Toggle the class.
     */
    FireElements.prototype.toggleClass = function (name) {
        this.each(function (e) {
            e.toggleClass(name);
        });
        return this;
    };
    /**
     * Define CSS properties.
     */
    FireElements.prototype.css = function (name, val) {
        this.each(function (e) {
            e.css(name, val);
        });
        return this;
    };
    /**
     * Define or get width element.
     */
    FireElements.prototype.width = function (val) {
        if (val) {
            this.each(function (e) {
                e.width(val);
            });
        }
        return this[0].width();
    };
    /**
     * Define or get height element.
     */
    FireElements.prototype.height = function (val) {
        if (val) {
            this.each(function (e) {
                e.height(val);
            });
        }
        return this[0].height();
    };
    /**
     * Show the element with its saved display property.
     */
    FireElements.prototype.show = function () {
        this.each(function (e) {
            e.show();
        });
        return this;
    };
    /**
     * Hide the element with display egals none.
     */
    FireElements.prototype.hide = function () {
        this.each(function (e) {
            e.hide();
        });
        return this;
    };
    /**
     * Toggle the visibility of element.
     */
    FireElements.prototype.toggle = function () {
        this.each(function (e) {
            e.toggle();
        });
        return this;
    };
    /**
     *	Get values of form elements.
     */
    FireElements.prototype.val = function () {
        var values = [];
        this.each(function (e) {
            values.push(e.val());
        });
        if (values.length === 1) {
            return values[0];
        }
        else {
            return values;
        }
    };
    /**
     * Return the nodes.
     */
    FireElements.prototype.node = function () {
        var list = [];
        this.each(function (e) {
            list.push(e.node());
        });
        return list;
    };
    return FireElements;
}());
/**
 * Overloading of HTMLElement.
 */
var FireElement = (function () {
    /**
     * Setup of object.
     */
    function FireElement(e, firejs) {
        /**
         * Save the display property for hide and show methods.
         */
        this.display = 'block';
        this.firejs = firejs;
        this.element = e;
        if (e) {
            // Need for toggle. 
            this.element.style.display = document.defaultView.getComputedStyle(this.element, null).display;
        }
        var node = this.element;
        node.firejs_id = Date.now().toString() + '-' + Math.random().toString().substring(2, 7);
    }
    /**
     * Get the property of HTMLElement.
     */
    FireElement.prototype.getProperty = function (s) {
        return this.element[s];
    };
    /**
     * Get the parent.
     */
    FireElement.prototype.parent = function () {
        return this.firejs.new(this.getProperty('parentNode'));
    };
    /**
     * Get the chidren.
     */
    FireElement.prototype.children = function () {
        var list = new FireElements();
        [].forEach.call(this.getProperty('children'), function (e) {
            list.push(this.firejs.new(e));
        });
        return list;
    };
    /**
     * Get the next element.
     */
    FireElement.prototype.next = function () {
        var el = this.getProperty('nextElementSibling');
        if (el) {
            return this.firejs.new(el);
        }
        else {
            return null;
        }
    };
    /**
     * Get the previous element.
     */
    FireElement.prototype.prev = function () {
        var el = this.getProperty('previousElementSibling');
        if (el) {
            return this.firejs.new(el);
        }
        else {
            return null;
        }
    };
    /**
     * Find elements in children nodes.
     */
    FireElement.prototype.find = function (query) {
        var list = new FireElements();
        var that = this;
        [].forEach.call(this.element.querySelectorAll(query), function (e) {
            var f = that.firejs.new(e);
            list.push(f);
        });
        return list;
    };
    /**
     * Listen a event and execute the callback function when event triggering.
     */
    FireElement.prototype.on = function (event, callback) {
        if (callback && typeof callback === 'function') {
            var that_1 = this;
            this.element.addEventListener(event, function (event) {
                callback.call(that_1, event);
            });
        }
        return this;
    };
    /**
     * Check if the element has the attribut.
     */
    FireElement.prototype.has = function (name) {
        return (this.element.attributes.getNamedItem(name) !== null);
    };
    /**
     * Define a attribut and its value.
     */
    FireElement.prototype.set = function (name, value) {
        if (value === null) {
            this.element.removeAttribute(name);
        }
        else {
            this.element.setAttribute(name, value);
        }
        return this;
    };
    /**
     * Get value of attribut
     */
    FireElement.prototype.get = function (name) {
        return this.element.getAttribute(name);
    };
    /**
     * Check if the element has the class.
     */
    FireElement.prototype.hasClass = function (name) {
        return this.element.classList.contains(name);
    };
    /**
     * Add the class.
     */
    FireElement.prototype.addClass = function (name) {
        if (name) {
            this.element.classList.add(name);
        }
        return this;
    };
    /**
     * Remove the class.
     */
    FireElement.prototype.removeClass = function (name) {
        if (name) {
            this.element.classList.remove(name);
        }
        return this;
    };
    /**
     * Toggle the class.
     */
    FireElement.prototype.toggleClass = function (name) {
        if (name) {
            this.element.classList.toggle(name);
        }
        return this;
    };
    /**
     * Define CSS properties.
     */
    FireElement.prototype.css = function (name, val) {
        if (typeof name === 'string') {
            this.element.style[name] = val;
        }
        else if (typeof name === 'object') {
            [].forEach.call(Object.keys(name), function (key) {
                this.element.style[key] = name[key];
            }, this);
        }
        return this;
    };
    /**
     * Define or get width element.
     */
    FireElement.prototype.width = function (val) {
        if (val) {
            this.element.style.width = val + 'px';
        }
        return this.element.offsetWidth;
    };
    /**
     * Define or get height element.
     */
    FireElement.prototype.height = function (val) {
        if (val) {
            this.element.style.height = val + 'px';
        }
        return this.element.offsetHeight;
    };
    /**
     * Show the element with its saved display property.
     */
    FireElement.prototype.show = function () {
        this.element.style.display = this.display;
        return this;
    };
    /**
     * Hide the element with display egals none.
     */
    FireElement.prototype.hide = function () {
        if (this.element.style.display !== 'none') {
            this.display = (this.element.style.display) ? (this.element.style.display) : ('block');
        }
        this.element.style.display = 'none';
        return this;
    };
    /**
     * Toggle the visibility of element.
     */
    FireElement.prototype.toggle = function () {
        if (this.element.style.display === 'none') {
            this.show();
        }
        else {
            this.hide();
        }
        return this;
    };
    /**
     *	Get values of form elements.
     */
    FireElement.prototype.val = function () {
        var el;
        if (this.get('id') === null) {
            var id = Math.random().toString();
            this.set('id', id);
            el = document.getElementById(id);
            this.set('id', null);
        }
        else {
            console.log('ko');
            el = document.getElementById(this.get('id'));
        }
        if (el.type && el.type.toLowerCase() === 'checkbox') {
            return el.checked;
        }
        else if (el.value) {
            return el.value;
        }
        else {
            return '';
        }
    };
    /**
     * Return the node.
     */
    FireElement.prototype.node = function () {
        return this.element;
    };
    return FireElement;
}());
var fire = new FireJs();
