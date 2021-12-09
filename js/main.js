function trim(str) {
	var newstr = str.replace(/^\s*(.+?)\s*$/, "$1");
	if (newstr == " ") {
		return "";
	}
	return newstr;
}
function drop_spaces(str) {
	var newstr = trim(str);
	return newstr.replace(/(\s)+/g, "");
}
function is_email(email) {
	var template = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
	email = drop_spaces(email);
	if (template.test(email)) {
		return true;
	}
	return false;
}

//counter
function end_date(d) {
	var nd = new Date();
	var ed = new Date(d);
	if(nd > ed) {
		var ms = ed.getTime() + 4*86400*1000;
		ed = end_date(ms);
	}
	return ed;
}
function get_timer() {
	var date_t = new Date(date_new);	
	var date = new Date();	
	var timer = date_t - date;	
	if(date_t > date) {	
		var day = parseInt(timer/(60*60*1000*24)); if(day < 10) {day = '0' + day;} day = day.toString();
		var hour = parseInt(timer/(60*60*1000))%24; if(hour < 10) {hour = '0' + hour;} hour = hour.toString();
		var min = parseInt(timer/(1000*60))%60; if(min < 10) {min = '0' + min;} min = min.toString();
		var sec = parseInt(timer/1000)%60; if(sec < 10) { sec = '0' + sec; } sec = sec.toString();

		timerUpdate(day, hour, min, sec);
		setTimeout(get_timer, 1000);
	}
}
function timerUpdate(d, h, m, s) {
	$('.counter-block .day').text(d[0]);
	$('.counter-block .day2').text(d[1]);
	$('.counter-block .hour').text(h[0]);
	$('.counter-block .hour2').text(h[1]);
	$('.counter-block .min').text(m[0]);
	$('.counter-block .min2').text(m[1]);
	$('.counter-block .sec').text(s[0]);
	$('.counter-block .sec2').text(s[1]);
}

$(document).ready(function() {
	//counter
	date_new = end_date('2014, 8, 4');
	get_timer();
	//size
	$('.size span').click(function(e) {
		e.preventDefault();
		var f = $(this).parent();
		$('span', f).removeClass('active');
		$(this).addClass('active');
	});
	//call
	$('.fancy').fancybox();
	$('.btn-order').click(function(e) {
		e.preventDefault();
		$.fancybox('#order');
	});

	//call
	$('.sform').submit(function(e) {
		e.preventDefault();
		var f = $(this);
		$('input[type=text]', f).removeClass('ierror');

		var name = $('input[name=name]', f).val();
		var phone = $('input[name=phone]', f).val();
		var subject = $('input[name=subject]', f).val();

		var error = false;
		if(name == '') {
			$('input[name=name]', f).addClass('ierror');
			error = true;
		}
		if(phone == '') {
			$('input[name=phone]', f).addClass('ierror');
			error = true;
		}
		if($(this).hasClass('forder')) {
			var s = $('.size span.active', f).text();
			subject += '. Размер - ' + s;
		}
		if(error) {
			return false;
		}
			
		var query = 'act=sender';
			query += '&name=' + encodeURIComponent(name);
			query += '&phone=' + encodeURIComponent(phone);
			query += '&subject=' + encodeURIComponent(subject);

		$.ajax({
			type: "POST",
			data: query,
			url: "./sender.php",
			dataType: "json",
			success: function(data) {
				if(data.result == 'ok') {
					$('input[type=text]', f).val('');
					//echo
					$.fancybox('#success');
					location.href = '#form-send';
				} else {
					alert('Ошибка! Повторите позже.');
				}
			}
		});
		return false;
	});

	//mask
	$('input[name=phone]').maskinp('+7 (999) 999-99-99');
});