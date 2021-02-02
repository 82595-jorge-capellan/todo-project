//import {ToDo} from './to-do-single.js';
//import {Project} from './project-single';
let projectCount = 0;
let projectList = [];
let miStorage = window.localStorage;
let toDoCount = 0;
var page;
class Page{
    constructor(){
        this.projectList = [];
        console.log(this);
    }
    addProject(){
        this.projectList.push(new Project);
        console.log(this);
    }
}
document.getElementById('save').onclick = function(){
    miStorage.setItem('page', JSON.stringify(page));
}
window.onload = function(){
    if(miStorage.getItem('page') === null){
        page = new Page;
        console.log('holi');
    }else{
        console.log(miStorage.getItem('page'));
        console.log('la wea');
    }
}
function date(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}
class ToDo{

    constructor(target){
        this.expanded = false;
        var self = this;
        this.active = true;
        this.element = document.createElement('div');
        this.element.classList.add('to-do');
        this.element.id = `todo${toDoCount.toString()}`;
        this.id = toDoCount.toString();
        this.self = this;
        toDoCount += 1;
        this.date = date();

        this.text = document.createElement('h6');
        this.text.classList.add('titulo');
        this.name = window.prompt('Ingresa un nombre para el proyecto: ');
        this.text.innerHTML = this.name;

        this.priority = window.prompt('ingresa un nivel de prioridad (del 1 al 10)');

        this.btnErase = document.createElement('button');
        this.btnErase.type = 'button';
        this.btnErase.classList.add('erase');

        this.spanErase = document.createElement('span');
        this.spanErase.className += 'glyphicon glyphicon-remove text-danger';
        this.btnErase.onclick = function(){
            if( window.confirm('De verdad desea borrar esta accion?')){
                self.active = false;
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
        this.btnInfo.onclick = function(){
            if(self.expanded == false){
                self.expandInfo();
            }else{
                self.unexpandInfo();
            }
            
        }

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
        document.getElementById('to-dos').insertBefore(this.element, document.getElementById("to-do-add"));
        
    }

    display(){
        if (this.active == true){
            document.getElementById('to-dos').insertBefore(this.element, document.getElementById("to-do-add"));
        }
        else{
            console.log('elemento borrado');
        }
       
    }
    expandInfo(){
        this.expanded = true;
        document.getElementById(`todo${this.id}`).style.height = '6em';
        this.text.innerHTML += `<br />Prioridad de la accion: ${this.priority}<br /> Añadido el: ${this.date}`;
        this.text.style.height = '6em';
    }
    unexpandInfo(){
        this.expanded = false;
        document.getElementById(`todo${this.id}`).style.height = '3em';
        this.text.innerHTML = this.name;
        this.text.style.height = '3em';

    }
    
}
class Project{
    
    constructor(){
        var self = this;
        projectList.push(this);
        this.toDoList = [];
        this.active = false;
        this.element = document.createElement('div');
        this.element.id = projectCount.toString();
        this.id = projectCount;
        projectCount++;
        this.element.classList.add('proyecto');
        this.element.onclick = function(){self.setActive(self.id);}

        this.titulo = document.createElement('h5');
        this.titulo.textContent = window.prompt('Como desea llamar al nuevo proyecto?');

        this.btnErase = document.createElement('button');
        this.btnErase.classList.add('erase');
        this.btnErase.type = 'button';
        this.btnErase.onclick = function(){
            if( window.confirm('De verdad desea borrar este proyecto con todos sus elementos?')){
                this.parentNode.remove();
            }
        }

        this.spanErase = document.createElement('span');
        this.spanErase.className += 'glyphicon glyphicon-remove text-danger';

        this.btnErase.appendChild(this.spanErase);
        this.element.appendChild(this.titulo);
        this.element.appendChild(this.btnErase);

        document.getElementById('projects').insertBefore(this.element, document.getElementById('project-add'));

    }
    setActive(id){
        this.active = true;
        projectList.forEach(function(item){
            try{
                document.getElementById(item.id).style.backgroundColor = '#B4A7A9';
                item.active = false;
                document.getElementById(item.id).style.color = 'rgb(51, 51, 51)';
            }catch{
                console.log(`el elemento ${item.id} fue borrado.`);
            }
            
        });
        document.getElementById(id).style.backgroundColor = '#615B4E';
        document.getElementById(id).style.color = 'white';
        this.displayToDo();
    }
    displayToDo(){
        var self = this;
        document.getElementById('to-dos').innerHTML = '<div class="to-do" id="to-do-add"><button type="button" class="add" id="add"><span class="glyphicon glyphicon-plus text-primary"></span></button></div><div class="to-do" id="blank-space"></div>';
        document.getElementById('add').onclick = function(){
            let todo = new ToDo(self.id);
            self.toDoList.push(todo);
        };
        this.toDoList.forEach(function(item){
            item.display();
        });
    }
}

document.getElementById('project-add').onclick = function(){
    page.addProject();
}
