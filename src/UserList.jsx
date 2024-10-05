import { collection, getDocs, addDoc, query, orderBy, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from './Firebase/Config';
import { useNavigate } from 'react-router-dom';

function UserList() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [load, setLoad] = useState(true);

  useEffect(() => {
    // Function to fetch users from Firestore
    const fetchUsers = async () => {
      try {
        const usersCollection = await getDocs(collection(db, 'admins'));
        const usersData = usersCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
        setLoad(false);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    // Call the fetchUsers function when the component mounts
    fetchUsers();
  });


  return (
    <div className="container mt-5">
      <div className="my-5"><i onClick={()=>navigate('/')} class="fa-solid fa-arrow-left" style={{ fontSize: 25, cursor: 'pointer' }} ></i></div>
      {
        load ?
          <h2 className='mb-4'>Loading..</h2>
          :
          <>
            <h2 className="mb-4">User List</h2>
            <ul className="list-group">
              {
                users.length === 0 ?
                  <li className="list-group-item">No Data</li>
                  :
                  users.map((user) => (
                    <li key={user.id} className="list-group-item">
                      {user.email}
                    </li>
                  ))
              }
            </ul>
          </>
      }
    </div>
  )
}

export default UserList
