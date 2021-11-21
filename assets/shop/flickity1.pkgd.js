/*!
 * Flickity PACKAGED v2.2.1
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2019 Metafizzy
 */

/**
 * Bridget makes jQuery widgets
 * v2.0.1
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /* globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'jquery-bridget/jquery-bridget',[ 'jquery' ], function( jQuery ) {
      return factory( window, jQuery );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('jquery')
    );
  } else {
    // browser global
    window.jQueryBridget = factory(
      window,
      window.jQuery
    );
  }

}( window, function factory( window, jQuery ) {
'use strict';

// ----- utils ----- //

var arraySlice = Array.prototype.slice;

// helper function for logging errors
// $.error breaks jQuery chaining
var console = window.console;
var logError = typeof console == 'undefined' ? function() {} :
  function( message ) {
    console.error( message );
  };

// ----- jQueryBridget ----- //

function jQueryBridget( namespace, PluginClass, $ ) {
  $ = $ || jQuery || window.jQuery;
  if ( !$ ) {
    return;
  }

  // add option method -> $().plugin('option', {...})
  if ( !PluginClass.prototype.option ) {
    // option setter
    PluginClass.prototype.option = function( opts ) {
      // bail out if not an object
      if ( !$.isPlainObject( opts ) ){
        return;
      }
      this.options = $.extend( true, this.options, opts );
    };
  }

  // make jQuery plugin
  $.fn[ namespace ] = function( arg0 /*, arg1 */ ) {
    if ( typeof arg0 == 'string' ) {
      // method call $().plugin( 'methodName', { options } )
      // shift arguments by 1
      var args = arraySlice.call( arguments, 1 );
      return methodCall( this, arg0, args );
    }
    // just $().plugin({ options })
    plainCall( this, arg0 );
    return this;
  };

  // $().plugin('methodName')
  function methodCall( $elems, methodName, args ) {
    var returnValue;
    var pluginMethodStr = '$().' + namespace + '("' + methodName + '")';

    $elems.each( function( i, elem ) {
      // get instance
      var instance = $.data( elem, namespace );
      if ( !instance ) {
        logError( namespace + ' not initialized. Cannot call methods, i.e. ' +
          pluginMethodStr );
        return;
      }

      var method = instance[ methodName ];
      if ( !method || methodName.charAt(0) == '_' ) {
        logError( pluginMethodStr + ' is not a valid method' );
        return;
      }

      // apply method, get return value
      var value = method.apply( instance, args );
      // set return value if value is returned, use only first value
      returnValue = returnValue === undefined ? value : returnValue;
    });

    return returnValue !== undefined ? returnValue : $elems;
  }

  function plainCall( $elems, options ) {
    $elems.each( function( i, elem ) {
      var instance = $.data( elem, namespace );
      if ( instance ) {
        // set options & init
        instance.option( options );
        instance._init();
      } else {
        // initialize new instance
        instance = new PluginClass( elem, options );
        $.data( elem, namespace, instance );
      }
    });
  }

  updateJQuery( $ );

}

// ----- updateJQuery ----- //

// set $.bridget for v1 backwards compatibility
function updateJQuery( $ ) {
  if ( !$ || ( $ && $.bridget ) ) {
    return;
  }
  $.bridget = jQueryBridget;
}

updateJQuery( jQuery || window.jQuery );

// -----  ----- //

return jQueryBridget;

}));

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( 'ev-emitter/ev-emitter',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {



function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'get-size/get-size',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'desandro-matches-selector/matches-selector',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'fizzy-ui-utils/utils',[
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {



var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

// Flickity.Cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/cell',[
      'get-size/get-size'
    ], function( getSize ) {
      return factory( window, getSize );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Cell = factory(
      window,
      window.getSize
    );
  }

}( window, function factory( window, getSize ) {



function Cell( elem, parent ) {
  this.element = elem;
  this.parent = parent;

  this.create();
}

var proto = Cell.prototype;

proto.create = function() {
  this.element.style.position = 'absolute';
  this.element.setAttribute( 'aria-hidden', 'true' );
  this.x = 0;
  this.shift = 0;
};

proto.destroy = function() {
  // reset style
  this.unselect();
  this.element.style.position = '';
  var side = this.parent.originSide;
  this.element.style[ side ] = '';
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

proto.setPosition = function( x ) {
  this.x = x;
  this.updateTarget();
  this.renderPosition( x );
};

// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget = proto.setDefaultTarget = function() {
  var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
  this.target = this.x + this.size[ marginProperty ] +
    this.size.width * this.parent.cellAlign;
};

proto.renderPosition = function( x ) {
  // render position of cell with in slider
  var side = this.parent.originSide;
  this.element.style[ side ] = this.parent.getPositionValue( x );
};

proto.select = function() {
  this.element.classList.add('is-selected');
  this.element.removeAttribute('aria-hidden');
};

proto.unselect = function() {
  this.element.classList.remove('is-selected');
  this.element.setAttribute( 'aria-hidden', 'true' );
};

/**
 * @param {Integer} factor - 0, 1, or -1
**/
proto.wrapShift = function( shift ) {
  this.shift = shift;
  this.renderPosition( this.x + this.parent.slideableWidth * shift );
};

proto.remove = function() {
  this.element.parentNode.removeChild( this.element );
};

return Cell;

}));

// slide
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/slide',factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Slide = factory();
  }

}( window, function factory() {
'use strict';

function Slide( parent ) {
  this.parent = parent;
  this.isOriginLeft = parent.originSide == 'left';
  this.cells = [];
  this.outerWidth = 0;
  this.height = 0;
}

var proto = Slide.prototype;

proto.addCell = function( cell ) {
  this.cells.push( cell );
  this.outerWidth += cell.size.outerWidth;
  this.height = Math.max( cell.size.outerHeight, this.height );
  // first cell stuff
  if ( this.cells.length == 1 ) {
    this.x = cell.x; // x comes from first cell
    var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
    this.firstMargin = cell.size[ beginMargin ];
  }
};

proto.updateTarget = function() {
  var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
  var lastCell = this.getLastCell();
  var lastMargin = lastCell ? lastCell.size[ endMargin ] : 0;
  var slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
  this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.select = function() {
  this.cells.forEach( function( cell ) {
    cell.select();
  });
};

proto.unselect = function() {
  this.cells.forEach( function( cell ) {
    cell.unselect();
  });
};

proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

return Slide;

}));

// animate
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/animate',[
      'fizzy-ui-utils/utils'
    ], function( utils ) {
      return factory( window, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.animatePrototype = factory(
      window,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, utils ) {



// -------------------------- animate -------------------------- //

var proto = {};

proto.startAnimation = function() {
  if ( this.isAnimating ) {
    return;
  }

  this.isAnimating = true;
  this.restingFrames = 0;
  this.animate();
};

proto.animate = function() {
  this.applyDragForce();
  this.applySelectedAttraction();

  var previousX = this.x;

  this.integratePhysics();
  this.positionSlider();
  this.settle( previousX );
  // animate next frame
  if ( this.isAnimating ) {
    var _this = this;
    requestAnimationFrame( function animateFrame() {
      _this.animate();
    });
  }
};

proto.positionSlider = function() {
  var x = this.x;
  // wrap position around
  if ( this.options.wrapAround && this.cells.length > 1 ) {
    x = utils.modulo( x, this.slideableWidth );
    x = x - this.slideableWidth;
    this.shiftWrapCells( x );
  }

  this.setTranslateX( x, this.isAnimating );
  this.dispatchScrollEvent();
};

proto.setTranslateX = function( x, is3d ) {
  x += this.cursorPosition;
  // reverse if right-to-left and using transform
  x = this.options.rightToLeft ? -x : x;
  var translateX = this.getPositionValue( x );
  // use 3D tranforms for hardware acceleration on iOS
  // but use 2D when settled, for better font-rendering
  this.slider.style.transform = is3d ?
    'translate3d(' + translateX + ',0,0)' : 'translateX(' + translateX + ')';
};

proto.dispatchScrollEvent = function() {
  var firstSlide = this.slides[0];
  if ( !firstSlide ) {
    return;
  }
  var positionX = -this.x - firstSlide.target;
  var progress = positionX / this.slidesWidth;
  this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
};

proto.positionSliderAtSelected = function() {
  if ( !this.cells.length ) {
    return;
  }
  this.x = -this.selectedSlide.target;
  this.velocity = 0; // stop wobble
  this.positionSlider();
};

proto.getPositionValue = function( position ) {
  if ( this.options.percentPosition ) {
    if (window.matchMedia('(min-width: 1700px)').matches) {
      return ( Math.round( ( position / this.size.innerWidth ) * 17000 ) * 0.01)+ '%';

    } else if (window.matchMedia('(min-width: 1600px)').matches) {


    // percent position, round to 2 digits, like 12.34%
    return ( Math.round( ( position / this.size.innerWidth ) * 16000 ) * 0.01 )+ '%';}
    else if (window.matchMedia('(min-width: 1500px)').matches) {
      return ( Math.round( ( position / this.size.innerWidth ) * 15000 ) * 0.01 )+ '%';

    }
    else if (window.matchMedia('(min-width: 1400px)').matches) {
      return ( Math.round( ( position / this.size.innerWidth ) * 14000 ) * 0.01 )+ '%';

    }
    else if (window.matchMedia('(min-width: 1300px)').matches) {
      return ( Math.round( ( position / this.size.innerWidth ) * 12000 ) * 0.01 )+ '%';

    }
    else if (window.matchMedia('(min-width: 1199px)').matches) {
      return ( Math.round( ( position / this.size.innerWidth ) * 11000 ) * 0.01 )+ '%';

    }

    else{
      return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 )+ '%';

    
  }


  } else {
    // pixel positioning
    return Math.round( position ) + 'px';
  }
};

proto.settle = function( previousX ) {
  // keep track of frames where x hasn't moved
  if ( !this.isPointerDown && Math.round( this.x * 100 ) == Math.round( previousX * 100 ) ) {
    this.restingFrames++;
  }
  // stop animating if resting for 3 or more frames
  if ( this.restingFrames > 2 ) {
    this.isAnimating = false;
    delete this.isFreeScrolling;
    // render position with translateX when settled
    this.positionSlider();
    this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
  }
};

proto.shiftWrapCells = function( x ) {
  // shift before cells
  var beforeGap = this.cursorPosition + x;
  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
  // shift after cells
  var afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
  this._shiftCells( this.afterShiftCells, afterGap, 1 );
};

proto._shiftCells = function( cells, gap, shift ) {
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    var cellShift = gap > 0 ? shift : 0;
    cell.wrapShift( cellShift );
    gap -= cell.size.outerWidth;
  }
};

proto._unshiftCells = function( cells ) {
  if ( !cells || !cells.length ) {
    return;
  }
  for ( var i=0; i < cells.length; i++ ) {
    cells[i].wrapShift( 0 );
  }
};

// -------------------------- physics -------------------------- //

proto.integratePhysics = function() {
  this.x += this.velocity;
  this.velocity *= this.getFrictionFactor();
};

proto.applyForce = function( force ) {
  this.velocity += force;
};

proto.getFrictionFactor = function() {
  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
};

proto.getRestingPosition = function() {
  // my thanks to Steven Wittens, who simplified this math greatly
  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
};

proto.applyDragForce = function() {
  if ( !this.isDraggable || !this.isPointerDown ) {
    return;
  }
  // change the position to drag position by applying force
  var dragVelocity = this.dragX - this.x;
  var dragForce = dragVelocity - this.velocity;
  this.applyForce( dragForce );
};

proto.applySelectedAttraction = function() {
  // do not attract if pointer down or no slides
  var dragDown = this.isDraggable && this.isPointerDown;
  if ( D2!GloN"x|pthÉsn)sNreeScrollyng || !t)as.Slides.length )0{
    Reuur/;Š  
 $var(lisTanã` 5"th	syelAã4edSlide&dQrgeô *#-1#- This.x;0 v!r fnrce ="DiStencd *`tHiS.oztimnq.we|eãtmdAttractikn;
  4h+s&a0xdyFo2ce( forcÅ );
};return80roto;J
}i);

//@Flig{kty maanJ(funapmn( wmfäow$ fActory ) {
!(// uni6ersal modE|e defëLiuionN  " hshént strmcp: false *-
  if ( pyteoî eef-ne - /f}nction' &&"daFinm>amd`( {
   '/ AMD
 "  debine("'Fl)c+ity/jS/fnkãkity',[
 `  0 'ev-emk|teb/Gvmei)tuur§,  (   'bet-sézg?g%<)shze',
`   0 'fiZ[y-uy-utilq/utils',
    $$¦.'celh',Š ¨!  "'./slide/¬
 (   ('&g@nimate'`   ], &unc4ion( EvEmittEr, çetSeze, utyls, Cell, S,ifd( aNiíâ4eProtopy`e ) i
      re$}rl faguïry( winemw, EÿAmitter. gd|SK{e,(utils, Cell, Slkdd- alim!terototyru ){
 0  })
  y ulså hf ("dMpef(mo`uìe =½ 'objead' & module.eèporôs!(y
(   //0COmmonJS
    }nd}le.dxports = ractory(
    ( wiî$ow
      raquhre'ev+mmittfò'),
d     rgquir%('gmr-smzei,`0$   reqwibe('fizzy-ui-uvilw'),
 $    bEquirA('./celm'(,
      veqõire('./slide%),
  1   zequire('./`himate')
   ()3
  5`mlse {
   2// bB/rser global
 !!`|ár _Flickity < windog.Flicci|9;
*    7indgw®FliCkIty = facvory(      wandow¬
      wiî-ow.Mvem!tter,      win`ow.fetSizd,
    0 window,fizzyUIetiló¬
(    _flickity®Cell,
   (  Fnic+i6q.SdidE(*!   $ _Flisiiqy.aîiiateXrotoôyxe
    );! }

}( uIndkw, fq~cUion fast_ry( wioàow, ÅrEmitter, cetSize,
  uti|s® Cell, Slide¬4a~imatePvototype ) [



// ~ars
va2 j]ueòy ? windmw.jqtaöy;
var geVGomputedSôile0= wind/w.fetCo%put%dSôyle;
v!x gonsole = window.bnvsolÕ;

fwîction movmElemends( e,%msl tEmm} )`{
  alåM{ = Wtihs.makmArriyh enels )»
  while"( eldms.,ength ) {J(  $tEngm®atpendKhild  elems.shigt() );
0!
}

/(------,./­=-/-¬----m-----`Vlickmty(-----------M--%------m- //
/ glïbill9 wniqug (denphæieBsvar$GUKD < 0:
// mnvernaL storE ov all&Flicki|y inTances
var inst)nsec ="û};

functïmf Blick(ty( dmeeunt, o0tions!9 {
0 v¡v(queryELemeot = utils,gmvQueryE,ehdnu($ELement`){*  i& , !queryEmEm%nt ! { 0  if   consOlE ) {
`     consone.grror( '`ad element foò Flickity:)'h+(( qumryElema~P t} eleeånt ! (;
!   
"   zetuRn;
  }Š2 thiw,e,emEnt < quesùElamånt;
  // do not initialize ttice O. sáme elemejtK  if(( |hiq.ehement.æ|ickétyGUID * {   var$mnSuã.ce ½ inutanc%s[ thiw.dle-gnt®flicci|yGUIE$]
    in{tangg.oðtioo* ortins );`   rmtubn instance;*  |
  // `Dl!jQuery
  i& H(jQueri ) {
    dhió.$elemenT = jQuery  thia.eLeoent )9
  }:  // ortio$s
  õhis.options =`utilw.exôend( {}, plYu.consTrucvOr.$efaulvs );
" th)s.option8 op|igns );

  // kick t(ings o&f
  this>_create():
}

Æ|ackity.defaults ý {
  aCkessibilIty true,0(//0edaptivuHeiwht: fclce,
  cellAhicn: 'sen5er',
 $// SEìlSeleat/r2 ndefijed,
  /- ãontmin:(f`lse,
 1fBeEScrollGricdioN: 0.075,¤// fsigtion!whmn frue-scrllinç
  &riCtYon8 0.28,$/.`fri#timnwhej0relec4ing
( na}espaãeJQ=%ryÅvents: trua,
  // )nityalIofåx: 0<
! ðercentposi|in: true,
  {esire: true,
  selectedQttRactio.º 8&025l
(!sEtG`llårqSize2 true
  ?/ waWcjCSW:"âadse,
  //0wr`pGRou.d2 false
}3*
// has( of0eethods triggered on _create()
Flickity.createMethods = [];

var proto = Flickity.prototype;
// inherit EventEmitter
utils.extend( proto, EvEmitter.prototype );

proto._create = function() {
  // add id for Flickity.data
  var id = this.guid = ++GUID;
  this.element.flickityGUID = id; // expando
  instances[ id ] = this; // associate via id
  // initial properties
  this.selectedIndex = 0;
  // how many frames slider has been in same position
  this.restingFrames = 0;
  // initial physics properties
  this.x = 0;
  this.velocity = 0;
  this.originSide = this.options.rightToLeft ? 'right' : 'left';
  // create viewport & slider
  this.viewport = document.createElement('div');
  this.viewport.className = 'flickity-viewport';
  this._createSlider();

  if ( this.options.resize || this.options.watchCSS ) {
    window.addEventListener( 'resize', this );
  }

  // add listeners from on option
  for ( var eventName in this.options.on ) {
    var listener = this.options.on[ eventName ];
    this.on( eventName, listener );
  }

  Flickity.createMethods.forEach( function( method ) {
    this[ method ]();
  }, this );

  if ( this.options.watchCSS ) {
    this.watchCSS();
  } else {
    this.activate();
  }

};

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

proto.activate = function() {
  if ( this.isActive ) {
    return;
  }
  this.isActive = true;
  this.element.classList.add('flickity-enabled');
  if ( this.options.rightToLeft ) {
    this.element.classList.add('flickity-rtl');
  }

  this.getSize();
  // move initial cell elements so they can be loaded as cells
  var cellElems = this._filterFindCellElements( this.element.children );
  moveElements( cellElems, this.slider );
  this.viewport.appendChild( this.slider );
  this.element.appendChild( this.viewport );
  // get cells from children
  this.reloadCells();

  if ( this.options.accessibility ) {
    // allow element to focusable
    this.element.tabIndex = 0;
    // listen for key presses
    this.element.addEventListener( 'keydown', this );
  }

  this.emitEvent('activate');
  this.selectInitialIndex();
  // flag for initial activation, for using initialIndex
  this.isInitActivated = true;
  // ready event. #493
  this.dispatchEvent('ready');
};

// slider positions the cells
proto._createSlider = function() {
  // slider element does all the positioning
  var slider = document.createElement('div');
  slider.className = 'flickity-slider';
  slider.style[ this.originSide ] = 0;
  this.slider = slider;
};

proto._filterFindCellElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.cellSelector );
};

// goes through all children
proto.reloadCells = function() {
  // collection of item elements
  this.cells = this._makeCells( this.slider.children );
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
};

/**
 * turn elements into Flickity.Cells
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Flickity Cehl{
*/Š`roto&_makeCglds =!funcdion( ulE-{ !`{
 "far CElLEl%ms( têiv._gklterFabdCeliElemgnts(Pelem{ );J
  //0còeat% new`Flickity$fo3 collecpIonŠ  w`r celm{ 9 cel,eleos¬map* gqnc|)on( cellE|a- )!û
 " "~etqp~ nåw`Cell($cdlllem,0this i;
 `=( ôhés );*
  retõrl cclls3
|;

0rnôo.getL!stCell = f}Nctioj8) {
  zeturn tHiQ.ceîls[ uHaw.celD3.lengtH$- 1 ];
};

 ro4o.g%pLastSliäå -èvWngvmoî() k
` rEturn phiq>sdidqw[ tiis.sli`eS.lgngth - 10};Š};
//`poSipions al|¢cdlìs
pÂotk.0osétiojCells = funã´éon¨) {
 %./ saze aln cil,s
¡ tèas._riaCellw	 this*ëdlns");
  / POsKtion alí ce,|s
  thi{>_p{qi4aonCe,ls(°0 );
=;
*-+*
 *!pl{ition"certa)n cell{
 j @parai SIntageð} )ndex`/ wHich`cell"|k qtarôwIth
 :+proto._0ositio.Cenlq = fõnctioo* ineez ) {
0 kntex = Index Ü| ;
 b¯o al2o"meãsure`mazCmlnH%igmp
  ,/ start€0 if tgsitioniîç `ll c%lLs
$ <iks.laøCåìlHEighv ? index ? this:m!xCellHeigHt ||)0`:$0;
 `Vcr kdl>X*= 0;
  /- gåT #El,P( if - i~dex ~ 0$(`[    varpStartâeÌì ? tlisnCeldsÛ INdup - 5 U+
 `0 De,lX ½ qtwrtCa¨l.X ! sôartGeln.wizåouteriDti9
""}
  vcr le, = thmw.ãeìlS.lmngti;
  for ("vAr é=ijdeh; )(< lån; i++ 9$s
!  `P seln =$th	scemlsk];((  c}ll.{åtPmsitimN( CallX !;
    cellX ;= ce`l.syza.OuterUidth3   ¨thiq.mahCällHEighte= Mau(.max,(kenl.cize>outgrHeiglt¬"thës¬íaxC%lìHeacht ©;Ê  }
  // keeQ Trabk oF callØ do8 wra`-arktîd2 u(éó,rliteÁfheuhdth ="calmØ;"  // {h)des
  tha{.utdate[lides(){
$ ?/ kontain cnider tárget
  thhs.OKonTàinSlideS();* 0/? uptatm snidrGidth
 (phIs.smit5sWidpi = xej ? 4his/gEtHartS|mde()ntapee4 - thmr&wlkdes[p®4a"ee4 z$0:
};
l2*
 * aell>getSazm() on eultirla gellw
 *$@P!rií yArrcy} cells: */Êrroto.sizeCells = funcpion(Belhs!(0{
  ce,ls®fnsEaci, functin(0celL ( {*    ãelì.getYize()+
 0}	*
};

// -----/------)--)---%-----  ---------)=--/-------/---,2//

pv/tf.updátåSlédåó 9 FunCtyon() [0 tÈis&Slie%S`½ Z]
  if(( !Tlk2.cen|s.lengtè ) {
  ! return;
  }

 €var`s,itE =angw Shhee(0tè+s4)* 0this.s|)des.push( ólide (;
  v`r ióGðieinlegd 9 th©s.origi/Sidd == 'laft; `cr nextMqrwiN(= ióOrifinL%dt ;('mazginRigjtg : 'marginLeft3
 0ver canG%l,Fit =!thiw._ge4CanaeliFit(-;J* `this(cellS.forEach( functign( #ell, i ) {   0// jusT adt cenl if fiv3t celn in slide
    if*"!sli@e.cells.lgngth +ps
      sliee.addCe|l*`Cdnl );
$    `~etqrg;
 0 "}. (" ^aR SLileWhdth =$8 sìidd.o}terWi,th - sli&E.æé`stMargin ) +  4   ( cenn.{iza,oUterSkdtH - cgDh.sir$[$nextMargko U i;
  "if   canKelLFit(caLT( this, i, slmdeW)dth )0) { à    {Lide,addKeln(bC%ll$);
    } ulse@{( $"! /+ doesl't dit, few sla$e3  "   slmle.up$ateTavg%t(-;

      sliäe = î%7 Slide((thiq ):
  "  thas,sLites.push( s~idg );
$  0 $sliDe.adfCe,l¨ +åln );
 0  =(  }, tHés$Š &o/ l!st sLite
 $wlmde.ur$aveVAseeth-;
 `/' updatg .sel!Ct%dSlidm
! this.u0eateSalecueD[live¨){
};
Prkt/._geTCanSellFi4$= fun#tIkj() {
  vqr gr.upCelLq,=4this.oxpions.groupBEllw;
  if ( !groupCllns ) [ ` 0reôurO &unCtio~() ;
 ( 00 redtrj falsd;    };
  } e`se")f ( pyXeOf gò/upCdlls )-"'number' ) {
 0  '/ group(by numbur. 3 -¾ [p(3,:]$`ß3,4,5], ..* $à vir nuMbeP8 papseIn|( gvoebGåìls,"11 )»*  " Retero funstmon( I0-    `  sedurn ( i e o=mcas )$!== 0»
    }{
  }
  // tefatlt, erawp%cy"iDtx of s,ùde
  // parse`'7uw
 8vAw pepcentMa4ch = typeof gòotðCållc ,= 'strYnG' &&
    gboupAells.ma4oh(/^(^`+)!$/)»
  var`percent =0percenuMaôc` ? pa23eHnô( ðercån<MaTca[1_,„±0 + / 1 0`º"1>0 retern0&unbtiçm( i, rlideWidtj0) {J)  $return slédeGydti <= ( tlO3nsiú%néîn%rWkdtx + 1 ) *$pez#ent+
0!};
};

'-$aliis°_iniô dor êQuery plugIn$clhckidy()
pskt/._mlMt 
pRoto®vmpksi|imÎ = fuîation(	 {
  this.tnshtk'>GelN{()?
  vhCr.xoóithonSliderAtSelec´gd(-;
};**qpO4o.getQizg mfUjcTignh) ;J `thhó.size = çmpSirå	 thIw.a`ement 9{
  4ji1.setCelalig.((;
 4hkw.cuRs/rÐo3itmçn(5 thkã.size&InfezWidth + this.cEllAlign;};
va" ce,lAlignShortxan${ =8y
 `7/ cell aliçî then âased o~&orivin sIte
 0center {
`   Left: 0.=$ª   (right: 0.5
 !},
  H`ät:0;
   !lefp: 2,"!  zkwht; 1  u(
 @right: »
 !" Bigx~3 2, "! lef4: 1
$ }
;

p{o4o.s%tCil,Align = buncdion() {
  var Shozt`AnD  cullAléçnShorThandsS thks.rtions.cellÁlagn ]?
0 this®#ellAdign = shost`and ? s(orthanf_ tHoS.oRi÷inSIe Y * dhys.opvygfs.{ellAlign;
ý:
Jprnto*setGallErySyxe <!guîctioN() 9
  iæ ((this.optionc>setOalìurySizD !{    vAr$heigh| =*thIsnoðôions.`lppt)vu
ei'(d .& thés.3eìec|e$Slide!?
     this.Se|ec\mdSlkda.heiæht$: this.maxCm|lHehcHt;
    tèir.vie`kr|.style.heigLt = èeight!+ 'px';
  }
ý

ps?uon_getWraShafTCel,S -"ftlctimn() {
  / only`for ?rap5arunl
 "if ("¡pjis,op|yïî{.ra`Ezound © S
    rmturj;
  }*` / q.shift 0revigus belms
  tiiq._unshmftCells t`ic.befmreShkftCEllS +;  thár*_}NshIftÇålls( this.qbtarShifdCellc h»*  // geu âeFore cElls*  // inytmal gap  6ar`gapH - tmiS¾CqrSorQosition;
` var cenlIndex = thës.ãells.lengtH" 1;
  tiis.befkreSHiftÃehl{ =0thiw>_oetGapCeÌlq( gapX,$cåìINäex. -5 );
  // 'et aftep0cenlS*  -/ ending`gap0båte%~ last!#eül and %ndoF galìar{ vig÷xord
( gapX  thiq®sizm.innurWIdtx )$ttir.Sursn~Porivioî»
! //!3pirt c}ïning!at firsô aem|, w/pking forwerä
$ t`is.afterQhifpAeìls = this._getGápCullS  garH, 0, 1 )+=;

Ðroôo/_getWarCellw = de.c|ign( gapX¬ cålnINde|, incre-eþt$( û
  /- oeep ed`ifg Calls }ntil T|eco6ep txe i.étkaì Ga0*  var cells = [];  whid% ( gapR": 0 !0{*"   var0c%nh = thiS,cellsZ ceblIltmx ];J0   id  p©ãell ) ;
 %  ( frDak9
#  $}   ²celms>0ush8 ãfäl );
!  "cd|lInde| += kncreMMnp;
    g`pX -=hcell.sizå>muta2Width;Š  }J0 beturn cells{};+
n/ --=)-0cmjteik(----- //

// co.Taan kall0earge5s w/$no epãesS`{litinc
proto.^kontain[lieus!_ nuncti/n(+${J0 if *$(this.kptions.ãfntain || txió.gptioj`*÷raxIr/une |\ 	tlis.ceLlS.mength ) {
&   return;
  } vaR I{Ráçht\oLent!= thIcNptmnns.richtToMgft;
"!vaú beginMargin = iqÒightÔgHefu ? %ocrÇI.Sig`7'": 'mcrgi.Ldft';
  var EodMarGin = isréwltToNe&t ? 'marginHmft' 8 'mazgilRiohT¥;
  var cojtenvwidtx = ôxKS.slideijlEWydth - thisngeuLástÃell)!.3ize[ eldMargan Ý;
  o¯ c/nte.t ic lmss Thkn gadlepy sa{e
 $vaR ISïntentlallar = #mnuE~vWidtn <0thIs.SizeinNerGidtl3
@ // boUnds- vÅr cegi.B/und 9 this*kÿrso2Po7itmç~ + vhIq.cEhLs[°].s)zm[ kewknMargil(U;  v`r enDBounä 5 cootenukdth ,"thiq.rize*InoerWhdth¨* (  ,"thic.cellAlmon );
( // ck.tAin e`ch sedn tarcavÊ  4his.sxide[.forDachh functmz( slmde )!z    )& ( yóCïnteftSmaller i {‹$     +/%aml cmlls fit inside!gellery  )  "slmàe.target©=hco.tåjtWidth * this®ceìlAlign;‚  ¡ } %lse {*   " &// aoNtain tobkuds
  ("!siiee&targmt 5 Lath.mex  Slmfe.targed,0regilouîd );     $sl)le.targdt } Eati.min qlidA:tiRcet mndBound$9;"   |  }, tha3 8;
m;
//d-/--= (----- //

+**
"* emits8evEnts0vhc evgN4Tmittg2`anD jQuezy event3
!* @tára- strHngi ty`e$-2ncme o&$åVmnt "$@parai {Eveft} åvenu!- Oyh'inal evenô
 * @ ara}$[Array}Ibes -$extra arf5meftq
 */*qrot.t)spitch6ent = fulCuygn( typa¬ ev}nt, arçs) {*$ vdò!mm)vAòg{ = uvånt ?2[$event ]&Coîãat( ergs6) * `rcc;
¨ this.åíhTÅrålt( tùpe. emi|Abgs0-;

 "if ,äkQuery f' phys.$elgment ) {
( !(/ debaUld tRigGer`Wiôh vyse iv!.o gventŠ  ` type +=¤dhqs.m0tions.~aodSpace
QuepyE6eft  '.flIbkit}'$8(§';(    öár  efÁnt = tiðe;
  $$if ( evunt") k
   "  // creatd jÑugry event
a !   var .QEvejt ? jQuezy.Avllt( event -;
      jQEvgNpntyp5"= type;
   (¤ $evant = jQÅvgot;
` d }
   @tiiw*$%lemeotîpriç'er $evelt, args );
 }
ô;*//`--,­,----­I-,-----­-----) seldct ---------­}-,/---/,--=-=/- '/

/*(
 *  xarAm Ioôegebý jldEx - i~dex oæ the slidm
 j0@p)ram${Jooleåf} isWpap -(Will!wrap-arounD to(mast;first i& ad thu end
 * @paRam {Booxdan}(isnstaf~ -!will immeäiat%ly s%t psitéon au selekted(cenl */prOõgselect 9 functinn( inde8* isW"ap< i3Inqtanô )€{
 $if ( )tÈis.isAaôyvd") {
  $ se|õrN;
  }
  index ½ parseKnt( index$&1° i3
 `thisl_÷rapSeLec6( ifåey")?
Š  éf ¨"thisfoptio~u&gripA3oUld || hsWrap -$3
   $inl%x2= ut)l{.eodulo) éndExŒ tèi3>rliìes&len'th ){
& }a // B!)l if0in7alie infíxC  if(( !phys.snáfes[ )nueh( i {
  ` reTurn
  }
 0veR prevIndex = tjis.{enectedIîdex;
  4his.{e|ecteäIndex =$énTexz
  th)r.wptateSglectedShm$e*);
 (if`("i+Ínstant - s    t`ms6xfsidiohSlaäerAtSenuc`ud);
  - elóe j
   (this.star4Anym!tijn(-+
0 ý
  if ( thi3.optoonq/adartiveHeight )({
    4hhs.sEdGillerySixe ):  }
" // GRenTp
  thks.diqpatchevej4( §select', full, [ index!]d);
  // #(Engg1event iv ndw lndax ¸if ((yndm8 !5 psuvInde0 ) z
 0 (this&dic atshEwelu( 'ahAnMg'¬ nuìl, { éndgx \8)9
  ý
  //0ïLd ö1 ebent .ame, rem/vG if v7($uiys>d-spatg`EveN|(/sellSmnect');:}?

// W2aqs positI/n nor wRapAround, to move`to"closest ólide.`#113Ârbïtn>_wrarSemekt = fenCtion( iNdexp)!{
  var lej = thiSªqliddsjl%nctj;
(!~aò icWraqping$= 4èis.options.'rapABouf$ && ìen > 1;
$0iv0( !msW2appioc2	%{!   2epuRn inldx;
 $}
  rer wrapIndey ½"qtiLs.modulo* index, len0)3( // oo to shortest! vAr ¤eìta ="-ath.`bs* wrapMnDex ,0th)s.qeleCtedMî$e8 (:
  var bhcëWrapD%lta  ]ith.¡bs( (`wrapIndeX «`len $ - thi×.selecte,ÍnNåx )8
  ta2 foråwa2dWrapDelöa = api.abs( ( õrárIndex %`le~ ) -$th)s.3eldCtedI~dex );
 !if($!this.isDzafSelect && bac_VrepDelta > dåltq ) ;
   `é~$ex!/} len;*  } eìse mg°( !this*iëDvcgselgct¢&& f/rewardWrapdelta"< ddmt! ) {
    kndex -5 len9
 2
  /,)wrap xositéon so rlkdec is sùdhin normal area
  id h indey < ³ ) {Š    thiÓ&8 ­= t is*slIdeableWiDtx;
¤°}0else -g`( index(>? len$) {Š   $|his.x += öhió.snkleabldWydth; (}J};
Špso4o.pre~)oas = FuJction( iwWraq, isKnstanp é {  e`iq.såìect( this.seîectuDIndex -"0$ is×pap, isInStanT 9;ý;
psoto.n%xt - function( isWpap,!isIf{tan| ) û
` thiS/qemekt( thísž3e,%ktedIn`ex + 2, isWraP,!ksKfst!nt();
}»

proto.updqteSenecpeelidu =0fu~cdiïn() 9
  var ÷h	de = thks~slile{[!tliw.óEèecte`Indal ]/
6`/& selECteeINdax aoeld0bE0outside md shmdus,¢in ôriggõrubBEfkrE re3izå -
0 ëb0¨ !sliDe )!{
 !  retubn;
  }
  /+ tnsehect!previous seleftud rlide
  uhIs.U~sedggdÓelectefSlide¨);
  -/ updite ne7$3eìEcte` slyde
  vbisseMdCtudS|idda= sl+de;
  slIdenselect(-;
  thiC.sem%ctedKelms = Slide.cel|s¸  tiir.óelectedElemenÔk < ólyde.getedhLlements();
  ®o HASKº selecdefCell0& cglestedglemgnt as!first ce,l iF slidm,(b!cKarls cOepatibilyty  '/ ReMmöe kd v3?  uèIs.selucte$Cel, 5"slid%&cells[ ]*
 0|hks.se|eatedEhemend = 48k{*s%lfctedEdements[°Ý;
9

qrotk.unc%,ecVSglåetedShide = fulC<ign() {
  if ( Vhi3.selecte$Slide + {
    0his>selec4eDG|ide.unsel%ct();
  }
};

psoto6sehectI.iviILIngeh = gqncpimn") 3
  ver ifat}aìAndex ½ tèis®mpti/nso,iti`lI.DeX
 /"álready act)v!ted, óelect$qbevIous senåcte$Inlex
  iF ( this<i1IjitActivated i z"   thIS.relect. uhks.re,ectedMndex, f`l3e, t0u% )» ( 0reôõòn3*  }
  // s$lEcp*with reLector(ótring
  yf$) onitiaèÉndeø &f typeov )nit)idInlåø =| 'striog'¢!!{
  " vir kehd ="this.qudriGell( initialIndåx );
    mf ¨ cedl 9 {
  $`  this.seleaôCflL( éJiTYalIvda|,0banse, ðrue );
      smturn;
  ! ~
  }

  vhr Inlex - 0;
  /¯"seluct with nuocer
 `if`(izitichMnDex && tyis.cdidESK éoitiálfdex`Ý ) y*    yndEx <8anI4iafIntax;
  =
  // select inwtantLy
  tHis,select( i.dex,"fals!, truG!(9}{
¯j*
 * celuct sdqle from fumbeR"kb a%l| mlement
+*`@param {Ul%ment Or N1mbdr} elfo0*/*`po|o.selectCeld = funcôion( v!lue.²is÷òap, isËnrt!nt )$s
  /- eeT bell
  var gqll = vhis*querùCdll( vim5e );*" if ($)selD`)0{
""$0ruôur~;
 0y

! ve" index - |his.'gôCell[IdGIndex8(celd );  thh3.selu248 i~eex( msGrap, ióIlstanp );y;

p0otolgetcellSlid%Ineex = vqnction( celì !.{  // gat(in`åh ïf$slileS thaô hcs "aìl
 `for (!var i;0; i¨½ t(Is.rmldes&lelgô(;"i++!) {
0  !vaz slid% = this,slides[h];
"$ 0vcr(infeh = clide.cenlsindExOf( gell );    kf ( ijdEx`!= ­1b© {ˆ     `retwrn i;
    }
  }
};J
/- -/$-%--%)--­--m-­-#---m---!cet cel|r -=/---­--)--%-=-------/-½ //

/*
 "*gdV Flickity.Codl, givmj en(Eleeent * @paramèyglement}¨eleo
 : @Retur~s sDl)jki|9.Cell]"item
 ª
púoto*getGall = àulction( e|e 	 {
  /¯0loop ôHroUgh cå~ls To Mep0thE {ne that!oAches
  for"( war0i=0; i$= ehés.ãe|l{.|eneth;(i9+ )!{
$`  vqr cAlL"= This.ge,ls[h}>
$   iæ%!keìl.edíegnt$== elem`) [  $  `return cell;
  0 }J  }
};ˆ
/**
 . geÔ collectin ng`F(iciéty,Cenl{$ givan Eìemelts *!@uar!} {e|emmnt, Arsay$NGDeist} eìeMs
 *0@rutU2ns þArray}@aells!/"nmckmt9.CellW
 "/p²oto.getellr < funãtion elEmsd) {
  eldms0¹!uôils.m@keArray( elemw );
h vqR cells = {;  elems/forÅach(`fy~ctmkn(pele- + û
   vcr cell`= thiq.geTSell( älem );
    iFa) ceml ) {
  ""!`ãells.Ðush  c%ll )»
   (u"  }<"Dxi !;
 (vgôurn cENès;
}

.** * gep cell ålements * Aveüu2ns [Avra{}ce-lEdgos j/
pr}To.wmTellEmeoefps =(fnãtion() [
  òepñRn txiócõl,3.ear( function( #elx )$z
 ! )3e|ur.!celleìeMult;
 });K];

/**. * Oåt  arEnT ce,l fÒom in eLaíenp * @PaRbm ûalument] dlem
  @returfs Fùic+it.Ce|,M #ull
 */p2ïto.çETpAzÅnuCell = fUncvyol( elem ) {` -/ eirsp%chEck if mhem is(ce,l
  7ar call = |x+{.getCelL( elem );
  i&   belL ) y
 $ ap%puÒn cell;Š$ }
  *? tr; t/0w%T parent c$ll ehem
  elem } uôils.gevPasent( emei, '.fliakmtY-7ìidar > *'h);  2e|uân tihs.çelCe||( elum )»
ý;

/:j  * geu cells ad*aëenp to a slyde * @Param sÉnt}gfr} ádxÃnunt - nam`gr(oæ efjacent(slhda{
 : @parãm xKntager} index m andex o& slif- to start *!@retgòms {Arraq} CelLs -"arrayBmf Fliãoitu.C%lns
 j/
troto>gõpAd*acentKelhElemen\s ="functinn( a`jKOunt,"in@ex )({Š  if ( !adjCUnt ) {
    setõvn tè)s.salEcteeSlada.getCelìElámån4s);Jh }
  i.dex = index0== }*defio%d"? t`is.reíagTedIn,cx :"inômx;

  var len =(phir>rlideSlengpè;
0!if ( 1 ; ( adjCount * 2 ) >= len ) {
    return this.getCellElements();
  }

  var cellElems = [];
  for ( var i = index - adjCount; i <= index + adjCount ; i++ ) {
    var slideIndex = this.options.wrapAround ? utils.modulo( i, len ) : i;
    var slide = this.slides[ slideIndex ];
    if ( slide ) {
      cellElems = cellElems.concat( slide.getCellElements() );
    }
  }
  return cellElems;
};

/**
 * select slide from number or cell element
 * @param {Element, Selector String, or Number} selector
 */
proto.queryCell = function( selector ) {
  if ( typeof selector == 'number' ) {
    // use number as index
    return this.cells[ selector ];
  }
  if ( typeof selector == 'string' ) {
    // do not select invalid selectors from hash: #123, #/. #791
    if ( selector.match(/^[#\.]?[\d\/]/) ) {
      return;
    }
    // use string as selector, get element
    selector = this.element.querySelector( selector );
  }
  // get cell from element
  return this.getCell( selector );
};

// -------------------------- events -------------------------- //

proto.uiChange = function() {
  this.emitEvent('uiChange');
};

// keep focus on element when child UI elements are clicked
proto.childUIPointerDown = function( event ) {
  // HACK iOS does not allow touch events to bubble up?!
  if ( event.type != 'touchstart' ) {
    event.preventDefault();
  }
  this.focus();
};

// ----- resize ----- //

proto.onresize = function() {
  this.watchCSS();
  this.resize();
};

utils.debounceMethod( Flickity, 'onresize', 150 );

proto.resize = function() {
  if ( !this.isActive ) {
    return;
  }
  this.getSize();
  // wrap values
  if ( this.options.wrapAround ) {
    this.x = utils.modulo( this.x, this.slideableWidth );
  }
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
  this.emitEvent('resize');
  // update selected index for group slides, instant
  // TODO: position can be lost between groups of various numbers
  var selectedElement = this.selectedElements && this.selectedElements[0];
  this.selectCell( selectedElement, false, true );
};

// watches the :after property, activates/deactivates
proto.watchCSS = function() {
  var watchOption = this.options.watchCSS;
  if ( !watchOption ) {
    return;
  }

  var afterContent = getComputedStyle( this.element, ':after' ).content;
  // activate if :after { content: 'flickity' }
  if ( afterContent.indexOf('flickity') != -1 ) {
    this.activate();
  } else {
    this.deactivate();
  }
};

// ----- keydown ----- //

// go previous/next if left/right keys pressed
proto.onkeydown = function( event ) {
  // only work if element is in focus
  var isNotFocused = document.activeElement && document.activeElement != this.element;
  if ( !this.options.accessibility ||isNotFocused ) {
    return;
  }

  var handler = Flickity.keyboardHandlers[ event.keyCode ];
  if ( handler ) {
    handler.call( this );
  }
};

Flickity.keyboardHandlers = {
  // left arrow
  37: function() {
    var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
    this.uiChange();
    this[ leftMethod ]();
  },
  // right arrow
  39: function() {
    var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
    this.uiChange();
    this[ rightMethod ]();
  },
};

// ----- focus ----- //

proto.focus = function() {
  // TODO remove scrollTo once focus options gets more support
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Browser_compatibility
  var prevScrollY = window.pageYOffset;
  this.element.focus({ preventScroll: true });
  // hack to fix scroll jump after focus, #76
  if ( window.pageYOffset != prevScrollY ) {
    window.scrollTo( window.pageXOffset, prevScrollY );
  }
};

// -------------------------- destroy -------------------------- //

// deactivate all Flickity functionality, but keep stuff available
proto.deactivate = function() {
  if ( !this.isActive ) {
    return;
  }
  this.element.classList.remove('flickity-enabled');
  this.element.classList.remove('flickity-rtl');
  this.unselectSelectedSlide();
  // destroy cells
  this.cells.forEach( function( cell ) {
    cell.destroy();
  });
  this.element.removeChild( this.viewport );
  // move child elements back into element
  moveElements( this.slider.children, this.element );
  if ( this.options.accessibility ) {
    this.element.removeAttribute('tabIndex');
    this.element.removeEventListener( 'keydown', this );
  }
  // set flags
  this.isActive = false;
  this.emitEvent('deactivate');
};

proto.destroy = function() {
  this.deactivate();
  window.removeEventListener( 'resize', this );
  this.allOff();
  this.emitEvent('destroy');
  if ( jQuery && this.$element ) {
    jQuery.removeData( this.element, 'flickity' );
  }
  delete this.element.flickityGUID;
  delete instances[ this.guid ];
};

// -------------------------- prototype -------------------------- //

utils.extend( proto, animatePrototype );

// -------------------------- extras -------------------------- //

/**
 * get Flickity instance from element
 * @param {Element} elem
 * @returns {Flickity}
 */
Flickity.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.flickityGUID;
  return id && instances[ id ];
};

utils.htmlInit( Flickity, 'flickity' );

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'flickity', Flickity );
}

// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery = function( jq ) {
  jQuery = jq;
};

Flickity.Cell = Cell;
Flickity.Slide = Slide;

return Flickity;

}));

/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'unipointer/unipointer',[
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {



function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd - remove if falsey
 */
proto._bindStartEvent = function( elem, isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

  // default to mouse events
  var startEvent = 'mousedown';
  if ( window.PointerEvent ) {
    // Pointer Events
    startEvent = 'pointerdown';
  } else if ( 'ontouchstart' in window ) {
    // Touch Events. iOS Safari
    startEvent = 'touchstart';
  }
  elem[ bindMethod ]( startEvent, this );
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss right click and other pointers
  // button = 0 is okay, 1-4 not
  if ( event.button || this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  this._pointerReset();
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto._pointerReset = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));

/*!
 * Unidragger v2.3.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'unidragger/unidragger',[
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {



// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd
 */
proto._bindHandles = function( isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  // bind each handle
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
  var touchAction = isAdd ? this._touchActionValue : '';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isAdd );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) {
      handle.style.touchAction = touchAction;
    }
  }
};

// prototype so it can be overwriteable by Flickity
proto._touchActionValue = 'none';

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }
  // track start event position
  this.pointerDownPointer = pointer;

  event.preventDefault();
  this.pointerDownBlur();
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// nodes that have text fields
var cursorNodes = {
  TEXTAREA: true,
  INPUT: true,
  SELECT: true,
  OPTION: true,
};

// input types that do not have text fields
var clickTypes = {
  radio: true,
  checkbox: true,
  button: true,
  submit: true,
  image: true,
  file: true,
};

// dismiss inputs with text fields. flickity#403, flickity#404
proto.okayPointerDown = function( event ) {
  var isCursorNode = cursorNodes[ event.target.nodeName ];
  var isClickType = clickTypes[ event.target.type ];
  var isOkay = !isCursorNode || isClickType;
  if ( !isOkay ) {
    this._pointerReset();
  }
  return isOkay;
};

// kludge to blur previously focused input
proto.pointerDownBlur = function() {
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  var canBlur = focused && focused.blur && focused != document.body;
  if ( canBlur ) {
    focused.blur();
  }
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  // prevent clicks
  this.isPreventingClicks = true;
  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));

// drag
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/drag',[
      './flickity',
      'unidragger/unidragger',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unidragger, utils ) {
      return factory( window, Flickity, Unidragger, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unidragger'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.Unidragger,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unidragger, utils ) {



// ----- defaults ----- //

utils.extend( Flickity.defaults, {
  draggable: '>1',
  dragThreshold: 3,
});

// ----- create ----- //

Flickity.createMethods.push('_createDrag');

// -------------------------- drag prototype -------------------------- //

var proto = Flickity.prototype;
utils.extend( proto, Unidragger.prototype );
proto._touchActionValue = 'pan-y';

// --------------------------  -------------------------- //

var isTouch = 'createTouch' in document;
var isTouchmoveScrollCanceled = false;

proto._createDrag = function() {
  this.on( 'activate', this.onActivateDrag );
  this.on( 'uiChange', this._uiChangeDrag );
  this.on( 'deactivate', this.onDeactivateDrag );
  this.on( 'cellChange', this.updateDraggable );
  // TODO updateDraggable on resize? if groupCells & slides change
  // HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
  // #457, RubaXa/Sortable#973
  if ( isTouch && !isTouchmoveScrollCanceled ) {
    window.addEventListener( 'touchmove', function() {});
    isTouchmoveScrollCanceled = true;
  }
};

proto.onActivateDrag = function() {
  this.handles = [ this.viewport ];
  this.bindHandles();
  this.updateDraggable();
};

proto.onDeactivateDrag = function() {
  this.unbindHandles();
  this.element.classList.remove('is-draggable');
};

proto.updateDraggable = function() {
  // disable dragging if less than 2 slides. #278
  if ( this.options.draggable == '>1' ) {
    this.isDraggable = this.slides.length > 1;
  } else {
    this.isDraggable = this.options.draggable;
  }
  if ( this.isDraggable ) {
    this.element.classList.add('is-draggable');
  } else {
    this.element.classList.remove('is-draggable');
  }
};

// backwards compatibility
proto.bindDrag = function() {
  this.options.draggable = true;
  this.updateDraggable();
};

proto.unbindDrag = function() {
  this.options.draggable = false;
  this.updateDraggable();
};

proto._uiChangeDrag = function() {
  delete this.isFreeScrolling;
};

// -------------------------- pointer events -------------------------- //

proto.pointerDown = function( event, pointer ) {
  if ( !this.isDraggable ) {
    this._pointerDownDefault( event, pointer );
    return;
  }
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }

  this._pointerDownPreventDefault( event );
  this.pointerDownFocus( event );
  // blur
  if ( document.activeElement != this.element ) {
    // do not blur if already focused
    this.pointerDownBlur();
  }

  // stop if it was moving
  this.dragX = this.x;
  this.viewport.classList.add('is-pointer-down');
  // track scrolling
  this.pointerDownScroll = getScrollPosition();
  window.addEventListener( 'scroll', this );

  this._pointerDownDefault( event, pointer );
};

// default pointerDown logic, used for staticClick
proto._pointerDownDefault = function( event, pointer ) {
  // track start event position
  // Safari 9 overrides pageX and pageY. These values needs to be copied. #779
  this.pointerDownPointer = {
    pageX: pointer.pageX,
    pageY: pointer.pageY,
  };
  // bind move and end events
  this._bindPostStartEvents( event );
  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
};

var focusNodes = {
  INPUT: true,
  TEXTAREA: true,
  SELECT: true,
};

proto.pointerDownFocus = function( event ) {
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isFocusNode ) {
    this.focus();
  }
};

proto._pointerDownPreventDefault = function( event ) {
  var isTouchStart = event.type == 'touchstart';
  var isTouchPointer = event.pointerType == 'touch';
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isTouchStart && !isTouchPointer && !isFocusNode ) {
    event.preventDefault();
  }
};

// ----- move ----- //

proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > this.options.dragThreshold;
};

// ----- up ----- //

proto.pointerUp = function( event, pointer ) {
  delete this.isTouchScrolling;
  this.viewport.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
};

proto.pointerDone = function() {
  window.removeEventListener( 'scroll', this );
  delete this.pointerDownScroll;
};

// -------------------------- dragging -------------------------- //

proto.dragStart = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  this.dragStartPosition = this.x;
  this.startAnimation();
  window.remo6eventLisTefd2( scrolì/l dhks );
  this.TisðatchEVenå( 'drcgSv@rp', gwmnp,$[$p/anter ] !
}3
*proõO>pointevMo~E =(nujgwi+n( e6mn|, po!~aev 9 {Š*(far mov%VEctor#= tjis,_dzaeTo)nuevLn6e( evabt¬(pwinudr );
  dèi3&dIsqatsiEv%nô  'po)nterMove', ebeft-2[(0OIk<er< movgWebôor ] )9
  vxIS_dr!gM/pe* urelT$ poin|%r, motgVestor );
};

pbovï.$rcemore!= functioh(`evenv Qointur,`mo~eVebtoR ) {
  ) ( !dHas.isTraggarlf") y
! ` zetu`n+*  |*` E6efu,x2dventtefqlt(=;
  thisppef)o}sDragX =`thir&dzagX;
" / r%öerse ifRi‡hd-to-hef|
 $var Dize#TqoN -$tihÓ®optimn{.rigitToLeFT ?$)1 :!3;
  mf ( 4xhs.opdmols*ubapApnund )"{
   (¯/ wzap aroUnd iOva. #589
    mkvEVector.x = mofeVactwr.x(% tHiw.sléde!bleWidvh9
  }
  var dbaoø ½ FHiqdragSthrtp.c)tiona+movdVectrl$*(diraktiol

!0idàh !t9is.oxtioo7.wra`Aro5n`(&f thmslsliDas.le.gdh ! z   0/? ólou drag   $v`r kRIgknBouîd 5!IaÔ|.Ïax
 -U`iS.slideQ[0Y.vazget, phir.frawS4avtPoitim~(-;
`! drag\ =!dragH < =riinBoqNd ? ((`régX + ob(ginBkqnd(- * 1&% : dv!oH;
 $ (t`7 endB+unf"=Meth.min(!-tHis>ce|ÌaStSlide(9.t#rfeô, th)r.fr`g“tardPoSitinn );Š b  tragX 9 fragX(< dndÃound ? (!dragX + a.dBo}l` ) *0.5 : dr)WY;
  }
‹  Tlis.draex =(draçX;j  u(is.DragMoreime(= new DctE¨);
(`tx)s.dispatchÅVEf4 b'vraçMçve', gvõnu,PK po)nter, moreVector2W +?
;
proto.drágÀn$ = ful#taoj  evebt, poin4%r 9 {
  if ( "t`is&isTraggablt ) {
  (0òe4uj.;Z( }( If ("thIs7ëptiOnsoVreeScrolL !"{
    thisycreeScrohlêlg = trud9
 $=
0$/ yet`sglecte%In$ex raed /n€7here f,Ack winl eol q`
 0var mndux = thms.dsagENdRe3tingReDect*);
 0éF - thés.o0pmols.bpe`[#òmìl ¦& aqèis./`Ui/Ns.w2apAfounl 	 {  0 / Ig"free%{ãronl & nt wr`p jrouod
   4-/ d/ not fzEemsbrolL if gïifç outS)De Ffbouîd-ng"smieus $  /o sï ¢ounDing {ìédes ban wp$ract03lm4gr, aîD Ëdåq ét jn)bUnds
    va2 rgQtin÷X ½ vhmsngetBestin7Po#itio~(¬;
(f! |xis®isNreeScRoLling ?b-rms|ingX"~ tlis.snides[0U.tavget$&&
     `-úeSTInfX!¼ thi3.ge|XiStSlide*).t!bgeu;  9!eìse if ¨!!ôhìr,Opti/îs&br%eSczOll &$ inddx -9 thisnseìecõudKjdex ) [
!   // bgosv seleadYO.!if0{eleated(infex `ar`nkp$chançAdŠ    indeX$+] thió®drAgEneFkoslSelgcT¨+;  
  dulete phés.previou;DrcgØ{*  // `Prl}!sEnecdiko
  o/ T]DM òefac4R this, selec|iîg Hese feels waird
! ?+ HACK, set fleg s/ drag'ing stays hn ãovroct Äire£ti'j
  thisNisDragm,eku!9 ôais.optiofs.wraðQrouïd;
  tHiw.sa,mct  index (;
 $delmte thisisDregsulEcd?
` t(yy.lasPctaiEvent( 'erqgENf', evunt<([@p/in4er ] );
};

prnto.dcaEQndRmrvingKelesth}"Func4iOnh) {
 0fa2!r%stiîGH = this*gUdRÍwtingPgktion,);
  // ho bar away bsom selebped Slide
$ vár¨diqua~je = Math.ab3(bthac.çEtlideTiótaîce( -reStingX,!thi{.rElectedIndmy 9!)?
` >/ g%t cLnóet resting(goiNf up and going"d/wl
  vcr posmvivmÒgsôiÏg =dthis.OcetCLOsestRe3tiog  restinfX- dist!nce( 1 );
4 vPr nega4ifeRmstilG (this.OgetlosesdSesdInf( rdqtijgP. p)söalCel -1 -;  // uóe cho{er rmapi.g¤For0wbapmcrge~d
  var intgx = pOsmtiweResp-ng.disTance < negetiverMstIng.ìiyôaf'e ?" p p¯siti6eReóuing.indez : nmmatimRarpéng/ijte|:
 "s}tUrn indåX}{
/:*
`* gifel òestinç X `nd!DqWTAnce0To selected gemlB *$gep ´(w dmstaNce and index of0t`e #h¯3es4 call
0*  qdsa/ KNumber} òesôIneX - e3tkmated"post-nlick!2dsting posation!*"@paraM {^5mber} |icTance - dirtance tnóe|Gcted cel,
(* HpaRA% {iît`gev} ink2mmmnt  k0`oRh-1,$Going up or don
 * @paturns {Obzacd} - { distance2 {Nueber}l Index:${Intewur}(}Š */ŠProto.WgebClsgstRestyng ½`fwnction8!ZastingZ,$DAcTqîce, incraeent + {
! vap ineeh = tiis®senektedI~dep;
 (v`r milFisôance ? In&i.aô9:
  Rar(#ondition = tèic.optao~3/co.da)n 
& #uHkqnop|Iens'wr!pQrouNd 
!   //0)v #fvain, {eeð8gom~g if di×ô)nce is!eqqcì tÿ minLmSTalC-
  $ functioî  d$ -l )1z retõrj l <= íd;8: v=Ogtyon, l< md ) z retUrj d <`md; ½;!$shiLe%( ronfipiOn( distancel!minÄistanCu ) ) {
`   //$mcAsu2e distanCg do$,ext cell
    ijdax + mjcrement;  $ mlnDi3tqnge `dástánbå;
 0  distcnce = thms.gevslideDostince((-âestiîgX, hfdax +;J    kf ( tk3tencu }=? .wll ) {    ! b2eik;
    }   (dyw4ikkå < MaTh.abs8 distá.ce );Š  }
  betuRn {
  " eisôance: minDistancm<
    // pe}eñt%d cW!pò-Vious inlex   $éîäux:`iodeø -0ij#remenpJ  y?
};
¯+.
"+ ieqsupe disdalce betweeo(x aìd0á smi%g tar!ut *(@Paam {NuobDp} x * @parao {intggår} i~dEx"- sìéda endex
 (o
pbo4o.'lpòl)fEDiStafce ½FUncp	?n8 x,"index) {
  vaf le. = this,sledes.lengvh»
  / Wòap arntnd if àt,least$2 slhDas
" vaZ ésWr!rAro5fd = Thés(opt)ols.wrapA2ound && lgn . 19
  var¢sliäeIndex = ic_Rap@round ?uDAls.mkdulo( ikdex,@lmn 9 : iodex;
  6ar slide }`this.s|mdeñYRlileInduX ];
  ig ( !sLIde ) {
 x  ret0bf l5lj9 r}! / adl$diqucnre fkr 7rir/argun`"snides  vav wpaP =!ysWrb8Arownd ? this.sìi`eableWieth *(MáVl./loob( hneø$. len )`: 0;
  2epurj x - h Slidd.targav + 7rap 	;
ý

ppoTo,draÇEoeBonstWeleaf =0jenct8of(© k  //!do n/t`bn/ót af JO pråviowsDr!o9 o2 drcgMoveTim%
  if h thës.pvevhousDrágZ =?½ undefined || ¡lhi3.e2agMove\kme Ì|
    // kr hf drag waó held for 100 -u*    ne~ D`Pe() =!t`ir.dbagMoveTi\e >8000 )¤[Š $$ retuòn °
$ }

  var déstance(? this>getSlhleNictcnce(`-|hCs.äråfX, this.seLecteDI/dex ©{
  var dmhpa } thysnprciOusDrAgX$© this.dragX;
%!it ( tis0ance$> 0`&& Fel4aa? 0 ! {
$   */ boo3t(tn îext2if movyNo 4werds the right, !od poqktIveveloci|y
 (  return =;
  u ehsa kf ( f)stafad <!0$&&"duhta(< 0 i {
! (!// boost tg {rg~i/q{ if!eovinw towar$q the0neft,#end negative óElïcit1
    retqrn ­1;
 `|
$ ráluòn 0;
?;

o/ ¥---- sTctkbChick m--- /
pVo|ostaôiãCLycop= funstion8 eôent,¡xointer ) {
  // gut r`icketCall,!ef celì sás bliCkel
  var clickedCeìl = tHiqfwetPa²ejdCemL( Åvenv.uareeô )/
  var ceèlEleo x clicKeeRedl"'& "m!ckelCgll.elementN  var cem,Index =a#likje$Cell&& this.cells.iJdgxOâ(!clyc{edCeln );
  this®$éópatChUVen|(('staticClibk',(evnd, [ pointev,`cellElmm,`áelhIndex ] ):
};
/' m%-= scroll )%---(/+
prgun.onsCrïld = Funbtifn()$û
0 vav sspgll0= gevScro~lXositi/n();
 4vaz sgr}llIgvgX =`Vhis.°oIntmrow~Scroll.| )!scrol,.8;
  rar sk2ollMo6eI = uhisnpMiftdzDownscroll,y - s3roll'y3
  // cajãEl Cíica/tap if scrgl, )s tko`muah
  if0( Iidh.abs( s#r/llkv5X ((?"3 || Ma|`.ab  ócrïlMoveY")06 ;() ;
   0tli3._pohnterDone);
 `\
};

// ----- tTkls -/½­=(//

function gepcr/llÐosoôqÏî( y
 (returo {
   (x:¤window.haçepOfFsdt,
   é: s)näkw.pageYOffset 0?
}

/ -,---  )---/ //
return Vligkidy;
.]));
// pzev'next btttonS
( $4nAtion(0window, bacdosy ) yŽ$ -/&ônkvurqeD"mo`=l%0Dgfinitio/ !/* jshin|`ñ|viCT: false +/
" ib ( 0qpemf defina == %fU.aTion' && dafjne.cmd$){
  ª // QMD
(( "dEfane("%flicciä}/jS/prev-next-button',_      g.?gniccMty'¬
`     'unI`oifVeRunipoknuer#,    $,'fi~x}	ul/utilsOuvéns' !  ], g¥nStInn,"Fléc+Ity, UnIpoilter( etils 	 ;
    ( retwrn fac6ory( uineïw, dliskityl Uni@ointår,(utins )3    u	;
  } else$if`( |yPeoæ ]kdule == 'ojngcp§ && modql%.ex0orus ) û
 ( `/¯ KOmlkn
    m/eulå.expoSds  fqcuorx(
( !¨  umndow$
`  0  rdquivA(7./flisKity'),
 ! ( !zeqwkò%(un)pkintds/)l
  0   requirE('fi:x}=ui-ut!ó')«¨ ¤ );
 "m elre {
   0#¯bRkwseb GlobalJ    fabdnvy8+      wéndoW, `    w)Ndow.Flic+iu{,*0     widow.Unipïi.|erl
      wildow.fiZ~ùUIUtinsª   !){"$ }

}( winDïw F5octiov facvgry8 wi|dow, GlhckIpy,(UjiðomNtar, utilq ) {
urå strIcT';
Vcr svgURI = hptð://www*32nnrf/r 24§3~G'9

o/ --]------­----)-o------/ Qve~ExtButtïn -=-------,/--­--)--/--`+/

fUnctiïn @revLe|vÂuôtïn* $irecôion. tardfd ) y+ !´hm3.,iSection < eArecTimn;
$ thi2>qirunV = pcrent;
  thiccRda`e );]
PreVNe|tButtgn.prmt/tyqe = Objec4,argat%( Tnipomnter>prntot!pÕ );

ÐrEVJehtButton.`2ototytm>]cru`t% = function,) {
 0// 0ro`Ervées  t(is.IsMfabled&9!|r}e;
  t`Hsn+s@rev©ows = THiCdirebxion ¼-`1;
" var leFt@irectiof  tbis.raòen|,options*rightToÌefT { q : ¯!;  tHis.iseft`=2d(is.`irectIïl ==`defvDirection;
( vqR elemen$ ½ thiS*elemunt$= dobumenp¯cpait!Enem%g0(/butt/n')9
` element*ãlassNamu =#flickiTa%bubt/nf|icoi0y-Prqv-next-bwvton';
" gleÍe~t/classJame += tims&isPzgvkoUr ? '$prevmous? ; ' nexT';
 `// prmf%nt bE4to. from sub}ituioc0vorm htup:/ïstackowõp.lkw.com/q-1476176/18rq83N  elemajp.seuAvtri"ute( 'dype', 'futton' )3
 (-)(ynit ac Disaâlet
 !\hió.d)sbfe(©;
  tLtienp.sE|A4tRajut} #avi`-laba|'(`this/i{PruvaoUs ? 'Rre>mu{'$: 'Ngxv‡ 9;
( ?o crmape !rvog$$var(óve`=(this.createSVG();
  element.appendChild( svg );
  // events
  this.parent.on( 'select', this.update.bind( this ) );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PrevNextButton.prototype.activate = function() {
  this.bindStartEvent( this.element );
  this.element.addEventListener( 'click', this );
  // add to DOM
  this.parent.element.appendChild( this.element );
};

PrevNextButton.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.element );
  // click events
  this.unbindStartEvent( this.element );
  this.element.removeEventListener( 'click', this );
};

PrevNextButton.prototype.createSVG = function() {
  var svg = document.createElementNS( svgURI, 'svg');
  svg.setAttribute( 'class', 'flickity-button-icon' );
  svg.setAttribute( 'viewBox', '0 0 100 100' );
  var path = document.createElementNS( svgURI, 'path');
  var pathMovements = getArrowMovements( this.parent.options.arrowShape );
  path.setAttribute( 'd', pathMovements );
  path.setAttribute( 'class', 'arrow' );
  // rotate arrow
  if ( !this.isLeft ) {
    path.setAttribute( 'transform', 'translate(100, 100) rotate(180) ' );
  }
  svg.appendChild( path );
  return svg;
};

// get SVG path movmement
function getArrowMovements( shape ) {
  // use shape as movement if string
  if ( typeof shape == 'string' ) {
    return shape;
  }
  // create movement string
  return 'M ' + shape.x0 + ',50' +
    ' L ' + shape.x1 + ',' + ( shape.y1 + 50 ) +
    ' L ' + shape.x2 + ',' + ( shape.y2 + 50 ) +
    ' L ' + shape.x3 + ',50 ' +
    ' L ' + shape.x2 + ',' + ( 50 - shape.y2 ) +
    ' L ' + shape.x1 + ',' + ( 50 - shape.y1 ) +
    ' Z';
}

PrevNextButton.prototype.handleEvent = utils.handleEvent;

PrevNextButton.prototype.onclick = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.parent.uiChange();
  var method = this.isPrevious ? 'previous' : 'next';
  this.parent[ method ]();
};

// -----  ----- //

PrevNextButton.prototype.enable = function() {
  if ( this.isEnabled ) {
    return;
  }
  this.element.disabled = false;
  this.isEnabled = true;
};

PrevNextButton.prototype.disable = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.element.disabled = true;
  this.isEnabled = false;
};

PrevNextButton.prototype.update = function() {
  // index of first or last slide, if previous or next
  var slides = this.parent.slides;
  // enable is wrapAround and at least 2 slides
  if ( this.parent.options.wrapAround && slides.length > 1 ) {
    this.enable();
    return;
  }
  var lastIndex = slides.length ? slides.length - 1 : 0;
  var boundIndex = this.isPrevious ? 0 : lastIndex;
  var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
  this[ method ]();
};

PrevNextButton.prototype.destroy = function() {
  this.deactivate();
  this.allOff();
};

// -------------------------- Flickity prototype -------------------------- //

utils.extend( Flickity.defaults, {
  prevNextButtons: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  }
});

Flickity.createMethods.push('_createPrevNextButtons');
var proto = Flickity.prototype;

proto._createPrevNextButtons = function() {
  if ( !this.options.prevNextButtons ) {
    return;
  }

  this.prevButton = new PrevNextButton( -1, this );
  this.nextButton = new PrevNextButton( 1, this );

  this.on( 'activate', this.activatePrevNextButtons );
};

proto.activatePrevNextButtons = function() {
  this.prevButton.activate();
  this.nextButton.activate();
  this.on( 'deactivate', this.deactivatePrevNextButtons );
};

proto.deactivatePrevNextButtons = function() {
  this.prevButton.deactivate();
  this.nextButton.deactivate();
  this.off( 'deactivate', this.deactivatePrevNextButtons );
};

// --------------------------  -------------------------- //

Flickity.PrevNextButton = PrevNextButton;

return Flickity;

}));

// page dots
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/page-dots',[
      './flickity',
      'unipointer/unipointer',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unipointer, utils ) {
      return factory( window, Flickity, Unipointer, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unipointer'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.Unipointer,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unipointer, utils ) {

// -------------------------- PageDots -------------------------- //



function PageDots( parent ) {
  this.parent = parent;
  this._create();
}

PageDots.prototype = Object.create( Unipointer.prototype );

PageDots.prototype._create = function() {
  // create holder element
  this.holder = document.createElement('ol');
  this.holder.className = 'flickity-page-dots';
  // create dots, array of elements
  this.dots = [];
  // events
  this.handleClick = this.onClick.bind( this );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PageDots.prototype.activate = function() {
  this.setDots();
  this.holder.addEventListener( 'click', this.handleClick );
  this.bindStartEvent( this.holder );
  // add to DOM
  this.parent.element.appendChild( this.holder );
};

PageDots.prototype.deactivate = function() {
  this.holder.removeEventListener( 'click', this.handleClick );
  this.unbindStartEvent( this.holder );
  // remove from DOM
  this.parent.element.removeChild( this.holder );
};

PageDots.prototype.setDots = function() {
  // get difference between number of slides and number of dots
  var delta = this.parent.slides.length - this.dots.length;
  if ( delta > 0 ) {
    this.addDots( delta );
  } else if ( delta < 0 ) {
    this.removeDots( -delta );
  }
};

PageDots.prototype.addDots = function( count ) {
  var fragment = document.createDocumentFragment();
  var newDots = [];
  var length = this.dots.length;
  var max = length + count;

  for ( var i = length; i < max; i++ ) {
    var dot = document.createElement('li');
    dot.className = 'dot';
    dot.setAttribute( 'aria-label', 'Page dot ' + ( i + 1 ) );
    fragment.appendChild( dot );
    newDots.push( dot );
  }

  this.holder.appendChild( fragment );
  this.dots = this.dots.concat( newDots );
};

PageDots.prototype.removeDots = function( count ) {
  // remove from this.dots collection
  var removeDots = this.dots.splice( this.dots.length - count, count );
  // remove from DOM
  removeDots.forEach( function( dot ) {
    this.holder.removeChild( dot );
  }, this );
};

PageDots.prototype.updateSelected = function() {
  // remove selected class on previous
  if ( this.selectedDot ) {
    this.selectedDot.className = 'dot';
    this.selectedDot.removeAttribute('aria-current');
  }
  // don't proceed if no dots
  if ( !this.dots.length ) {
    return;
  }
  this.selectedDot = this.dots[ this.parent.selectedIndex ];
  this.selectedDot.className = 'dot is-selected';
  this.selectedDot.setAttribute( 'aria-current', 'step' );
};

PageDots.prototype.onTap = // old method name, backwards-compatible
PageDots.prototype.onClick = function( event ) {
  var target = event.target;
  // only care about dot clicks
  if ( target.nodeName != 'LI' ) {
    return;
  }

  this.parent.uiChange();
  var index = this.dots.indexOf( target );
  this.parent.select( index );
};

PageDots.prototype.destroy = function() {
  this.deactivate();
  this.allOff();
};

Flickity.PageDots = PageDots;

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pageDots: true
});

Flickity.createMethods.push('_createPageDots');

var proto = Flickity.prototype;

proto._createPageDots = function() {
  if ( !this.options.pageDots ) {
    return;
  }
  this.pageDots = new PageDots( this );
  // events
  this.on( 'activate', this.activatePageDots );
  this.on( 'select', this.updateSelectedPageDots );
  this.on( 'cellChange', this.updatePageDots );
  this.on( 'resize', this.updatePageDots );
  this.on( 'deactivate', this.deactivatePageDots );
};

proto.activatePageDots = function() {
  this.pageDots.activate();
};

proto.updateSelectedPageDots = function() {
  this.pageDots.updateSelected();
};

proto.updatePageDots = function() {
  this.pageDots.setDots();
};

proto.deactivatePageDots = function() {
  this.pageDots.deactivate();
};

// -----  ----- //

Flickity.PageDots = PageDots;

return Flickity;

}));

// player & autoPlay
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/player',[
      'ev-emitter/ev-emitter',
      'fizzy-ui-utils/utils',
      './flickity'
    ], function( EvEmitter, utils, Flickity ) {
      return factory( EvEmitter, utils, Flickity );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('ev-emitter'),
      require('fizzy-ui-utils'),
      require('./flickity')
    );
  } else {
    // browser global
    factory(
      window.EvEmitter,
      window.fizzyUIUtils,
      window.Flickity
    );
  }

}( window, function factory( EvEmitter, utils, Flickity ) {



// -------------------------- Player -------------------------- //

function Player( parent ) {
  this.parent = parent;
  this.state = 'stopped';
  // visibility change event handler
  this.onVisibilityChange = this.visibilityChange.bind( this );
  this.onVisibilityPlay = this.visibilityPlay.bind( this );
}

Player.prototype = Object.create( EvEmitter.prototype );

// start play
Player.prototype.play = function() {
  if ( this.state == 'playing' ) {
    return;
  }
  // do not play if page is hidden, start playing when page is visible
  var isPageHidden = document.hidden;
  if ( isPageHidden ) {
    document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
    return;
  }

  this.state = 'playing';
  // listen to visibility change
  document.addEventListener( 'visibilitychange', this.onVisibilityChange );
  // start ticking
  this.tick();
};

Player.prototype.tick = function() {
  // do not tick if not playing
  if ( this.state != 'playing' ) {
    return;
  }

  var time = this.parent.options.autoPlay;
  // default to 3 seconds
  time = typeof time == 'number' ? time : 3000;
  var _this = this;
  // HACK: reset ticks if stopped and started within interval
  this.clear();
  this.timeout = setTimeout( function() {
    _this.parent.next( true );
    _this.tick();
  }, time );
};

Player.prototype.stop = function() {
  this.state = 'stopped';
  this.clear();
  // remove visibility change event
  document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
};

Player.prototype.clear = function() {
  clearTimeout( this.timeout );
};

Player.prototype.pause = function() {
  if ( this.state == 'playing' ) {
    this.state = 'paused';
    this.clear();
  }
};

Player.prototype.unpause = function() {
  // re-start play if paused
  if ( this.state == 'paused' ) {
    this.play();
  }
};

// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange = function() {
  var isPageHidden = document.hidden;
  this[ isPageHidden ? 'pause' : 'unpause' ]();
};

Player.prototype.visibilityPlay = function() {
  this.play();
  document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
};

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pauseAutoPlayOnHover: true
});

Flickity.createMethods.push('_createPlayer');
var proto = Flickity.prototype;

proto._createPlayer = function() {
  this.player = new Player( this );

  this.on( 'activate', this.activatePlayer );
  this.on( 'uiChange', this.stopPlayer );
  this.on( 'pointerDown', this.stopPlayer );
  this.on( 'deactivate', this.deactivatePlayer );
};

proto.activatePlayer = function() {
  if ( !this.options.autoPlay ) {
    return;
  }
  this.player.play();
  this.element.addEventListener( 'mouseenter', this );
};

// Player API, don't hate the ... thanks I know where the door is

proto.playPlayer = function() {
  this.player.play();
};

proto.stopPlayer = function() {
  this.player.stop();
};

proto.pausePlayer = function() {
  this.player.pause();
};

proto.unpausePlayer = function() {
  this.player.unpause();
};

proto.deactivatePlayer = function() {
  this.player.stop();
  this.element.removeEventListener( 'mouseenter', this );
};

// ----- mouseenter/leave ----- //

// pause auto-play on hover
proto.onmouseenter = function() {
  if ( !this.options.pauseAutoPlayOnHover ) {
    return;
  }
  this.player.pause();
  this.element.addEventListener( 'mouseleave', this );
};

// resume auto-play on hover off
proto.onmouseleave = function() {
  this.player.unpause();
  this.element.removeEventListener( 'mouseleave', this );
};

// -----  ----- //

Flickity.Player = Player;

return Flickity;

}));

// add, remove cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/add-remove-cell',[
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {



// append cells to a document fragment
function getCellsFragment( cells ) {
  var fragment = document.createDocumentFragment();
  cells.forEach( function( cell ) {
    fragment.appendChild( cell.element );
  });
  return fragment;
}

// -------------------------- add/remove cell prototype -------------------------- //

var proto = Flickity.prototype;

/**
 * Insert, prepend, or append cells
 * @param {Element, Array, NodeList} elems
 * @param {Integer} index
 */
proto.insert = function( elems, index ) {
  var cells = this._makeCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }
  var len = this.cells.length;
  // default to append
  index = index === undefined ? len : index;
  // add cells with document fragment
  var fragment = getCellsFragment( cells );
  // append to slider
  var isAppend = index == len;
  if ( isAppend ) {
    this.slider.appendChild( fragment );
  } else {
    var insertCellElement = this.cells[ index ].element;
    this.slider.insertBefore( fragment, insertCellElement );
  }
  // add to this.cells
  if ( index === 0 ) {
    // prepend, add to start
    this.cells = cells.concat( this.cells );
  } else if ( isAppend ) {
    // append, add to end
    this.cells = this.cells.concat( cells );
  } else {
    // insert in this.cells
    var endCells = this.cells.splice( index, len - index );
    this.cells = this.cells.concat( cells ).concat( endCells );
  }

  this._sizeCells( cells );
  this.cellChange( index, true );
};

proto.append = function( elems ) {
  this.insert( elems, this.cells.length );
};

proto.prepend = function( elems ) {
  this.insert( elems, 0 );
};

/**
 * Remove cells
 * @param {Element, Array, NodeList} elems
 */
proto.remove = function( elems ) {
  var cells = this.getCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }

  var minCellIndex = this.cells.length - 1;
  // remove cells from collection & DOM
  cells.forEach( function( cell ) {
    cell.remove();
    var index = this.cells.indexOf( cell );
    minCellIndex = Math.min( index, minCellIndex );
    utils.removeFrom( this.cells, cell );
  }, this );

  this.cellChange( minCellIndex, true );
};

/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */
proto.cellSizeChange = function( elem ) {
  var cell = this.getCell( elem );
  if ( !cell ) {
    return;
  }
  cell.getSize();

  var index = this.cells.indexOf( cell );
  this.cellChange( index );
};

/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 */
proto.cellChange = function( changedCellIndex, isPositioningSlider ) {
  var prevSelectedElem = this.selectedElement;
  this._positionCells( changedCellIndex );
  this._getWrapShiftCells();
  this.setGallerySize();
  // update selectedIndex
  // try to maintain position & select previous selected element
  var cell = this.getCell( prevSelectedElem );
  if ( cell ) {
    this.selectedIndex = this.getCellSlideIndex( cell );
  }
  this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

  this.emitEvent( 'cellChange', [ changedCellIndex ] );
  // position slider
  this.select( this.selectedIndex );
  // do not position slider after lazy load
  if ( isPositioningSlider ) {
    this.positionSliderAtSelected();
  }
};

// -----  ----- //

return Flickity;

}));

// lazyload
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/lazyload',[
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {
'use strict';

Flickity.createMethods.push('_createLazyload');
var proto = Flickity.prototype;

proto._createLazyload = function() {
  this.on( 'select', this.lazyLoad );
};

proto.lazyLoad = function() {
  var lazyLoad = this.options.lazyLoad;
  if ( !lazyLoad ) {
    return;
  }
  // get adjacent cells, use lazyLoad option for adjacent count
  var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
  var cellElems = this.getAdjacentCellElements( adjCount );
  // get lazy images in those cells
  var lazyImages = [];
  cellElems.forEach( function( cellElem ) {
    var lazyCellImages = getCellLazyImages( cellElem );
    lazyImages = lazyImages.concat( lazyCellImages );
  });
  // load lazy images
  lazyImages.forEach( function( img ) {
    new LazyLoader( img, this );
  }, this );
};

function getCellLazyImages( cellElem ) {
  // check if cell element is lazy image
  if ( cellElem.nodeName == 'IMG' ) {
    var lazyloadAttr = cellElem.getAttribute('data-flickity-lazyload');
    var srcAttr = cellElem.getAttribute('data-flickity-lazyload-src');
    var srcsetAttr = cellElem.getAttribute('data-flickity-lazyload-srcset');
    if ( lazyloadAttr || srcAttr || srcsetAttr ) {
      return [ cellElem ];
    }
  }
  // select lazy images in cell
  var lazySelector = 'img[data-flickity-lazyload], ' +
    'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
  var imgs = cellElem.querySelectorAll( lazySelector );
  return utils.makeArray( imgs );
}

// -------------------------- LazyLoader -------------------------- //

/**
 * class to handle loading images
 */
function LazyLoader( img, flickity ) {
  this.img = img;
  this.flickity = flickity;
  this.load();
}

LazyLoader.prototype.handleEvent = utils.handleEvent;

LazyLoader.prototype.load = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  // get src & srcset
  var src = this.img.getAttribute('data-flickity-lazyload') ||
    this.img.getAttribute('data-flickity-lazyload-src');
  var srcset = this.img.getAttribute('data-flickity-lazyload-srcset');
  // set src & serset
  this.img.src = src;
  if ( srcset ) {
    this.img.setAttribute( 'srcset', srcset );
  }
  // remove attr
  this.img.removeAttribute('data-flickity-lazyload');
  this.img.removeAttribute('data-flickity-lazyload-src');
  this.img.removeAttribute('data-flickity-lazyload-srcset');
};

LazyLoader.prototype.onload = function( event ) {
  this.complete( event, 'flickity-lazyloaded' );
};

LazyLoader.prototype.onerror = function( event ) {
  this.complete( event, 'flickity-lazyerror' );
};

LazyLoader.prototype.complete = function( event, className ) {
  // unbind events
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );

  var cell = this.flickity.getParentCell( this.img );
  var cellElem = cell && cell.element;
  this.flickity.cellSizeChange( cellElem );

  this.img.classList.add( className );
  this.flickity.dispatchEvent( 'lazyLoad', event, cellElem );
};

// -----  ----- //

Flickity.LazyLoader = LazyLoader;

return Flickity;

}));

/*!
 * Flickity v2.2.1
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2019 Metafizzy
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity/js/index',[
      './flickity',
      './drag',
      './prev-next-button',
      './page-dots',
      './player',
      './add-remove-cell',
      './lazyload'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('./flickity'),
      require('./drag'),
      require('./prev-next-button'),
      require('./page-dots'),
      require('./player'),
      require('./add-remove-cell'),
      require('./lazyload')
    );
  }

})( window, function factory( Flickity ) {
  /*jshint strict: false*/
  return Flickity;
});

/*!
 * Flickity asNavFor v2.0.2
 * enable asNavFor for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'flickity-as-nav-for/as-nav-for',[
      'flickity/js/index',
      'fizzy-ui-utils/utils'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( Flickity, utils ) {



// -------------------------- asNavFor prototype -------------------------- //

// Flickity.defaults.asNavFor = null;

Flickity.createMethods.push('_createAsNavFor');

var proto = Flickity.prototype;

proto._createAsNavFor = function() {
  this.on( 'activate', this.activateAsNavFor );
  this.on( 'deactivate', this.deactivateAsNavFor );
  this.on( 'destroy', this.destroyAsNavFor );

  var asNavForOption = this.options.asNavFor;
  if ( !asNavForOption ) {
    return;
  }
  // HACK do async, give time for other flickity to be initalized
  var _this = this;
  setTimeout( function initNavCompanion() {
    _this.setNavCompanion( asNavForOption );
  });
};

proto.setNavCompanion = function( elem ) {
  elem = utils.getQueryElement( elem );
  var companion = Flickity.data( elem );
  // stop if no companion or companion is self
  if ( !companion || companion == this ) {
    return;
  }

  this.navCompanion = companion;
  // companion select
  var _this = this;
  this.onNavCompanionSelect = function() {
    _this.navCompanionSelect();
  };
  companion.on( 'select', this.onNavCompanionSelect );
  // click
  this.on( 'staticClick', this.onNavStaticClick );

  this.navCompanionSelect( true );
};

proto.navCompanionSelect = function( isInstant ) {
  // wait for companion & selectedCells first. #8
  var companionCells = this.navCompanion && this.navCompanion.selectedCells;
  if ( !companionCells ) {
    return;
  }
  // select slide that matches first cell of slide
  var selectedCell = companionCells[0];
  var firstIndex = this.navCompanion.cells.indexOf( selectedCell );
  var lastIndex = firstIndex + companionCells.length - 1;
  var selectIndex = Math.floor( lerp( firstIndex, lastIndex,
    this.navCompanion.cellAlign ) );
  this.selectCell( selectIndex, false, isInstant );
  // set nav selected class
  this.removeNavSelectedElements();
  // stop if companion has more cells than this one
  if ( selectIndex >= this.cells.length ) {
    return;
  }

  var selectedCells = this.cells.slice( firstIndex, lastIndex + 1 );
  this.navSelectedElements = selectedCells.map( function( cell ) {
    return cell.element;
  });
  this.changeNavSelectedClass('add');
};

function lerp( a, b, t ) {
  return ( b - a ) * t + a;
}

proto.changeNavSelectedClass = function( method ) {
  this.navSelectedElements.forEach( function( navElem ) {
    navElem.classList[ method ]('is-nav-selected');
  });
};

proto.activateAsNavFor = function() {
  this.navCompanionSelect( true );
};

proto.removeNavSelectedElements = function() {
  if ( !this.navSelectedElements ) {
    return;
  }
  this.changeNavSelectedClass('remove');
  delete this.navSelectedElements;
};

proto.onNavStaticClick = function( event, pointer, cellElement, cellIndex ) {
  if ( typeof cellIndex == 'number' ) {
    this.navCompanion.selectCell( cellIndex );
  }
};

proto.deactivateAsNavFor = function() {
  this.removeNavSelectedElements();
};

proto.destroyAsNavFor = function() {
  if ( !this.navCompanion ) {
    return;
  }
  this.navCompanion.off( 'select', this.onNavCompanionSelect );
  this.off( 'staticClick', this.onNavStaticClick );
  delete this.navCompanion;
};

// -----  ----- //

return Flickity;

}));

/*!
 * imagesLoaded v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) { 'use strict';
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( 'imagesloaded/imagesloaded',[
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.imagesLoaded = factory(
      window,
      window.EvEmitter
    );
  }

})( typeof window !== 'undefined' ? window : this,

// --------------------------  factory -------------------------- //

function factory( window, EvEmitter ) {



var $ = window.jQuery;
var console = window.console;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
function makeArray( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( kcA2rayLikd ) {
    ¯/ converd goD$Lisp ôo&ar2dyŽ $  returü aòR`ylice.galL( k"j )/
  y

  )/"arr!y og)si~e(e"`.Dex  retwrf S obb ];
}
// -­--/<-----------i-------- mmagusNoaeel$-m-%------/)!------,-)--- //

/(* * @param {Arrap¬ EdA-ejt, No@eList, String eleM
  @Parál {Oâject or Funtk.n} optiols - if Functi{n,0use aq0callfack
 * @paRám {Fulction} onAlways  caeLhag+ çuncvion
 */*fu~ctiOn"HiágeqDmade`8 %lam, ¯ptions- onALway3`! {˜  /? coerge ImageqLoaded+(withouv neu."tk je ne6 Ima'gqLgaddd8* ¤if*(`a( this instaêceof Im`ceqLoided )t) {
  ` Òetur."new$ImagesŒoaæad* Elul,"oqòékjû, onÁhwA{s );`0
  /+ use åle-0As [electov wtr),g
  viR ñUeryDlem = Dlem;
¨ if ¨ typmob eLam == &stpénçç ) {
(   AeeR{Ehe} = dOcwmentnquer}SedectorAml( elei );
  }
( // baé| iF"bed element
€ aG 8(!sueryElmm$) k+ !  consïlaneprOr(°'Âcf dlemeft fmr0iíageAlo`ded /`# ( !ue:zEoe- l|!elem!`	;
`   retur~;  y

  txió.mLame~ts =¤mqëeArRay* QuerùEl•m );
  thip.op4ions =(extend(`k},2thió,gpt)ol[°);  // shif5 abguMejt3 af no qtions set
  ib h tyteof options(=? 'function' )`{
$   ovAlways = opt©ons;
  } ulse {
$   ex\a.dx dlis.opuions, gpt)ons");Š  y
Š  èf ( njAl÷aùs ) {
0   thi2.on( 'cLways, o~Ah÷aY -; "}

0 txms.oetImbges((;

  if ( $ ) {
"   ? add jS=ery D}ferrdì oâjåcp‹   0thisnëqdedarred = n%w ¤.Defursut()?J  }

  //0HAÃK cjegk ayyîc to"allow timç`to bKîd ìiytdlers s%ôTimeout(`Hq3cxEck/bând,!this ) );
}

AmacewLmIled.r2ototyxe0= O`jact,creatd
 EvMmidTer.xr¯totype );

YygesLmaded.rrotopm0u.oxv)cús(= {};*
AmagecMgstEd.trototypm>gåtKmaces = gÕoctiOn() ó  d`is.hmages = [\;

  // filter  find mtem30i& we hava an item sdlector*` tHis.elemevts.fo2Aach( tiis.addc|emajtIgsges thas +;
}»:¯**
 * @p`zAi$yNçtD} Dle-en$
 j/Images,gadåä,protïtype.afnElumentImages - function( e|åm 	 {
  ;/ &kLvEr siblIngs (if ( elamnjoäaO-e <? 'ÉMF/ ) {
b   ôhis*ad$Image( elem`(;  }
 ,// get0bÁckgroe~d Imagg"o. e,uyuNt  ib ( thió.ptmons>backgrouod ==?`|rue ¡ {$   thIs.EddElemantBaccfrou~dImages( alum0	{
! }

  +/ find childcen
2 // no no.,eleyujt0lodeS, #143
" vqr îoäeÔipd = eleM.nodeVxpe;  if ( !nnDuTqðm || eeLemenwNodETyqU3[ ngdeT}pe ] ;"{   `pet}jn;
$ }$ var chmldImos = Eleo*quer9AeleCtorall(i+g');
  /- conãav chil`Dle}ó 0o fiLterFoqnd array
  fgr 1 far(i½!; )"<childYmgs¬långuè; i++ !0[*8`0 varbimg = childYMçs[i];
  ( txisnaldImage¨ ieö );  }

  /- get child bcckcrouO` kmagms
  aj ( pypuof!thiw.option{.bc{sRoune(== 'Str)ne% )!{
" $ var c`ildren 9 elElqueriCeläcvorAnl( tjis/optioos.`ackgv'une!(;
    for ( y=1; k < childò%h&langth i++ © Š      vbR chihd 9 children[i];
      txis.aFdleMentJqa+groundImagår(!ghild ©;
  ! ]
  }
};

vArehementLoee\{pes 9(}  1: ôrue,
 $): true,
  5p: tòueM;
IecgesLï@ded.pvovotyðe.aedElemejtRakégrouîdImages -0æugction*`%leo#) {
(0vAv stydd = getC'-puôedStYle( elem$);
 0ig&( !sôyle!)!{
0  "// Fyreækx pet5rns .ull(if0in a hidden inramå ht|ts:/nbugúií.lé/548397
   `setupn;
  }
  // geô u2l insmee url)"... )
  v!p beERL  /UblÜ((Y&¢]!?(>*?)\5\!/gi;
 -6ar match%s = reURL.exeG*`Sdy|e.baãkfrounfImaGe*);
 !wh[le$( íatc*es$a== nmä ) [
    vár url = mátches &æ maôãhasK2M;0  `i& H url ) {Š  "   ôhhs.addB`cjgSouÎd,!÷rl. eleM 9;
 !  }
 $  matcdes$5 reUbH.Exec  stylebackgvoundIm`ge );
h ~};O/**
$*$Dperam {Imagå} iíf
"*/
macesLoideeNdrg|otypg.addImkge = functimn(iíg") sŠ  ~av#h-adi~gLmhfe(= new LïadiNgImage( kOg ); This&ilaggó>xuwè( ìoadingIma%e ){
};.ZIma'esLo`ded.ðsOtotype.aälBáckground ½!vunctioî( ubl, elem0i {
 ¤var bac-gr/und(½ new ‚ackgroqnd( ÷rl( EleM );
  4his.kmaoes.ru3h(0bA#Kgrmund );
}9

IMcgekEoaded.propnpyp%.kheck!­ fUnCtion ) {
 "6`r _|hés!5 dais;
  tHaS&Rrggvesr-lCount - 1Ž  ôhís.h!3àoyB6okef = faxsE9
 $// ck-qlete if no"iEaggs
 `if") !4hmsjiMageq.LånFth ) {
0 $0t(is.kom`lete();
    return?
( }

 pF5nctioj onPzngress( image, eìgí, m5ss!ge$) k
    ?/ HEÃK ­ C(vomg tpiggur3 %4ant before obbeCp(proxgrTies haVe chánoåd/ '83
!   setTiM%gTt( functi/~() Û
  0   _|his/pz/grEsw( Imag¥, elem, mgscace ©;
    }©?0 }
J  d`isfimagEñ/FïsEach( funGtioo( LoadingImaga ) {
  $ lo`tINgIeage.gnce( 'prmgtess/,(oNProcress -;
   lKAäi|wImage.cxeck();
 0}k{
};
imáwerLoe$å$.pRoto|ypg>ProereSó =0fufgtkÿn,Mmagd$ eleml0messiça`)"{
  thh1*pr/gbessedCmunt«);
 !thhsnxãSAzyB2ëen =$this.hasnkBvoken || ymaga.isLoqdud;
( //(vogresr dvençŠ  ôhis.eeit6e*t  'Progruss&, [$`his$ hmase-!elem }();
 4if * txiw/jqT%ferv%d && äHiÓ.JqdEgeòree>notif[ )pz
0  fthis>jqDefårúed.noTafy* this, iýaGe );  }
4!?/ cHeCj if¤comxle|gd
  i& ( 4hi3.`rogz%ssedK/unt =} dlés.haagås.dength )b{
    thIs/gompdet%();
! }*
  if(( this.ortion{.dgbuc && col1ïlE ) :
 0  #mnsole.yow,!'ppogæåss: ' * mdûrige) )mag%, elem$):  ýŠ}»‹*@magecLoédåd.p2o¶otype.complete = functkon)) {*  öar evenuNcmg`= t`i{.lcsEzyBro+ej(?0'æail" º!7e{oå';
  thés.isAm-ple|u`- uòue;
 )|hisemktERånt( evelt^)me, ["thiw ] ){
 $this.åmivEvent*`calayó§%0[!thic"] )3
  if  txis.êqDafdrred!) {
  0 var jqMethod = this.has@nyrokan ? 'rejeat' : 'rEslVe/y
(   this.jsÄeferred[ jaMmthof |+ this );N" }
=;
/ -----%-------%--------,--  ---/---}-­---m-)--------- /"*
fulctyï~ LmadingIgAge¨ )m' 9 {Š  tlis.img = img;
}

LoadingImage.prototype = Object.create( EvEmitter.prototype );

LoadingImage.prototype.check = function() {
  // If complete is true and browser supports natural sizes,
  // try to check for image status manually.
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    // report based on naturalWidth
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    return;
  }

  // If none of the checks above matched, simulate loading on detached element.
  this.proxyImage = new Image();
  this.proxyImage.addEventListener( 'load', this );
  this.proxyImage.addEventListener( 'error', this );
  // bind to image as well for Firefox. #191
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.proxyImage.src = this.img.src;
};

LoadingImage.prototype.getIsImageComplete = function() {
  // check for non-zero, non-undefined naturalWidth
  // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
  return this.img.complete && this.img.naturalWidth;
};

LoadingImage.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.img, message ] );
};

// ----- events ----- //

// trigger specified handler for event type
LoadingImage.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

LoadingImage.prototype.onload = function() {
  this.confirm( true, 'onload' );
  this.unbindEvents();
};

LoadingImage.prototype.onerror = function() {
  this.confirm( false, 'onerror' );
  this.unbindEvents();
};

LoadingImage.prototype.unbindEvents = function() {
  this.proxyImage.removeEventListener( 'load', this );
  this.proxyImage.removeEventListener( 'error', this );
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

// -------------------------- Background -------------------------- //

function Background( url, element ) {
  this.url = url;
  this.element = element;
  this.img = new Image();
}

// inherit LoadingImage prototype
Background.prototype = Object.create( LoadingImage.prototype );

Background.prototype.check = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  this.img.src = this.url;
  // check if image is already complete
  var isComplete = this.getIsImageComplete();
  if ( isComplete ) {
    this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
    this.unbindEvents();
  }
};

Background.prototype.unbindEvents = function() {
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );
};

Background.prototype.confirm = function( isLoaded, message ) {
  this.isLoaded = isLoaded;
  this.emitEvent( 'progress', [ this, this.element, message ] );
};

// -------------------------- jQuery -------------------------- //

ImagesLoaded.makeJQueryPlugin = function( jQuery ) {
  jQuery = jQuery || window.jQuery;
  if ( !jQuery ) {
    return;
  }
  // set local variable
  $ = jQuery;
  // $().imagesLoaded()
  $.fn.imagesLoaded = function( options, callback ) {
    var instance = new ImagesLoaded( this, options, callback );
    return instance.jqDeferred.promise( $(this) );
  };
};
// try making plugin
ImagesLoaded.makeJQueryPlugin();

// --------------------------  -------------------------- //

return ImagesLoaded;

});

/*!
 * Flickity imagesLoaded v2.0.0
 * enables imagesLoaded option for Flickity
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'flickity/js/index',
      'imagesloaded/imagesloaded'
    ], function( Flickity, imagesLoaded ) {
      return factory( window, Flickity, imagesLoaded );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('flickity'),
      require('imagesloaded')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.imagesLoaded
    );
  }

}( window, function factory( window, Flickity, imagesLoaded ) {
'use strict';

Flickity.createMethods.push('_createImagesLoaded');

var proto = Flickity.prototype;

proto._createImagesLoaded = function() {
  this.on( 'activate', this.imagesLoaded );
};

proto.imagesLoaded = function() {
  if ( !this.options.imagesLoaded ) {
    return;
  }
  var _this = this;
  function onImagesLoadedProgress( instance, image ) {
    var cell = _this.getParentCell( image.img );
    _this.cellSizeChange( cell && cell.element );
    if ( !_this.options.freeScroll ) {
      _this.positionSliderAtSelected();
    }
  }
  imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
};

return Flickity;

}));

