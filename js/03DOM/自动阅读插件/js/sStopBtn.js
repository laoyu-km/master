(function() {

    var SStopBtn = function(el, imgPath) {
        this.el = el;
        this.imgPath = imgPath;

        this.init();
    }

    SStopBtn.prototype.init = function() {
        this._addShowBtn();
        this._addBackTop();
    }

    SStopBtn.prototype._addShowBtn = function() {
        var _self = this;
        addEvent(window, 'scroll', function() {
            var scrollTop = getScrollOffset().top;
            if (scrollTop > 44) {
                _self.el.style.display = 'block';
                _self.el.style.background = 'url(' + _self.imgPath + ') no-repeat 0 0 / 100% 100%'
            } else {
                _self.el.style.display = 'none';
            }
        })
    }

    SStopBtn.prototype._addBackTop = function() {
        addEvent(this.el, 'click', function() {
            window.scrollTo(0, 0);
        })
    }

    window.SStopBtn = SStopBtn;

})();