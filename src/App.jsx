import { useState, useMemo, useRef, useEffect } from "react"

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[{]};:'\",<.>/?\\|`~";


function App() {

  // campi controllati (usestate)

  // setto var di stato per gestione username
  const [username, setUsername] = useState("");

  // setto var di stato per gestione password
  const [password, setPassword] = useState("");
  // setto var di stato per textarea
  const [description, setDescription] = useState("");

  // campi non controllati (useref)

  const nameRef = useRef();
  const selectedSpecRef = useRef();
  const yearExpRef = useRef();

  // validazione campi con useMemo(alternativa di useeffect per semplicita e codice piu leggeibile)
  // validazione Username
  const isUsernameValid = useMemo(() => {
    // splittiamo creando un arrey delle singole lettere della stringa e per ognuna verifichiamo
    const charsValid = username.split("").every(char => letters.includes(char) ||
      numbers.includes(char)
    );
    // almeno sei caratteri alfanumerici
    return charsValid && username.trim().length >= 6;
  }, [username])

  // validazione Password
  const passwordIsValid = useMemo(() => {
    return (
      password.trim().length >= 8 &&
      // alemeno uno dei carrateri deve essere presente
      password.split("").some(char => letters.includes(char)) &&
      password.split("").some(char => numbers.includes(char)) &&
      password.split("").some(char => symbols.includes(char))
    )
  }, [password])

  // validazione Description (textarea)
  const descriptionIsValid = useMemo(() => {
    return (
      description.trim().length >= 100 &&
      description.trim().length < 1000
    )
  }, [description])

  // funzione sabmit
  const handleSubmit = e => {
    e.preventDefault();

    // valori non controllati
    const name = nameRef.current.value;
    const selectedSpec = selectedSpecRef.current.value;
    const yearExp = yearExpRef.current.value;

    if (
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !selectedSpec.trim() ||
      !yearExp.trim() ||
      yearExp <= 0 ||
      !description.trim() ||
      !isUsernameValid ||
      !passwordIsValid ||
      !descriptionIsValid
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

  // focus sul nome completo attraverso useeffect(ci permette di scrivere subito nel campo)
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  // logica bottone reset
  const resetForm = (e) => {
    e.preventDefault();
    // per i campi controllati settare la var di stato a stringa vuota
    setUsername("")
    setPassword("")
    setDescription("")
    // per i campi non controllati
    nameRef.current.value = "";
    selectedSpecRef.current.value = "";
    yearExpRef.current.value = "";
    // possiamo aggiungere anche il focus per tornare allo stato iniziale
    nameRef.current.focus();
  }

  // var per settagio riferimento per bottone (formRef) + onclick al bottone 
  const formRef = useRef();

  return (
    <>

      {/* nome completo */}

      <form onSubmit={handleSubmit} ref={formRef}>
        <label>
          <p>nome completo</p>
          <input
            type="text"
            placeholder="inserisci name"
            ref={nameRef}
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
          {/* messaggio compilazione (corretto o errato)  */}
          {username.trim() && (
            <p style={{ color: isUsernameValid ? 'green' : 'red' }}>
              {isUsernameValid ? 'username valido' : 'deve contenere almeno 6 caratteri alfanumerici'}
            </p>
          )}
        </label>


        {/* password */}

        <label>
          <p>password</p>
          <input
            type="password"
            placeholder="inserisci password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {password.trim() && (
            <p style={{ color: passwordIsValid ? 'green' : 'red' }}>
              {passwordIsValid ? 'password valida' : 'la password deve contenere almeno 8 caratteri di cui un numero una lettera e un simbolo'}
            </p>
          )}
        </label>


        {/* select */}
        <label>
          <p>Specializzazioni</p>
          <select
            // value={selectedSpec}
            // onChange={(e) => setSelectedSpec(e.target.value)}
            ref={selectedSpecRef}
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
            ref={yearExpRef}
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
          {description.trim() && (
            <p style={{ color: descriptionIsValid ? 'green' : 'red' }}>
              {descriptionIsValid ? 'descrizione valida' : `deve contenere un renge di caratteri maggiore di 100 e minore di 1000 (${description.trim().length})`}
            </p>
          )}
        </label>
        {/* bottone per la registrazione */}
        <button type="submit">Send</button>
        {/* bottone per lo svuotamento dei campi dopo l'invio */}
        <button
          onClick={resetForm}
        >reset</button>
      </form>
      {/* creiamo un footer ipotetico per l'efetto di scroll */}
      <button className="scroll" onClick={() => {
        formRef.current.scrollIntoView({ behavior: 'smooth' })
      }}>Torna su</button>
      <footer style={{ height: '100vh' }}></footer>
    </>
  )
}

export default App
