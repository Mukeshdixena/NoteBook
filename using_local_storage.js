
const noteTitleInput = document.getElementById('NoteTitle');
const noteDescriptionInput = document.getElementById('noteDescription');
const notesContainer = document.getElementById('notes');
const totalNoteSpan = document.getElementById('totalNote');
const currNoteSpan = document.getElementById('currNote');
const searchInput = document.getElementById('search');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
updateNoteDisplay();

function addNote() {
    const title = noteTitleInput.value.trim();
    const description = noteDescriptionInput.value.trim();
    
    if (title && description) {
        const newNote = { title, description };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteTitleInput.value = '';
        noteDescriptionInput.value = '';
        updateNoteDisplay();
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
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
    });

    totalNoteSpan.textContent = notes.length;
    currNoteSpan.textContent = filteredNotes.length;
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    updateNoteDisplay();
}

searchInput.addEventListener('input', updateNoteDisplay);
