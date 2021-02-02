import {page} from './index.js';
let toDoCount = 0;
export class ToDo{
    constructor(target){
        this.element = document.createElement('div');
        this.element.classList.add('to-do');
        this.element.id = toDoCount.toString();
        this.id = toDoCount.toString();
        this.self = this;
        toDoCount += 1;

        this.text = document.createElement('h6');
        this.text.classList.add('titulo');
        this.text.innerHTML = window.prompt('Ingresa un nombre para el proyecto: ');

        this.btnErase = document.createElement('button');
        this.btnErase.type = 'button';
        this.btnErase.classList.add('erase');

        this.spanErase = document.createElement('span');
        this.spanErase.className += 'glyphicon glyphicon-remove text-danger';
        this.btnErase.onclick = function(){
            if( window.confirm('De verdad desea borrar esta accion?')){
            this.parentNode.remove();
            }
        };
        this.btnErase.appendChild(this.spanErase);

        this.btnInfo = document.createElement('button');
        this.btnInfo.type = 'button';
        this.btnInfo.classList.add('info');

        this.spanInfo = document.createElement('span');
        this.spanInfo.className += 'glyphicon glyphicon-align-justify text-info';
        this.btnInfo.appendChild(this.spanInfo);

        this.checkerContainer = document.createElement('div');
        this.checkerContainer.classList.add('checker-container');

        this.label = document.createElement('label');
        this.label.innerHTML = 'Done:';

        this.input = document.createElement('input');
        this.input.type = 'checkbox';
        this.input.classList.add('checker');
        this.input.value = "done";

        this.label.appendChild(this.input);
        this.checkerContainer.appendChild(this.label);

        this.element.appendChild(this.text);
        this.element.appendChild(this.btnErase);
        this.element.appendChild(this.btnInfo);
        this.element.appendChild(this.checkerContainer);
        this.display();
        
    }
    display(){
        document.getElementById('to-dos').insertBefore(this.element, document.getElementById('to-do-add'));
    }
    
}