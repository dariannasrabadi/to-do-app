$(document).ready(onReady);

function onReady() { //Start of document listeners
    $('#addTask').on('click', addTask);
    // $('#deleteTask').on('click', deleteTasks)
    getTasks();
    setDate();
}; //End of document listeners

function setDate() { // Start of set date function - used in listener
    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    $('#dateInput').val(today); 
}; // End of set date function - used in listener


function addTask() { //Start of addTask Function - Used in listener
    
    let dataToSend = {
        category: $('#category').val(),
        task: $('#textBox').val(),
        due_date: $('#dateInput').val()
    };
    console.log(dataToSend);
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: dataToSend,
        success: (response)=>{
            console.log('Inside addTask POST ajax: ', response);
            getTasks();
        },
        error: ()=>{
            alert('Error was received when adding Task')
        }
    })

}; //End of addTask Function - Used in listener

function getTasks() { //Start of getTasks Function - Used as a listener and in the ff functions: addTasks, deleteTasks.
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: (response)=>{
            console.log('Inside getTask GET ajax: ', response);
            displayAllData(response)
        },
        error: ()=>{
            alert('Error was received in retrieving the data')
        }
    })
}; //Start of getTasks Function - Used as a listener and in the ff functions: addTasks, deleteTasks.

function displayAllData(response) { // Start of displayAllData function - Used in getTasks AJAX function 
    $('#tableBody').empty();
    for (let i=0; i < response.length; i++) {
        displayData(response[i]);
    };
}; // Start of displayAllData function - Used in getTasks AJAX function 

function displayData(response) { //Start of displayData function - used in displayAllData function
    let statusNow;
    if (response.completion_status == true) {
        statusNow = 'Complete!'
    }
    else{
        statusNow = '<button class="incompleteButton">INCOMPLETE</button>'
    }
    if (response.categories_id == response.id) {
        $trow = $(`<tr>`);
        $trow.append(`<td>${response.category}</td>`)
        $trow.append(`<td>${response.task}</td>`)
        $trow.append(`<td>${statusNow}</td>`)
        $trow.append(`<td>${response.due_date.substr(0, 10)}</td>`)
        $trow.append('<input type="checkbox" class="selectThis">')
        $('#tableBody').append($trow);
        console.log($trow); 
    }
    console.log('displayData done');
}; //END of displayData function - used in displayAllData function