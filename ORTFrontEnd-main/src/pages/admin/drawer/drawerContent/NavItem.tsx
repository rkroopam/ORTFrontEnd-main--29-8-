import PropTypes from "prop-types";
import { forwardRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { activeItem } from "../../../../store/reducers/menu";
interface ListItemProps {
  item: {
    url: string;
    external?: boolean;
  };
  itemTarget: string;
}
const NavItem = ({ item, level }: any) => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const { drawerOpen, openItem } = useSelector((state: any) => state.menu);

  let itemTarget = "_self";
  if (item?.target) {
    itemTarget = "_blank";
  }

  let listItemProps: any = {
    component: forwardRef<ListItemProps, any>((props: any, ref: any) => (
      <Link ref={ref} {...props} to={item.url} target={itemTarget} />
    )),
  };
  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const itemHandler = (id: string) => {
    dispatch(activeItem({ openItem: [id] }));
  };


  const Icon = item?.icon;
  const itemIcon = item?.icon ? (
    <Icon style={{ fontSize: drawerOpen ? "1rem" : "1.25rem" }} />
  ) : (
    false
  );

  const isSelected = openItem.findIndex((id: any) => id === item.id) > -1;
  useEffect(() => {
    if (pathname.includes(item.url)) {
      dispatch(activeItem({ openItem: [item.id] }));
    }
  }, [pathname]);

  const textColor = "text.primary";
  const iconSelectedColor = "primary.main";

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      onClick={() => {
        itemHandler(item.id);
      }}
      selected={isSelected}
      sx={{
        zIndex: 1201,
        pl: drawerOpen ? `${level * 28}px` : 1.5,
        py: !drawerOpen && level === 1 ? 1.25 : 1,
        ...(drawerOpen && {
          "&:hover": {
            bgcolor: "primary.lighter",
          },
          "&.Mui-selected": {
            bgcolor: "primary.lighter",
            // borderRight: `2px solid ${theme.palette.primary.main}`,
            color: iconSelectedColor,
            "&:hover": {
              color: iconSelectedColor,
              bgcolor: "primary.lighter",
            },
          },
        }),
        ...(!drawerOpen && {
          "&:hover": {
            bgcolor: "transparent",
          },
          "&.Mui-selected": {
            "&:hover": {
              bgcolor: "transparent",
            },
            bgcolor: "transparent",
          },
        }),
      }}
    >
      {itemIcon && (
        <ListItemIcon
          sx={{
            minWidth: 28,
            color: isSelected ? iconSelectedColor : textColor,
            ...(!drawerOpen && {
              borderRadius: 1.5,
              width: 36,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                bgcolor: "secondary.lighter",
              },
            }),
            ...(!drawerOpen &&
              isSelected && {
                bgcolor: "primary.lighter",
                "&:hover": {
                  bgcolor: "primary.lighter",
                },
              }),
          }}
        >
          {itemIcon}
        </ListItemIcon>
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && (
        <ListItemText
          primary={
            <Typography
              variant="subtitle2"
              fontWeight="500"
              sx={{ color: isSelected ? iconSelectedColor : textColor }}
            >
              {item.title}
            </Typography>
          }
        />
      )}
      {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
