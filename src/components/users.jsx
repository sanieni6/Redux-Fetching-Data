import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { usersAsync } from '../redux/users/usersSlice';

const Users = () => {
   const {  users, isLoading , error } = useSelector((store) => store.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(usersAsync());
    }, [dispatch])

    if (isLoading) {
        return <h1>Loading...</h1>;
      }
    
      if (error !== undefined) {
        return (
          <div>
            <h1>Error...</h1>
            <p>{error}</p>
          </div>
        );
      }
    return(
        <div>
            <ul>
            {users.map((user) => (
                <li key={user.login.uuid}>
                    <p>{user.name.first}</p>
                    <p>{user.name.last}</p>
                </li>
        ))}

            </ul>

        </div>
    )

};

export default Users;