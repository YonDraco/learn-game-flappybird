class Sprite {
  constructor(x, y, w = null, h = null, ratio = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ratio = ratio;

    this.painter = null;
    this.behaviors = []; // hanh vi, cu xu cua nhan vat
  }

  //=== Method ===
  paint(context) {
    this.painter.paint(context, this.x, this.y, this.w, this.h);
  }

  // Method hanh vi cua nhan vat
  exec() {
    this.behaviors.forEach(b => b.exec(this));
  }
}
