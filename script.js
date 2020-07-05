'use strict';

function id(e){return document.getElementById(e);}


function calculate() {
	let a=id('a').value;
	let b=id('b').value;
	let res='';
	
	let action=parseInt(document.select.options.value);
	
	const t1=performance.now();
	switch (action) {
		case 1:
		res=add(a, b);
		break;
		case 2:
		res=sub(a, b);
		break;
		case 3:
		res=mul(a, b);
		break;
		case 4:
		res=div(a, b);
		break;
		case 5:
		res=mod(a, b);
		break;
		case 6:
		res=pow(a, b);
		break;
		case 7:
		res=fibo(a);
		break;
		case 8:
		res=fact(a);
		break;
	}

	
	const t2=performance.now();
	
	id('result').innerHTML=res;
	id('performance').innerHTML='Calculation time: '+(Math.round((t2-t1)*100)/100)+' ms';
}

