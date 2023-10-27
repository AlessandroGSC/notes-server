import '../App.css';
import '../styles/global.css';
import { useEffect, useState } from 'react';
import { Modal, FloatButton, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NotesList from '../components/NotesList';
import Contador from '../components/Contador';
import BuscadorNotas from '../components/BuscadorNotas';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar'
import axios from 'axios';

const { TextArea } = Input;

function Home() {
    //Usar navigate('/ruta del app')
    const navigate = useNavigate();
  const rootStyles = getComputedStyle(document.documentElement);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const colorPrimario = rootStyles.getPropertyValue('--color-primario');
  const colorLight = rootStyles.getPropertyValue('--color-light');
  const colorFondo = rootStyles.getPropertyValue('--color-fondo');
  const colorSecundario = rootStyles.getPropertyValue('--color-secundario');
  const color4 = rootStyles.getPropertyValue('--color4');
  const color5 = rootStyles.getPropertyValue('--color5');

  const [modalAddNote, setModalAddNote] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [notesList, setNotesList] = useState([]);
  const filteredNotes = notesList.filter((note) =>
    note.note.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [validations, setValidations] = useState({});

  const [contadorNotasCompletadas, setContadorNotasCompletadas] = useState(0);

  // context para alertas ant design
  const [success, contextHolder] = message.useMessage();

  /**
   * Función para manejar el cambio de texto del input y actualizar estado
   *
   * @param {Object} txt - objecto de input para acceder a valores
   */
  const handleChangeInput = (txt) => {
    setNoteText(txt.target.value);
  };

  /**
   * Función para mostrar y reiniciar valores de texto de input
   */
  const handleShowModal = () => {
    setNoteText('');
    setValidations({});
    setModalAddNote(!modalAddNote);
  };

  /**
   * Función para validar y guardar nota
   */
  const saveNote = async () => {
    // Validamos que el texto no este vació o tenga saltos de linea
    if (noteText.trim() !== '') {
      const id = new Date().getTime().toString();
      await axios.post("http://localhost:3001/api/note", { note: noteText, noteDone: false })
      .then(function (response) {
        setNotesList([...notesList, { id: id, note: noteText, noteDone: false }]);
        setModalAddNote(false);
        successAlert();
        setValidations({});
      })
      .catch(function (error) {
        console.log(error);
      })
      

    } else {
      setValidations({
        ...validations,
        inpNote: 'El texto de la nota no puede estar vacio.',
      });
    }
  };

  const completarNota = (noteId) => {
    const newNotes = notesList.map((note) => {
      if (note.id === noteId) {
        setContadorNotasCompletadas(contadorNotasCompletadas + 1);
        return { ...note, noteDone: true };
      }
      return note;
    });
    completedAlert();
    setNotesList(newNotes);
  };

  const successAlert = () => {
    success.open({
      type: 'success',
      content: 'Nota guardada correctamente',
      duration: 6,
    });
  };

  const completedAlert = () => {
    success.open({
      type: 'success',
      content: 'Nota finalizada',
      duration: 2,
    });
  };

  const getNotes = async () => {
    await axios.get('http://localhost:3001/api/note')
      .then(function (response) {
        setNotesList(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    getNotes()
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notesList));
  }, [notesList]);
  const eliminarNota = (noteId) => {
    const noteToDelete = notesList.find((note) => note.id === noteId);
    if (noteToDelete && noteToDelete.noteDone) {
      setContadorNotasCompletadas(contadorNotasCompletadas - 1);
    }
    const newNotes = notesList.filter((note) => note.id !== noteId);
    setNotesList(newNotes);
  };
  return (
    <div className="App">
      <h1>Aplicación para crear notas</h1>
      {/*CONTADOR */}
      {/* <Contador contadorNotasCompletadas={contadorNotasCompletadas} /> */}
      {/* Buscador */}
      {/* <BuscadorNotas onSearchChange={handleSearchChange} /> */}
      {/* Lista de notas */}
      <NotesList
        notes={filteredNotes}
        completarNota={completarNota}
        eliminarNota={eliminarNota}
      />
      
      {/* Modal agregar nota */}
      <Modal
        title="Agregar nota"
        centered
        open={modalAddNote}
        onOk={() => saveNote()}
        okText="Guardar"
        onCancel={() => setModalAddNote(false)}
        cancelText="Cancelar"
        okButtonProps={{
          style: {
            background: colorPrimario,
            borderColor: colorPrimario,
            color: colorLight,
          },
        }}
      >
        <TextArea
          value={noteText}
          onChange={handleChangeInput}
          rows={3}
          placeholder="Escribe una nota..."
        />
        {'inpNote' in validations && (
          <p className="error-text">{validations.inpNote}</p>
        )}
      </Modal>

      {/* Botón flotante mostrar modal */}
      <FloatButton
        onClick={() => handleShowModal()}
        type="secondary"
        icon={<PlusOutlined />}
        size="large"
        style={{
          backgroundColor: colorPrimario,
          color: colorLight,
        }}
      />

      {/* Renderizamos context alert */}
      {contextHolder}
    </div>
  );
}

export default Home;
