var windowFocused = false;

// document ready
$(document).ready(function() {

  'use strict';

  // animate on scroll
  new WOW( {
    // mobile: false
  }).init();

  // smooth scrolling
  $(document).on("scroll", onScroll);

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    $('a').each(function() {
      $(this).removeClass('active');
      if ($(window).width() < 768) {
        $('.nav-menu').slideUp();
      }
    });

    $(this).addClass('active');

    var target = this.hash;

    target = $(target);
    $('html, body').stop().animate({
      'scrollTop': target.offset().top - 80
    }, 500, 'swing', function() {
      window.location.hash = target[0].id;
      $(document).on("scroll", onScroll);
    });
  });

  function onScroll(event) {
    if ($('.home').length) {
      var scrollPos = $(document).scrollTop();
      $('nav ul li a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
      });
    }
  }

  // navigation toggle
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll > 200 ) {
      $("#main-nav, #main-nav-subpage").slideDown(700);
      $("#main-nav-subpage").removeClass('subpage-nav');
      // $('.back-to-top').fadeIn('slow');
    } else {
      $("#main-nav").slideUp(700);
      $("#main-nav-subpage").hide();
      $("#main-nav-subpage").addClass('subpage-nav');
      // $('.back-to-top').fadeOut('slow');
    }
  });

  // responsive menu
  $('.responsive').on('click', function(e) {
    $('.nav-menu').slideToggle();
  });

  // typedjs
  $(function() {
    $(".typed").typed({
      strings: [
        "Ryoki Kyroga.", 
      ],
      typeSpeed: 100,
      loop: false,
    });
  });

  // glitch
  $(function() {
    $(".glitch-img").mgGlitch({
      destroy: false,
      glitch: true,
      scale: false,
      blend: true,
      blendModeType: 'hue',
      glitch1TimeMin: 200, 
      glitch1TimeMax: 400,
      glitch2TimeMin: 100,
      glitch2TimeMax: 100,
      zIndexStart: 0, 
    });
  });

  // back to top
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // contact validation
  $('form.contactForm').submit(function() {
    var contactForm = $(this).find('.form-group'),
      formError = false,
      emailPattern = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

      contactForm.children('input').each(function() { // run all inputs

      var inputField = $(this); // current input
      var rule = inputField.attr('data-rule');

      if (rule !== undefined) {
        var inputError = false; // error flag for current input

        switch (rule) {
          case 'required':
            if (inputField.val() === '') {
              formError = inputError = true;
            }
            break;

          case 'email':
            if (!emailPattern.test(inputField.val())) {
              formError = inputError = true;
            }
            break;
        }
        inputField.next('.validation').html(
          (inputError ? (inputField.attr('data-msg') !== undefined ? inputField.attr('data-msg') : 'Something is wrong about this.') : '')
        ).show('blind');
      }
    });

    contactForm.children('textarea').each(function() { // run all inputs

      var inputField = $(this); // current input
      var rule = inputField.attr('data-rule');

      if (rule !== undefined) {
        var inputError = false; // error flag for current input

        switch (rule) {
          case 'required':
            if (inputField.val() === '') {
              formError = inputError = true;
            }
            break;
        }
        inputField.next('.validation').html(
          (inputError ? (inputField.attr('data-msg') != undefined ? inputField.attr('data-msg') : 'Something is wrong about this.') : '')
        ).show('blind');
      }
    });

    if (formError) return false;
    else var formData = $(this).serialize();
    var action = $(this).attr('action');
    
    if(! action) {
      action = 'script/send-mail.php';
    }

    // for static content
    var timeout = setTimeout(function() {
      $("#sendmessage").removeClass("show");
      $("#errormessage").addClass("show");
      $('#errormessage').html('Oops we have a problem sending your mail.');
    }, 500);

    var formParams = new URLSearchParams(formData);
    var mailToParams = 'subject=' + formParams.get('subject') + '&body=' + formParams.get('body');
    window.open('mailto:mece.martinece@gmail.com?' + mailToParams);
    windowFocused = false;

    $(window).blur(function() {
      var greet = Math.floor(Math.random() * (greetings.length));

      if (!windowFocused) {
        $("#sendmessage").addClass("show");
        $("#sendmessage").html(greetings[greet] + ' ' + 'Thank you for sending an email!');
        $("#errormessage").removeClass("show");
        $('.contactForm').find("input, textarea").val("");
        $('#mail-button').val("Send Message");
        clearTimeout(timeout);
      }
    });

    $(window).focus(function() {
      windowFocused = true;
    });

    return false;
  });
});