//function Game(canvasElem) {
window.TurbulenzEngine = WebGLTurbulenzEngine.create({
    canvas: document.getElementById("canvas")
});

var mathDevice = TurbulenzEngine.createMathDevice({});
var inputDevice = TurbulenzEngine.createInputDevice({});
inputDevice.addEventListener("keydown", inputDevice_keydown);
inputDevice.addEventListener("mousemove", inputDevice_mousemove);
inputDevice.addEventListener("mousedown", inputDevice_mousedown);

// size of physics stage.
var stageWidth = 1;// meters
var stageHeight = 1;// meters

var bgColor = [0, 0.5, 1, 1];
var graphicsDevice = TurbulenzEngine.createGraphicsDevice({});
var draw2d = Draw2D.create({
    graphicsDevice: graphicsDevice
});

var canvas = Canvas.create(graphicsDevice, mathDevice);
var ctx = canvas.getContext('2d');

var sprites = new Sprites(graphicsDevice);
var web = new Web();

var lastTime = 0;

var cursorNode;

function init() {
    draw2d.configure({
        viewportRectangle: [0, 0, stageWidth, stageHeight],
        scaleMode: 'scale'
    });

    // create web
    cursorNode = new WebNode(20, 0);
    web.nodes.push(cursorNode);
    cursorNode.pin(20, 0);

    for (var i = 1; i <= 6; i++) {
        var n = new WebNode(20, 50 * i)
        web.nodes.push(n);
        web.nodes[i - 1].linkTo(n);
    }

    TurbulenzEngine.setInterval(update, 1000 / 60);
}

function update() {

    var currentTime = TurbulenzEngine.time;
    var elapsedTime = currentTime - lastTime;

    processInput();
    web.update(elapsedTime);

    if (graphicsDevice.beginFrame()) {
        graphicsDevice.clear(bgColor, 1.0);
        graphicsDevice.endFrame();
    }

    if (ctx.beginFrame(graphicsDevice)) {
        web.draw(ctx);
        ctx.endFrame();
    }

    // finish up
    lastTime = currentTime;
}

function processInput(elapsedTime) {
    var pushPower = 0.3;
    if (inputDevice.pressedKeys[inputDevice.keyCodes.A]) {
        body.applyImpulse([pushPower, 0], [0, 0]);
    }
    if (inputDevice.pressedKeys[inputDevice.keyCodes.D]) {
        body.applyImpulse([-pushPower, 0], [0, 0]);
    }
    //if (inputDevice.pressedKeys[inputDevice.keyCodes.W]) {
    //    var vec = utility.getForwardVector(sprite.rotation);
    //    sprite.x += vec.x * moveSpeed * elapsedTime;
    //    sprite.y += vec.y * moveSpeed * elapsedTime;
    //}
    //if (inputDevice.pressedKeys[inputDevice.keyCodes.S]) {
    //    var vec = utility.getForwardVector(sprite.rotation);
    //    sprite.x -= vec.x * moveSpeed * elapsedTime;
    //    sprite.y -= vec.y * moveSpeed * elapsedTime;
    //}


}

function inputDevice_keydown(key) {
    if (key == inputDevice.keyCodes.F5) {
        document.location = document.location.href;
    }
}

function inputDevice_mousemove(x, y) {
    cursorNode.x += x;
    cursorNode.y += y;
}

function inputDevice_mousedown(code, x, y) {
    if(inputDevice.isMouseLocked)
        inputDevice.unlockMouse();
    else
        inputDevice.lockMouse();
}

init();