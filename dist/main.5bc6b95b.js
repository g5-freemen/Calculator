parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"d6sW":[function(require,module,exports) {
var _this=this,result=document.querySelector(".calc-display--result"),previousOperandText=document.querySelector(".calc-display--operation"),currentOperandText=document.querySelector(".calc-display--input"),calcPad=document.querySelector(".calc-pad"),ResultFontSize=parseFloat(document.defaultView.getComputedStyle(result).fontSize),PrevFontSize=parseFloat(document.defaultView.getComputedStyle(previousOperandText).fontSize),InputFontSize=parseFloat(document.defaultView.getComputedStyle(currentOperandText).fontSize),maxDigits=10;function Calculator(previousOperandText,currentOperandText,result){this.previousOperandText=previousOperandText,this.currentOperandText=currentOperandText,this.result=result,this.currentOperand="",this.previousOperand="",this.operation=void 0,this.resulting="",this.expression="",this.showResult=function(){function e(e,t){e.style.fontSize=t+"px";for(var r=t;.96*calcPad.clientWidth<e.clientWidth;)r--,e.style.fontSize=r+"px"}this.currentOperand&&(this.previousOperandText.innerText="".concat(this.expression).concat(this.currentOperand," "),this.currentOperandText.innerText="",this.result.innerText=this.resulting,this.currentOperand="",e(currentOperandText,InputFontSize),e(previousOperandText,PrevFontSize),e(result,ResultFontSize))},this.clearAll=function(){this.currentOperand="",this.previousOperand="",this.operation=void 0,this.resulting=""},this.computePercent=function(){this.currentOperand&&(this.previousOperandText.innerText="".concat(this.expression).concat(this.currentOperand,"%"),this.currentOperandText.innerText="",this.previousOperandText.innerText.includes("×")&&(this.operation="*"),this.previousOperandText.innerText.includes("÷")&&(this.operation="/"),this.x=eval(parseFloat(this.expression)+this.operation+parseFloat(this.expression)/100*parseFloat(this.currentOperand)),this.result.innerText=this.x,this.currentOperand="")},this.appendNumber=function(e){this.resulting="",this.result.innerText=this.resulting,"."===e&&this.currentOperand.includes(".")||"0"===this.currentOperand&&"0"===e||this.currentOperand.length<=maxDigits&&("."!==e||this.currentOperand||(this.currentOperand="0"),this.currentOperand+=e.toString())},this.deleteDigit=function(){this.currentOperand.length>0&&(this.currentOperand=this.currentOperand.slice(0,length-1),calculator.updateDisplay())},this.reverse=function(){this.currentOperand.includes("-")?this.currentOperand=this.currentOperand.replace("-",""):this.currentOperand&&(this.currentOperand="-"+this.currentOperand),this.currentOperandText.innerText=this.currentOperand},this.chooseOperation=function(e){this.previousOperand&&calculator.compute(),result.innerText?this.previousOperand=result.innerText+e:this.previousOperand=this.currentOperand+e,this.operation=e,this.currentOperand="",this.expression=this.previousOperand},this.compute=function(){var e,t=parseFloat(this.previousOperand),r=parseFloat(this.currentOperand);isNaN(t)||isNaN(r)||("+"==this.operation&&(e=t+r),"-"==this.operation&&(e=t-r),"×"==this.operation&&(e=t*r),"÷"==this.operation&&(e=t/r),this.resulting=e,this.operation=void 0,this.previousOperand="",this.lastOperation=0)},this.updateDisplay=function(){this.currentOperandText.innerText=this.currentOperand,this.previousOperandText.innerText=this.previousOperand,this.result.innerText=this.resulting}}function highlightBtn(e){if(e){var t=e.style.background;e.style.background="#bbb",setTimeout(function(){return e.style.background=t},99)}}setInterval(function(){currentOperandText.innerText||(currentOperandText.innerText="0")},66),window.addEventListener("resize",function(){location.reload()});var calculator=new Calculator(previousOperandText,currentOperandText,result);document.addEventListener("keydown",function(e){var t;(e.key.match(/[1234567890\*\+/=%\.-]/)||13==e.keyCode||27==e.keyCode)&&(e.key.match(/[1234567890\+\.=%-]/)?t=calcPad.querySelector('[value="'.concat(e.key,'"]')):"/"==e.key?t=calcPad.querySelector('[value="÷"]'):"*"==e.key?(t=calcPad.querySelector('[value="×"]'),_this.operation):13==e.keyCode?t=calcPad.querySelector('[value="="]'):27==e.keyCode&&(t=calcPad.querySelector('[value="C"]')),highlightBtn(t));e.key==+e.key||"."==e.key?(calculator.appendNumber(e.key),calculator.updateDisplay()):e.key.match(/[\*\+/-]/)?("/"==e.key?calculator.chooseOperation("÷"):"*"==e.key?calculator.chooseOperation("×"):calculator.chooseOperation(e.key),calculator.updateDisplay()):"="==e.key||"Enter"==e.key?(calculator.compute(),calculator.showResult()):"Escape"==e.key?(calculator.clearAll(),calculator.updateDisplay()):"Backspace"==e.key?calculator.deleteDigit():"%"==e.key&&calculator.computePercent()}),calcPad.addEventListener("click",function(e){var t=e.target.value;e.target.className.includes("button")&&(highlightBtn(e.target),t==+t||"."==t?(calculator.appendNumber(t),calculator.updateDisplay()):e.target.className.includes("colorOper")?(calculator.chooseOperation(t),calculator.updateDisplay()):"C"==t?(calculator.clearAll(),calculator.updateDisplay()):"%"==t?calculator.computePercent():"±"==t?(calculator.reverse(),calculator.updateDisplay()):"="==t&&(calculator.compute(),calculator.showResult()))});
},{}]},{},["d6sW"], null)
//# sourceMappingURL=main.5bc6b95b.js.map