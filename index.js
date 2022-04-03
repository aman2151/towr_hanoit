var latest_usable_num = 0;
var stuff = new Array; 
var stuff_index = new Array;
var step = 1, is_moving = false;
var every_step = new Array;
var interval = 500;
// step.give.receive as a number ex first step 1 to 3 --> 113

function check_num(){ 
    if (is_moving == true){
        return;
    }
    var num = document.getElementById("num").value;
    document.getElementById("num").value = "";
    try{
        if (isNaN(num)==true) throw "It's not a number";
        if (num=="") throw "Null";
        num = Number(num);
        if (num<1) throw "Too small"
        if (num>14) throw "Too big";
    }catch(respond){
        document.getElementById("show_respond").innerHTML = respond;
        num = latest_usable_num;
        return ;
    }
    document.getElementById("show_respond").innerHTML = "";
    
    /////////////////////////////////Summon block
    for (var i=1;i<=latest_usable_num;i++){
        var brick = document.getElementById(`brick${i}`);
        brick.remove();
    }
    latest_usable_num = Number(num);
    var box = document.getElementById("box1");
    //box.empty();
    for (var i=latest_usable_num;i>=1;i--){
        var brick = document.createElement("div");
        brick.className = "brick";
        brick.id = `brick${i}`;
        brick.innerHTML = i;
        box.append(brick);
    }
    for (var i=1;i<=latest_usable_num;i++){
        var brick_image = document.getElementById(`brick${i}`);
        switch (i%6){
            case 0: brick_image.style['background-color'] = 'red';break;
            case 1: brick_image.style['background-color'] = 'purple';break;
            case 2: brick_image.style['background-color'] = 'gold';break;
            case 3: brick_image.style['background-color'] = 'green';break;
            case 4: brick_image.style['background-color'] = 'blue';break;
            case 5: brick_image.style['background-color'] = 'yellow';break;
            case 6: brick_image.style['background-color'] = 'cyan';break;
        }
        brick_image.style.width = i*(180/latest_usable_num) +'px';
    }
    step = 1;
    every_step = new Array;
    for (var i=1;i<=3;i++){
        stuff[i] = new Array;
        if (i==1)
            for (var j=latest_usable_num ; j>=1 ; j--){
                stuff[i][j] = latest_usable_num-j+1;
            }
        else{
            for (var j=latest_usable_num ; j>=1 ; j--){
                stuff[i][j] = 0;
            }
        }
    } 
    stuff_index[1] = latest_usable_num;
    stuff_index[2] = 0;
    stuff_index[3] = 0;
    pre_move(1,2,3,latest_usable_num);
    step = 1;
}

function pre_move(f1, f2, f3, n){
    if (n==1) {
        every_step[step] = f3 + 10*f1 + 100*step;
        step ++;
	}else{
        pre_move(f1,f3,f2,n-1); 
        every_step[step] = f3 + 10*f1 + 100*step;
        step ++;
        pre_move(f2,f1,f3,n-1);
	}
}

function auto_move(){//onclick buttom
    if (is_moving == true){
        return;
    }
    if (latest_usable_num == 0){
        document.getElementById("show_respond").innerText = "Please Enter number in Box";
        return;
    }
    is_moving = true;
    _move(latest_usable_num);
}

function _move(n){
    for (var t = 0; t<=Math.pow(2, n) - step; t ++){
        setTimeout(function(){
            Next();
            if (step >= Math.pow(2, latest_usable_num)){
                is_moving = false;
            }
        },interval*(t)+interval);
    }
}

function Prev(){
    if (is_moving == true){
        return;
    }
    if (step <= 1){
        return;
    }else{
        document.getElementById("show_respond").innerText = "";
        step = step-1;
        document.getElementById("step").innerHTML = "Total " + (step-1) + " steps";
        var givebox = every_step[step] % 10;
        var give1 = document.getElementById(`box${givebox}`);
        var buffer = parseInt(every_step[step] / 10);
        var getbox = buffer % 10;
        var get = document.getElementById(`box${getbox}`);
        var givething = document.getElementById(`brick${stuff[givebox][stuff_index[givebox]]}`);
        stuff_index[getbox] += 1;
        stuff[getbox][stuff_index[getbox]] = stuff[givebox][stuff_index[givebox]];
        stuff_index[givebox] -= 1;
        get.append(givething);
    }
}
function Next(){
    var respond;
    if (step >= Math.pow(2, latest_usable_num)){
        return;
    }else{
        document.getElementById("show_respond").innerText = "";
        var getbox = every_step[step] % 10;
        var buffer = parseInt(every_step[step] / 10);
        var givebox = buffer % 10;
        var give1 = document.getElementById(`box${givebox}`);
        var get1 = document.getElementById(`box${getbox}`);
        var givething = document.getElementById(`brick${stuff[givebox][stuff_index[givebox]]}`);
        stuff_index[getbox] += 1;
        stuff[getbox][stuff_index[getbox]] = stuff[givebox][stuff_index[givebox]];
        stuff_index[givebox] -= 1;
        get1.append(givething);
        document.getElementById("step").innerHTML = "Total " + step + " steps";
        step += 1;
    }
}