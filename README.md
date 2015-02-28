# Lazypager

Simple infinite scroll plugin for those who tried mainstream solutions like [infiniteScroll](https://github.com/infinite-scroll/infinite-scroll) or another and it didn't fit.

## Killer features

 - Only one request to a server when an element-toggler appears in viewport (when I tested, other libraries made 5-7 requests for some strange reasons)
 - Callback function with collection of newloaded elements. You can do any javascript post-actions only with new part of elements. It's very useful solution if too many elements on the page.

## Installation

Add this line to your application's Gemfile:

``` ruby
gem 'lazypager-rails'
```

And then execute:

    $ bundle

Add to javascript manifest (`application.js`):

    //= require lazypager

## Usage

`coffeescript:`

``` coffeescript
lazypager = new Lazypager
  container: "#catalog"
  navSelector: "a.infinite-loader"
  nextSelector: "a.infinite-loader:last"
  blockSelector: ".item"
  img: "<img src='' />"
  imgClass: 'infinite-loader-img'
  callback: (elements) ->
    console.log elements
```

`pure js:`

``` javascript
var lazypager;
​
lazypager = new Lazypager({
  container: "#catalog",
  navSelector: "a.infinite-loader",
  nextSelector: "a.infinite-loader:last",
  blockSelector: ".item",
  img: "<img src='' />",
  imgClass: 'infinite-loader-img',
  callback: function(elements) {
    return console.log(elements);
  }
});
```

## Contribute

1. Fork it ( https://github.com/ExReanimator/lazypager-rails/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
