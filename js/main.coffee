class Main
  constructor:(@o={})->
    @vars()
    @animateRainbow()
    @animateProgress()

  vars:->
    @currentProgress = 2000
    @rainbow      = document.getElementById('rainbow')
    @process      = document.getElementById('js-process')
    @processText  = document.getElementById('js-process-text')
    @scanImage    = document.getElementById('js-scan-image')

  animateRainbow:->
    it = @
    tween = TweenMax.to { deg: 0 }, 20,
      deg: 360
      repeat: -1
      yoyo: true
      onUpdate: (e)->
        it.rainbow.setAttribute 'transform', 'rotate(' + @target.deg + ', 500, 500)'

  animateProgress:->
    it = @
    i = -400
    scan = document.getElementById('js-scan-image')
    tween = TweenMax.to { progress: -400 }, 10,
      progress: 1200
      repeat: -1
      onUpdate: (e)->
        scan.setAttribute('y', @target.progress)

new Main