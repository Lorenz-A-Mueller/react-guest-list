/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import background from './background.jpeg';
import edit from './edit.png';
import loadingGif from './loading.gif';
import trash from './trash.png';

const blue = '#5fb1f1';

export const globalStyles = css`
  html,
  body {
    width: 100vw;
    height: 100vh;
  }
  body {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-family: domine;
    background-image: url(${background});
  }
`;

export const containerStyles = css`
  width: 800px;
  height: 100vh;

  background-color: rgba(95, 177, 241, 0.5);
  overflow: hidden;

  .subContainer {
    display: flex;
    justify-content: space-between;
    grid-gap: 0%;
    padding: 0% 4%;
  }
`;

export const headerStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 22vh;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100px;
  h1 {
    font-size: 3em;
    z-index: 2;
    margin-top: 70px;
  }

  .triangle {
    position: absolute;
    top: 20px;
    width: 0;
    height: 0;
    border-style: solid;
  }

  .upper {
    border-width: 0 400px 100px 400px;
    border-color: transparent transparent orange transparent;
    z-index: 1;
  }
  .lower {
    top: 120px;
    border-width: 100px 400px 0 400px;
    border-color: orange transparent transparent transparent;
    z-index: 1;
  }
`;

export const manageGuestsStyles = css`
  display: flex;
  flex-direction: column;
  background-color: orange;
  height: 62vh;
  width: 350px;
  text-align: center;
  .inputContainer {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    grid-gap: 2%;

    input {
      font-size: 1em;
      width: 150px;
      height: 40px;
    }
  }
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
      font-size: 1em;
      margin-top: 5%;
      width: 50%;
      height: 5vh;
      background-color: ${blue};
      border: 0px;
      &:hover {
        background-color: red;
        cursor: pointer;
      }

      :first-child {
        margin-top: 10%;
      }

      :last-child {
        background-color: red;
        &:hover {
          background-color: purple;
        }
      }
    }
  }
`;

export const guestListStyles = css`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: orange;
  height: 62vh;
  width: 350px;

  .loading {
    background-color: ${blue};
    background-image: url(${loadingGif});
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    z-index: 1;
  }

  .ul-container {
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    ::-webkit-scrollbar-button {
      background-color: ${blue};
      display: block;
      height: 13px;
      width: 16px;
    }

    ul {
      width: 240px;
      height: 40vh;
      margin-right: 20px;
      position: relative;

      .guest {
        flex-wrap: nowrap;
        width: 240px;
        margin-bottom: 5%;
        align-items: center;

        li {
          width: 200px;
          height: 44px;
        }

        input {
          width: 25px;
          height: 25px;
        }

        .delete-button {
          background-image: url(${trash});
          background-size: cover;
          width: 25px;
          height: 25px;
          margin-left: auto;

          &:hover {
            cursor: pointer;
          }
        }

        .edit-button {
          background-image: url(${edit});
          background-size: cover;
          width: 25px;
          height: 25px;
          margin-left: auto;

          &:hover {
            cursor: pointer;
          }
        }

        .attending {
          width: 20px;
          height: 20px;
          border-radius: 100%;
          margin-right: auto;
        }
      }
    }
  }
`;
