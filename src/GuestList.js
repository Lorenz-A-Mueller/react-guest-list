/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { guestListStyles } from './styles.js';

export default function GuestList(props) {
  const [nameFound, setNameFound] = useState(false);

  // check if any guest fits the first and last name inputs. If so, setNameFound(true) (which will be used here) and setNameInListFound(true) (which will be used for disabling the first button in ManageGuests)

  useEffect(() => {
    for (let i = 0; i < props.guestList.length; i++) {
      if (
        props.guestList[i].firstName === props.firstName &&
        props.guestList[i].lastName === props.lastName
      ) {
        setNameFound(true);
        props.setNameInListFound(true);
        break;
      } else {
        // nameFound will only be negated if the editMode (activated by clicking the edit button) is not on.
        if (!props.editMode) setNameFound(false);
      }
      props.setNameInListFound(false);
    }
  }, [props]);

  return (
    <div css={guestListStyles}>
      <div className="h2-container">
        <h2>Guest-List:</h2>
      </div>
      <div
        className="loading"
        css={css`
          visibility: ${props.isLoading ? 'visible' : 'hidden'};
        `}
      >
        <p>Your Guest List is being loaded....</p>
      </div>

      <div className="ul-container">
        <ul>
          {props.guestList.map((guest) => (
            <div
              key={guest.id}
              className="guest"
              // display: filter showAttending / showNotAttending
              // border: indicate visually if guest attends
              // other properties: distinguish the name that fits the input (on top and blue).
              // the other names must be pushed down (nameFound)
              css={css`
                display: ${props.showAttending
                  ? guest.attending
                    ? 'flex'
                    : 'none'
                  : props.showNotAttending
                  ? guest.attending
                    ? 'none'
                    : 'flex'
                  : 'flex'};
                background-color: ${guest.firstName === props.firstName &&
                guest.lastName === props.lastName
                  ? '#5fb1f1'
                  : 'transparent'};
                position: ${guest.firstName === props.firstName &&
                guest.lastName === props.lastName
                  ? 'absolute'
                  : 'relative'};
                top: ${guest.firstName === props.firstName &&
                guest.lastName === props.lastName
                  ? '-10px'
                  : nameFound
                  ? '60px'
                  : ''};
                width: '50px';
                border: ${guest.attending
                  ? 'solid lightgreen 3px'
                  : 'solid red 3px'};
              `}
            >
              <li>
                {guest.firstName} <br />
                {guest.lastName}
              </li>
              {/* disable checking and deletion in editMode */}
              <input
                type="checkbox"
                checked={guest.attending}
                onChange={() => props.handleUpdateGuestClick(guest.id)}
                disabled={props.editMode ? 'true' : null}
                title="change this guest's attendance"
              />
              <button
                className="delete-button"
                onClick={() => props.handleDeleteGuestClick(guest.id)}
                title="delete this guest"
                disabled={props.editMode ? 'true' : null}
              />
              <button
                className="edit-button"
                onClick={() =>
                  props.handleEditGuestClick(
                    guest.firstName,
                    guest.lastName,
                    guest.id,
                  )
                }
                title="edit this guest's name"
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
