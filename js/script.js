$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 700,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow/prev.svg" alt="prev"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow/next.svg" alt="next"></button>',
        responsive: [
            {
                breakpoint: 992, // от 0 до 1024px
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            }
        ]
      });

      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab__active)', function() {
        $(this)
          .addClass('catalog__tab__active').siblings().removeClass('catalog__tab__active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
 
      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
          });
      };
      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      // Modal
      $('[data-modal="consultation"]').on('click', function() {
            $('.overlay, #consultation').fadeIn('fast');
      });
      $('.modal__close').on('click', function() {
            $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
      });

      $('.button_mini').each(function(i) {
            $(this).on('click', function() {
                $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
                $('.overlay, #order').fadeIn('fast');
            });
      });
      // validate
      function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: 'required',
                email: {
                    required: true,
                    email: true,
                }
            },
            messages: {
                name: {
                    required: "<strong>Пожалуйста, введите свое имя.</strong>",
                    minlength: jQuery.validator.format("Введите {0} символа."),
                },
                phone: "<strong>Пожалуйста, введите свой номер.</strong>",
                email: {
                  required: "<strong>Пожалуйста, введите свою почту.</strong>",
                  email: "<strong>Неправильно введен адрес почты.</strong>"
                }
              }
          });
      };
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");
      
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize(),
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset')
        });
        return false;
    });

    // Smoth scroll and pageUp

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        };
    });

    $("a[href=#up]").on("click", function () {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top});
        return false;
    });

    new WOW().init();

});

