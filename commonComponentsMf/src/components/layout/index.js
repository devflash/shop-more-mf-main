import React from 'react';
import { css } from '@emotion/react';

const wrapper = css`
  height: 100%;
  background-color: #ecf0f1;
`;
const Layout = ({ children, layoutStyle }) => (
  <>
    <div css={[wrapper, layoutStyle]}>{children}</div>
  </>
);
export default Layout;
