(function() {
  var Main;

  Main = (function() {
    function Main(o) {
      this.o = o != null ? o : {};
      this.vars();
      this.animateRainbow();
      this.showIphone();
    }

    Main.prototype.vars = function() {
      this.currentProgress = 2000;
      this.rainbow = document.getElementById('gradient-pattern');
      this.mask = document.getElementById('mask2');
      this.shape = document.getElementById('js-shape');
      this.scanImage = document.getElementById('js-scan-image');
      return this.charger = document.getElementById('js-charger');
    };

    Main.prototype.animateRainbow = function() {
      var it, tween;
      it = this;
      return tween = TweenMax.to({
        deg: 0
      }, 20, {
        deg: 360,
        repeat: -1,
        yoyo: true,
        onUpdate: function(e) {
          var attr;
          attr = "rotate(" + this.target.deg + ", 500, 500)";
          return it.rainbow.setAttribute('patternTransform', attr);
        }
      });
    };

    Main.prototype.animateProgress = function() {
      var i, it, tween;
      it = this;
      i = -400;
      return tween = TweenMax.to({
        progress: -400
      }, 10, {
        progress: 1200,
        repeat: -1,
        onUpdate: function(e) {
          return it.scanImage.setAttribute('y', this.target.progress);
        }
      });
    };

    Main.prototype.fillCharger = function() {
      var it, tween;
      it = this;
      return tween = TweenMax.to({
        p: 0
      }, 2, {
        p: 1,
        onUpdate: function(e) {
          return it.charger.setAttribute('fill', "rgba(255,255,255," + this.target.p + ")");
        }
      });
    };

    Main.prototype.showIphone = function() {
      var child, i, it, length, _i, _len, _ref, _results;
      it = this;
      _ref = this.shape.children;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        child = _ref[i];
        length = typeof child.getTotalLength === "function" ? child.getTotalLength() : void 0;
        child.setAttribute('stroke-dasharray', length);
        child.setAttribute('stroke-dashoffset', length);
        _results.push((function(child, length, i) {
          return setTimeout(function() {
            var tween;
            return tween = TweenMax.to({
              p: length
            }, 2, {
              p: 0,
              onUpdate: function() {
                return child.setAttribute('stroke-dashoffset', this.target.p);
              },
              onComplete: function() {
                if (i === it.shape.children.length - 1) {
                  return it.fillCharger();
                }
              }
            });
          }, 500);
        })(child, length, i));
      }
      return _results;
    };

    return Main;

  })();

  new Main;

}).call(this);
