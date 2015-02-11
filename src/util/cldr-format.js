define(function() {

return function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] !== "undefined" ? args[number] : match;
    });
};

});
