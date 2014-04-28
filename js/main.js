(function() {
  var Main;

  Main = (function() {
    function Main(o) {
      this.o = o != null ? o : {};
      this.vars();
      this.animateRainbow();
      this.animateProgress();
    }

    Main.prototype.vars = function() {
      this.currentProgress = 2000;
      this.rainbow = document.getElementById('rainbow');
      this.process = document.getElementById('js-process');
      this.processText = document.getElementById('js-process-text');
      return this.scanImage = document.getElementById('js-scan-image');
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
          return it.rainbow.setAttribute('transform', 'rotate(' + this.target.deg + ', 500, 500)');
        }
      });
    };

    Main.prototype.animateProgress = function() {
      var i, it, scan, tween;
      it = this;
      i = -400;
      scan = document.getElementById('js-scan-image');
      return tween = TweenMax.to({
        progress: -400
      }, 10, {
        progress: 1200,
        repeat: -1,
        onUpdate: function(e) {
          return scan.setAttribute('y', this.target.progress);
        }
      });
    };

    return Main;

  })();

  new Main;

}).call(this);
