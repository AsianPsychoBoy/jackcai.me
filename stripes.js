const stripesConfig = {
  count: 10,
  averageWidth: 100,
  widthVary: 50,
  colors: ['rgba(93,217,193,0.7)', 'rgba(172,252,217,0.7)', 'rgba(176,132,204,0.7)', 'rgba(102,86,135,0.7)', 'rgba(25,9,51,0.7)']
}

paper = new Snap('#ribbon-background');
stripes = [];

class Stripe {
  constructor() {
    this.x = Math.random() * document.body.clientWidth;
    this.y = Math.random() * document.body.clientHeight - 2000;
    this.width = Math.random()*(stripesConfig.widthVary * 2) + stripesConfig.averageWidth - stripesConfig.widthVary;
    this.height = 5000;
    this.rotateTransform = 'r' + Math.floor(Math.random() * 8) * 45;
    this.stripe = paper.rect(this.x, this.y, this.width, this.height)
      .transform(this.rotateTransform)
      .attr({
        fill: stripesConfig.colors[Math.floor(Math.random() * stripesConfig.colors.length)]
      });
  }

  animateStripe() {
    let xDistance = (Math.random() - 0.5) * Math.random() * document.body.clientWidth;
    let yDistance = (Math.random() - 0.5) * Math.random() * document.body.clientHeight;
    this.stripe.animate({ transform: 't' + xDistance + ',' + yDistance + this.rotateTransform }, Math.random() * 5000 + 10000, mina.linear, () => {
      this.animateStripe();
    })
  }
}

for (let i = 0; i < stripesConfig.count; i++) {
	let newStripe = new Stripe();
	stripes.push(newStripe);
	newStripe.animateStripe();
}
