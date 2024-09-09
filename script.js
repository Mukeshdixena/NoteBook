const apiUrl = 'https://crudcrud.com/api/c7d6f27b71d0427aa16e96374ceaf3de/notes'; 


const noteTitleInput = document.getElementById('NoteTitle');
const noteDescriptionInput = document.getElementById('noteDescription');
const notesContainer = document.getElementById('notes');
const totalNoteSpan = document.getElementById('totalNote');
const currNoteSpan = document.getElementById('currNote');
const searchInput = document.getElementById('search');


async function loadNotes() {
    try {
        const response = await axios.get(apiUrl);
        notes = response.data;
        updateNoteDisplay();
    } catch (error) {
        alert('Error loading notes:', error);
    }
}
loadNotes();


async function addNote() {
    const title = noteTitleInput.value.trim();
    const description = noteDescriptionInput.value.trim();
    
    if (title && description) {
        const newNote = { title, description };
        try {
            await axios.post(apiUrl, newNote);
            noteTitleInput.value = '';
            noteDescriptionInput.value = '';
            loadNotes(); 
        } catch (error) {
            console.error('Error adding note:', error);
        }
    } else {
        alert('Please fill in both the title and description.');
    }
}


function updateNoteDisplay() {
    
    notesContainer.innerHTML = '';
    
    
    const searchTerm = searchInput.value.toLowerCase();
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm) || 
        note.description.toLowerCase().includes(searchTerm)
    );

    
    filteredNotes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.description}</p>
            <button onclick="deleteNote('${note._id}')">Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
    });


    totalNoteSpan.textContent = notes.length;
    currNoteSpan.textContent = filteredNotes.length;
}


async function deleteNote(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        loadNotes(); 
    } catch (error) {
        console.error('Error deleting note:', error);
    }
}


searchInput.addEventListener('input', updateNoteDisplay);
