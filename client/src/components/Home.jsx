import React from 'react';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>Welcome to My Blog</h1>
        <p>Explore the world of coding, creativity, and more!</p>
      </header>

      <div className="welcome-content">
        <img 
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGU0eWhndjByMXN4dnFtYjIxc3BnZ3J2Z2Y0N3V0eTcwNWkxdGk1MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cWXGv79xuz6NKd8Iv0/giphy.gif" 
          alt="Welcome Animation"
          className="welcome-image"
        />
      </div>

      <footer className="footer">
        <p>© 2024 My Blog. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
