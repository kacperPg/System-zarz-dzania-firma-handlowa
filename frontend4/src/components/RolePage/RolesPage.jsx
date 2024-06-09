import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { NavBarBoodstrap } from '../Navbar/navbarBS';
import { useAuth } from '../AuthProvider';
import '../ItemsPage.css';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute'; // Import PrivateRoute component

const ROLES_API = '/api/roles';

function RolesPage() {
  const { auth } = useAuth();
  const [roles, setRoles] = useState([]);
  let token = auth.accessToken;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(ROLES_API, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setRoles(response.data);
      } catch (error) {
        alert('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, [token]);

  const handleNewRole = () => {
    navigate('/addRole');
  };

  const handleDeleteRole = async (roleId) => {
    const confirmDelete = window.confirm("Jesteś pewien że chcesz usunąć role ?");

    try {
      await axios.delete(`${ROLES_API}/${roleId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setRoles(roles.filter((role) => role.roleId !== roleId));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  return (
    <div className="wrapper">
      <NavBarBoodstrap />
      <section id="buttonAddProduct">
      <PrivateRoute requiredPermissions={['PERM_ADD_CLIENTS']}>
      <button id="buttonItem" onClick={handleNewRole}>
          Dodaj nową rolę
        </button>
        </PrivateRoute>
      </section>
      <section id="idTabelaProduktow">
        {roles.map((role) => (
          <div key={role.roleId} className="roleCard">
            <h2>{role.roleName}</h2>
            {role.permissions.length > 0 ? (
              <ul>
                {role.permissions.map((permission) => (
                  <li key={permission.permissionId}>
                    {permission.permissionName} - {permission.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No permissions assigned</p>
            )}
            <button
             id="buttonItem"
              onClick={() => handleDeleteRole(role.roleId)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default RolesPage;
