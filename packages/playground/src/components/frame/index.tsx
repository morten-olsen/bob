import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from '@nextui-org/react';
import { Link as RouterLink } from 'react-router-dom';

type FrameProps = {
  children: React.ReactNode;
};

const Frame = ({ children }: FrameProps) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar shouldHideOnScroll isBordered isBlurred>
        <NavbarBrand>
          <RouterLink to="/">
            <p className="font-bold text-inherit">Bob</p>
          </RouterLink>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <RouterLink to="/">
              <Link color="foreground">Home</Link>
            </RouterLink>
          </NavbarItem>
          <NavbarItem>
            <RouterLink to="/experiments">
              <Link color="foreground">Experiments</Link>
            </RouterLink>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="flex flex-col flex-1">{children}</div>
    </div>
  );
};

export { Frame };
