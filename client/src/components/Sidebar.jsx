import React from 'react';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from 'assets/profile.jpeg';

const navItems = [
  {
    text: 'Панель управления',
    link: 'Dashboard',
    icon: <HomeOutlined />,
  },
  {
    text: 'ДЕТАЛЬНЫЕ ПОКАЗАТЕЛИ',
    icon: null,
  },
  {
    text: 'Товары',
    link: 'Products',
    icon: <ShoppingCartOutlined />,
  },
  {
    text: 'Клиенты',
    link: 'Customers',
    icon: <Groups2Outlined />,
  },
  {
    text: 'Транзакции',
    link: 'Transactions',
    icon: <ReceiptLongOutlined />,
  },
  {
    text: 'География',
    link: 'Geography',
    icon: <PublicOutlined />,
  },
  {
    text: 'Продажи',
    link: 'Sales',
    icon: null,
  },
  {
    text: 'Общий обзор',
    link: 'Overview',
    icon: <PointOfSaleOutlined />,
  },
  {
    text: 'Дневные',
    link: 'Daily',
    icon: <TodayOutlined />,
  },
  {
    text: 'За месяц',
    link: 'Monthly',
    icon: <CalendarMonthOutlined />,
  },
  {
    text: 'График продаж',
    link: 'Breakdown',
    icon: <PieChartOutlined />,
  },
  {
    text: 'Управление',
    link: 'Admin',
    icon: null,
  },
  {
    text: 'Персонал',
    link: 'Admin',
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: 'Показатели',
    link: 'Performance',
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: 'border-box',
              borderWidth: isNonMobile ? 0 : '2px',
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    БИЗНЕСДАННЫЕ
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, link }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
                      {text}
                    </Typography>
                  );
                }
                const lcLink = link.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcLink}`);
                        setActive(lcLink);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcLink
                            ? theme.palette.secondary[300]
                            : 'transparent',
                        color:
                          active === lcLink
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: '2rem',
                          color:
                            active === lcLink
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcLink && (
                        <ChevronRightOutlined sx={{ ml: 'auto' }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
