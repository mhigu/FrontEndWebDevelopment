// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

function makeGrid() {
    // Your code goes here!
    let inputHeight = $("#input_height").val();
    let inputWidth = $("#input_width").val();
    let tableTag = $("#pixel_canvas")
    tableTag.empty();
    for (let row=inputHeight; row--; row>=0){
        tableTag.append("<tr class=table_created></tr>");
    }
    let tableRowTag = $("tr").empty();
    for (let column=inputWidth; column--; column>=0){
        tableRowTag.append("<td class='table_column'></td>");
    }
    console.log(inputHeight + inputWidth);
};

$("#sizePicker").submit(function(event){
    event.preventDefault();
    makeGrid();
});

$(document).on("click",".table_column", function(){
    let bgColor = $(colorPicker).val();
    let tableColumn = $(this);
    console.log(tableColumn);
    tableColumn.css({"background-color": bgColor});
})