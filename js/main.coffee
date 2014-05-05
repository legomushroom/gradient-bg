class Main
  constructor:(@o={})->
    @vars()
    @animateRainbow()
    setTimeout =>
      @animateProgress()
    , 3000

    @showIphone()
    

  $:(selector)->
    document.querySelector selector

  vars:->
    @currentProgress = 2000
    @rainbow      = @$ '#gradient-pattern'
    @mask         = @$ '#mask2'
    @shape        = @$ '#js-shape'
    @charger      = @$ '#js-charger'
    @glare        = @$ '#js-glare'
    @glare2       = @$ '#js-glare2'
    @scanLine     = @$ '#js-scan-line'
    @scanImage    = @$ '#js-scan-image'
    @scan         = @$ '#js-scan'

  animateRainbow:->
    it = @
    tween = TweenMax.to { deg: 180 }, 20,
      deg: 540
      repeat: -1
      # yoyo: true
      ease: Linear.easeNone
      onUpdate: (e)->
        attr = "rotate(#{@target.deg}, 500, 500)"
        it.rainbow.setAttribute 'patternTransform', attr

  animateProgress:->
    @showScanLine()

  showScanLine:->
    it = @
    tween = TweenMax.to { width: 0, x: 450 }, 1,
      width: 600
      x: 158
      # repeat: -1
      onUpdate: (e)->
        it.scanLine.setAttribute('width', @target.width)
        it.scanLine.setAttribute('x', @target.x)
        it.scanImage.setAttribute('width', @target.width)
        it.scanImage.setAttribute('x', @target.x)
      onStart:=>
        @scanLine.style.display = 'block'
        @scanImage.style.display = 'block'
      onComplete:=>
        @animateScan()
        

  animateScan:->
    it = @
    tween = TweenMax.to { y: 0 }, 3,
      y: 800
      # repeat: -1
      onUpdate: (e)->
        it.scan.setAttribute('transform', "translate(0, #{@target.y})")

  fillCharger:->
    it = @
    tween = TweenMax.to { p: 0 }, 1,
      p: 1
      onUpdate: (e)->
        it.charger.setAttribute 'fill', "rgba(255,255,255,#{@target.p})"

  showIphone:->
    it = @
    for child, i in @shape.children
      length = child.getTotalLength?()
      child.setAttribute 'stroke-dasharray', length
      child.setAttribute 'stroke-dashoffset', length
      do(child, length, i)->
        setTimeout ->
          it.animateStroke child, length, i
          it.animatePoint  child, length, i
        , 500

  animateStroke:(child, length, i )->
    it = @
    tween = TweenMax.to { p: length, s: length/1.25 }, 1.5,
      p: 0
      s: length
      onUpdate: ()->
        child.setAttribute('stroke-dashoffset', @target.p)
      onComplete:->
        if i is it.shape.children.length-1
          it.fillCharger()

  animatePoint:(child, length, i )->
    it = @
    point = @$ "#js-radial-point#{i+1}"
    length = child.getTotalLength()
    tween = TweenMax.to { p: 0, progress: 0 }, 1.5,
      p: length
      progress: 1
      onUpdate: ()->
        position = child.getPointAtLength @target.p
        attr = "translate(#{position.x+300}, #{position.y+100})"
        point.setAttribute 'transform', attr
      onComplete:->
        if i is 5
          it.fadeOutPoint point
        if i is it.shape.children.length-1
          it.animateGlare()

  animateGlare:->
    it = @
    x = -600
    tween = TweenMax.to { x: x, o: 0 }, .75,
      x: 300
      o: .75
      onUpdate: (e)->
        attr  = "rotate(-35), translate(#{@.target.x}, -307)"
        attr2 = "rotate(-35), translate(#{@.target.x - 50}, -307)"
        it.glare.setAttribute   'transform', attr
        it.glare2.setAttribute  'transform', attr2
        it.glare.setAttribute   'opacity', @target.o
        it.glare2.setAttribute  'opacity', @target.o
      onComplete:=>
        @glare.style.display  = 'none'
        @glare2.style.display = 'none'
      onStart:=>
        @glare.style.display  = 'block'
        @glare2.style.display = 'block'


  fadeOutPoint:(point)->
    it = @
    radialPoint = @$ '#radial-point'
    r = parseInt radialPoint.getAttribute('r'), 10
    tween = TweenMax.to { p: r, o: .5 }, .5,
      p: 0
      o: 0
      onUpdate: ()->
        radialPoint.setAttribute 'r', @target.p
        radialPoint.setAttribute 'opacity', @target.o
      onComplete: ->
        radialPoint.style.display = 'none'


new Main