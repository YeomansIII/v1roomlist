
function getTable(building) {
    $.ajax({
        url : 'php/queries.php',
            data : {
                action : 'getTable',
                building : building
            },
            type : 'post',
            success: function (output) {
                $('#homepage').hide();
                $('#bugform').hide();
                $('#faqpage').hide();
                $('#featureform').hide();
                $('#table').html(output);
                $('#table').show();
                $('#table').customScrollbar();
            }
    });
}


$(document).ready(function () {
    	var addToCount = 0;

    $('.menu-item div').click(function () {
        var i = $(this).parent().prevAll().length;
        console.log(i+"menu index");
        if(!($('#class'+i).hasClass('expandnav'))) {
            $('#class'+i).addClass('expandnav');
            $('#class'+i+' ul li').each(function (index) {
                console.log(index+" li");
                $(this).delay((index+1)*50).queue(function(next){
                    $(this).addClass("slideinleft");
                    next();
                });;
            });
        }
        else {
            $('#class'+i).removeClass('expandnav');
            $('#class'+i+' ul li').removeClass('slideinleft');
        }
    });

    $('#homebtn').click(function () {
        $('#featureform').hide();
        $('#bugform').hide();
        $('#table').hide();
        $('#faqpage').hide();
        $('#homepage').show();
    });

    $('#faqbtn').click(function () {
        $('#featureform').hide();
        $('#bugform').hide();
        $('#table').hide();
        $('#homepage').hide();
        $('#faqpage').show();
        $('#faqpage').customScrollbar();
    });

    $('.menu-item ul li').click(function () {
        console.log($(this).html());
       switch ($(this).html()) {
           case "The Complex": getTable("The_Complex");break;
           case "Brunswick": getTable("Brunswick");break;
           case "Carroll": getTable("Carroll");break;
           case "Dickenson": getTable("Dickenson");break;
           case "Essex": getTable("Essex");break;
           case "Franklin": getTable("Franklin");break;
           case "Grayson": getTable("Grayson");break;
           case "Adams": getTable("Adams");break;
           case "Harrison": getTable("Harrison");break;
           case "Jackson": getTable("Jackson");break;
           case "Jefferson": getTable("Jefferson");break;
           case "Kennedy": getTable("Kennedy");break;
           case "Lincoln": getTable("Lincoln");break;
           case "Madison": getTable("Madison");break;
           case "Monroe": getTable("Monroe");break;
           case "Roosevelt": getTable("Roosevelt");break;
           case "Truman": getTable("Truman");break;
           case "Washington": getTable("Washington");break;
           case "Wilson": getTable("Wilson");break;
           case "Commonwealth": getTable("Commonwealth");break;
           case "Dominion": getTable("Dominion");break;

           case "Submit a Bug": $('#homepage').hide();$('#table').hide();$('#featureform').hide();$('#bugform').show();break;
           case "Request a Feature": $('#homepage').hide();$('#table').hide();$('#bugform').hide();$('#featureform').show();break;
       }
    });


    $("#add2Room").click(function () {
        $('#addtip').hide();
        console.log(addToCount);
		if (addToCount < 1) {

			var newTextBoxDiv = $(document.createElement('div')).attr("id", 'AddToRoomDiv');
			newTextBoxDiv.after().html('<form action="<?php echo $_SERVER[\'PHP_SELF\']; ?>" method="post"> <input type="text" name="nameTextbox" id="nameTextbox" placeholder="Name" style="width:30%" size="25" maxlength="40"> <select name="bedTextbox" id="bedTextbox" placeholder="Bed Letter" style="width:12%"><option>Bed</option><option>A</option><option>B</option><option>C</option><option>D</option></select> <select name="buildingTextbox" id="buildingTextbox" style="width:20%"><option>Building</option><option>Amherst</option><option>Brunswick</option><option>Carroll</option><option>Dickenson</option><option>Essex</option><option>Franklin</option><option>Grayson</option><option>Adams</option><option>Harrison</option><option>Jackson</option><option>Jefferson</option><option>Kennedy</option><option>Lincoln</option><option>Madison</option><option>Monroe</option><option>Roosevelt</option><option>Truman</option><option>Washington</option><option>Wilson</option><option>Dominion</option><option>Commonwealth</option></select> <select name="roomTextbox" id="roomTextbox" disabled="disabled" style="width:16%"><option>Room#</options></select></form>');
			newTextBoxDiv.appendTo("#head");
            $('#buildingTextbox').change(function () {
                    building = $("select[id$=buildingTextbox]").val();
					$.ajax({
						url : 'php/queries.php',
						data : {
							action : 'getRoomNumbers',
							building : building
						},
						type : 'post',
						success : function (output) {
						    console.log(output);
							var rooms = $.parseJSON(output);
							console.log(rooms);
							$('#roomTextbox').html("");
							for (var i in rooms) {
							        console.log(rooms[i]);
                                    $('#roomTextbox').append("<option>"+rooms[i]+"</option>");
							}
							$('#roomTextbox').removeAttr("disabled");
						}
					});

            });
			$("#add2Room").css({
				"background" : "url('images/check-alt.png') center top no-repeat"
			});
			$("#add2Room").addClass("wiggleanim");
			addToCount++;
		} else {
            console.log("Else");
			var name = $("input[id$=nameTextbox]").val(),
			bed = $("select[id$=bedTextbox]").val(),
			building = $("select[id$=buildingTextbox]").val(),
			room = $("select[id$=roomTextbox]").val();


			$("#AddToRoomDiv").remove();
			addToCount--;
			$("#add2Room").css({
				"background" : ""
			});
			$("#add2Room").removeClass("wiggleanim");
			if ((name.length > 0) && (bed != "Bed") && (building != "Building") && (!isNaN(room)) && (name.toLowerCase().indexOf("penis")<0) && (name.toLowerCase().indexOf("ass")<0) && (name.toLowerCase().indexOf("yeomans")<0) && (name.toLowerCase().indexOf("fuck")<0) && (name.toLowerCase().indexOf("bitch")<0) && (name.toLowerCase().indexOf("fag")<0) && (name.toLowerCase().indexOf("faggot")<0) && (name.toLowerCase().indexOf("asshole")<0) && (name.toLowerCase().indexOf("nigga")<0) && (name.toLowerCase().indexOf("nigger")<0)) {
			//if(name.length > 0) {
                console.log("Ajaxing");
				$.ajax({
					url : 'php/queries.php',
					data : {
						action : 'addToRoom',
						name : name,
						bed : bed,
						building : building,
						room : room
					},
					type : 'post',
					success: function (output) {
                        getTable(building);
					}
				});
			}
		}
	});
});
