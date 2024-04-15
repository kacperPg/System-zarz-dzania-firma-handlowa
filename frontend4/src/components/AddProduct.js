import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddProduct() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
       <button onClick={handleShow} id="buttonItem">
           Dodaj Produkt
          </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj Przedmiot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kod Produktu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kod Produktu"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nazwa Produktu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nazwa Produktu"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>Rodzaj 1</option>
      <option>Rodzaj 2</option>
      <option>Rodzaj 3</option>
      <option>Rodzaj 4</option>
      <option>Rodzaj 5</option>
    </select>
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cena Produktu</Form.Label>
              <Form.Control
                 type="number"
                 placeholder="$$$"
                 autoFocus
              />
              
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Zamknij
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Dodaj Produkt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProduct;