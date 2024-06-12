import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from '../../api/axios';
const USER_LIST = '/api/users';
const ROLES_LIST = '/api/roles';
const USER_REGEX = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ][A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9-_]{1,23}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function EditUser({ Id, handleClose }) {

  let token = sessionStorage.getItem('token');

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);


  const [roleId, setRole] = useState('');

  const [password, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
}, [name])

useEffect(() => {
    setValidLastName(USER_REGEX.test(lastName));
}, [lastName])

useEffect(() => {
  setValidPwd(password === '' || PWD_REGEX.test(password));
}, [password])



  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${USER_LIST}/${Id}`, {
          headers: { Authorization: 'Bearer ' + token }
        });
        const userData = res.data;
        setLastName(userData.lastName);
        setName(userData.name);
        setRole(userData.roleId)
      } catch (err) {
        console.error('Error fetching product:', err);
        if (!err?.response) {
          alert('No Server Response');
        } else if (err.response?.status === 401) {
          alert('Error');
        } else {
          alert('Failed');
        }
      }
    };
    getProduct();
  }, [Id, token]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(ROLES_LIST, {
          headers: { Authorization: 'Bearer ' + token }
        });
        const roles = res.data;
        setRoles(roles);
      } catch (err) {
        console.error('Error fetching product:', err);
        if (!err?.response) {
          alert('No Server Response');
        } else if (err.response?.status === 401) {
          alert('Error');
        } else {
          alert('Failed');
        }
      }
    };
    getProduct();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, lastName, roleId };
    if (password) {
      userData.password = password;
    }
    try {
        const response = await axios.put(`${USER_LIST}/${Id}`,
            JSON.stringify(userData),
            {
              headers: {  'Content-Type': 'application/json',
               'Authorization': 'Bearer ' +  token}
            }
        );
        window.location.reload();
    } catch (err) {
        if (!err?.response) {
          alert('No Server Response');
        }  else if (err.response?.status === 401) {
          alert('Unauthorized');
        } else {
             alert('Failed');
        }
    }
}

const options = roles.map((type) => (
  <option key={type.roleId} value={type.roleId}>
    {type.roleName}
  </option>
));

  return (
    <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj Użytkownika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Imię </Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                autoFocus
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
                          1-24 liter.
                               
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nazwisko </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nazwisko"
                aria-invalid={validLastName ? "false" : "true"}
                autoFocus
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              1-24 liter.
                   </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Rola</Form.Label>
            <Form.Select autoFocus onChange={(e) => setRole(e.target.value)} value={roleId}>
              <option value={''}>Select Type</option> {/* Default option */}
              {options}
            </Form.Select>
          </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hasło </Form.Label>
              <Form.Control
                type="text"
                placeholder="Hasło"
                autoFocus
                aria-invalid={validName ? "false" : "true"}
                onChange={(e) => setPwd(e.target.value)}
                value={password}
              />                <p>
                            8-24 liter<br/>
                            Musi posiadać mała/dużą literę, cyfrę oraz znak specjalny.
                        </p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Zamknij
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!validName || !validLastName ||!validPwd}>
            Edytuj Użytkownika
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default EditUser;