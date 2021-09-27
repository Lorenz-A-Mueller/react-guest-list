/** @jsxImportSource @emotion/react */

import { headerStyles } from './styles.js';

export default function Header() {
  return (
    <div css={headerStyles}>
      <h1>Your Guest List</h1>

      <div className="upper triangle" />
      <div className="lower triangle" />
    </div>
  );
}
