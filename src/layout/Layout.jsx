import { Outlet } from "react-router-dom"
import PublicNav from "../components/PublicNav"

const Layout = () => {
  return (
    <main className="relative container mx-auto p-5 flex flex-col justify-center md:grid md:grid-cols-2 md:gap-10 md:items-center min-h-screen">
      <PublicNav />
      <Outlet />
    </main>
  )
}

export default Layout