function Spider() {

    var sprite;
    var texture;
    var graphicsDevice;
    var inputDevice;
    var mathDevice;

    var canvasElem;
    var canvas;
    var ctx;

    var moveSpeed = 100;
    var rotateSpeed = 1 / 2;

    this.init = function () {
        graphicsDevice = TurbulenzEngine.getGraphicsDevice();
        inputDevice = TurbulenzEngine.getInputDevice();
        mathDevice = TurbulenzEngine.getMathDevice();

        canvasElem = TurbulenzEngine.canvas;
        canvas = Canvas.create(graphicsDevice, mathDevice);
        ctx = canvas.getContext('2d');

        sprite = Draw2DSprite.create({
            width: 64,
            height: 64,
            x: graphicsDevice.width / 2,
            y: graphicsDevice.height / 2,
            color: [1.0, 1.0, 1.0, 1.0],
            rotation: 0
        });

        texture = graphicsDevice.createTexture({
            src: "assets/textures/spider.png",
            mipmaps: true,
            onload: function (texture) {
                if (texture) {
                    sprite.setTexture(texture);
                    sprite.setTextureRectangle([0, 0, texture.width, texture.height]);
                }
            }
        });

        webAnchor = [graphicsDevice.width / 2, 0];
    }


    var webAnchor;
    var velocity = [100, 0];
    this.update = function (elapsedTime) {
        
        // drag
        velocity[0] *= 0.98;
        velocity[1] *= 0.98;

        sprite.x += velocity[0] * elapsedTime;
        sprite.y += velocity[1] * elapsedTime;

        processInput(elapsedTime);
    }

    function processInput(elapsedTime) {
        if (inputDevice.pressedKeys[inputDevice.keyCodes.A]) {
            sprite.rotation -= (2 * Math.PI) * rotateSpeed * elapsedTime;
        }
        if (inputDevice.pressedKeys[inputDevice.keyCodes.D]) {
            sprite.rotation += (2 * Math.PI) * rotateSpeed * elapsedTime;
        }
        if (inputDevice.pressedKeys[inputDevice.keyCodes.W]) {
            var vec = utility.getForwardVector(sprite.rotation);
            sprite.x += vec.x * moveSpeed * elapsedTime;
            sprite.y += vec.y * moveSpeed * elapsedTime;
        }
        if (inputDevice.pressedKeys[inputDevice.keyCodes.S]) {
            var vec = utility.getForwardVector(sprite.rotation);
            sprite.x -= vec.x * moveSpeed * elapsedTime;
            sprite.y -= vec.y * moveSpeed * elapsedTime;
        }
    }

    this.draw = function (draw2d) {

        // draw web
        ctx.beginFrame();
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(255,255,255)';
        ctx.moveTo(graphicsDevice.width / 2, 0);
        ctx.lineTo(sprite.x, sprite.y);
        ctx.stroke();
        ctx.endFrame();

        draw2d.begin("alpha");
        draw2d.drawSprite(sprite);
        draw2d.end();

       
    }

    this.init();
}