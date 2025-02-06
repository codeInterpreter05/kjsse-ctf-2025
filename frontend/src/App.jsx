import { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import './App.css';

const GET_NOTE_BY_ID = gql`
  query ($id: ID!) {
    noteById(id: $id) {
      id
      content
    }
  }
`;

function App() {
  const [noteId, setNoteId] = useState('');
  const [getNote, { loading, error, data }] = useLazyQuery(GET_NOTE_BY_ID);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (noteId.trim() === '') return;
    getNote({ variables: { id: noteId } });
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Notes App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label htmlFor="noteId" className="block text-lg font-medium mb-2 text-gray-800">
          Enter Note ID:
        </label>
        <input
          type="text"
          id="noteId"
          value={noteId}
          onChange={(e) => setNoteId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-700"
        >
          Fetch Note
        </button>
      </form>
      {loading && <p className="text-lg text-gray-800">Loading...</p>}
      {error && (
        <p className="text-red-500 text-lg">
          Error: {error.message.split(':')[1].trim()}
        </p>
      )}
      {data && (
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md mt-4">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Content of Note {data.noteById.id}
          </h2>
          <p className="text-lg text-gray-800">{data.noteById.content}</p>
        </div>
      )}
    </div>
  );
}

export default App;