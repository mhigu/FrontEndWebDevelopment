// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

function makeGrid() {
    // Your code goes here!
    let inputHeight = $('#input_height').val();
    let inputWidth = $('#input_width').val();
    console.log(inputHeight + inputWidth);
};

$('#sizePicker').submit(function(event){
    event.preventDefault();
    makeGrid();
});
