itemLoad();

function itemLoad() {

	$(".list").on("click", function(){
		var id = $(this).attr("data-id");

		if (id == 1){

			drawTable();

		} else if (id == 2) {

			drawList();

		} else if (id == 3) {

			drawText();

		};
	});

//button view more - page second
	$("body").on("click", ".btn_view_more", function(){

		$.ajax({
				url: "js/json_list_more",
				method: "GET",
				dataType: "json"
			}).done(function(response){
				var max_length = response.payload.list.length,
					item = response.payload.list,
					html = "";
				$(".section_one .view_more").html('<ul></ul>');

				for(var i = 0; i < max_length; i++) {
					html += "<li>"+item[i].text+"</li>";
				}
				$(".section_one .view_more ul").html(html);
				$(".section_one .view_more").append('<div class="btn list btn_view_less">VIEW LESS</div>');

			}).fail(function(err_response){
				console.log("error");
		});
	});

//button view less - page second
	$("body").on("click", ".btn_view_less", function(){
		$(".section_one .adds").html("");
		$(".section_one .adds").append('<div class="view_more"><div class="btn list btn_view_more">VIEW MORE</div></div>');
	});

};

function sortNames(data_sort) {

	$("body").on("click", ".btn_sort", function(){

		var max_length = data_sort.length,
			item = data_sort;
			html = "";

			$(".section_one").html("<table>"+
										"<thead>"+
											"<tr>"+
												"<th></th>"+
			    								"<th>LAST NAME</th>"+
												"<th>FIRST NAME</th>"+
												"<th>AGE</th>"+
												"<th>COMPANY</th>"+
												"<th>PHONE NUMBER</th>"+
											"</tr>"+
										"</thead>"+
										"<tbody>"+"</tbody>"+
									"</table>");

			for (var i = 0; i < max_length; i++){
				var num = i + 1;

				item.sort(function(a, b) {
						var surname_a = a.surname,
						surname_b = b.surname;

						if (surname_a < surname_b) {
							 return -1;
						}
						if (surname_a > surname_b) {
							 return 1;
					}
						return 0;
					});

				html += "<tr>"+
							"<td>"+num+".</td>"+
							"<td>"+item[i].surname+"</td>"+
							"<td>"+item[i].name+"</td>"+
    						"<td>"+item[i].age+"</td>"+
    						"<td>"+item[i].company+"</td>"+
    						"<td>"+item[i].phone+"</td>"+
						"</tr>"
			};

			$(".section_one table tbody").html(html);
	});
};

function drawTable() {
	$.ajax({
		url: "js/json_table.json",
		method: "GET"
	}).done(function(response){

		var max_length = response.payload.table.length,
			item = response.payload.table;
			html = "";

			sortNames(item)

		$(".section_one").html("<table>"+
									"<thead>"+
										"<tr>"+
											"<th></th>"+
		    								"<th>LAST NAME</th>"+
		    								"<th>FIRST NAME</th>"+
		    								"<th>AGE</th>"+
		    								"<th>COMPANY</th>"+
		    								"<th>PHONE NUMBER</th>"+
		  								"</tr>"+
		  							"</thead>"+
		  							"<tbody>"+"</tbody>"+
		  						"</table>");

			for (var i = 0; i < max_length; i++){
				var num = i + 1;
				html += "<tr>"+
  							"<td>"+num+".</td>"+
    						"<td>"+item[i].surname+"</td>"+
    						"<td>"+item[i].name+"</td>"+
	    					"<td>"+item[i].age+"</td>"+
	    					"<td>"+item[i].company+"</td>"+
	    					"<td>"+item[i].phone+"</td>"+
						"</tr>"
			};

		$(".section_one table tbody").html(html);
		$(".section_one").append('<div"><p>Click the button below to sort alphabetically by last names.</p></div><div class="btn list btn_sort">SORT</div>');

	}).fail(function(err_response){
		console.log("error");
	});
};

function drawList(){
	$.ajax({
		url: "js/json_list",
		method: "GET",
		dataType: "json"
	}).done(function(response){
		var max_length = response.payload.list.length,
			item = response.payload.list,
			html = "";

		$(".section_one").html("<ul></ul>")

		for (var i = 0; i < max_length; i++) {
			html += "<li>" + item[i].text + "</li>";
		}

		$(".section_one ul").html(html);
		$(".section_one").append('<div class="adds"><div class="view_more"><div class="btn list btn_view_more">VIEW MORE</div></div></div>');

	}).fail(function(err_response){
		console.log("error");
	});
};

function drawText() {
	$.ajax({
		url: "js/json_page.json",
		method: "GET",
		dataType: "json"
	}).done(function(response){

		var max_length = response.payload.data.images.length,
			item = response.payload.data.images;
			html = "";

		$(".section_one").html('<p class="text one"></p><div class="photos"></div><p class="text two"></p>');

			for (var i = 0; i < max_length; i++){
				html += '<img src="'+ item[i].src +'"/>'			
			};
		$(".section_one .text.one").html(response.payload.data.text_1);
		$(".section_one .photos").html(html);
		$(".section_one .text.two").html(response.payload.data.text_2);

	}).fail(function(err_response){
		console.log("error");
	});
};