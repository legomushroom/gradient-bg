class Main
  constructor:(@o={})->
    @vars()
    @animateRainbow()
    # setTimeout => 
    #   @animateProgress()
    # , 3000

    @showIphone()

  $:(selector)->
    document.querySelector selector

  vars:->
    @currentProgress = 2000
    @rainbow      = @$ '#gradient-pattern'
    @mask         = @$ '#mask2'
    @shape        = @$ '#js-shape'
    @scanImage    = @$ '#js-scan-image'
    @charger      = @$ '#js-charger'

  animateRainbow:->
    it = @
    tween = TweenMax.to { deg: 0 }, 10,
      deg: 360
      repeat: -1
      # yoyo: true
      onUpdate: (e)->
        attr = "rotate(#{@target.deg}, 500, 500)"
        it.rainbow.setAttribute 'patternTransform', attr

  animateProgress:->
    it = @
    i = -400
    tween = TweenMax.to { progress: -400 }, 10,
      progress: 1200
      # repeat: -1
      onUpdate: (e)->
        it.scanImage.setAttribute('y', @target.progress)

  fillCharger:->
    it = @
    tween = TweenMax.to { p: 0 }, 1,
      p: 1
      onUpdate: (e)->
        it.charger.setAttribute 'fill', "rgba(255,255,255,#{@target.p})"

  showIphone:->
    it = @
    # tween = TweenMax.to { p: 100 }, 1,
    #   p: 200
    #   repeat: -1
    #   yoyo: true
    #   onUpdate: (e)->
    #     it.rainbow.setAttribute 'width', @target.p
    console.log @shape.children
    for child, i in @shape.children
    # child = @shape.children[3]
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
        # child.setAttribute('stroke-dasharray', @target.s)
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
        point?.setAttribute 'transform', "translate(#{position.x+300}, #{position.y+100})"
      onComplete:->
        if i is 5
          it.fadeOutPoint point

  fadeOutPoint:(point)->
    it = @
    radialPoint = @$ '#radial-point'
    r = parseInt radialPoint.getAttribute('r'), 10
    tween = TweenMax.to { p: r, o: .5 }, .5,
      p: 0
      o: 0
      onUpdate: ()->
        radialPoint?.setAttribute 'r', @target.p
        radialPoint?.setAttribute 'opacity', @target.o

new Main