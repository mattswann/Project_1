var images_selection = ['fern', 'wellington', 'fishhook', 'sheep', 'allblacks', 'paua', 'tiki', 'kiwi']
var images_Count = {
  fern: 0, 
  wellington: 0,
  fishhook: 0, 
  sheep: 0, 
  allblacks: 0, 
  paua: 0, 
  tiki: 0, 
  kiwi: 0
}

var tiles = {
     R1_box_1: '' ,
     R1_box_2: '' ,
     R1_box_3: '' ,
     R1_box_4: '' ,
     R2_box_1: '' , 
     R2_box_2: '' , 
     R2_box_3: '' , 
     R2_box_4: '' ,
     R3_box_1: '' , 
     R3_box_2: '' , 
     R3_box_3: '' , 
     R3_box_4: '' ,
     R4_box_1: '' , 
     R4_box_2: '' , 
     R4_box_3: '' , 
     R4_box_4: '' 
}

var tiles_Turned_Over = 0;

$("#title_row_1, #title_row_2, #title_row_3, #title_row_4").on('click', 'div', function() {
    select_Image()
});

var turn_Over = function(image_chosen) {
  $(event.target).addClass('transformClass');

  var e = event;
  setTimeout(function() {
    $(e.target).addClass(image_chosen); 
    tiles_Turned_Over = tiles_Turned_Over + 1;
  }, 500);

  setTimeout(function() {
    $(e.target).removeClass(image_chosen); 
    $(e.target).removeClass('transformClass'); 
  }, 5000);
}

var select_Image = function() {
    var tileID = event.target.id;

    // Has previously been turned over - Not assigned yet
    if ($(event.target).hasClass('assigned') ) {  
      var image_chosen = tiles[tileID]
      // console.log(image_chosen)
      turn_Over(image_chosen)
    
    // Not previously been turned over - Not assigned yet
    } else {
        var image_chosen = random_Selection()
        var currentCount = images_Count[image_chosen]
          
          //Image already used twice, reselect
          if (currentCount >=2 ){
              select_Image()
          //Assign image
          } else {
              $(event.target).addClass('assigned');
              images_Count[image_chosen] = currentCount +1;
              tiles[tileID] = image_chosen;
              turn_Over(image_chosen)
          }
    }
}

var random_Selection = function() {
    var image_number = Math.floor(Math.random()*images_selection.length);
    var image_chosen = images_selection[image_number];
    return image_chosen
}



  // $('.row_1, .row_2, .row_3, .row_4').addClass('fern');


// var inputs = document.getElementById("R1_box_1");
// inputs.addEventListener('click', function() {

//   var inputs = document.getElementById("R1_box_1");
//   inputs.className = inputs.className + " fern"
//   return console.log('x')
// // d.className = d.className + " otherclass";
// });


// //Equavilent to addEventListener
// $("#R1_box_1").on('click', function() {

//   console.log('s')

//   // var inputs = document.getElementById("R1_box_1");
//   // inputs.id = "fern"
//   $("R1_box_1").addClass('fern');
//   // $("R1_box_1").attr('id',"fern")

// });

// submitButton.addEventListener('click', dothis)

// var tiles = [
//   ['blanc','blanc','blanc','blanc'],
//   ['blanc','blanc','blanc','blanc'],
//   ['blanc','blanc','blanc','blanc'],
//   ['blanc','blanc','blanc','blanc']
// ]

// var assign_tiles = function() {
//   _.each(tiles, function(row,tile_row,c) { 
      
//       _.each(row, function(row,tile_column,e) { 

//           console.log(tile_row,tile_column)
//       })
//   })
// }
