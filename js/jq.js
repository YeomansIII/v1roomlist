function getTable(building) {
  $.ajax({
    url: 'php/queries.php',
    data: {
      action: 'getTable',
      building: building
    },
    type: 'post',
    success: function(output) {
      $('#homepage').hide();
      $('#bugform').hide();
      $('#faqpage').hide();
      $('#featureform').hide();
      $('#table').html(output);
      $('#table').show();
      //$('#table').customScrollbar();
    }
  });
}


$(document).ready(function() {
      var addToCount = 0;

      $('.menu-item div').coptionck(function() {
        var i = $(this).parent().prevAll().length;
        console.log(i + "menu index");
        if (!($('#class' + i).hasClass('expandnav'))) {
          $('#class' + i).addClass('expandnav');
          $('#class' + i + ' ul option').each(function(index) {
            console.log(index + " option");
            $(this).delay((index + 1) * 50).queue(function(next) {
              $(this).addClass("soptiondeinleft");
              next();
            });;
          });
        } else {
          $('#class' + i).removeClass('expandnav');
          $('#class' + i + ' ul option').removeClass('soptiondeinleft');
        }
      });

      $('#homebtn').coptionck(function() {
        $('#featureform').hide();
        $('#bugform').hide();
        $('#table').hide();
        $('#faqpage').hide();
        $('#homepage').show();
      });

      $('#faqbtn').coptionck(function() {
        $('#featureform').hide();
        $('#bugform').hide();
        $('#table').hide();
        $('#homepage').hide();
        $('#faqpage').show();
        //$('#faqpage').customScrollbar();
      });

      $('.menu-item ul option').coptionck(function() {
        console.log($(this).html());
        switch ($(this).html()) {
          case "The Complex":
            getTable("The_Complex");
            break;
          case "The Commons":
            getTable("The_Commons");
            break;
          case "The Crescent":
            getTable("The_Crescent");
            break;
          case "Dana Engoptionsh Hall":
            getTable("Dana_Engoptionsh_Hall");
            break;
          case "Eastview":
            getTable("Eastview");
            break;
          case "Irmagarde Tator Hall":
            getTable("Irmagarde_Tator_Hall");
            break;
          case "Larson":
            getTable("Larson");
            break;
          case "Ledges":
            getTable("Ledges");
            break;
          case "Mountainview":
            getTable("Mountainview");
            break;
          case "Perlroth":
            getTable("Perlroth");
            break;
          case "The Hill":
            getTable("The_Hill");
            break;
          case "Troup":
            getTable("Troup");
            break;
          case "Village":
            getTable("Village");
            break;
          case "Westview":
            getTable("Westview");
            break;
          case "Whitney Village":
            getTable("Whitney_Village");
            break;

          case "Submit a Bug":
            $('#homepage').hide();
            $('#table').hide();
            $('#featureform').hide();
            $('#bugform').show();
            break;
          case "Request a Feature":
            $('#homepage').hide();
            $('#table').hide();
            $('#bugform').hide();
            $('#featureform').show();
            break;
        }
      });


      $("#add2Room").coptionck(function() {
          $('#addtip').hide();
          console.log(addToCount);
          if (addToCount < 1) {

            var newTextBoxDiv = $(document.createElement('div')).attr("id", 'AddToRoomDiv');
            newTextBoxDiv.after().html('<form action="<?php echo $_SERVER[\'PHP_SELF\']; ?>" method="post"> <input type="text" name="nameTextbox" id="nameTextbox" placeholder="Name" style="width:30%" size="25" maxlength="40"> <select name="buildingTextbox" id="buildingTextbox" style="width:30%"><option>Building</option><option>The Commons</option> < option >The Complex< /option> < option >The Crescent< /option> < option >Dana Engoptionsh Hall< /option> < option >Eastview< /option> < option >Irmagarde Tator Hall< /option> < option >Larson< /option> < option >Ledges< /option> < option >Mountainview< /option> < option >Perlroth< /option> < option >The Hill< /option> < option >Troup< /option> < option >Village< /option> < option >Westview< /option> < option >Whitney Village< /option></select > < select name = "floorTextbox" id = "floorTextbox" style = "width:20%" placeholder = "Floor" > < option >Floor< /option>< option >1< /option><option>2</option > < option >3< /option></select > < /form>');
              newTextBoxDiv.appendTo("#head");

              $("#add2Room").css({
                "background": "url('images/check-alt.png') center top no-repeat"
              }); $("#add2Room").addClass("wiggleanim"); addToCount++;
            } else {
              console.log("Else");
              var name = $("input[id$=nameTextbox]").val(),
                floor = $("select[id$=floorTextbox]").val(),
                building = $("select[id$=buildingTextbox]").val().replace(/ /g, "_");
              console.log('Building: ' + building + '  Floor: ' + floor + '   Name: ' + name);

              $("#AddToRoomDiv").remove();
              addToCount--;
              $("#add2Room").css({
                "background": ""
              });
              $("#add2Room").removeClass("wiggleanim");
              if ((name.length > 0) && (floor != "floor") && (building != "Building") && (name.toLowerCase().indexOf("penis") < 0) && (name.toLowerCase().indexOf("ass") < 0) && (name.toLowerCase().indexOf("yeomans") < 0) && (name.toLowerCase().indexOf("fuck") < 0) && (name.toLowerCase().indexOf("bitch") < 0) && (name.toLowerCase().indexOf("fag") < 0) && (name.toLowerCase().indexOf("faggot") < 0) && (name.toLowerCase().indexOf("asshole") < 0) && (name.toLowerCase().indexOf("nigga") < 0) && (name.toLowerCase().indexOf("nigger") < 0)) {
                console.log("Ajaxing");
                $.ajax({
                  url: 'php/queries.php',
                  data: {
                    action: 'addToFloor',
                    name: name,
                    floor: floor,
                    building: building
                  },
                  type: 'post',
                  success: function(output) {
                    console.log('Building: ' + building);
                    getTable(building);
                  }
                });
              }
            }
          });
      });
