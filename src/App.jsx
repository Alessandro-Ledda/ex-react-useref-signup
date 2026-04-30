import { useState } from "react"


function App() {

  // setto var per gestione nome user
  const [name, setName] = useState("");

  // setto var di stato per gestione username
  const [username, setUsername] = useState("");

  // setto var di stato per gestione password
  const [password, setPassword] = useState("");

  // setto var di stato per gestione specializzazione
  const [selectedSpec, setSelectedSpec] = useState("");

  // setto var di stato per gestione anni di esperienza
  const [yearExp, setYearExp] = useState("");

  // setto var di stato per textarea
  const [description, setDescription] = useState("");

  // funzione sabmit
  const handleSubmit = e => {
    e.preventDefault();
    if (
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !selectedSpec.trim() ||
      !yearExp.trim() ||
      yearExp <= 0 ||
      !description.trim()
    ) {
      alert("Attenzione: compilare correttamente i campi");
      return;
    }
    console.log("Sabmit correttamente eseguito", {
      name,
      username,
      password,
      selectedSpec,
      yearExp,
      description,
    })
  }


  return (
    <>

      <form onSubmit={handleSubmit}>
        <label>
          <p>nome completo</p>
          <input
            type="text"
            placeholder="inserisci name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>


        {/* username */}

        <label>
          <p>username</p>
          <input
            type="text"
            placeholder="inserisci username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>


        {/* password */}

        <label>
          <p>password</p>
          <input
            type="number"
            placeholder="inserisci password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>


        {/* select */}
        <label>
          <p>Specializzazioni</p>
          <select
            value={selectedSpec}
            onChange={(e) => setSelectedSpec(e.target.value)}
          >
            <option value="">Scegli specilaizzazione</option>
            <option value="full stack">full stack</option>
            <option value="frontend">frontend</option>
            <option value="backend">backend</option>
          </select>
        </label>


        {/* anni di esperienza*/}
        <label>
          <p>Anni di esperienza</p>
          <input
            type="number"
            placeholder="inserisci anni di esperienza"
            value={yearExp}
            onChange={e => setYearExp(e.target.value)}
          />
        </label>


        {/* textarea */}
        <label>
          <p>descrizione</p>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
          >
          </textarea>
        </label>
        {/* bottone per la registrazione */}
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default App
