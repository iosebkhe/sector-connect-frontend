// import React, { useState, useEffect } from 'react';
// import sectorService from './services/sectors';
// import usersService from './services/users';

// const App = () => {
//   // const [name, setName] = useState('');
//   // const [selectedSectors, setSelectedSectors] = useState([]);
//   // const [agreedToTerms, setAgreedToTerms] = useState(false);
//   // const [sectors, setSectors] = useState([]);
//   // const [user, setUser] = useState(null);

//   // useEffect(() => {
//   //   sectorService.getAll().then((allSectors) => {
//   //     setSectors(allSectors);

//   //     const storedUser = localStorage.getItem('sectorConnectUser');
//   //     if (storedUser) {
//   //       const parsedUser = JSON.parse(storedUser);
//   //       setUser(parsedUser);
//   //       setName(parsedUser.username);
//   //       setSelectedSectors(parsedUser.sectors.map((sector) => sector.id));
//   //       setAgreedToTerms(parsedUser.agreedToTerms);
//   //     }
//   //   });
//   // }, []);

//   // const handleNameChange = (event) => {
//   //   setName(event.target.value);
//   // };

//   // const handleSectorChange = (event) => {
//   //   const options = event.target.options;
//   //   const selectedValues = [];
//   //   for (let i = 0; i < options.length; i++) {
//   //     if (options[i].selected) {
//   //       selectedValues.push(options[i].value);
//   //     }
//   //   }
//   //   setSelectedSectors(selectedValues);
//   // };


//   // const handleTermsChange = (event) => {
//   //   setAgreedToTerms(event.target.checked);
//   // };

//   // const handleSave = async (event) => {
//   //   event.preventDefault();

//   //   if (!name) {
//   //     alert('Please enter a name.');
//   //     return;
//   //   }

//   //   if (selectedSectors.length === 0) {
//   //     alert('Please select at least one sector.');
//   //     return;
//   //   }

//   //   if (!agreedToTerms) {
//   //     alert('Please agree to the terms.');
//   //     return;
//   //   }

//   //   try {
//   //     const updatedUser = {
//   //       username: name,
//   //       sectors: selectedSectors,
//   //       agreedToTerms: agreedToTerms
//   //     };


//   //     if (!agreedToTerms) {
//   //       alert('Please agree to the terms.');
//   //       return;
//   //     }

//   //     // Send data to backend
//   //     let returnedUser;
//   //     if (user.username === name) {
//   //       returnedUser = await usersService.update(user.id, updatedUser);
//   //     } else {
//   //       returnedUser = await usersService.create(updatedUser);
//   //     }
//   //     localStorage.setItem('sectorConnectUser', JSON.stringify(returnedUser));
//   //     setUser(returnedUser);
//   //     console.log(user);
//   //     setName("");
//   //     setSelectedSectors([]);
//   //     setAgreedToTerms(false);

//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   // const renderNestedOptions = (sector, level = 0) => {
//   //   const indentation = '\u00A0'.repeat(level * 4); // Using &nbsp; for indentation

//   //   return (
//   //     <React.Fragment key={sector.id}>
//   //       <option value={sector.id}>{`${indentation}${sector.name}`}</option>
//   //       {sector.children.length > 0 && (
//   //         sector.children.map(child => renderNestedOptions(child, level + 1))
//   //       )}
//   //     </React.Fragment>
//   //   );
//   // };

//   // return (
//   //   <form onSubmit={handleSave}>
//   //     <label htmlFor="nameInput">Name:</label>
//   //     <input id="nameInput" type="text" value={name} onChange={handleNameChange} />

//   //     <label htmlFor="sectorSelect">Select Sectors:</label>
//   //     <select size={10} id="sectorSelect" multiple value={selectedSectors} onChange={handleSectorChange}>
//   //       {sectors.map(parentSector => (
//   //         <optgroup key={parentSector.id} label={parentSector.name}>
//   //           {parentSector.children.map(childSector => (
//   //             renderNestedOptions(childSector, 1)
//   //           ))}
//   //         </optgroup>
//   //       ))}
//   //     </select>

//   //     <label htmlFor="termsCheckbox">Agree to Terms:</label>
//   //     <input id="termsCheckbox" type="checkbox" checked={agreedToTerms} onChange={handleTermsChange} />

//   //     <button type='submit'>Save</button>
//   //   </form>
//   // );
// };

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import UserForm from './components/UserForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-form" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
