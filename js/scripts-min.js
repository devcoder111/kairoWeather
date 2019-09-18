// Metrics Switcher function
function switcher() {
	$('.switcher').on('click', 'button', function(){
		if ($(this).hasClass('active')) {
			return false;
		}
		else {
			$(this).parent().find('button').removeClass('active');
			$(this).addClass('active');
		}
	});
}

if (!Modernizr.svg) {
	$('.svg_img').each(function(){
		$(this).attr('src', ($(this).attr('data-alt-src')));
	});
}


// Typehead Search function
function typeheadSearch() {
	var query = new Bloodhound({
		datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.title); },
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		limit: 5,
		remote: 'data/example_collection.json?q=%QUERY'
	});

	query.initialize();

	$('.typehead_search').typeahead(null, {
		name: 'search',
		displayKey: 'name',
		source: query.ttAdapter(),
		templates: {
			suggestion:Handlebars.compile(
				'<a href="{{url}}">' +
				'<strong>{{title}}</strong><br />' +
				'{{type}}' +
				'</a>'
				)
		}
	});
}


//Temporary functions just for demonstration
//7-12 days forecast switcher
$('.forecasts_holder').on('click', '.btn_switcher', function(e){
	var elem = $(this);
	elemRelTitle = elem.attr('data-rel-title');
	elemRelBlock = elem.attr('data-rel-block');
	elem.closest('.forecasts_holder').find('.tab_holder').slideUp(0, function(){
		elem.closest('.forecasts_holder').find('.title span').text(elemRelTitle);
		elem.closest('.forecasts_holder').find(elemRelBlock).slideDown(0);
	});
});

//7-12 days meteograms switcher
$('.meteograms_holder').on('click', '.btn_switcher', function(e){
	var elem = $(this);
	elemRelTitle = elem.attr('data-rel-title');
	elemRelBlock = elem.attr('data-rel-block');
	elem.closest('.meteograms_switchers_holder').find('.meteograms_mobile_toggle').each(function(){
		$(this).toggleClass('current');
	});
	elem.closest('.meteograms_holder').find('.tab_holder').slideUp(0, function(){
		elem.closest('.meteograms_holder').find('.title span').text(elemRelTitle);
		elem.closest('.meteograms_holder').find(elemRelBlock).slideDown(0);
	});
});

$('.meteograms_switchers_dropdown a').click(function(){
	$(this).closest('.meteograms_switchers_dropdown').removeClass('in');
});

//Setting Correct Bg to the Ski page
function settingBgSkiPage() {
	if ($(window).width() > 1199) {
		$('body.body_page_sky').removeClass('ski_page_bg_mobile ski_page_bg_tablet').addClass('ski_page_bg_desktop');
	}
	if ($(window).width() > 767 && $(window).width() < 1200) {
		$('body.body_page_sky').removeClass('ski_page_bg_mobile ski_page_bg_desktop').addClass('ski_page_bg_tablet');
	}
	if ($(window).width() < 768) {
		$('body.body_page_sky').removeClass('ski_page_bg_tablet ski_page_bg_desktop').addClass('ski_page_bg_mobile');
	}
}


$(document).ready(function(){

	settingBgSkiPage();

	typeheadSearch();

	switcher();

	//Top Menu Dropdowns
	$('.top_menu_list > li.submenu_holder > a').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('clicked');
		$('.top_menu_list > li.submenu_holder > a.clicked').not(this).toggleClass('clicked');
	});

	$(function() {
		var select = $( "#minbeds" );
		var slider = $( "<div id='slider'></div>" ).insertAfter( select ).slider({
			min: 1,
			max: 6,
			range: "min",
			value: select[ 0 ].selectedIndex + 1,
			slide: function( event, ui ) {
				select[ 0 ].selectedIndex = ui.value - 1;
			}
		});
		$( "#minbeds" ).change(function() {
			slider.slider( "value", this.selectedIndex + 1 );
		});
	});

	if ($(window).width() < 768) {
		$('.prefooter_tabs_navigation li > a').click(function(){
			$(this).closest('.prefooter_tabs_holder').find('.prefooter_menu_toggle').click();
		})
	}

	//Test Script for Hourly Table Demo
	$('.table_hourly_weather .trigger > a').on('click', function(elem){
		elem.preventDefault();
		var hourlyTable = $('.table_hourly_weather');
		hourlyTable.find('[data-rel^="rel_link_"]').removeClass('show');
		$('[data-rel^="' + $(this).attr('data-to') + '"]').addClass('show');
	});
});


$(window).load(function(){
	
});


$(window).resize(function(){
	settingBgSkiPage();
});




