const center = (0,0,0);
var z_pos = 0;
var x_pos = 0;
var rad = 10;
var rot = 10;
var rot_mod = 0.004;
var planets = [];
var cam_zoom = 50;
var cam_rot_y = 0.78;
var cam_rot_x = 0;
var mode = 'vertical';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x0000ff} );

camera.position.set(0, 10, 20);

var eq="Math.pow((Math.pow(x,2)+Math.pow(y,2)),0.5)";

function displayGraph(eq){
  for (var x=-15; x<15;x++){
    for (var y=-15; y<15;y++){
      var zpos = eval(eq.replace(/x/g,x).replace(/y/g,y));
      
      var s = new THREE.BoxGeometry(0.5,0.5,0.5);
      var sphere = new THREE.Mesh(s,material);
      sphere.position.x=x;
      sphere.position.z=y;
      sphere.position.y = zpos;
      scene.add(sphere);
    }
  }
}

class Ball {
  constructor(eq){
    this.eq = eq;

    this.posx = Math.floor(Math.random()*20)-10;
    this.posy = Math.floor(Math.random()*20)-10;
    this.posz = eval(this.eq.replace(/x/g,this.posx).replace(/y/g,this.posy))+1;
    
    this.geo = new THREE.SphereGeometry(1,20,20);
    this.mat = new THREE.MeshBasicMaterial({color:0xff0000});
    this.mesh = new THREE.Mesh(this.geo,this.mat);

    this.mesh.position.x = this.posx;
    this.mesh.position.z = this.posy;
    this.mesh.position.y = this.posz;

    this.dx = 0.01;
    this.rate = 0.1;
    
    scene.add(this.mesh);
  }

  update(){
    this.parX = (eval(this.eq.replace(/x/g,this.posx+this.dx).replace(/y/g,this.posy))-eval(eq.replace(/x/g,this.posx).replace(/y/g,this.posy)))/this.dx;

    if (this.parX > -0.05 && this.parX < 0.05){
      
    } else {
      if (this.parX>0){
        this.posx -= this.rate;
      } else {
        this.posx += this.rate;
      }
    }

    this.parY = (eval(this.eq.replace(/x/g,this.posx).replace(/y/g,this.posy+this.dx))-eval(eq.replace(/x/g,this.posx).replace(/y/g,this.posy)))/this.dx;

    if (this.parY > -0.05 && this.parY < 0.05){
      
    } else {
      if (this.parY>0){
        this.posy -= this.rate;
      } else {
        this.posy += this.rate;
      }
    }

                 
    this.posz = eval(this.eq.replace(/x/g,this.posx).replace(/y/g,this.posy))+1;

    this.mesh.position.x = this.posx;
    this.mesh.position.z = this.posy;
    this.mesh.position.y = this.posz;
  }
}

var balls = [];
balls.push(new Ball(eq));

displayGraph(eq);

document.addEventListener("keydown",onPress,false);

function onPress(event){
  var code = event.which;
  //Orbiting
  if (code == 38){
    cam_rot_y -= 0.02;
    mode="vertical";
  } else if (code == 40){
    cam_rot_y += 0.02;
    mode="vertical";
  } else if (code == 37){
    cam_rot_x -= 0.02;
    mode = "horizontal";
  } else if (code == 39){
    cam_rot_x += 0.02;
    mode = "horizontal";
  //Zoom
  } else if (code == 187){
    mode = "horizontal";
    if (cam_zoom > 0){
      cam_zoom -= 3;
    }
  } else if (code == 189){
    mode = "horizontal";
    cam_zoom += 3;
  } else if (code == 78){
    balls.push(new Ball(eq));
  } else if (code == 67){
    for (var x = 0; x<balls.length; x++){
      scene.remove(balls[x].mesh);
    }
    balls = [];
  }
}




camera.position.x = 90;
camera.position.z = cam_zoom;
camera.position.y = 90;
camera.rotation.y = 0;
camera.rotation.x = -1.8;
camera.lookAt(0,0,0);


function animate() {
  requestAnimationFrame(animate);

  if (mode=="vertical"){
    var posy = Math.cos(cam_rot_y)*cam_zoom;
    var posz = Math.sin(cam_rot_x)*cam_zoom;
    camera.position.y = posy;
    camera.position.z = posz;
  } else if (mode=="horizontal"){
    var posx = Math.cos(cam_rot_x)*cam_zoom;
    var posz = Math.sin(cam_rot_x)*cam_zoom; 
    camera.position.z = posz;
    camera.position.x = posx;
  }

  camera.lookAt(0,0,0);

  for (var x = 0; x<balls.length; x++){   
    balls[x].update();
  }

  renderer.render(scene, camera);

  z_pos = 0;
  x_pos = 0;
  rot+=rot_mod;
};

animate();
