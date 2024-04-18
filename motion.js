const canvas50 = document.getElementById('canvas50');
const ctx7 = canvas50.getContext('2d');
canvas50.width = window.innerWidth;
canvas50.height = window.innerHeight;

console.log(ctx7);
const gradient10 = ctx7.createLinearGradient(0,0,0, canvas50.height);
gradient10.addColorStop(0, 'white');
gradient10.addColorStop(1, 'gold');
ctx7.fillStyle = gradient10;
ctx7.strokeStyle = gradient10;

class Particle2 {
  constructor(effect3, index){
    this.effect3 = effect3;
    this.index = index;
    this.radius = Math.floor(Math.random() * 10 + 1);
    this.x = this.radius + Math.random() * (this.effect3.width - this.radius * 2);
    this.y = this.radius + Math.random() * (this.effect3.height- this.radius * 2);
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
    this.pushX  = 0;
    this.pushY  = 0;
    this.friction = 0.8;
  }
  draw(context){
    if(this.index % 1 === 0){
      context.save();
      context.globalAlpha = 0.6;
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.effect3.mouse.x, this.effect3.mouse.y);
      context.stroke();
      context.restore();
    }
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
  update(){
    if (this.effect3.mouse.pressed){
      const dx = this.x - this.effect3.mouse.x;
      const dy = this.y - this.effect3.mouse.y;
      const distance = Math.hypot(dx, dy);
      const force = (this.effect3.mouse.radius / distance);
      if(distance < this.effect3.mouse.radius){
        const angle = Math.atan2(dy, dx);
        this.pushX += Math.cos(angle) * force;
        this.pushY += Math.sin(angle) * force;
      }
    }
    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;
    if (this.x < this.radius){
      this.x = this.radius;
      this.vx *= -1;
    }else if (this.x > this.effect3.width - this.radius){
      this.x = this.effect3.width - this.radius;
      this.vx *= -1;
    }
    if (this.y < this.radius){
      this.y = this.radius;
      this.vy *= -1;
    }else if (this.y > this.effect3.height - this.radius){
      this.y = this.effect3.height - this.radius;
      this.vy *= -1;
    }
    
  }
  reset(){
    this.x = this.radius + Math.random() * (this.effect3.width - this.radius * 2);
    this.y = this.radius + Math.random() * (this.effect3.height- this.radius * 2);
  }
}

class Effect2 {
    constructor(canvas50, context){
      this.canvas50 = canvas50;
      this.context = context;
      this.width = this.canvas50.width;
      this.height = this.canvas50.height;
      this.particles = [];
      this.numberOfParticles = 400;
      this.createPrticles();

      this.mouse = {
        x: 0,
        y: 0,
        pressed: false,
        radius: 100
      }   

      window.addEventListener('resize', e =>{
        this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
      });
      window.addEventListener('mousemove', e => {
       if(this.mouse.pressed){
          this.mouse.x = e.x;
          this.mouse.y = e.y;
       }

      });
      window.addEventListener('mousedown', e => {
        this.mouse.pressed = true;
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      });
      window.addEventListener('mouseup', e => {
        this.mouse.pressed = false;
      });
    }
    createPrticles(){
      for(let i = 0; i < this.numberOfParticles; i++){
        this.particles.push(new Particle2(this, i));
      }
    }
    handlePaticles(context){
      this.connectParticles(context);
      this.particles.forEach(particle => {
        particle.draw(context);
        particle.update();
      });
      
    }
    connectParticles(context){
      const maxDistance = 80;
      for (let a = 0; a < this.particles.length; a++){
        for (let b = a; b < this.particles.length; b++){
          const dx = this.particles[a].x - this.particles[b].x;
          const dy = this.particles[a].y - this.particles[b].y;
          const distance = Math.hypot(dx, dy);
          if (distance < maxDistance){
            context.save();
            const opacity = 1 - (distance/maxDistance);
            context.globalAlpha = opacity; 
            context.beginPath();
            context.moveTo(this.particles[a].x, this.particles[a].y);
            context.lineTo(this.particles[b].x, this.particles[b].y);
            context.stroke();
            context.restore();
          }
        }
      }
    }
      resize(width, height){
        this.canvas50.width = width;
        this.canvas50.height = height;
        this.width = width;
        this.height = height;
        const gradient10 = this.context.createLinearGradient(0,0,canvas50.width, canvas50.height);
        gradient10.addColorStop(0, 'white');
        gradient10.addColorStop(0.5, 'gold');
        // gradient10.addColorStop(1, 'orengered');
        this.context.fillStyle = gradient10;
        this.context.strokeStyle = 'white';
        this.particles.forEach(particle => {
          particle.reset();
        })
      }
}
const effect3 = new Effect2(canvas50, ctx7);

function animate(){
  ctx7.clearRect(0, 0, canvas50.width, canvas50.height);
  effect3.handlePaticles(ctx7);
  requestAnimationFrame(animate);
}
animate();