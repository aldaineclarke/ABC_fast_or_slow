export class Roulette {

    spinTimeoutID :any; // Used any here because Node.JS.Timeout throwing an error.
    context !:CanvasRenderingContext2D;
    canvas !:HTMLCanvasElement;
    arrOptions:string[] = [];
    spinTimeout = 0;
    startAngle = 0;  
    spinArcStart = 10;
    spinAngleStart = 0;
    arc = Math.PI / (this.arrOptions.length / 2);
    spinTime = 0;
    spinTimeTotal = 0;

    constructor(options:string[], canvas:HTMLCanvasElement){
        this.canvas = canvas,
        this.arrOptions = options;
    }

    spinWheel(){
        this.spinTimeTotal = Math.random() * 2 + 9 * 1000;
        this.spinAngleStart = Math.random() * 10 + 10;
        this.spinTime = 0;
        this.rotateWheel();
        
      }
      drawRouletteWheel() {
    
        if (this.canvas.getContext) {
          let outsideRadius = 200;
          let textRadius = 160;
          let insideRadius = 125;
      
          let ctx = this.canvas.getContext("2d");
          if(ctx){
            ctx.clearRect(0,0,500,500);
            this.context = ctx;
      
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
      
          ctx.font = 'bold 20px Helvetica, Arial';
      
          for(var i = 0; i < this.arrOptions.length; i++) {
            var angle = this.startAngle + i * this.arc;
            //ctx.fillStyle = colors[i];
            ctx.fillStyle = this.getColor(i, this.arrOptions.length);
      
            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + this.arc, false);
            ctx.arc(250, 250, insideRadius, angle + this.arc, angle, true);
            ctx.stroke();
            ctx.fill();
      
            ctx.save();
            ctx.shadowOffsetX = -1;
            ctx.shadowOffsetY = -1;
            ctx.shadowBlur    = 0;
            ctx.shadowColor   = "rgb(220,220,220)";
            ctx.fillStyle = "black";
            ctx.translate(250 + Math.cos(angle + this.arc / 2) * textRadius, 
                          250 + Math.sin(angle + this.arc / 2) * textRadius);
            ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
            var text = this.arrOptions[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
          } 
      
          //Arrow
          ctx.fillStyle = "black";
          ctx.beginPath();
          ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
          ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
          ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
          ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
          ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
          ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
          ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
          ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
          ctx.fill();
          }
        }
      } 
      
      RGB2Color(r:number,g:number,b:number) {
        return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
      }
      
      getColor(item:any, maxitem:number) {
        var phase = 0;
        var center = 128;
        var width = 127;
        var frequency = Math.PI*2/maxitem;
        
        let red   = Math.sin(frequency*item+2+phase) * width + center;
        let green = Math.sin(frequency*item+0+phase) * width + center;
        let blue  = Math.sin(frequency*item+4+phase) * width + center;
        
        return this.RGB2Color(red,green,blue);
      }
    
      byte2Hex(n:number) {
        var nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
      }
    
      rotateWheel() {
        this.spinTime += 30;
        if(this.spinTime >= this.spinTimeTotal) {
          this.stopRotateWheel();
          return;
        }
        let spinAngle = this.spinAngleStart - this.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
        this.startAngle += (spinAngle * Math.PI / 180);
        this.drawRouletteWheel();
        this.spinTimeoutID = setTimeout(()=>this.rotateWheel(), 30);
      }
    
      stopRotateWheel() {
        clearTimeout(this.spinTimeoutID);
        let degrees = this.startAngle * 180 / Math.PI + 90;
        let arcd = this.arc * 180 / Math.PI;
        let index = Math.floor((360 - degrees % 360) / arcd);
        this.context.save();
        this.context.font = 'bold 70px Helvetica, Arial';
        let text = this.arrOptions[index]
        this.context.fillText(text, 250 - this.context.measureText(text).width / 2, 250 + 10);
        this.context.restore();
      }
      
      easeOut(t:number, b:number, c:number, d:number) {
        let ts = (t/=d)*t;
        let tc = ts*t;
        return b+c*(tc + -3*ts + 3*t);
      }
}
