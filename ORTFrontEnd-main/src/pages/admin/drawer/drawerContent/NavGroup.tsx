import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Box, List, Typography } from '@mui/material';
import NavItem from './NavItem';

const NavGroup = ({ item }: any) => {
  // console.log("itemssssssssssssssssssssssssss",item.children.find((data:any)=>data.title == "Lessons"))
  const menu = useSelector((state: any) => state.menu);
  const { drawerOpen } = menu;

  const navCollapse = item.children?.map((menuItem: any) => {
    console.log(menuItem.id,"Itemsssssssssssssss")
    switch (menuItem.type) {
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            check child type
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5, textAlign: 'start' }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
