import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const PrivateRoute = ({ children, requiredPermissions }) => {
    const { auth } = useAuth();


    console.log('Auth object:', auth);
    console.log('Required Permissions:', requiredPermissions);

    const permissions = auth?.roles ?? [];
    
    // Log permissions for debugging
    console.log('User Permissions:', permissions);

    const hasPermission = requiredPermissions.every(permission =>
        permissions.some(p => p.permissionName === permission)
    );

    // Log hasPermission for debugging
    console.log('Has Permission:', hasPermission);

    return hasPermission ? children :  console.log('Has Permission:', hasPermission); ;
};

export default PrivateRoute;
