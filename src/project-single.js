let projectCount = 0;
let projectList = [];
export class Project{

    
    constructor(){
        projectList.push(this);
        var self = this;
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
        document.getElementById('to-dos').innerHTML = '<div id="to-dos"><div class="to-do" id="to-do-add"><button type="button" class="add" id="add"><span class="glyphicon glyphicon-plus text-primary"></span></button></div><div class="to-do" id="blank-space"></div></div>';
        document.getElementById('add').onclick = function(){
            let item = new ToDo(item.id);
        };
        this.toDoList.forEach(function(item){
            item.display();
        })
    }
}