
import SearchIcon from '@mui/icons-material/Search'
import { AppBar, Box, CardMedia, InputBase, Toolbar } from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import { NavLink } from "@remix-run/react";

import MarvelLogo from "~/images/marvelLogo.svg";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#23306d" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <NavLink to={'/'} end>
                        <CardMedia
                            component="img"
                            sx={{ width: 151, height: 50 }}
                            image={MarvelLogo}
                            alt="Live from space album cover"
                        />
                    </NavLink>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>

                        <form method="get" action="/search">
                            <StyledInputBase
                                placeholder="Search…"
                                name="heroName"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </form>
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
