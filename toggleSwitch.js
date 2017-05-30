;(function($) {

  /* How to use
   * ==========
   * 1. Include this file to make plugin available on the jQuery object
   * 2. Call the .toggleSwitch method on an element with an optional
   *    settings object:
   *
   *      $('.top-level-nav', context).toggleSwitch({
   *        'insertTarget': '#block-ma-ux-logo',
   *        'toggleClass': 'navToggle',
   *        'paneClass': 'navPane',
   *        'insertWhere': 'before',
   *        'switchElement': 'span',
   *        'closeOthers': [
   *          '.searchToggle',
   *          '.languageToggle'
   *         ]
   *      }).render(function(){
   *        var $self = $(this);
   *        $self.closest('.region-inner')
   *          .wrapInner('<div class="boxed"></div>');
   *        $self.nextAll().add($self).insertAfter($('.boxed'));
   *      });
   *
  */

  $.fn.toggleSwitch = function(options) {
    var settings = $.extend({
      toggleClass: 'toggleSwitch',
      switchElement: 'button',
      paneClass: options.paneClass || 'defaultPane',
      bodyClass: false,
      getsToggle: this.selector || this,
      toggleSwitch: '<'+options.switchElement+' class="ma_toggleSwitch toggle"><span class="text">Open</span></'+options.switchElement+'>',
      insertWhere: 'before',
      insertTarget: this.selector,
      closeOthers: options.CloseOthers || 0
    }, options );

    var $insertTarget = $(settings.insertTarget),
        $pane = $(settings.getsToggle),
        $toggleSwitch = $(settings.toggleSwitch),
        openClass = 'isOpen',
        closedClass = 'isClosed',
        bodyClass = (settings.bodyClass) ? ((typeof settings.bodyClass === 'string') ? settings.bodyClass : settings.paneClass ) : false;

    var _closeTheOthers = function() {
      if (settings.closeOthers.length > 0) {
        $(settings.closeOthers.join(', ')).map(function() {
          if ($(this).hasClass(openClass) && !$(this).is($toggleSwitch)) {
            $(this).trigger('closeMe');
          }
        });
      }
    };

    var _flickSwitch = function() {
      _closeTheOthers();
      if ($(this).hasClass(openClass)) {
        $(this).find('.text').text('Open');
      } else {
        $(this).find('.text').text('Close');
      }
      $(this).toggleClass([openClass, closedClass].join(' '));
      _togglePane();
    };

    var _close = function() {
      if ($(this).hasClass(openClass)) {
        $(this)
        .toggleClass([openClass, closedClass].join(' '))
        .find('.text').text('Open');
      }
      _togglePane();
    };

    var _togglePane = function() {
      $pane.toggleClass([openClass, closedClass].join(' '));
      if (bodyClass) {
        $('body').toggleClass(bodyClass+closedClass +' '+ bodyClass+openClass);
      }
    };

    return {
      render: function(callback) {
        $insertTarget[settings.insertWhere]($toggleSwitch);
        $toggleSwitch.addClass(['toggleSwitch', settings.toggleClass, closedClass].join(' ')).on('click.toggle', _flickSwitch).on('closeMe', _close);
        $pane.addClass(['togglePane', settings.paneClass, 'hasToggle', closedClass].join(' '));
        if (bodyClass) $('body').addClass(bodyClass+closedClass);
        if (typeof(callback) === 'function') callback.call($pane);
        return this;
      },
      open: function() {
        _togglePane();
      },
      close: function() {
        _togglePane();
      },
      destroy: function() {
        $toggleSwitch.remove();
        $pane.removeClass(['hasToggle', openClass, closedClass].join(' '));
      }
    };
  };

  // TODO:
  // Expose open, close, and destroy methods on the $(this) object in a clean
  // way

})(jQuery);


