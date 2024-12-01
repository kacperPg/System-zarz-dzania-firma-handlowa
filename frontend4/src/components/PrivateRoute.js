import useAuth from './useAuth';

const PrivateRoute = ({ children, requiredPermissions }) => {
    const { auth } = useAuth();


    console.log('Auth object:', auth);
    console.log('Required Permissions:', requiredPermissions);

    const permissions = auth?.roles ?? [];
    
    console.log('User Permissions:', permissions);

    const hasPermission = requiredPermissions.every(permission =>
        permissions.some(p => p.permissionName === permission)
    );

    console.log('Has Permission:', hasPermission);
    if (!hasPermission) {
        return (
            <div>
            </div>
        );
    }
    return hasPermission ? children :  console.log('Has Permission:', hasPermission); ;
};

export default PrivateRoute;
