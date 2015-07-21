// comments in description cheers MS
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

var str_Score_player_one = document.getElementById("player_one");
var str_Score_player_two = document.getElementById("player_two");
var str_StartAnnounce = document.getElementById('start_announce');
var str_EndAnnounce = document.getElementById('end_announce');
var str_GameOver = document.getElementById('GameOver');
var str_EndOFGame = document.getElementById('EndScore');

var score = 0;
var player1Score = 0;
var player2Score = 0;

var num_Players = document.getElementById("player_num").value;
var str_Score = document.getElementById("turns");
var current_player = 1;

var str_best_score = document.getElementById('best_score');

if (localStorage['Best_Score'] === undefined) {  
  localStorage.setItem('Best_Score', 100);
}
str_best_score.innerHTML = 'Best Score: ' + localStorage.getItem('Best_Score') 

$("#title_row_1, #title_row_2, #title_row_3, #title_row_4").on('click', 'div', function() {
    select_Image()
});

$("#title_row_1, #title_row_2, #title_row_3, #title_row_4").on('click', 'div', function() {
    select_Image()
});


var turn_Over = function(image_chosen) {

  //Assign images
  if (first_tile == undefined) {
    first_tile = event.target;
    first_image_chosen = image_chosen;
  } else if (second_tile == undefined) {
    second_tile = event.target;
    second_image_chosen = image_chosen;
    //Record score
    score = score + 1
    str_Score.innerHTML = 'Turns taken: ' + score
  }

  var e = event;
  
  if (tiles_Turned_Over < 2) {

      //Count number of tiles turned over
      tiles_Turned_Over = tiles_Turned_Over + 1;
      $(e.target).addClass('transformClass');
      setTimeout(function() {
        //Can only turn over more if there is no more than 2
      
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
            $(second_tile).addClass('paired');
             //reset variables
            first_tile = undefined
            first_image_chosen = undefined
            second_tile = undefined
            second_image_chosen = undefined
            //Reset number of tiles turned over
            tiles_Turned_Over = 0;       
      }
      
  }
  checkIf_game_over()
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
          console.log('blah');
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

var checkIf_game_over = function() {
  console.log('checkiing')
  var all_Paired = true;
  
  //Check if all tiles are paired
  _.each(tiles, function(row,tile_row,c) { 
    
           div_id = '#' + tile_row
          if ($(div_id).hasClass('paired') ) {
          } else {
              all_Paired = false
          }
  })

  //Game has ended
  if (all_Paired) {

      //1 Player Game
      if (num_Players == 'one_Player') {
            str_Score_player_one.innerHTML = 'Player 1: ' + score
            player1Score = score
            //End of Game
            $("#end_announce").removeClass('index_back');
            $("#end_announce").addClass('index_front');
            str_EndOFGame.innerHTML = 'Your score is: ' + player1Score

            if (player1Score < localStorage['Best_Score']) {
              localStorage['Best_Score']  = player1Score
              str_best_score.innerHTML = 'Best Score: ' + player1Score
            }
      //2 Player Game
      } else if (num_Players == 'two_Player') {

            if (current_player == 1) {
                str_Score_player_one.innerHTML = 'Player 1: ' + score
                player1Score = score
                $("#start_announce").removeClass('index_back');
                $("#start_announce").addClass('index_front');
                str_StartAnnounce.innerHTML = "Player 2's turn"
                      //reset board
                      setTimeout(function() {
                          _.each(tiles, function(row,tile_row,c) { 
                                tiles_Turned_Over = 0
                                  if (tiles[tile_row] !== '') {
                                      //remove assigned class 
                                       div_id = '#' + tile_row
                                      $(div_id).removeClass(tiles[tile_row]);
                                      $(div_id).removeClass('assigned');
                                      $(div_id).removeClass('transformClass');
                                      //reset object
                                      tiles[tile_row] = ''
                                      if ($(div_id).hasClass('paired') ) {
                                          //remove paired class
                                          $(div_id).removeClass('paired');
                                      }
                                  }
                          })
                          _.each(images_Count, function(image_num,image_Key,c) { 
                                // console.log(tile_row)
                                images_Count[image_Key] = 0;
                          })
                          score = 0;
                          str_Score.innerHTML = 'Turns taken: ' + score; 
                          $("#start_announce").removeClass('index_front');
                          $("#start_announce").addClass('index_back');
                      }, 5000);
                      //--------------
                current_player = 2
            } else {
              console.log('declare winer')
                $("#end_announce").removeClass('index_back');
                $("#end_announce").addClass('index_front');
                str_StartAnnounce.innerHTML = "Start game!"

                str_Score_player_two.innerHTML = 'Player 2: ' + score
                player2Score = score
                //End of Game
                if (player1Score<player2Score) {
                  str_GameOver.innerHTML = 'Game Over! Player 1 wins'
                    if (player1Score < localStorage['Best_Score']) {
                      localStorage['Best_Score']  = player1Score
                      str_best_score.innerHTML = 'Best Score: ' + player1Score
                    }
                } else {
                  str_GameOver.innerHTML = 'Game Over! Player 2 wins'
                    if (player2Score < localStorage['Best_Score']) {
                      localStorage['Best_Score']  = player2Score
                      str_best_score.innerHTML = 'Best Score: ' + player2Score
                    }
                }

                $("#end_announce").removeClass('index_back');
                $("#end_announce").addClass('index_front');
                str_EndOFGame.innerHTML = 'Scores: Player 1:' + player1Score + '  Player 2:' + player2Score
            }
            
      }

  }
              
}

var reset_btn = function() {
  _.each(tiles, function(row,tile_row,c) { 
        // console.log(tile_row)
        tiles_Turned_Over = 0
          if (tiles[tile_row] !== '') {
              //remove assigned class 
              console.log(tile_row)
               console.log(tiles[tile_row])
               div_id = '#' + tile_row
              $(div_id).removeClass(tiles[tile_row]);
              $(div_id).removeClass('assigned');
              $(div_id).removeClass('transformClass');
              //reset object
              tiles[tile_row] = ''
              if ($(div_id).hasClass('paired') ) {
                  //remove paired class
                  $(div_id).removeClass('paired');
              }
          }
  })
  _.each(images_Count, function(image_num,image_Key,c) { 
        // console.log(tile_row)
        images_Count[image_Key] = 0;
  })
  score = 0;
  player1Score = 0;
  player2Score = 0;
  str_Score_player_one.innerHTML = 'Player 1: '
  str_Score_player_two.innerHTML = 'Player 2: '
  str_Score.innerHTML = 'Turns taken: ' + score

  str_GameOver.innerHTML = 'Game Over!'

  $("#start_announce").removeClass('index_front');
  $("#start_announce").addClass('index_back');
  $("#end_announce").removeClass('index_front');
  $("#end_announce").addClass('index_back');
}

$("#btn").on('click', function() {
    reset_btn()
});

$("#player_num").on('change', function() {
      num_Players = document.getElementById("player_num").value
          reset_btn()
});

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

