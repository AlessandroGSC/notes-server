import React from 'react';
import NoteCard from './NoteCard';
import '../styles/notes.css';

export default function NotesList({ notes, completarNota, eliminarNota }) {
    // Ordenamos array de notas de manera descendente por id
    const sortedNotes = notes.sort((a, b) => {
        const idA = parseInt(a.id);
        const idB = parseInt(b.id);
        return idB - idA;
    });

    return (
        <div className='container-notes-list'>
            {sortedNotes.map((nt) => (
                <NoteCard
                    note={nt}
                    completarNota={completarNota}
                    eliminarNota={eliminarNota}
                />
            ))}
        </div>
    );
}
