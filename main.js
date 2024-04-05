document.getElementById('addItem').addEventListener('click', () => {
    const itemContent = document.getElementById('userInput')
    if(itemContent.value.trim() !== ''){
        addItemTodoList(itemContent.value.trim())
        itemContent.value = "";
    }else{
        itemContent.value = "";
    }
})

document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const itemContent = document.getElementById('userInput');
        if (itemContent.value.trim() !== '') {
            addItemTodoList(itemContent.value.trim());
            itemContent.value = '';
        }else{
            itemContent.value = ''
        }
    }
});


function addItemTodoList(text){
    const itemList = document.querySelector('ul')
    
    const listItem = document.createElement('li');
    const newListParag = document.createElement('p');
    const listButtonContainer = document.createElement('div');
    const listCheckmarkButton = document.createElement('button');
    const listEditButton = document.createElement('button');
    const listDeleteButton = document.createElement('button');

    newListParag.textContent = text;
    newListParag.className = 'paragraph';
    listItem.appendChild(newListParag);

    listButtonContainer.className = 'buttons';
    listCheckmarkButton.className = 'checkmark';
    listCheckmarkButton.textContent = '✓'
    listButtonContainer.appendChild(listCheckmarkButton);

    listEditButton.className = 'edit';
    listEditButton.textContent = 'Edit'
    listButtonContainer.appendChild(listEditButton);

    listDeleteButton.className = 'delete';
    listDeleteButton.textContent = 'Delete'
    listButtonContainer.appendChild(listDeleteButton);

    listItem.appendChild(listButtonContainer);

    itemList.appendChild(listItem);

    let done = false;
    let editing = false;

    if(!editing){

    }

    listCheckmarkButton.addEventListener('click', () => {
        const todo = listItem.querySelector('.paragraph');
        if(done == false){
            let delElement = document.createElement('del');
            delElement.innerText = todo.innerText;
            delElement.className = 'paragraph';
            todo.parentNode.replaceChild(delElement, todo);
            done = true;
        }else{
            let unDone = document.createElement('p');
            unDone.innerText = todo.innerHTML;
            unDone.className = 'paragraph';
            todo.parentElement.replaceChild(unDone, todo);
            done = false;
        }
    });

    

    listEditButton.addEventListener('click', () => {
        const todo = listItem.querySelector('.paragraph');

        if (!editing) {
            // Replace paragraph with input field
            editing = true;
            const replace = document.createElement('input');
            replace.className = 'paragraph editInput';
            replace.value = todo.textContent; // Preserve existing text
            todo.parentNode.replaceChild(replace, todo);

            document.addEventListener('keypress', handleEnterKeyPress);
        } else {
            // Replace input field with paragraph
            const replace = document.createElement('p');
            const editedTodo = document.getElementsByClassName('editInput');
            replace.className = 'paragraph';
            replace.textContent = todo.value;
            todo.parentNode.replaceChild(replace, todo);
            editing = false;
        }

        
    });
    function handleEnterKeyPress(event) {
        if (event.key === 'Enter') {
            const todo = listItem.querySelector('.paragraph');
            const replace = document.createElement('p');
            replace.className = 'paragraph';
            replace.textContent = event.target.value; // Use event.target.value to get input field value
            todo.parentNode.replaceChild(replace, todo);
    
            // Toggle editing mode
            editing = false;
    
            // Remove event listener for Enter key
            document.removeEventListener('keypress', handleEnterKeyPress);
        }
    }

    listDeleteButton.addEventListener('click', () => {
        listItem.remove();
    })

}