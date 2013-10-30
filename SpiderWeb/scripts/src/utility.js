(function (Utility) {
    Utility.getForwardVector = function (radians) {
        return {
            x: -Math.sin(radians),
            y: Math.cos(radians)
        }
    },

    Utility.getRandomColor = function () {
        var c = [Math.random(), Math.random(), Math.random(), 1];
        return c;
    }
}(window.Utility = window.Utility || {}));