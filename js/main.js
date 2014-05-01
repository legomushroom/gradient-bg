(function() {
  var Main;

  Main = (function() {
    function Main(o) {
      this.o = o != null ? o : {};
      this.vars();
      this.animateRainbow();
      this.showIphone();
    }

    Main.prototype.$ = function(selector) {
      return document.querySelector(selector);
    };

    Main.prototype.vars = function() {
      this.currentProgress = 2000;
      this.rainbow = this.$('#gradient-pattern');
      this.mask = this.$('#mask2');
      this.shape = this.$('#js-shape');
      this.scanImage = this.$('#js-scan-image');
      return this.charger = this.$('#js-charger');
    };

    Main.prototype.animateRainbow = function() {
      var it, tween;
      it = this;
      return tween = TweenMax.to({
        deg: 0
      }, 10, {
        deg: 360,
        repeat: -1,
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
      }, 1, {
        p: 1,
        onUpdate: function(e) {
          return it.charger.setAttribute('fill', "rgba(255,255,255," + this.target.p + ")");
        }
      });
    };

    Main.prototype.showIphone = function() {
      var child, i, it, length, _i, _len, _ref, _results;
      it = this;
      console.log(this.shape.children);
      _ref = this.shape.children;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        child = _ref[i];
        length = typeof child.getTotalLength === "function" ? child.getTotalLength() : void 0;
        child.setAttribute('stroke-dasharray', length);
        child.setAttribute('stroke-dashoffset', length);
        _results.push((function(child, length, i) {
          return setTimeout(function() {
            it.animateStroke(child, length, i);
            return it.animatePoint(child, length, i);
          }, 500);
        })(child, length, i));
      }
      return _results;
    };

    Main.prototype.animateStroke = function(child, length, i) {
      var it, tween;
      it = this;
      return tween = TweenMax.to({
        p: length,
        s: length / 1.25
      }, 3, {
        p: 0,
        s: length,
        onUpdate: function() {
          return child.setAttribute('stroke-dashoffset', this.target.p);
        },
        onComplete: function() {
          if (i === it.shape.children.length - 1) {
            return it.fillCharger();
          }
        }
      });
    };

    Main.prototype.animatePoint = function(child, length, i) {
      var it, point, tween;
      it = this;
      point = this.$("#js-radial-point" + (i + 1));
      length = child.getTotalLength();
      return tween = TweenMax.to({
        p: 0,
        progress: 0
      }, 3, {
        p: length,
        progress: 1,
        onUpdate: function() {
          var position;
          position = child.getPointAtLength(this.target.p);
          return point != null ? point.setAttribute('transform', "translate(" + (position.x + 300) + ", " + (position.y + 100) + ")") : void 0;
        },
        onComplete: function() {
          if (i === 5) {
            return it.fadeOutPoint(point);
          }
        }
      });
    };

    Main.prototype.fadeOutPoint = function(point) {
      var it, r, radialPoint, tween;
      it = this;
      radialPoint = this.$('#radial-point');
      r = parseInt(radialPoint.getAttribute('r'), 10);
      return tween = TweenMax.to({
        p: r,
        o: .5
      }, .5, {
        p: 0,
        o: 0,
        onUpdate: function() {
          if (radialPoint != null) {
            radialPoint.setAttribute('r', this.target.p);
          }
          return radialPoint != null ? radialPoint.setAttribute('opacity', this.target.o) : void 0;
        }
      });
    };

    return Main;

  })();

  new Main;

}).call(this);
