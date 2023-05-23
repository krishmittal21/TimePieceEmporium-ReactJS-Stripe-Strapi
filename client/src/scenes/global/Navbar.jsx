import {useDispatch, useSelector} from "react-redux";
import {Badge, Box, IconButton, Menu, MenuItem} from "@mui/material";
import{
    PersonOutlined,
    ShoppingBagOutlined,
    MenuOutlined,
    HomeOutlined,
    SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {shades} from "../../theme";
import {setIsCartOpen} from "../../state";
const NavBar = () => {
    const navigate = useNavigate(); // navigation
    const dispatch = useDispatch(); // dispatch actions
    const cart = useSelector((state) => state.cart.cart); // cart state
    return( 
    <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="60px"
        backgroundColor="rgba(255,255,255,0.95)"
        color="black"
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
    >
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="80%"
            margin="auto"
        >
            <Box
                onClick={() => navigate("/")}
                sx={{'&:hover': {cursor: 'pointer'}}}
                color={shades.secondary[500]}
            >
                TimePieceTracker
            </Box>
            <Box
                display="flex"
                justifyContent="space-between"
                columnGap="20px"
                zIndex="2"
            >
                <IconButton sx={{color:"black"}}><SearchOutlined/></IconButton>
                <IconButton sx={{color:"black"}}><PersonOutlined/></IconButton>
                <Badge badgeContent={cart.length} color="secondary" invisible = {cart.lenght===0} sx={{"& .MuiBadge-badge":{right:5,left:5,padding:"0 4px",height:"14px",minWidth:"13px"},}}><IconButton onClick={()=>dispatch(setIsCartOpen({}))} sx={{color:"black"}}><ShoppingBagOutlined/></IconButton></Badge>
                <IconButton sx={{color:"black"}}><MenuOutlined/></IconButton>
            </Box>

        </Box>

    </Box>);
};
export default NavBar;