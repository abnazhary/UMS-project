import axios from 'axios';
import  { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  image: string;
}

export default function UserList() {

  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  
  const handleClose = () => setShow(false);
  const handleShow = (id: number) => {
    setShow(true);
    setUserId(id);
  };

  const navigate = useNavigate();
  const addNewUserNavigate = () => {
    navigate("/dashboard/user-data");
  };

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      setUsers(response?.data?.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (userId) {
      try {
        await axios.delete(`https://dummyjson.com/users/${userId}`);
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
        handleClose();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {loading ? <Loader /> : (
        <div className="">
          <div className='d-flex m-3 justify-content-between'>
            <h3>Users List</h3>
            <button className='btn btn-warning text-white' onClick={addNewUserNavigate}>Add User</button>
          </div>
          <hr />
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"></th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">BirthDate</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td><img className='w-25' src={user.image} alt={`${user.firstName} ${user.lastName}`} /></td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.birthDate}</td>
                    <td>
                      <Link to={`/dashboard/update/${user.id}`}>
                        <FaRegEdit className='text-warning mx-3' size={25} />
                      </Link>
                      <MdDelete onClick={() => handleShow(user.id)} className='text-danger mx-3' size={25} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>No</Button>
                <Button variant="danger" onClick={deleteUser}>Yes</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}
