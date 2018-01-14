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
} // End of set date function - used in listener


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

} //End of addTask Function - Used in listener

function getTasks() { //Start of getTasks Function - Used as a listener and in the ff functions: addTasks, deleteTasks.
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: (response)=>{
            console.log('Inside getTask GET ajax: ', response);
            displayData(response)
        },
        error: ()=>{
            alert('Error was received in retrieving the data')
        }
    })
} //Start of getTasks Function - Used as a listener and in the ff functions: addTasks, deleteTasks.

function displayData(response) { //Start of displayData function - used in getTasks function
    //APPEND THE RESPONSE INTO THE TABLE 
} //Start of displayData function - used in getTasks function