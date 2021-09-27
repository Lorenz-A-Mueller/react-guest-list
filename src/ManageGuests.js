/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { manageGuestsStyles } from './styles.js';

export default function ManageGuests(props) {
  return (
    <div css={manageGuestsStyles}>
      <h1>Manage Your Guests</h1>
      <div className="inputContainer">
        <input
          placeholder="First Name"
          onChange={(e) => props.handleFirstNameChange(e)}
          value={props.editMode ? props.editFirstName : props.firstName}
          disabled={props.isLoading ? 'true' : null}
          ref={props.firstNameInputField} // used for putting focus on this field when the edit button was pressed
        />
        <input
          placeholder="Last Name"
          onChange={(e) => props.handleLastNameChange(e)}
          value={props.editMode ? props.editLastName : props.lastName}
          disabled={props.isLoading ? 'true' : null}
        />
      </div>
      <div className="buttons">
        <button
          onClick={
            props.editMode
              ? () => props.handleChangeGuestNameClick()
              : () => props.handleNewGuestClick()
          }
          // should be disabled if the name is found manually by writing (can't add a new guest then)
          disabled={props.nameInListFound && !props.editMode ? 'true' : null}
        >
          {props.editMode ? "Change this guest's name" : 'Add this guest'}
        </button>
        <button
          onClick={() => props.handleDeleteGuestClick()}
          disabled={props.editMode ? 'true' : null}
        >
          Delete this guest
        </button>
        <button
          onClick={() => props.handleUpdateGuestClick()}
          disabled={props.editMode ? 'true' : null}
        >
          Change this guest's attendance
        </button>
        <button
          onClick={() => props.handleShowAttendingClick()}
          css={css`
            background-color: ${props.showAttending
              ? 'red'
              : '#5fb1f1'}!important; ;
          `}
          disabled={props.showNotAttending || props.editMode ? 'true' : null}
        >
          {props.showAttending ? 'Show all' : 'Show Attending'}
        </button>
        <button
          onClick={() => props.handleShowNotAttendingClick()}
          css={css`
            background-color: ${props.showNotAttending
              ? 'red'
              : '#5fb1f1'}!important; ;
          `}
          disabled={props.showAttending || props.editMode ? 'true' : null}
        >
          {props.showNotAttending ? 'Show all' : 'Show Not Attending'}
        </button>
        <button
          onClick={() => props.handleDeleteAllGuestsClick()}
          disabled={props.editMode ? 'true' : null}
        >
          Delete all guests
        </button>
      </div>
    </div>
  );
}
