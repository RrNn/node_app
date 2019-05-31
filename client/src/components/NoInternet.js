import React from 'react';
const NoInternet = () => (
  <div className="no-internet">
    <div>
      Your internet seems to have been disconnected and this section couldnt be
      loaded
    </div>
    <div className="sad-emoji">
      <span role="img" aria-label="emoji">
        😢
      </span>
    </div>
  </div>
);

export default NoInternet;
