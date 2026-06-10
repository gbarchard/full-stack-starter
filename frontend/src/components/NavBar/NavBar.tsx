import {
  Navbar as _NavBar,
  Avatar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react'
import { useMemo } from 'react'
import { Link } from 'react-router'
import { useNavBarQuery } from './navBar.generated'

export default function NavBar() {
  const { data } = useNavBarQuery()

  const initials = useMemo(() => {
    const name = data?.user?.name
    if (!name) return ''
    const names = name.split(' ')
    const firstInitial = names[0]?.[0] ?? ''
    const secondInitial = names[1]?.[0] ?? ''
    return `${firstInitial}${secondInitial}`
  }, [data?.user?.name])

  return (
    <_NavBar>
      <NavbarToggle />
      <NavbarBrand>Full Stack Starter</NavbarBrand>
      <Link to="profile" className="md:order-2">
        <Avatar
          rounded
          placeholderInitials={initials}
          img={data?.user?.photoURL ?? undefined}
        />
      </Link>
      <NavbarCollapse>
        <Link to="home">
          <NavbarLink>Home</NavbarLink>
        </Link>
      </NavbarCollapse>
    </_NavBar>
  )
}
