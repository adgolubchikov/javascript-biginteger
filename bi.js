'use strict';
function add(a,b) {
	//adding two big positive integer numbers
	a=a.toString();
	b=b.toString();
	let i=0,next=0, res=[], tmp=0, addminus=false;

	if ((a[0]=='-') && (b[0]!='-')) { return sub(b, a.substr(1,a.length-1)); } // equiv b-a
	if ((a[0]!='-') && (b[0]=='-')) { return sub(a, b.substr(1,b.length-1)); } // equiv a-b
	if ((a[0]=='-') && (b[0]=='-')) { addminus=true; a=a.substr(1,a.length-1); b=b.substr(1,b.length-1); } //equiv -(a+b)
	
	
	while(a.length != b.length) {
		//adding leading zeros, for example 500+6 will be 500+006
		if (a.length < b.length) { a='0'+a; } else { b='0'+b; }
	}


	for (i=a.length-1;i>=0;i--) {
		tmp=next+parseInt(a[i])+parseInt(b[i]);
		if (tmp>9) { next=Math.floor(tmp/10);} else {next=0};
		res.push((tmp%10).toString());
	}
	if (next!=0) { res.push(next.toString()); }
	
	
	res.reverse();
	
	if (addminus) {
		return '-'+res.join('');
	}
	else {
		return res.join('');
	}	
}

function sub(a,b) {
	//substracting a-b
	a=a.toString();
	b=b.toString();
	let i=0, j=0, res=[], tmp=0;
	
	if ((a[0]=='-') && (b[0]!='-')) { return '-'+add(b, abs(a)); } // equiv -(a+b)
	if ((a[0]!='-') && (b[0]=='-')) { return add(a, abs(b)); } // equiv a+b
	if ((a[0]=='-') && (b[0]=='-')) { return sub(abs(b), abs(a)); } //equiv b-a
	
	if (!isbigger(a, b)) { return '-'+sub(b, a); } //if b bigger than then result will be -(b-a)
	
	//now, a is bigger than b

	
	while(a.length != b.length) {
		//adding leading zeros, for example 500-6 will be 500-006
		b='0'+b;
	}
	
	a=a.split('');
	b=b.split('');



	for (i=a.length-1;i>0;i--) {
		tmp=parseInt(a[i])-parseInt(b[i]);
		if (tmp<0) {
			//digit a is less than b, so decrement previous digit if it is > 0
			res.push(tmp+10);
			for (j=i-1; j>=0; j--) {
				if (parseInt(a[j])==0) {
					a[j]=9;
				}
				else {
					a[j]=parseInt(a[j])-1;
					break;
				}
			}
		}
		else {
			res.push(tmp); //digit a is bigger than b, just pushing the difference
		};
	}
	res.push(parseInt(a[0])-parseInt(b[0]));
	
	
	res.reverse();
	i=0;
	while (res[i]==0) { res.shift(); } //removing leading zeros
	
	if (res.length==-0) { res.push(0); }
	
	return res.join('');
		
}

function abs(a) {
	a=a.toString();
	if (a[0]=='-') { return a.substr(1, a.length-1); } else { return a+''; }
}

function sign(a) {
	a=a.toString();
	if (a=='0') { return 0; }
	if (a[0]=='-') { return -1; } else { return 1; }
}

function div(a, b) {
	a=a.toString();
	b=b.toString();
	
	if (b=='0') { return 'NaN'; } //division by zero
	if (a=='0') { return '0'; }
	
	let temp=''; let ost='';
	let res=[];
	let i,j; i=0;
	
	if ((sign(a)==1) && (sign(b)==1)) {
		//both a and b are positive
		if (a==b) { return '1'; }
		if (isbigger(b, a)) { return '0'; }
		
		while (isbigger(a,b)) {
		
		    //splitting to two parts, like in school long division
		    if ((isbigger(a.substr(0,b.length),b)) && (b!=a.substr(0, b.length))) {
			    temp=a.substr(0,b.length);
			    ost=a.substr(b.length, a.length-b.length);
		    }
		    else {
			    temp=a.substr(0,b.length+1);
			    ost=a.substr(b.length+1, a.length-b.length-1);
		    }
		
		    res[i]=0;
		
		    while (isbigger(temp, b)) {
			    temp=sub(temp, b);
			    res[i]++;
		    }
		
		
		    if ((ost!='') && !isbigger((temp+ost).substr(0,b.length),b)) { for (j=0; j<b.length-temp.length; j++) { i++; res[i]=0;  } } //adding zeros if moving more than one digit right
		
		    a=temp+ost;
		    i++;
		
		
	    }
	    
	    
	    if (a=='0') { res.pop(); } //if mod became empty, removing extra zero
	
		return res.join('');
	} 
	
	if ((sign(a)==-1) && (sign(b)==1)) {
		let temp=div(abs(a), b);
		if (temp=='0') { return '0'; }
		if (mul(temp, b)==abs(a)) {
			//mod=0
			return '-'+temp;
		}
		else {
			return '-'+add(1,temp);
		}
	}
	
	if ((sign(a)==-1) && (sign(b)==-1)) {
		let temp=div(abs(a), abs(b));
		if (temp=='0') { return '0'; }
		if (mul(temp, abs(b))==abs(a)) {
			//mod=0
			return temp;
		}
		else {
			return add(1,temp);
		}		
	}
	
	if ((sign(a)==1) && (sign(b)==-1)) {
		let temp=div(a, abs(b));
		if (temp=='0') { return '0'; }
		return '-'+temp;
	}
}


function mod(a, b) {
	a=a.toString();
	b=b.toString();
	if (b=='1') { return '0'; }
	if (b=='0') { return 'NaN'; }
	
	return sub(a, mul(b, div(a, b)));
}

function sqr(a) { return mul(a, a); }

function pow(a, b) {
	let res='1';
	for (let i=0;i<parseInt(b);i++) {
		res=mul(res, a);
	}
	return res;
}

function fibo(n) {
	//fibonacci N-th number
	let last='1', prelast='1', res='', i=0;
	for (i=2;i<n;i++) {
		res=add(last,prelast);
		prelast=last;
		last=res;
	}
	return res;
}

function fact(n) {
	//factorial calculation
	let res='1';
	let i=2;
	
	for (i=2; i<=n; i++) {
		res=mul(res, i);
	}
	
	return res;
}

function isbigger(a, b) {
	a=a.toString();
	b=b.toString();
	//returns true if a>=b and false if a<b
	if (a==b) { return true; }
	if (sign(a)>sign(b)) { return true; } //if a is positive (or zero) and b is negative (or zero)
	if (sign(b)>sign(a)) { return false; } //if b is positive (or zero) and a is negative (or zero)
	if (sign(a)==-1) { return isbigger(abs(b), abs(a)); } //if we have two negatives, we can reverse compare their absolute value
	//now, both a nd b are positive or zero
	if (a.length>b.length) { return true; }
	if (b.length>a.length) { return false; }
	//now, a and b have the same length
	let i;
	
	for (i=0;i<a.length;i++) {
		if (parseInt(a[i])>parseInt(b[i])) { return true; }
		if (parseInt(a[i])<parseInt(b[i])) { return false; }
		//comparing each digit beginning from the biggest, if it is bigger => this number is bigger, if equal then looking next digit
	}
}

function max(a, b) {
	if (isbigger(a, b)) { return a; } else { return b; }
}

function min(a, b) {
	if (isbigger(a, b)) { return b; } else { return a; }
}


function mul(a, b) {
	a=a.toString();
	b=b.toString();
	let addminus=false, res=[], i, j, temp;
	if ((a[0]=='-') && (b[0]!='-')) { addminus=true; a=a.substr(1,a.length-1); } //if a is negative then cutting the minus and remember it
	if ((a[0]!='-') && (b[0]=='-')) { addminus=true; b=b.substr(1,b.length-1); } //if b is negative then cutting the minus and remember it 
	if ((a[0]=='-') && (b[0]=='-')) { a=a.substr(1,a.length-1); b=b.substr(1,b.length-1);} //if both are negative then just cutting the minus

	
    for (i=0; i<a.length+b.length; i++) {
		//making array for the result, maximum size = sum of sizes
		res.push(0);
	}
	
	//classical long multiplication below
    for (i=a.length-1; i>= 0; i--) {
        for (j=b.length-1; j>=0; j--) {
            temp=parseInt(a[i])*parseInt(b[j]);
            temp+=res[i+j+1];
            res[i+j+1]=temp%10;
            res[i+j]+=Math.floor(temp/10);
        }
    }
    while (res[0]==0) {
		//removing leading zeros
        res.shift();
    }
    if (res.length==0) return '0';
    if (addminus) { return '-'+res.join(''); } else { return res.join(''); }//if result is negative adding minus
};



String.prototype.add=function(b){ return add(this, b); }
String.prototype.sub=function(b){ return sub(this, b); }
String.prototype.mul=function(b){ return mul(this, b); }
String.prototype.div=function(b){ return div(this, b); }
String.prototype.mod=function(b){ return mod(this, b); }
String.prototype.sqr=function(){ return sqr(this); }
String.prototype.abs=function(){ return abs(this); }
String.prototype.sign=function(){ return sign(this); }
String.prototype.pow=function(b){ return pow(this, b); }

