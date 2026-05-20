for (var i=0; i<12; i++) {
    $( "#draggable-" + i ).draggable({
        scroll: false,
        revert: "invalid",
        revertDuration: 200,
        distance: 0,
        start: function(event, ui) {
            if($(this).hasClass('closed')) {
                //scaleDragStart(event, ui, $(this));
            }
        },
        drag: function(event, ui) {
            if($(this).hasClass('closed')) {
                //scaleDragDrag(event, ui);
            }
        },
        stop: function(event, ui) {
            if($(this).hasClass('closed')) {
                //$(this).removeClass("dragging");
            }
        }
    });
}
for (var i=0; i<14; i++) {
    $( "#droppable-" + i ).droppable({
        tolerance: "pointer",
        accept: ".card",
        drop: function( event, ui ) {
        console.log(event, ui);
        }
    });
}

$( ".card__open" ).draggable({
    scroll: false,
    //revert: "invalid",
    revertDuration: 500,
    distance: 0,
    start: function(event, ui) {
        event.preventDefault();
        event.stopPropagation();
    },
    drag: function(event, ui) {
        event.preventDefault();
    },
    stop: function(event, ui) {
        event.preventDefault();
    }
});

$( ".card__open" ).click((event =>{
    $( ".card" ).each(function() {
        if (
            $(this).attr('id') !== $(event.target).parent().attr('id') &&
            $(this).attr('id').indexOf('draggable') > -1
        ){
            console.log($(this))
            $(this).addClass("closed");
            $(this).draggable( 'disable' );
        }
    })

    $( ".card__open" ).addClass("closed");
    $(".transparent-bg").toggleClass("closed");
    $(".ally").toggleClass("closed");
    $(event.target).toggleClass("closed");
    $(event.target).parent().toggleClass("closed");

    if (!$(".ally").hasClass('closed') && $(event.target).parent().attr('id').indexOf('draggable') > -1) {
        console.log($(event.target).parent())
        $(event.target).parent().draggable( 'disable' );
    }

    $( ".card" ).each(function() {
        if ( 
            $(".ally").hasClass('closed') &&
            $(this).attr('id').indexOf('draggable') > -1
        ){
            console.log($(this));
            $(this).draggable( 'enable' );
        }
    })
    console.log('******************')
}));