# @author Miroslav Cibulka
# @brief main script for loading content

Gallery =->
	this.Init =(base)->
		this.readDirectory base

	this.readDirectory =(base)->
		$.get "/php/request_gal.php?dir=#{base ? ""}", (data)->
			$("#gal_output").html(data + '<script src="js/slimbox2.js" type="text/javascript"></script><script>InitGallery();</script>')
		.fail () ->
			$("#gal_output").html "<h1>Uuups Something went wrong!</h1>"

	this

(($, Gallery) ->
	# Gets page tag value from html url
	# @return page value as string
	get_url =->
		if document.location.search.substr(1)
			query = {}
			$.each document.location.search.substr(1).split('&'), (c, q) ->
				i = q.split('=')
				query[i[0].toString()] = i[1].toString()
			query

	# Retrieve page and put it into container
	get_page = (page) ->
		$.get "content/#{page}", (data) ->
			put_page(data)
		.fail () ->
			get_page("404.html")

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
			((url) ->
				get_page(if url?['page']? then url['page'] else "index.html")
				if url['page'] == "galeria.html"
					(new Gallery).Init url['gal_dir']
			)(get_url())

	$(window)
		.resize () ->
			init_border()

	# initialize page
	init =->
		init_buttons()
		init_banner()
		init_border()

	init_border =->
		$("body")
			.width ->
				"#{$(window).width()-25}px"
			.height ->
				"#{$(window).height()-25}px"

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
				redirect($(this).parent().attr("href"))
				false

	init_banner =->
		$("#banner")
			.click (event) ->
				redirect('?page=index.html')

	redirect = (target)->
		$("#container").fadeOut 500, () ->
			$(location).attr('href', target)
)(jQuery, Gallery)
