$(document).ready(onReady);

function onReady() { //Start of document listeners
    $('#addTask').on('click', addTask);
    $('#tableBody').on('click', '.deleteThis', deleteTasks)
    $('#tableBody').on('click', '.incompleteButton', updateStatus)
    getTasks();
    setDate();
    /*$('#tableBody').on('click', '.selectThis', ()=>{
        console.log($(this).parents('.selectThis').data()); -- .DATA DID NOT WORK FOR ME
    }) */
}; //End of document listeners

function setDate() { // Start of set date function - used in listener
    let now = new Date();
    let day = ("0" + now.getDate()).slice(-2);
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    $('#dateInput').val(today); 
}; // End of set date function - used in listener


function addTask() { //Start of addTask Function - Used in listener
    if ($('#category').val() == '' || $('#textBox').val() == '' || $('#dateInput').val() == '') {
        alert('Please fill out all areas and select a due date')
    }
    else {
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
    }

}; //End of addTask Function - Used in listener

function getTasks() { //Start of getTasks Function - Used as a listener and in the ff functions: addTasks, deleteTasks, updateStatus.
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
}; //Start of getTasks Function - Used as a listener and in the ff functions: addTasks, deleteTasks, updateStatus.

function displayAllData(response) { // Start of displayAllData function - Used in getTasks AJAX function 
    $('#tableBody').empty();
    for (let i=0; i < response.length; i++) {
        displayData(response[i]);
    };
}; // Start of displayAllData function - Used in getTasks AJAX function 

function displayData(response) { //Start of displayData function - used in displayAllData function
    let statusNow;
    let addDate;
    if (response.completion_status == true) {
        statusNow = '<td class="finished text-center">Task Is Done!</td>'
        $trow = $(`<tr class="bg-success">`);
        addDate = `<td class="text-center">${response.due_date.substr(0, 10)}</td>`
    }
    else{
        if (response.due_date < getCurrentDay()) {
            statusNow = `<td><button class="incompleteButton w-100" value="${response.tasks_id}">Mark Finished</button></td>`
            $trow = $(`<tr class="bg-danger">`);
            addDate = (`<td class="text-center">${response.due_date.substr(0, 10)}</td>`)
        }
        else {
            statusNow = `<td><button class="incompleteButton w-100" value="${response.tasks_id}">Mark Finished</button></td>`
            $trow = $(`<tr>`);
            addDate = `<td class="text-center">${response.due_date.substr(0, 10)}</td>`
        }
    }
    if (response.categories_id == response.id) {
        $trow.append(`<td class="text-center">${response.category}</td>`)
        $trow.append(`<td class="text-center">${response.task}</td>`)
        $trow.append(statusNow)
        $trow.append(addDate)
        $trow.append(`<button class="deleteThis w-100" value="${response.tasks_id}">Delete</button>`) //added value because .data did not work for me. Changed input type into a button and selectThis class to deleteThis - not enough time spent to do the multiple delete option.
        $('#tableBody').append($trow);
        console.log(response.due_date.substr(0, 10), getCurrentDay());        
    
    }
    // $('.selectThis').data(response) DID NOT WORK 
    console.log('displayData done:');
    // console.log($('.bodyRow').data('response');
    
}; //END of displayData function - used in displayAllData function


function deleteTasks() {
    if (confirm('Are you sure you want to save this thing into the database?')) {
        let id = $(this).val()
        console.log('Delete id: ', id);
        $.ajax({
            method: 'DELETE',
            url: '/tasks/' + id,
            success: (response)=>{
                console.log('Inside deleteTasks DELETE ajax: ', response);
                getTasks()
            },
            error: ()=>{
                alert('Error was received in deleting the data')
            }
        })
    }
}

function updateStatus() {
    let id = $(this).val()
    console.log('PUT id: ', id);
    $.ajax({
        method: 'PUT',
        url: '/tasks/' + id,
        success: (response)=>{
            console.log('Inside updateStatus PUT ajax: ', response);
            getTasks()
        },
        error: ()=>{
            alert('Error was received in updating the data')
        }
    })
}

function getCurrentDay() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}