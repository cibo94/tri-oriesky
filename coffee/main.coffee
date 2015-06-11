# @author Miroslav Cibulka
# @brief main script for loading content

(($) ->
	# Gets page tag value from html url
	# @return page value as string
	get_url = ->
		query = {}
		$.each document.location.search.substr(1).split('&'), (c, q) ->
			i = q.split('=')
			query[i[0].toString()] = i[1].toString()
		query['page']


	# Retrieve page and put it into container
	get_page = (page) ->
		$.get "content/#{page}", (data) ->
			put_page(data)

	# puts page to the container
	put_page = (data) ->
		$("#container")
			.fadeOut(0)
			.html(data)
			.fadeIn(500)
		init()

	# Load
	$(document)
		.ready () ->
			get_page(get_url())

	# initialize page
	init =->
		init_buttons()

	# init buttons
	init_buttons =->
		$(".icon")
			.mouseenter (event) ->
				$(this).addClass () ->
					"hovered"

			.mouseleave (event) ->
				$(this).removeClass () ->
					"hovered"

			.click (event) ->
				target = $(this).parent().attr("href")
				$("#container").fadeOut 500, () ->
					$(location).attr('href', target);
				false
)(jQuery)
