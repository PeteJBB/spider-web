function Sprites(graphicsDevice) {
    var sprites = this;
    this.spider = Draw2DSprite.create({
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
                sprites.spider.setTexture(texture);
                sprites.spider.setTextureRectangle([0, 0, texture.width, texture.height]);
            }
        }
    });
}