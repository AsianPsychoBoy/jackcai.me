'use strict';

const stripeConfig = {
    averageWidth: 100,
    widthVary: 50,
    colors: ['rgba(93,217,193,0.7)', 'rgba(172,252,217,0.7)', 'rgba(176,132,204,0.7)', 'rgba(102,86,135,0.7)', 'rgba(25,9,51,0.7)']
}

const stripesConfig = {
    svgEl: '#ribbon-background',
    count: 10,
}

class Stripe {
  constructor(config) {
      config = config || {};
    this.averageWidth = config.averageWidth || stripeConfig.averageWidth;
    this.widthVary = config.widthVary || stripeConfig.widthVary;
    this.colors = config.colors || stripeConfig.colors;
    this.paper = config.svgEl;

    this.x = Math.random() * document.body.clientWidth;
    this.y = Math.random() * document.body.clientHeight - 2000;
    this.width = Math.random()*(this.widthVary * 2) + this.averageWidth - this.widthVary;
    this.height = 5000;
    this.rotateTransform = 'r' + Math.floor(Math.random() * 8) * 45;
    this.stripe = this.paper.rect(this.x, this.y, this.width, this.height)
      .transform(this.rotateTransform)
      .attr({
        fill: this.colors[Math.floor(Math.random() * this.colors.length)]
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

class Stripes {
    constructor(config) {
        config = config || {};
        this.count = config.count || stripesConfig.count;
        this.paper = new Snap(config.svgEl || stripesConfig.svgEl);
        this.stripes = [];
        
        for (let i = 0; i < this.count; i++) {
            let newStripe = new Stripe(Object.assign(stripeConfig, {svgEl: this.paper}));
            this.stripes.push(newStripe);
            newStripe.animateStripe();
        }
    }
}
