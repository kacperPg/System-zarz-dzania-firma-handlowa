import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import { useAuth } from '../AuthProvider';
import Cookies from 'js-cookie';  
import Form from 'react-bootstrap/Form';
import '../ItemsPage.css';
import { useNavigate } from 'react-router-dom';

const PERMISSIONS_API = '/api/permissions';
const ROLES_API = '/api/roles';

function NewRolePage() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState([
    {
      "permissionId": 21,
      "permissionName": "PERM_ADD_CLIENTS",
      "description": "Permission for addingclients"
  },
  {
      "permissionId": 12,
      "permissionName": "PERM_DELETE_TYPES",
      "description": "Permission for deleting types"
  },
  {
      "permissionId": 10,
      "permissionName": "PERM_VIEW_TYPES",
      "description": "Permission for getting types"
  },
  {
      "permissionId": 1,
      "permissionName": "PERM_ADD_ORDER",
      "description": "Permission for adding orders"
  },
  {
      "permissionId": 13,
      "permissionName": "PERM_ADD_WAREHOUSES",
      "description": "Permission for addingwarehouses"
  },
  {
      "permissionId": 3,
      "permissionName": "PERM_EDIT_ORDER",
      "description": "Permission for editing orders"
  },
  {
      "permissionId": 20,
      "permissionName": "PERM_DELETE_STATUS",
      "description": "Permission for deleting status"
  },
  {
      "permissionId": 6,
      "permissionName": "PERM_VIEW_PRODUCTS",
      "description": "Permission for getting products"
  },
  {
      "permissionId": 11,
      "permissionName": "PERM_EDIT_TYPES",
      "description": "Permission for editing types"
  },
  {
      "permissionId": 22,
      "permissionName": "PERM_VIEW_CLIENTS",
      "description": "Permission for getting clients"
  },
  {
      "permissionId": 15,
      "permissionName": "PERM_EDIT_WAREHOUSES",
      "description": "Permission for editing warehouses"
  },
  {
      "permissionId": 4,
      "permissionName": "PERM_DELETE_ORDER",
      "description": "Permission for deleting orders"
  },
  {
      "permissionId": 9,
      "permissionName": "PERM_ADD_TYPES",
      "description": "Permission for adding types"
  },
  {
      "permissionId": 14,
      "permissionName": "PERM_VIEW_WAREHOUSES",
      "description": "Permission for getting warehouses"
  },
  {
      "permissionId": 5,
      "permissionName": "PERM_ADD_PRODUCTS",
      "description": "Permission for adding products"
  },
  {
      "permissionId": 7,
      "permissionName": "PERM_EDIT_PRODUCTS",
      "description": "Permission for editing products"
  },
  {
      "permissionId": 16,
      "permissionName": "PERM_DELETE_WAREHOUSES",
      "description": "Permission for deleting warehouses"
  },
  {
      "permissionId": 19,
      "permissionName": "PERM_EDIT_STATUS",
      "description": "Permission for editing status"
  },
  {
      "permissionId": 2,
      "permissionName": "PERM_VIEW_ORDER",
      "description": "Permission for getting orders"
  },
  {
      "permissionId": 17,
      "permissionName": "PERM_ADD_STATUS",
      "description": "Permission for addingstatus"
  },
  {
      "permissionId": 8,
      "permissionName": "PERM_DELETE_PRODUCTS",
      "description": "Permission for deleting products"
  },
  {
      "permissionId": 18,
      "permissionName": "PERM_VIEW_STATUS",
      "description": "Permission for getting status"
  },
  {
      "permissionId": 24,
      "permissionName": "PERM_DELETE_CLIENTS",
      "description": "Permission for deleting clients"
  },
  {
      "permissionId": 23,
      "permissionName": "PERM_EDIT_CLIENTS",
      "description": "Permission for editing clients"
  }
  ]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(PERMISSIONS_API, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setPermissions(response.data);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      }
    };

    fetchPermissions();
  }, [token]);

  const handlePermissionChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedPermissions(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roleToSubmit = {
      roleName,
      permissions: selectedPermissions.map(permissionId => ({
        permissionId: parseInt(permissionId, 10),
      })),
    };

    try {
      await axios.post(ROLES_API, roleToSubmit, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      navigate('/RolesPage'); 
    } catch (error) {
      console.error('Error creating role:', error);
      alert('Nie udało się dodać roli');
    }
  };

  return (
    <div className="wrapper">
      <NavBarBoodstrap />
      <section id="idTabelaProduktow">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">Nazwa Roli:</label>
            <input
              type="text"
              name="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Uprawnienia:</label>
            <Form.Control
              as="select"
              multiple
              className="pdf-viewer"
              onChange={handlePermissionChange}
              value={selectedPermissions}
            >
              {permissions.map((permission) => (
                <option key={permission.permissionId} value={permission.permissionId}>
                  {permission.permissionName} - {permission.description}
                </option>
              ))}
            </Form.Control>
          </div>
          <button type="submit" id="buttonItem">
            Dodaj Rolę
          </button>
        </form>
      </section>
    </div>
  );
}

export default NewRolePage;