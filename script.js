const task = [];

const taskdone = [];

const AddButton = '<button id="Add Button", onclick="AddNewLine();">+</button>'
let helpbool = false

function help() {
    if (helpbool) {
        document.getElementById("helpdiv").innerHTML = "";
        document.getElementById("helpbutton").value= "Help ?";
        helpbool = false;
    } else {
        document.getElementById("helpdiv").innerHTML = '<p>Click on refresh to get started</p><p>Click on "+" to create a new task</p><p>click on a task (or checkbox) to mark it has "completed"</p><p> Middle click a task (text only) to delete it</p>';
        document.getElementById("helpbutton").value = "Close";
        helpbool = true;
    }
};

function AddNewLine() {
    task.push(null);
    Refresh();
};

function CancelAdd() {
    task.splice(task.length-1,1);
    Refresh();
};

function AproveAdd() {
    let pos = task.indexOf(null)
    task[pos] = document.getElementById("AddNewText").value
    Refresh();
};

function check(id) {
    taskdone[id] = !taskdone[id]
    Refresh();
}

function DeleteTask(id) {
    task.splice(id,1);
    taskdone.splice(id,1);
    Refresh();
    Refresh();
}

function textbutton(event,id) {
    if (event.button == 0) {
        check(id)
    } else if (event.button == 1){
        DeleteTask(id)
    }
}

function onkeydowntextinput(event) {
    if(event.keyCode==13){
        AproveAdd();
    }
}

function Refresh() {
        let len = task.length;
        let modifing = false
        let text = "";
        for (let i = 0; i < len; i++) {
            if (task[i] === null) {
                modifing = true
                text += '<li> <label> New Task : </label><input type ="text", id ="AddNewText", onkeydown="onkeydowntextinput(event);"> <button onclick="AproveAdd();">Add</Button>   <button onclick="CancelAdd();">Cancel</button></li>'
            } else {
                if(taskdone[i]){
                    textchecked = "checked"
                    classtext = "class='checked'"
                } else {
                    textchecked = ""
                    classtext=""
                }
                text += "<li> <input type='checkbox' id='"+i+"' "+textchecked+" onclick='check(this.id);'>" + "<label "+classtext+" onmousedown='textbutton(event,"+i+");'>"+ task[i] +"</label>" + "</li>";
            }
        }
        if (modifing){
            document.getElementById("Todo List Div").innerHTML = "<ul>" + text + "</ul>";
        } else {
            document.getElementById("Todo List Div").innerHTML = "<ul>" + text + "<li>"+ AddButton +"</li>" + "</ul>";
        }
    };

