import { useEffect, useState } from "react";

import notes from "./services/notes";
const Name = ({ user, toggleImportance }) => {
  const label = user.important ? 'Make Important' : 'Make not important'
  return (
    <div>
      {user.name} {user.number} <button onClick={() => toggleImportance(user.id)}>{label}</button>
    </div>
  );
};

const Numbers = ({ persons, toggleImportance }) => {
  return (
    <>
      {persons.map((person) => {
        return (
          <Name key={person.id} user={person} toggleImportance={toggleImportance}/>
        );
      })}
    </>
  );
};

const Notification = ({message}) => {
  const messageAddStyle = {
    color: "green",
    border: '2px green solid',
    backgroundColor: 'gray',
    borderRadius: '3px',
    padding: '1rem'
  }
  const messageErrorStyle = {
    color: "red",
    border: '2px red solid',
    backgroundColor: 'gray',
    borderRadius: '3px',
    padding: '1rem'
  }
  if(message.type === 'added') {
    return (
      <div style={messageAddStyle}>
        {message.message}
      </div>
    )
  } else if (message.type === 'error') {
    return (
          <div style={messageErrorStyle}>
            {message.message}
          </div>
        )
  }
}

const Filter = ({ handleSearch, query }) => {
  return (
    <>
      filter shown with <input value={query} onChange={handleSearch} />
    </>
  );
};

const PersonForm = ({
  onSubmit,
  newName,
  handleInputName,
  newNumber,
  handleInputNumber,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputName} />
        </div>

        <div>
          number: <input value={newNumber} onChange={handleInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] =  useState({
    message: "",
    type: ''
  })

  useEffect(()=>{
    notes.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  const handleInputName = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };
  const handleInputNumber = (e) => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const hasName = persons.some((person) => person.name === newName);
    const hasNumber = persons.some((person) => person.number === newNumber);
    if (hasName) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else if (hasNumber) {
      alert(`${newNumber} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString(),
      };
      notes.create(newPerson).then(response => {
        setPersons(persons.concat(response))
        const newMessage = {
          message: `Added ${response.name}`,
          type: 'added'
        }
        setMessage(newMessage)
        setTimeout(()=> {
          setMessage({
            ...message,
            message: null,
          })
        },3000)
        setNewName("");
        setNewNumber("");
      })
    }
  };

  const filteredusers = persons.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );
  const toggleImportance = (id) => {
    const person = persons.find(n =>n.id ===id)
    const changedImportance = {
      ...person,
      important: !person.important
    }
    notes.update(id, changedImportance).then(response => {
      setPersons(persons.map(person => person.id === id ? response : person))
    }).catch(error => {
      const errMessage = {
        message: `Information of ${person.name} has already been removed from server`,
        type: 'error'
      }
      setMessage(errMessage)
      setPersons(persons.filter(n => n.id !== id))
      setTimeout(() => {
        setMessage({
          ...message,
          message: null
        })
      },3000)
    })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter query={query} handleSearch={handleQuery} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleInputName={handleInputName}
        newNumber={newNumber}
        handleInputNumber={handleInputNumber}
      />
      <h2>Numbers</h2>
      <Numbers persons={filteredusers} toggleImportance={toggleImportance}/>
    </div>
  );
};

export default App;
