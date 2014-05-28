(function() {
  var Main;

  Main = (function() {
    function Main(o) {
      this.o = o != null ? o : {};
      this.vars();
      this.animateRainbow();
      setTimeout((function(_this) {
        return function() {
          return _this.animateProgress();
        };
      })(this), 3000);
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
      this.charger = this.$('#js-charger');
      this.glare = this.$('#js-glare');
      this.glare2 = this.$('#js-glare2');
      this.scanLine = this.$('#js-scan-line');
      this.scanImage = this.$('#js-scan-image');
      this.scan = this.$('#js-scan');
      this.progressText = this.$('#js-progress-text');
      this.progressText2 = this.$('#js-progress-text2');
      return this.progressImage = this.$('#js-progress-image');
    };

    Main.prototype.animateRainbow = function() {
      var it, tween;
      it = this;
      return tween = TweenMax.to({
        deg: 180
      }, 10, {
        deg: 540,
        repeat: -1,
        ease: Linear.easeNone,
        onUpdate: function(e) {
          var attr;
          attr = "rotate(" + this.target.deg + ", 500, 500)";
          return it.rainbow.setAttribute('patternTransform', attr);
        }
      });
    };

    Main.prototype.animateProgress = function() {
      return this.showScanLine();
    };

    Main.prototype.showScanLine = function() {
      var it, tween;
      it = this;
      return tween = TweenMax.to({
        width: 0,
        x: 450
      }, 1, {
        width: 600,
        x: 158,
        onUpdate: function(e) {
          it.scanLine.setAttribute('width', this.target.width);
          return it.scanLine.setAttribute('x', this.target.x);
        },
        onStart: (function(_this) {
          return function() {
            return _this.scanLine.style.display = 'block';
          };
        })(this),
        onComplete: (function(_this) {
          return function() {
            return _this.animateScan();
          };
        })(this)
      });
    };

    Main.prototype.hideScanLine = function() {
      var it, tween;
      it = this;
      return tween = TweenMax.to({
        width: 600,
        x: 158
      }, .75, {
        width: 0,
        x: 460,
        ease: Power1.easeInOut,
        onUpdate: function(e) {
          it.scanLine.setAttribute('width', this.target.width);
          return it.scanLine.setAttribute('x', this.target.x);
        },
        onStart: (function(_this) {
          return function() {
            return _this.scanLine.style.display = 'block';
          };
        })(this)
      });
    };

    Main.prototype.animateScan = function() {
      var it, tween;
      it = this;
      tween = TweenMax.to({
        y: 0,
        p: 0
      }, 3, {
        y: 900,
        p: 100,
        ease: Power1.easeInOut,
        onUpdate: function(e) {
          var progress;
          it.scan.setAttribute('transform', "translate(0, " + this.target.y + ")");
          progress = parseInt(this.target.p, 10);
          it.progressText.innerHTML = "" + progress + "%";
          return it.progressText2.innerHTML = "" + progress + "%";
        },
        onComplete: (function(_this) {
          return function() {
            _this.hideScanGlow();
            return _this.hideScanLine();
          };
        })(this),
        onStart: (function(_this) {
          return function() {
            _this.progressText.style.display = 'block';
            _this.progressText2.style.display = 'block';
            return _this.progressImage.style.display = 'block';
          };
        })(this)
      });
      return tween = TweenMax.to({
        yImage: 20
      }, .5, {
        yImage: -240,
        ease: Linear.easeNone,
        onUpdate: function(e) {
          return it.scanImage.setAttribute('y', this.target.yImage);
        }
      });
    };

    Main.prototype.hideScanGlow = function() {
      var it, tween;
      it = this;
      return tween = TweenMax.to({
        yImage: -240
      }, .75, {
        yImage: 50,
        ease: Linear.easeNone,
        onUpdate: function(e) {
          return it.scanImage.setAttribute('y', this.target.yImage);
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
      }, 1.5, {
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
      }, 1.5, {
        p: length,
        progress: 1,
        onUpdate: function() {
          var attr, position;
          position = child.getPointAtLength(this.target.p);
          attr = "translate(" + (position.x + 300) + ", " + (position.y + 100) + ")";
          return point.setAttribute('transform', attr);
        },
        onComplete: function() {
          if (i === 5) {
            it.fadeOutPoint(point);
          }
          if (i === it.shape.children.length - 1) {
            return it.animateGlare();
          }
        }
      });
    };

    Main.prototype.animateGlare = function() {
      var it, tween, x;
      it = this;
      x = -600;
      return tween = TweenMax.to({
        x: x,
        o: 0
      }, .75, {
        x: 300,
        o: .75,
        onUpdate: function(e) {
          var attr, attr2;
          attr = "rotate(-35), translate(" + this.target.x + ", -307)";
          attr2 = "rotate(-35), translate(" + (this.target.x - 50) + ", -307)";
          it.glare.setAttribute('transform', attr);
          it.glare2.setAttribute('transform', attr2);
          it.glare.setAttribute('opacity', this.target.o);
          return it.glare2.setAttribute('opacity', this.target.o);
        },
        onComplete: (function(_this) {
          return function() {
            _this.glare.style.display = 'none';
            return _this.glare2.style.display = 'none';
          };
        })(this),
        onStart: (function(_this) {
          return function() {
            _this.glare.style.display = 'block';
            return _this.glare2.style.display = 'block';
          };
        })(this)
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
          radialPoint.setAttribute('r', this.target.p);
          return radialPoint.setAttribute('opacity', this.target.o);
        },
        onComplete: function() {
          return radialPoint.style.display = 'none';
        }
      });
    };

    return Main;

  })();

  new Main;

}).call(this);
