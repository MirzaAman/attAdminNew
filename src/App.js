import { useEffect, useState } from 'react';
import { auth, db } from './Firebase/Config.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import './style.css'

function App() {

  const [handleButton, sethandleButton] = useState('Add');

  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {

    sethandleButton('Adding..');

    e.preventDefault();

    if (id.length > 0) {
      if (pass.length > 7) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, id, pass);
          const user = userCredential.user;
          await addDoc(collection(db, 'admins'), {
            uid: user.uid,
            email: user.email,
          });
          sethandleButton('Add');
          setId('');
          setPass('');
          toast.success(`User ${id} Added !`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
          })

        } catch (error) {
          setId('');
          setPass('');
          sethandleButton('Add');
          toast.error('Something went wrong!', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
          })
        }
      } else {
        sethandleButton('Add');
        toast.error('Password must consist atleast 8 characters', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined
        })
      }
    } else {
      sethandleButton('Add');
      toast.error('Please enter Admin ID', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
      })
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="containerer">
        <h2><u>Add Panel</u></h2>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Admin Email ID</label>
            <input type="email" value={id} onChange={(e) => setId(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="eg :- admin@khss.com" required />
            <small id="emailHelp" class="form-text text-muted">Don't share to students.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} class="form-control" id="exampleInputPassword1" placeholder="Password" required />
          </div>
          {/* <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div> */}
          <button type="submit" class="btn btn-primary">{handleButton}</button>

        </form>
        <div className="form-group my-5">
          <button class="btn btn-warning" onClick={() => navigate('/admin/list')} >Show Admins</button>
        </div>
      </div>
    </>
  );
}

export default App;
