class Lazypager

  constructor: (options) ->
    @options =
      debug: true
      container: "#catalog"
      navSelector: "a.infinite-loader"
      nextSelector: "a.infinite-loader:last"
      blockSelector: ".item"
      img: "<img src='data:image/gif;base64,R0lGODlhEAALAPQAAPPz8wAAANDQ0MbGxt/f3wUFBQAAACwsLHx8fFtbW7GxsSAgIEZGRoSEhF9fX7W1tSQkJAMDA0pKStzc3M7Ozunp6TU1NdLS0ufn566urpmZmcHBwePj4wAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAALAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQACwABACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQACwACACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQACwADACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAALAAQALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkEAAsABQAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAALAAYALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkEAAsABwAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA' />"
      imgClass: 'infinite-loader-img'
      callback: (elements) ->

    $.extend(@options, options)

    @setObjects()


  setObjects: ->
    @url = $(@options.nextSelector).attr('href')
    @container = $(@options.container)
    @paginator = $(@options.navSelector)
    @image = $(@options.img).addClass(@options.imgClass)

    return if @paginator.size() < 1

    @visible = false
    self = @
    $(window).scroll ->
      if self.paginatorVisible()
        self.visibleHandler() unless self.visible

  visibleHandler: ->
    @visible = true
    @paginator.replaceWith(@image)
    @loadElements()

  paginatorVisible: ->
    return false if @paginator.size() < 1
    docViewTop = $(window).scrollTop()
    docViewBottom = docViewTop + $(window).height()
    elemTop = @paginator.offset().top
    elemBottom = elemTop + @paginator.height()
    (elemBottom <= docViewBottom) and (elemTop >= docViewTop)

  loadElements: ->
    self = @
    $.ajax(
      dataType: "text"
      url: self.url
    ).done (data) ->
      $("img." + self.options.imgClass).remove()
      elements = $(data).find(self.options.blockSelector)
      paginator = $(data).find(self.options.navSelector)
      self.options.callback(elements)
      self.container.append elements
      self.container.parent().append paginator
      self.setObjects()



window.Lazypager ||= Lazypager