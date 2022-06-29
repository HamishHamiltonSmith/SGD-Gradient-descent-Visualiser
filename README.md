# SGD-Gradient-descent-Visualiser

## Intro

I'm working towards making a c++ neural networks capable of image recognition right now, and a key component to these of course are optimizers. I decided to go with stochastic gradient descent. It is remarkably simple and praised still as being one of the best minimization techniques. I ended up learning calculus for this so I hope it is worth it!

The program is web based, it uses three.js for the rendering because I am lazy. If you want to play around with it yourself go ahead and clone this repository and run via a web browser or other interpreter (the controls are below). If not you can check out some example images. I will also include a paragraph on how this works.

I actually initially made a 2d version of this and implemented it into visgraph (my 2d graphing calculator) however it may be a while before I release that.


## How it works

For those interested, the mathematics behind the algorithm look like this:
* 'Balls' are spawned and randomized 
* Partial derivatives are calculated, evaluated for both x and y (since it is 3d the functions are multivariable)
* Using these gradients, it computes wich way to move the ball (these gradients do not effect the offset amount)
* A check is preformed, evaluating if either of the gradients are within a certain threshold, currently -0.05:0.05)
* If a variable is minimized, its value is frozen, if not this process recurs untill it is
* Once both variables are minimized, the algorithms work is done and it stops


## Controls

* Orbital movement: arrow keys
* Spawn new ball: n
* Clear balls: c
* Zoom: - and =

## Examples


Sadly I can't actually show the algorithm at work as that would require a video but here are some still captures. The eqautions of these graphs are respectively var eq="Math.pow((Math.pow(x,2)+Math.pow(y,2)),0.5)"; and var eq="Math.sin(x+y)";


![Image](https://github.com/HamishHamiltonSmith/SGD-Gradient-descent-Visualiser/blob/main/examples/Screenshot%202022-06-29%208.39.26%20PM.png)
![Image](https://github.com/HamishHamiltonSmith/SGD-Gradient-descent-Visualiser/blob/main/examples/Screenshot%202022-06-29%208.43.25%20PM.png)
