class SpriteSheetPainter {
  constructor(img, pageFlip, cells) {
    this.img = img;
    this.pageFlip = pageFlip; // tốc độ lật trang (khung hình - load bao nhiêu ảnh / 1s)
    this.cells = cells; // tọa độ những bức ảnh

    // Lấy giá trị mặc định
    this.mirrorEffect = false; // mirrorEffect: đảo chiều của hình ảnh
    this.lastUpdateTime = 0;
    this.cellIdx = 0;
  }

  update() {
    //Date.now(): trả về số mili giây đã trôi qua.
    if (this.lastUpdateTime == 0) this.lastUpdateTime = Date.now();
    if (Date.now() - this.lastUpdateTime >= 1000 / this.pageFlip) {
      this.cellIdx = (this.cellIdx + 1) % this.cells.length;
      this.lastUpdateTime = Date.now();
    }
  }

  paint(context, x, y, w, h) {
    if (this.mirrorEffect) {
      context.save();
      context.translate(x + w, 0);
      context.scale(-1, 1);
      context.drawImage(
        this.img,
        this.cells[this.cellIdx].x,
        this.cells[this.cellIdx].y,
        this.cells[this.cellIdx].width,
        this.cells[this.cellIdx].height,
        0,
        y,
        w,
        h
      );
      context.restore();
    } else {
      context.drawImage(
        this.img,
        this.cells[this.cellIdx].x,
        this.cells[this.cellIdx].y,
        this.cells[this.cellIdx].width,
        this.cells[this.cellIdx].height,
        x,
        y,
        w,
        h
      );
    }
  }
}
