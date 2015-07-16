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
var first_tile;
var second_tile;
var first_image_chosen; 
var second_image_chosen;
var score = 0
$("#title_row_1, #title_row_2, #title_row_3, #title_row_4").on('click', 'div', function() {
    select_Image()
});

var turn_Over = function(image_chosen) {

  score = score + 1
  var str_Score = document.getElementById("Turns")
  str_Score.innerHTML = 'Turn_test'

  // console.log(str_Score)
  // console.log(score)
 

  //Assign images
  if (first_tile == undefined) {
    first_tile = event.target;
    first_image_chosen = image_chosen;
  } else if (second_tile == undefined) {
    second_tile = event.target;
    second_image_chosen = image_chosen;
  }

  var e = event;
  
  if (tiles_Turned_Over < 2) {

      //Count number of tiles turned over
      tiles_Turned_Over = tiles_Turned_Over + 1;

      setTimeout(function() {
        //Can only turn over more if there is no more than 2
        $(e.target).addClass('transformClass');
        $(e.target).addClass(image_chosen); 
      }, 500);
  }

  //Turn back in 5 seconds when you have turn over 2 tiles
  if (tiles_Turned_Over > 1) {

      // ccheck if you have a pair 
      if (first_image_chosen !== second_image_chosen) {
        setTimeout(function() {
            //Turn back over tiles 
            $(first_tile).removeClass(first_image_chosen);
            $(first_tile).removeClass('transformClass'); 
            $(second_tile).removeClass(second_image_chosen); 
            $(second_tile).removeClass('transformClass');
            //reset variables
            first_tile = undefined
            first_image_chosen = undefined
            second_tile = undefined
            second_image_chosen = undefined
            //Reset number of tiles turned over
            tiles_Turned_Over = 0;
        }, 3000);
      } else {
            $(first_tile).addClass('paired');
            $(first_tile).addClass('paired');
             //reset variables
            first_tile = undefined
            first_image_chosen = undefined
            second_tile = undefined
            second_image_chosen = undefined
            //Reset number of tiles turned over
            tiles_Turned_Over = 0;       
      }
      
  }
}

var select_Image = function() {
    var tileID = event.target.id;

    //Stop if clicking on a pair
    if ($(event.target).hasClass('paired') ) { 
      return console.log('stopped')
    }
    //Stop if continued clicking 
    if (tiles_Turned_Over >=2) { 
      return console.log('stopped')
    }
    //Stop if continued clicking  on first tile
    if ((first_tile == event.target) || (second_tile == event.target)) {
      return console.log('stopped')
    }

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
