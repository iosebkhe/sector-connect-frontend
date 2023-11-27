import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import sectorService from '../services/sectors.js';
import usersService from '../services/users';
import Sectors from './Sectors.jsx';
import 'react-toastify/dist/ReactToastify.min.css';

const UserForm = () => {
  // const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allSectors, allUsersFromDB] = await Promise.all([
          sectorService.getAll(),
          usersService.getAll()
        ]);

        setSectors(allSectors);
        setAllUsers(allUsersFromDB);

        const storedUser = localStorage.getItem('sectorConnectUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);

          // Check if the user exists in the allUsers array fetched from the database
          const userExistsInDatabase = allUsersFromDB.some(
            (user) => user.id === parsedUser.id || user.username === parsedUser.username
          );

          if (userExistsInDatabase) {
            setUser(parsedUser);
            setName(parsedUser.username);
            setSelectedSectors(parsedUser.sectors.map((sector) => sector.id));
            setAgreedToTerms(parsedUser.agreedToTerms);
          } else {
            // Handle the case where the user doesn't exist in the database anymore
            console.log('User does not exist in the database.');
            localStorage.removeItem("sectorConnectUser");
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSectorChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedSectors(selectedValues);
  };


  const handleTermsChange = (event) => {
    setAgreedToTerms(event.target.checked);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!name) {
      toast.error(`Please enter a name.`);
      return;
    }

    if (selectedSectors.length === 0) {
      toast.error(`Please select at least 1 sector.`);
      return;
    }

    if (!agreedToTerms) {
      toast.error(`Please agree to the terms.`);
      return;
    }

    try {
      const updatedUser = {
        username: name,
        sectors: selectedSectors,
        agreedToTerms: agreedToTerms
      };

      // Send data to backend
      let returnedUser;

      if (user && user.username === name) {
        returnedUser = await usersService.update(user.id, updatedUser);
      } else {
        returnedUser = await usersService.create(updatedUser);
      }
      localStorage.setItem('sectorConnectUser', JSON.stringify(returnedUser));
      setUser(returnedUser);
      toast.success(`user ${returnedUser.username} successfully saved`);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Fill the <span className="text-[#7747ff]">Form</span></div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Choose as many <span className='text-[#7747ff]'>sectors</span> as you want (hold ctrl key)
        </div>
        <form className='flex flex-col gap-3 border-2 p-2 shadow-sm rounded' onSubmit={handleSave}>

          <div className='block relative'>
            <label className='block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2' htmlFor="nameInput">Name:</label>

            <input className='rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0' id="nameInput" type="text" value={name} onChange={handleNameChange} />
          </div>


          <Sectors allSectors={sectors} selectedSectors={selectedSectors} onSectorChange={handleSectorChange} />

          <div className='flex items-center gap-2 relative'>
            <label className='block text-gray-600 cursor-text text-sm leading-[140%] font-normal ' htmlFor="termsCheckbox">Agree to Terms:</label>
            <input className='rounded border border-gray-200 text-sm text-black focus:ring-2 ring-offset-2 ring-gray-900 outline-0' id="termsCheckbox" type="checkbox" checked={agreedToTerms} onChange={handleTermsChange} />
          </div>


          <button className='bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal' type='submit'>Save</button>
        </form >
      </div >
    </>
  );
};

export default UserForm;
