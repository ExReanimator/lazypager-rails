var Lazypager;

Lazypager = (function() {
    function Lazypager(options) {
        this.options = {
            debug: true,
            container: "#catalog",
            navSelector: "a.infinite-loader",
            nextSelector: "a.infinite-loader:last",
            blockSelector: ".item",
            img: "<img src='data:image/gif;base64,R0lGODlhEAALAPQAAPPz8wAAANDQ0MbGxt/f3wUFBQAAACwsLHx8fFtbW7GxsSAgIEZGRoSEhF9fX7W1tSQkJAMDA0pKStzc3M7Ozunp6TU1NdLS0ufn566urpmZmcHBwePj4wAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAALAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQACwABACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQACwACACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQACwADACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAALAAQALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkEAAsABQAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAALAAYALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkEAAsABwAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA' />",
            imgClass: 'infinite-loader-img',
            callback: function(elements) {}
        };
        $.extend(this.options, options);
        this.setObjects();
    }

    Lazypager.prototype.setObjects = function() {
        var self;
        this.url = $(this.options.nextSelector).attr('href');
        this.container = $(this.options.container);
        this.paginator = $(this.options.navSelector);
        this.image = $(this.options.img).addClass(this.options.imgClass);
        if (this.paginator.size() < 1) {
            return;
        }
        this.visible = false;
        self = this;
        return $(window).scroll(function() {
            if (self.paginatorVisible()) {
                if (!self.visible) {
                    return self.visibleHandler();
                }
            }
        });
    };

    Lazypager.prototype.visibleHandler = function() {
        this.visible = true;
        this.paginator.replaceWith(this.image);
        return this.loadElements();
    };

    Lazypager.prototype.paginatorVisible = function() {
        var docViewBottom, docViewTop, elemBottom, elemTop;
        if (this.paginator.size() < 1) {
            return false;
        }
        docViewTop = $(window).scrollTop();
        docViewBottom = docViewTop + $(window).height();
        elemTop = this.paginator.offset().top;
        elemBottom = elemTop + this.paginator.height();
        return (elemBottom <= docViewBottom) && (elemTop >= docViewTop);
    };

    Lazypager.prototype.loadElements = function() {
        var self;
        self = this;
        return $.ajax({
            dataType: "text",
            url: self.url
        }).done(function(data) {
            var elements, paginator;
            $("img." + self.options.imgClass).remove();
            elements = $(data).find(self.options.blockSelector);
            paginator = $(data).find(self.options.navSelector);
            self.options.callback(elements);
            self.container.append(elements);
            self.container.parent().append(paginator);
            return self.setObjects();
        });
    };

    return Lazypager;

})();

window.Lazypager || (window.Lazypager = Lazypager);