import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

function PageLayout (props) {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      {props.hdgText && (
        <div>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
          >
            {props.hdgText}
          </Typography>
        </div>
      )}
      {props.children && (
        <div>
          {props.children}
        </div>
      )}
    </div>
  );
}

export default PageLayout;
