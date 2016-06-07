Template.ListGroups.events({
  'click .item-link': function(event, instance) {
    if($( window ).width() < 767) {
      $('.panel.panel-left.panel-cover').css('left', '-100%');
    }
    //$('div.list-block.media-list.stories-list.list-block-search.searchbar-found').hide()
  }
})
