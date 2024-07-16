class Note {
    constructor(id, description, highImportance = false) {
        this.id = id;
        this.description = description;
        this.highImportance = highImportance;
    }

    toggleImportance() {
        this.highImportance = !this.highImportance;
    }
}

class NotesManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.loadNotes();
    }

    addNote(description) {
        const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1;
        const note = new Note(id, description);
        this.notes.push(note);
        this.saveNotes();
        this.renderNotes();
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    updateNote(id,description) {
        const note = this.notes.find(note => note.id === id);
        note.description = description;
        this.saveNotes();
        this.renderNotes();
    }

    toggleNoteImportance(id) {
        const note = this.notes.find(note => note.id === id);

        if (note) {
            const noteInstance = new Note(note.id, note.description, note.highImportance);
            noteInstance.toggleImportance();
            this.notes = this.notes.map(n => (n.id === id ? noteInstance : n));
            this.saveNotes();
            this.renderNotes();
        }else{
            alert("nota no encontrada")
        }
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    loadNotes() {
        this.renderNotes();
    }

    renderNotes() {
        const notesList = document.getElementById('notes-list');
        console.log(notesList);
        notesList.innerHTML = '';

        this.notes.forEach(note => {
            const item = document.createElement('li');
            item.textContent = note.description;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar Nota';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); 
                this.deleteNote(note.id);
            });

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Actualizar Nota';
            updateButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const $inputNewNoteInfo = document.createElement('INPUT');
                const $buttonSend = document.createElement('button');
                $buttonSend.textContent = 'Actualizar'
                $buttonSend.addEventListener('click', () => {
                    this.updateNote(note.id, $inputNewNoteInfo.value);
                })

                item.append($inputNewNoteInfo, $buttonSend);
            });

            const changeImportanceBtn = document.createElement("button");
            changeImportanceBtn.textContent = 'Cambiar Importancia';

            changeImportanceBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleNoteImportance(note.id);
            });

            const noteImportance = document.createElement("p");

            if(!note.highImportance){
                noteImportance.textContent = 'Importancia baja' 
            }else{
                noteImportance.textContent = 'Importancia Alta'
            }

            item.append(deleteButton, updateButton, changeImportanceBtn, noteImportance);
           notesList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const notesManager = new NotesManager();

    let a= document.getElementById('add-note');
    console.log(a);
    a.addEventListener('click', () => {
        const newNote = document.getElementById('new-note').value;
        if (newNote) {
            notesManager.addNote(newNote);
            document.getElementById('new-note').value = '';
        }
    });
});