$(document).ready(function(){
	/*slider*/
	// $('.myslider').slick({
	// 	slidesToScroll: 1,
	// 	autoplay: true,
  	// 	autoplaySpeed: 2500,
	// 	arrows: false,
	// 	dots: true,
	// 	vertical: true,
	// 	verticalSwiping: true
	// });

	/*Check Validate input*/

	$('body .register .info-customer').on("change", ".email-input", function() {
	  var emailInput = $(this).val();
	  if (!validateEmail(emailInput)) {
	    $(this).parent('.form-group').children('span').css('display', 'block');
	  }
	  else {
	  	$(this).parent('.form-group').children('span').css('display', 'none');
	  }
	});

	$('body .register .info-customer').on("change", ".phone-input", function() {
	  var phoneInput = $(this).val();
	  if (!validatePhone(phoneInput)) {
	    $(this).parent('.form-group').children('span').css('display', 'block');
	  }
	  else {
	  	$(this).parent('.form-group').children('span').css('display', 'none');
	  }
	});

	$('body .register .info-customer').on("change", ".cmt-input", function() {
	  var cmtInput = $(this).val();
	  if (!validateCMND(cmtInput)) {
	    $(this).parent('.form-group').children('span').css('display', 'block');
	  }
	  else {
	  	$(this).parent('.form-group').children('span').css('display', 'none');
	  }
	});

	$('body .register .info-customer').on("click", ".clearbtn", function() {
		$(this).parent('.form-group').children('span').css('display', 'none');
	})

	function validateEmail(email) {
	  var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

	  return $.trim(email).match(pattern) ? true : false;
	}

	function validatePhone(num) {
	  var pattern = /^[0-9]{10}$/;

	  return $.trim(num).match(pattern) ? true : false;
	}

	function validateCMND(num) {
	  var pattern = /^[0-9]{12}$/;

	  return $.trim(num).match(pattern) ? true : false;
	}

	if ($(window).width() < 768) {
		$('.extra-tx').css("display", "block");
		$('.extra-tx').click(function(){
			$('.tab-content .tab-content1 .type-insurrance .row > div').css('height', 'auto');
			$(this).css('display', 'none');
			$('.short-tx').css('display', 'block');
		})
		$('.short-tx').click(function(){
			$('.tab-content .tab-content1 .type-insurrance .row > div').css('height', '214px');
			$(this).css('display', 'none');
			$('.extra-tx').css('display', 'block');
			$("html, body").animate({ scrollTop: 0 }, "slow");
		})
    }
    if ($(window).width() < 376) {
    	$('.short-tx').click(function(){
			$('.tab-content .tab-content1 .type-insurrance .row > div').css('height', '214px');
		})
    }

    if ($(window).width() < 320) {
    	$('.short-tx').click(function(){
			$('.tab-content .tab-content1 .type-insurrance .row > div').css('height', '214px');
		})
    }


	$('.buyer input[type="text"]').each(function(){
		if( !$(this).val() ) {
		    $('.register .continue').attr("onclick", "");
		}
	})

	$('.register .continue').click(function(){
		$('.form-group p').remove();
		$('.buyer input[type="text"]').each(function(){
			if( !$(this).val() ) {
			    $('<p style="color:red;">Vui lòng nhập đầy đủ thông tin</p>').insertAfter(this);
			    scrollTo(currentTab);
			}
		})

	})

	$('.buyer input[type="text"]').blur(function(){
		$('.buyer input[type="text"]').each(function(){
			if( !$(this).val() ) {
			    $('.register .continue').attr("onclick", "");
			    scrollTo(currentTab);
			}
			else if($(this).parent('.form-group').children('span').css('display') == 'block') {
				$('.register .continue').attr("onclick", "");
				$(this).next("p").remove();
			}
			else {
				$('.register .continue').attr("onclick", "nextPrev(1)");
				$(this).next("p").remove();
			}
		})
	})

	$('.add-member').click(function(){
		$('<div class="new-member"><label>Họ và tên <span class="required">*</span></label><div class="form-group"><input type="text" value="" name="" placeholder="Nhập họ và tên"><button type="reset" class="clearbtn">&times;</button></div><label>Số CMND/CCCD/Hộ chiếu <span class="required">*</span></label><div class="form-group"><input type="text" value="" name="" placeholder="Nhập CMND/CCCD/Hộ chiếu"><button type="reset" class="clearbtn">&times;</button><span style="font-size: 16px;  color:red; display: none">Vui lòng nhập đúng định dạng thông tin</span></div><img src="images/rycicle.png" alt="" class="delete-member"></div>').insertBefore(this);
	});

	$('body .register .info-customer').on('blur', 'input', function(){
		if($(this).val()) {
			$(this).parent('.form-group').children("img").css('display', 'block');
    	}
    	else {
    		$(this).parent('.form-group').children("img").css('display', 'none');
    	}
	});


	$('.clearbtn').click(function() {
        $(this).prev('input').val('').trigger('change').focus();
    });
	$('.clearbtn').click(function() {
        $(this).prev('textarea').val('').trigger('change').focus();
    });

	$('body').on('click', '.delete-member', function(){
		$(this).parent('.new-member').css('display', 'none');
	});

	var today = new Date();
	$(".datepicker").datepicker({
		  format: 'dd/mm/yyyy',
		  startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
          autoclose: true,
          todayHighlight: true,
    });
	$("#effective-date").datepicker('setDate', new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));
	$("#effective-date2").datepicker('setDate', new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));

	$('input.CurrencyInput').on('blur', function() {
	  const value = this.value.replace(/,/g, '');
	  this.value = parseFloat(value).toLocaleString('en-US', {
	    style: 'decimal',
	    maximumFractionDigits: 0,
	    minimumFractionDigits: 0
	  });
	});
	/*custom select option*/
	/*$('select').each(function(){
	    var $this = $(this), numberOfOptions = $(this).children('option').length;

	    $this.addClass('select-hidden');
	    $this.wrap('<div class="select"></div>');
	    $this.after('<div class="select-styled"></div>');

	    var $styledSelect = $this.next('div.select-styled');
	    $styledSelect.text($this.children('option').eq(0).text());

	    var $list = $('<ul />', {
	        'class': 'select-options'
	    }).insertAfter($styledSelect);

	    for (var i = 0; i < numberOfOptions; i++) {
	        $('<li />', {
	            text: $this.children('option').eq(i).text(),
	            rel: $this.children('option').eq(i).val()
	        }).appendTo($list);
	    }

	    var $listItems = $list.children('li');

	    $styledSelect.click(function(e) {
	        e.stopPropagation();
	        $('div.select-styled.active').not(this).each(function(){
	            $(this).removeClass('active').next('ul.select-options').hide();
	        });
	        $(this).toggleClass('active').next('ul.select-options').toggle();
	    });

	    $listItems.click(function(e) {
	        e.stopPropagation();
	        $styledSelect.text($(this).text()).removeClass('active');
	        $this.val($(this).attr('rel'));
	        $list.hide();
	    });

	    $(document).click(function() {
	        $styledSelect.removeClass('active');
	        $list.hide();
	    });

	});*/



	$(window).scroll(function(){
            if($(this).scrollTop() > 60){
                $('.main-menu').addClass('sticky')
            } else{
                $('.main-menu').removeClass('sticky')
            }
        });

	/*$(document).ready(function () {
		  $("#selection").on("change", function () {
		    if ($(this).val() == "option_1") $("#buttons").show();
		    else $("#buttons").hide();

		    $("div[id^='select_']").hide();
		  });

		  $("#form-id input").change(function () {
		    $("div[id^='select_']").hide();
		    $("#select_" + this.id).show();
		  });

		  $("#selection").on("change", function () {
		    if ($(this).val() == "option_2") $("#buttons2").show();
		    else $("#buttons2").hide();

		    $("div[id^='select_']").hide();
		  });

		  $("#form-id2 input").change(function () {
		    $("div[id^='select_']").hide();
		    $("#select_" + this.id).show();
		  });

		  $("#selection").on("change", function () {
		    if ($(this).val() == "option_3") $("#buttons3").show();
		    else $("#buttons3").hide();

		    $("div[id^='select_']").hide();
		  });

		  $("#form-id3 input").change(function () {
		    $("div[id^='select_']").hide();
		    $("#select_" + this.id).show();
		  });
		});*/

})

/*change tab*/
/*Index Form with Multiple Steps*/
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
// This function will display the specified tab of the form...
var groupTab = $('.tab').not('.hide');
	groupTab[n].style.display = 'block';
}

/*Next Tab Section*/
function nextPrev(n) {
	// This function will figure out which tab to display
	var groupTab = $('.tab').not('.hide');
	// Hide the current tab:
	groupTab[currentTab].style.display = 'none';
	//Hide modal after show nextTab
	/*$('#terms').modal( 'hide' );*/
	// Increase or decrease the current tab by 1:
	currentTab = currentTab + n;
	// Otherwise, display the correct tab:
	showTab(currentTab);
	scrollTo(currentTab);
}
function scrollTo(n) {
    var groupTab = $('.tab');
    groupTab[n]?.scrollIntoView(true);
  }
/*End change tab*/
