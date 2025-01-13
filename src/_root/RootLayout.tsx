import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const RootLayout = () => {
    return (
        <div>
            <nav>
                nav
            </nav>
            <Outlet />
            <footer>
                footer
            </footer>
        </div>

    )
}

export default RootLayout