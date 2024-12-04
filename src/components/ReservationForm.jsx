import { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
// proprietà che il server si aspetta di ricevere per ogni prenotazione inviata (modello):

// name <-- string
// phone <-- string
// numberOfPeople <-- string || number
// smoking <-- boolean
// dateTime <-- string || date
// specialRequests <-- string

const ReservationForm = props => {
  // state = {
  //   // porzione di stato che gestisce la prenotazione
  // reservation: {
  //   name: "",
  //   phone: "",
  //   numberOfPeople: "1",
  //   smoking: false,
  //   dateTime: "",
  //   specialRequests: ""
  // },
  //   // porzione di stato che gestisce l'alert
  // alert: {
  //   isVisible: false,
  //   type: "",
  //   title: "",
  //   message: ""
  // }
  // };

  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    numberOfPeople: "1",
    smoking: false,
    dateTime: "",
    specialRequests: ""
  });
  const [alert, setAlert] = useState({
    isVisible: false,
    type: "",
    title: "",
    message: ""
  });

  //  metodo custom ==> deve essere creato con una arrow function!
  //  metodo chiamato se avviene l'invio del form
  const handleSubmit = e => {
    e.preventDefault();

    // chiamata HTTP per la creazione di una nuova risorsa a partire dallo stato reservation NEL MOMENTO DELL'INVIO DEL FORM
    // (quindi già con i dati inseriti all'interno di reservation)
    fetch("https://striveschool-api.herokuapp.com/api/reservation/", {
      method: "POST",
      body: JSON.stringify(reservation),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        if (resp.ok) {
          // se l'invio è andato a buon fine possiamo resettare il form
          handleReset();
          // per poi convertire il body della risposta e passarlo al then successivo
          return resp.json();
        } else {
          // oppure scatenare un errore custom per status >= 400
          throw new Error("Creazione fallita");
        }
      })
      .then(savedReservation => {
        // con i dati ricevuti dal server andiamo a fornire i dati necessari all'alert per visualizzarsi
        setAlert({
          isVisible: true,
          type: "success",
          title: "Prenotazione inviata!",
          message: `${savedReservation.name} ha prenotato per ${savedReservation.numberOfPeople} ${savedReservation.smoking ? "e ci sono fumatori" : ""} ${
            savedReservation.specialRequests ? ", richieste particolari: " + savedReservation.specialRequests : ""
          }. Arrivo previsto: ${new Date(savedReservation.dateTime).toLocaleString()} prenotazione salvata con id: ${savedReservation._id}`
        });

        // dopo 5 secondi l'alert verrà chiuso e resettato
        setTimeout(() => setAlert({ isVisible: false, type: "", title: "", message: "" }), 5000);
      })
      .catch(err => {
        console.log(err);

        setAlert({
          isVisible: true,
          type: "danger",
          title: "Invio fallito",
          message: err.message
        });

        setTimeout(() => setAlert({ isVisible: false, type: "", title: "", message: "" }), 5000);
      });
  };

  // funzione associata a tutti i campi input che agisce in modo dinamico nel modificare una proprietà con un determinato valore,
  //  proprietà e valore dinamico li forniamo nel momento dell'esecuzione di questa funzione (ovvero su ogni onChange di ogni input)
  const handleChange = (propertyName, propertyValue) => {
    setReservation({ ...reservation, [propertyName]: propertyValue });
  };

  // funzione che gestisce il reset del form
  // viene chiamata sia manualmente dentro alla fetch, sia dalla prop onClose del nostro Alert nel JSX
  const handleReset = () => {
    setReservation({
      name: "",
      phone: "",
      numberOfPeople: "1",
      smoking: false,
      dateTime: "",
      specialRequests: ""
    });
  };
  //   in react un Form o un qualsiasi input va reso CONTROLLED (controllato dallo stato)

  const { title } = props;
  return (
    <Container>
      <h2 className="display-5 text-center mt-5">{title}</h2>
      <Row className="justify-content-center">
        <Col xs={10} md={8} xl={6}>
          {/* alert collegato allo stato sia per quando visualizzarsi sia per i dati che renderizza */}
          {alert.isVisible && (
            <Alert variant={alert.type} onClose={() => setAlert({ isVisible: false, type: "", title: "", message: "" })} dismissible>
              <Alert.Heading>{alert.title}</Alert.Heading>
              <p>{alert.message}</p>
            </Alert>
          )}

          {/* form di creazione nuovi dati */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome prenotazione"
                //   per avere un input CONTROLLATO abbiamo bisogno che possa LEGGERE dallo stato con la prop value e SCRIVERE tramite evento onChange
                value={reservation.name} // leggiamo dallo stato
                //   onChange={e => this.setState({ reservation: { ...reservation, name: e.target.value } })} // scriviamo nello stato col valore attuale
                onChange={e => handleChange("name", e.target.value)}
                required
              />
              {reservation.name.length <= 3 && <Form.Text className="text-warning">Devi inserire un nome più lungo di 3 lettere</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" placeholder="347xxxxxxx" value={reservation.phone} onChange={e => handleChange("phone", e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="seats">
              <Form.Label>Coperti</Form.Label>
              <Form.Select aria-label="Number of seats" value={reservation.numberOfPeople} onChange={e => handleChange("numberOfPeople", e.target.value)}>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
                <option value="6">Six</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="smoking">
              <Form.Check //prettier-ignore
                type="checkbox"
                label="Fumatori"
                checked={reservation.smoking}
                onChange={e => handleChange("smoking", e.target.checked)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="datetime">
              <Form.Label>Data e ora</Form.Label>
              <Form.Control type="datetime-local" value={reservation.dateTime} onChange={e => handleChange("dateTime", e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="specialrequests">
              <Form.Label>Richieste particolari</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Intolleranze, allergie, ecc..."
                value={reservation.specialRequests}
                onChange={e => handleChange("specialRequests", e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button type="button" onClick={handleReset}>
                Reset
              </Button>

              <Button variant="success" type="submit">
                Invia prenotazione
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default ReservationForm;
