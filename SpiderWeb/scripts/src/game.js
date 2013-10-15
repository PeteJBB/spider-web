function Game(canvas) {
    TurbulenzEngine = WebGLTurbulenzEngine.create({
        canvas: canvas
    });

    var bgColor = [0, 0.5, 1, 1];
    var graphicsDevice = TurbulenzEngine.createGraphicsDevice({});
    
    var draw2D = Draw2D.create({
        graphicsDevice: graphicsDevice
    });

    var spider = Draw2DSprite.create({
        width: 64,
        height: 64,
        x: graphicsDevice.width / 2,
        y: graphicsDevice.height / 2,
        color: [1.0, 1.0, 1.0, 1.0],
        rotation: 0
    });

    var texture = graphicsDevice.createTexture({
        src: "assets/textures/spider.png",
        mipmaps: true,
        onload: function (texture) {
            if (texture) {
                spider.setTexture(texture);
                spider.setTextureRectangle([0, 0, texture.width, texture.height]);
            }
        }
    });

    var inputDevice = TurbulenzEngine.createInputDevice({});
    function keydown(key) {
        if (key == inputDevice.keyCodes.F5) {
            document.location = document.location.href;
        }
    }
    inputDevice.addEventListener("keydown", keydown);

    var lastTime = 0;
    var moveSpeed = 100;
    var rotateSpeed = 1 / 2;

    function update() {

        if (graphicsDevice.beginFrame()) {
            var currentTime = TurbulenzEngine.time;
            var elapsedTime = currentTime - lastTime;
            
            if (inputDevice.pressedKeys[inputDevice.keyCodes.A]) {
                spider.rotation -= (2 * Math.PI) * rotateSpeed * elapsedTime;
            }
            if (inputDevice.pressedKeys[inputDevice.keyCodes.D]) {
                spider.rotation += (2 * Math.PI) * rotateSpeed * elapsedTime;
            }
            if (inputDevice.pressedKeys[inputDevice.keyCodes.W]) {
                var vec = utility.getForwardVector(spider.rotation);
                spider.x += vec.x * moveSpeed * elapsedTime;
                spider.y += vec.y * moveSpeed * elapsedTime;
            }
            if (inputDevice.pressedKeys[inputDevice.keyCodes.S]) {
                var vec = utility.getForwardVector(spider.rotation);
                spider.x -= vec.x * moveSpeed * elapsedTime;
                spider.y -= vec.y * moveSpeed * elapsedTime;
            }

            graphicsDevice.clear(bgColor, 1.0);

            draw2D.begin();
            draw2D.drawSprite(spider);
            draw2D.end();

            lastTime = currentTime;
            graphicsDevice.endFrame();
        }
    }

    TurbulenzEngine.setInterval(update, 1000 / 60);
}