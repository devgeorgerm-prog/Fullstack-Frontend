import { useEffect, useState } from "react";
import notes from "./services/notes";

const Name = ({ user, handleDelete }) => {
  console.log('user',user)
  return (
    <div>
      {user.name} {user.number}{" "}
      <button onClick={() => handleDelete(user)}>Delete</button>
    </div>
  );
};

const Numbers = ({ persons, handleDelete }) => {
  console.log('numbers', persons)
  return (
    <>
      {persons.map(user => (
        <Name 
          key={user.id} 
          user={user} 
          handleDelete={handleDelete} 
        />
      ))}
    </>
  );
};


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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    notes.getAll().then((initialContact) => {
      setPersons(initialContact);
    });
  }, []);
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
      const newNumberConfirm = confirm(
        `${newName} is already added to phonebook, replacet he old number with a new one?`
      );
      if (newNumberConfirm) {
        const oldPerson = persons.find((n) => n.name === newName);
        const saveNewNumber = {
          ...oldPerson,
          number: newNumber,
        };
        notes.update(oldPerson.id, saveNewNumber).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id === oldPerson.id ? response : person
            )
          );
        });
        setNewName("");
        setNewNumber("");
      }
    } else if (hasNumber) {
      alert(`${newNumber} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      const personId = persons.length + 1;
      const newPerson = {
        name: newName,
        number: newNumber,
        id: personId.toString(),
      };
      notes.create(newPerson).then((created) => {
        setPersons(persons.concat(created));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDelete = (person) => {
    console.log(person);
    const confirmDelete = confirm(`Delete ${person.name}`);
    if (confirmDelete) {
      notes.remove(person.id).then((response) => {
        setPersons(persons.filter((n) => n.id !== response.id));
        console.log("deleted");
      });
    }
  };

  const filteredusers = persons.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
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
      <Numbers persons={filteredusers} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

