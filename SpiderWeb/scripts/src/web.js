
function Web() {
    this.nodes = [];
    this.accuracy = 5;

    this.update = function (elapsedTime) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].update(elapsedTime);
        }

        for (var i = 0; i < this.accuracy; i++) {
            for (var n = 0; n < this.nodes.length; n++) {
                this.nodes[n].resolveConstraints();
            } 
        }
    };

    this.draw = function (ctx) {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].draw(ctx);
        }
    };
}

function WebNode(x, y) {
    this.x = x;
    this.y = y;
    this.isPinned = false;
    this.vx = 0;
    this.vy = 0;
    this.constraints = [];
}

WebNode.prototype.nodeDrag = 1;

WebNode.prototype.applyForce = function (x, y) {
    this.vx += x;
    this.vy += y;
};

WebNode.prototype.update = function (elapsedTime) {
    if (this.isPinned)
        return;

    this.x += this.vx * elapsedTime;
    this.y += this.vy * elapsedTime;
        
    this.vx -= this.vx * elapsedTime * this.nodeDrag;
    this.vy -= this.vy * elapsedTime * this.nodeDrag;

    // gravity
    this.applyForce(0, 10);
};

WebNode.prototype.pin = function (x, y) {
    this.x = x;
    this.y = y;
    this.isPinned = true;
}

WebNode.prototype.linkTo = function (node) {
    this.constraints.push(new WebConstraint(this, node));
}

WebNode.prototype.resolveConstraints = function (elapsedTime) {
    for (var i = 0; i < this.constraints.length; i++) {
        this.constraints[i].resolve();
    }
};

WebNode.prototype.draw = function (ctx) {
    //ctx.beginPath();
    //ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI, false);
    //ctx.fillStyle = 'white';
    //ctx.fill();

    for (var i = 0; i < this.constraints.length; i++) {
        this.constraints[i].draw(ctx);
    }
};





function WebConstraint(node1, node2) {
    this.n1 = node1;
    this.n2 = node2;
    this.length = 50;
}

WebConstraint.prototype.resolve = function () {
    var diff_x = this.n1.x - this.n2.x;
    var diff_y = this.n1.y - this.n2.y;
    var dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
	var diff = (this.length - dist) / dist;

    //if (dist > tear_distance) this.p1.remove_constraint(this);

    var px = diff_x * diff;
    var py = diff_y * diff;

    if (!this.n1.isPinned && !this.n2.isPinned) {
        this.n1.x += px;
        this.n1.y += py;
        this.n2.x -= px;
        this.n2.y -= py;
    }
    else if (this.n1.isPinned) {
        this.n2.x -= px * 0.5;
        this.n2.y -= py * 0.5;
    }
    else {
        this.n1.x += px * 0.5;
        this.n1.y += py * 0.5;
    }
}

WebConstraint.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(this.n1.x, this.n1.y);
    ctx.lineTo(this.n2.x, this.n2.y);
    ctx.strokeStyle = 'white';
    ctx.stroke();
}