/** @jsxImportSource @emotion/react */
import { useRef, useState } from 'react';
import GuestList from './GuestList.js';
import Header from './Header.js';
import ManageGuests from './ManageGuests.js';
import { containerStyles } from './styles.js';

const baseUrl = 'https://express-rest-guest-list-lorenz.herokuapp.com';

export default function App() {
  const [firstName, setFirstName] = useState(''); // firstName and lastName inputs (if editMode is not on)
  const [lastName, setLastName] = useState('');
  const [guestList, setGuestList] = useState([]); // the complete array from the server
  const [isLoading, setIsLoading] = useState(true); // used in the begging for triggering fetchData and the loading gif, then set to false
  const [showAttending, setShowAttending] = useState(false); // whether "show attending" has been activated
  const [showNotAttending, setShowNotAttending] = useState(false); // whether "show not attending" has been activated
  const [editMode, setEditMode] = useState(false); // whether editMode has been activated (button in GuestList)
  const [editGuest, setEditGuest] = useState(); // the id of the guest to be edited (change names). Value is set when clicking button in GuestList
  const [editFirstName, setEditFirstName] = useState(''); // the value for the input fields when editMode is on (so GuestList is not affected by changing input values for the duration of editMode)
  const [editLastName, setEditLastName] = useState('');
  const [nameInListFound, setNameInListFound] = useState(false); // whether one name in GuestList fits the name inputs. Used by ManageGuests to disable the first button.

  const firstNameInputField = useRef(null); // to reference the first name input field (when having clicked "edit" in GuestList)

  // **********

  async function fetchData(
    method,
    guestId,
    newFirstName,
    newLastName,
    willAttend,
  ) {
    let response;
    if (method === 'GET') {
      response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();
      setGuestList(allGuests);
      return;
    } else if (method === 'POST') {
      response = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      });
    } else if (method === 'DELETE') {
      response = await fetch(`${baseUrl}/${guestId}`, {
        method: 'DELETE',
      });
    } else if (method === 'PATCH/ATTENDING') {
      response = await fetch(`${baseUrl}/${guestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: willAttend }),
      });
    } else if (method === 'PATCH/NAME') {
      response = await fetch(`${baseUrl}/${editGuest}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: newFirstName,
          lastName: newLastName,
        }),
      });
    }
    await response.json();
    fetchData('GET'); // update the guest list
    setFirstName(''); // reset inputs
    setLastName('');
  }

  // Get guest list data the first time

  if (isLoading) {
    fetchData('GET');
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }

  // ***************  handle button clicks:

  function handleNewGuestClick() {
    fetchData('POST');
  }

  function handleDeleteGuestClick(deleteGuestId) {
    if (!deleteGuestId) {
      // if no argument, i.e. name was entered manually
      deleteGuestId = '';
      for (let i = 0; i < guestList.length; i++) {
        if (
          guestList[i].firstName === firstName &&
          guestList[i].lastName === lastName
        ) {
          deleteGuestId = guestList[i].id;
        }
      }
    }
    fetchData('DELETE', deleteGuestId);
  }

  function handleDeleteAllGuestsClick() {
    for (let i = 0; i < guestList.length; i++) {
      fetchData('DELETE', guestList[i].id);
    }
  }

  function handleUpdateGuestClick(updateGuestId) {
    let updateGuestAttending = true;
    if (updateGuestId) {
      for (let i = 0; i < guestList.length; i++) {
        if (updateGuestId === guestList[i].id) {
          updateGuestAttending = guestList[i].attending;
        }
      }
    } else {
      updateGuestId = '';
      for (let i = 0; i < guestList.length; i++) {
        if (
          guestList[i].firstName === firstName &&
          guestList[i].lastName === lastName
        ) {
          updateGuestId = guestList[i].id;
          updateGuestAttending = guestList[i].attending;
        }
      }
    }
    fetchData(
      'PATCH/ATTENDING',
      updateGuestId,
      null,
      null,
      !updateGuestAttending,
    );
  }

  function handleShowAttendingClick() {
    setShowAttending((previous) => !previous);
  }

  function handleShowNotAttendingClick() {
    setShowNotAttending((previous) => !previous);
  }

  function handleEditGuestClick(
    editGuestFirstName,
    editGuestLastName,
    editGuestId,
  ) {
    if (editMode) {
      // deactivate edit mode by clicking again on the edit button
      setEditMode(false);
      setFirstName('');
      setLastName('');
    } else {
      // click edit first
      firstNameInputField.current.focus(); // focus the first name input
      setEditMode(true);
      setEditGuest(editGuestId);
      setEditFirstName(editGuestFirstName); // use the two values in order not change states in GuestList (highlighted guests stays highlighted when input value is changed now)
      setEditLastName(editGuestLastName);
      setFirstName(editGuestFirstName); // used for the value-attributes in ManageGuests
      setLastName(editGuestLastName);
    }
  }

  function handleChangeGuestNameClick() {
    setFirstName(editFirstName); // bring firstName and lastName back to date and use them for updating the editGuest
    setLastName(editLastName);
    fetchData('PATCH/NAME', editGuest, editFirstName, editLastName);
    setEditMode(false); // editMode over
  }

  // name inputs

  function handleFirstNameChange(e) {
    if (!editMode) {
      setFirstName(e.currentTarget.value);
    } else {
      setEditFirstName(e.currentTarget.value);
    }
  }

  function handleLastNameChange(e) {
    if (!editMode) {
      setLastName(e.currentTarget.value);
    } else {
      setEditLastName(e.currentTarget.value);
    }
  }

  return (
    <div css={containerStyles}>
      <Header />
      <div className="subContainer">
        <ManageGuests
          firstName={firstName}
          lastName={lastName}
          setFirstName={setFirstName}
          setLastName={setLastName}
          handleNewGuestClick={handleNewGuestClick}
          handleDeleteGuestClick={handleDeleteGuestClick}
          handleUpdateGuestClick={handleUpdateGuestClick}
          handleDeleteAllGuestsClick={handleDeleteAllGuestsClick}
          isLoading={isLoading}
          handleShowAttendingClick={handleShowAttendingClick}
          showAttending={showAttending}
          handleShowNotAttendingClick={handleShowNotAttendingClick}
          showNotAttending={showNotAttending}
          editMode={editMode}
          handleChangeGuestNameClick={handleChangeGuestNameClick}
          firstNameInputField={firstNameInputField}
          handleFirstNameChange={handleFirstNameChange}
          handleLastNameChange={handleLastNameChange}
          editFirstName={editFirstName}
          editLastName={editLastName}
          nameInListFound={nameInListFound}
        />

        <GuestList
          guestList={guestList}
          handleUpdateGuestClick={handleUpdateGuestClick}
          handleDeleteGuestClick={handleDeleteGuestClick}
          handleEditGuestClick={handleEditGuestClick}
          isLoading={isLoading}
          showAttending={showAttending}
          showNotAttending={showNotAttending}
          editMode={editMode}
          firstName={firstName}
          lastName={lastName}
          setNameInListFound={setNameInListFound}
        />
      </div>
    </div>
  );
}
