let counter=1;

function handleClickCatImg(){
    $('.cat1-moves').text(counter);
    counter++;
}

$('.cat-img1').click(function(e) {
    handleClickCatImg();
});

$('.cat-img2').click(function(e) {
    handleClickCatImg();
});