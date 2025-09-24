import { useState } from "react";

const Name = ({ name, number }) => {
  return (
    <div>
      {name} {number}
    </div>
  );
};

const Numbers = ({ persons }) => {
  return (
    <>
      {persons.map((person) => {
        return (
          <Name key={person.id} name={person.name} number={person.number} />
        );
      })}
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

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
        id: persons.length + 1,
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
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
      <Numbers persons={filteredusers} />
    </div>
  );
};

export default App;
