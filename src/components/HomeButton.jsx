import React from 'react';
import { Link } from 'react-router-dom';

function HomeButton({ isSplash = false }) {
  const imgHeight = isSplash ? '24vh' : '12vh';

  const imgStyle = {
    height: imgHeight,
    width: 'auto',
  };

  // const imgWidth = isSplash ? '75vw' : '50vw';

  // const imgStyle = {
  //   height: 'auto',
  //   width: imgWidth,
  // };

  return (
    <Link to="/">
      <img className='home-button' src='/danceartssociety.png' style={imgStyle} alt="Home Button" />
    </Link>
  );
}

export default HomeButton;