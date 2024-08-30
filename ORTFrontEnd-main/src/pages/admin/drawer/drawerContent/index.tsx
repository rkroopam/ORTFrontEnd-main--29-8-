import { Box,Typography } from '@mui/material';
import NavGroup from './NavGroup';
import MenuItems from '../menu-items';


const DrawerContent = () =>{
  const menuItems = MenuItems();
  const navGroups = menuItems.items.map((item) => {
    console.log(item,'dsgszdsdfg')
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            check type
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default DrawerContent;
