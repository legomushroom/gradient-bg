class Main
  constructor:(@o={})->
    @vars()
    @animateRainbow()
    @animateProgress()
    @showIphone()

  vars:->
    @currentProgress = 2000
    @rainbow      = document.getElementById('gradient-pattern')
    @mask         = document.getElementById('mask2')
    @shape        = document.getElementById('js-shape')
    @scanImage    = document.getElementById('js-scan-image')
    @charger      = document.getElementById('js-charger')

  animateRainbow:->
    it = @
    tween = TweenMax.to { deg: 0 }, 20,
      deg: 360
      repeat: -1
      yoyo: true
      onUpdate: (e)->
        attr = "rotate(#{@target.deg}, 500, 500)"
        it.rainbow.setAttribute 'patternTransform', attr

  animateProgress:->
    console.log @scanImage
    it = @
    i = -400
    tween = TweenMax.to { progress: -400 }, 10,
      progress: 1200
      repeat: -1
      onUpdate: (e)->
        it.scanImage.setAttribute('y', @target.progress)

  fillCharger:->
    it = @
    tween = TweenMax.to { p: 0 }, 2,
      p: 1
      onUpdate: (e)->
        it.charger.setAttribute 'fill', "rgba(255,255,255,#{@target.p})"

  showIphone:->
    it = @
    for child, i in @shape.children
    # child = @shape.children[3]
      length = child.getTotalLength?()
      child.setAttribute 'stroke-dasharray', length
      child.setAttribute 'stroke-dashoffset', length
      do(child, length, i)->
        setTimeout ->
          tween = TweenMax.to { p: length }, 2,
            p: 0
            onUpdate: ()->
              child.setAttribute('stroke-dashoffset', @target.p)
            onComplete:->
              if i is it.shape.children.length-1
                it.fillCharger()
        , 500

new Main