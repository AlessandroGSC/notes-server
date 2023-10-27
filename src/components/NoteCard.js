import React from 'react';
import { Button } from 'antd';
import { DeleteFilled, CheckCircleFilled } from '@ant-design/icons';

export default function NoteCard({ note, completarNota, eliminarNota }) {
    const handleCompletarNota = () => {
        // Llama a la función completarTarea para cambiar el sstado
        completarNota(note.id);
    };
    const handleEliminarNota = () => {
        // Llama a la función completarTarea para cambiar el sstado
        eliminarNota(note.id);
    };

    return (
        <div className={note.noteDone ? 'note-done-card' : 'note-card'}>
            <div className='note-detail'>
                <h3 className='note-title'>{note.note}</h3>
            </div>
            <div className='note-options'>
                {note.noteDone !== true && (
                    <div>
                        <Button
                            shape='circle'
                            icon={<CheckCircleFilled />}
                            className='icon-done'
                            onClick={handleCompletarNota}
                        />
                        <Button
                            shape='circle'
                            icon={<DeleteFilled />}
                            className='icon-delete'
                            onClick={handleEliminarNota}
                        />
                    </div>
                )}
                {note.noteDone && (
                    <div>
                        <div className='container-delete'>
                            <Button
                                shape='circle'
                                icon={<DeleteFilled />}
                                className='icon-delete'
                                onClick={handleEliminarNota}
                            />
                        </div>
                        <div className='container-done'>
                            <CheckCircleFilled className='icon-note-done' />
                            <h4 className='text-done'>Completada</h4>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
