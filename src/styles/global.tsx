import { css } from '@linaria/core';

import { reset } from './reset';

export const globals = css`
  :global() {
    ${reset}
  }
`;
