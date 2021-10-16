(function() {
    var play = false,
        timer;

    var AutoReader = function(option) {
        this.el1 = option.el1;
        this.el2 = option.el2;
        this.speed = option.speed;


        this.init();
    }

    AutoReader.prototype.init = function() {
        this._autoReader();
        this._backTopStopAuto();
    }

    AutoReader.prototype._backTopStopAuto = function() {
        var _self = this;
        addEvent(this.el2, 'click', function() {
            if (play) {
                clearInterval(timer);
                play = false;
                _self.el1.style.background = 'orange url(./img/play.png) no-repeat 17px 15px / 50% 50%';
            }
        })
    }

    AutoReader.prototype._autoReader = function() {
        var _self = this;
        addEvent(this.el1, 'click', function() {
            var viewHeight = getViewPortSize().height,
                scrollHeight = getScrollSize().height,
                scrollTop = getScrollOffset().top;


            if (scrollHeight <= viewHeight + scrollTop) {
                return;
            }

            if (!play) {
                play = true;
                timer = setInterval(function() {
                    if (scrollHeight > viewHeight + scrollTop) {
                        window.scrollBy(0, 10);
                        scrollTop = getScrollOffset().top;
                        _self.el1.style.background = 'green url(./img/pause.png) no-repeat 15px 15px / 50% 50%';
                    } else {
                        _self.el1.style.background = 'orange url(./img/play.png) no-repeat 17px 15px / 50% 50%';
                        clearInterval(timer);
                    }
                }, _self.speed);
            } else {
                play = false;
                clearInterval(timer);
                _self.el1.style.background = 'orange url(./img/play.png) no-repeat 17px 15px / 50% 50%';
            }
        })
    }


    window.AutoReader = AutoReader;
})();