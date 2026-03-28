import React from 'react';

const Navbar = () => {
  const handleLogout = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data = await response.json();

    if (response.ok) {
      alert("Logout successful!");
      window.location.href = "/login";
    } else {
      alert(data.error || data.message || "Logout failed");
    }
  }
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Employee Task Management</a>
      </div>
      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Navbar