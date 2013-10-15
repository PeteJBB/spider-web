(function(utility) {
    utility.getForwardVector = function (radians) {
        return {
            x: -Math.sin(radians),
            y: Math.cos(radians)
        }
    },

    utility.getRandomColor = function () {
        var c = [Math.random(), Math.random(), Math.random(), 1];
        return c;
    }
}(window.utility = window.utility || {}));