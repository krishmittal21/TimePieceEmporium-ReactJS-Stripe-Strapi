import {Box, Button, IconButton, Typography, Divider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";   
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';
import {shades} from "../../theme";
import{
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCartOpen
} from "../../state";
import {useNavigate} from "react-router-dom";
const FlexBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const CartMenu = () => {
    const navigate = useNavigate(); // navigation
    const dispatch = useDispatch(); // dispatch actions
    const cart = useSelector((state) => state.cart.cart); // cart state
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);  // cart state
    const totalPrice = cart.reduce((total, item) => { return total + item.attributes.price * item.count;}, 0); // total price
    return(
        <Box //overlay
            display={isCartOpen ? "block" : "none"}
            backgroundColor= 'rgba(0,0,0,0.4)'
            position="fixed"
            zIndex={10}
            top="0"
            left="0"
            width="100%"
            height="100%"
            overflow="auto"
        > 
            {/*Modal*/}
            <Box
                position='fixed'
                right='0'
                bottom='0'
                width='max(400px,30%)'
                height='100%'
                backgroundColor='white'
            >
                <Box
                    padding='30px'
                    overflow='auto'
                    height='100%'
                >
                    <FlexBox mb="15px">
                        <Typography variant="h3">Shopping Bag ({cart.length})</Typography>
                        <IconButton onClick={()=>dispatch(setIsCartOpen({}))}><CloseIcon/></IconButton>
                        {/* cart list*/ }
                        <Box>
                            {cart.map((item) => (
                                <Box key={`${item.attributes.name} - ${item.id}`}>
                                    <FlexBox p="15px 0">
                                        <Box flex = '1 1 40%' >
                                            <img  
                                                alt={item?.name} 
                                                width="123px" 
                                                height="164px"
                                                src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}/>
                                        </Box>
                                        <Box flex = '1 1 60%' >
                                            {/* name and description*/}
                                            <FlexBox mb="5px">
                                                <Typography fontWeight="bold">
                                                    {item.attributes.name}
                                                </Typography>
                                                <IconButton onClick={()=>dispatch(removeFromCart({id: item.id}))}><CloseIcon/></IconButton>
                                            </FlexBox>
                                            <Typography>{item.attributes.shortDescription}</Typography>
                                            {/* PLUS MINUS*/}
                                            <FlexBox mt="15px 0">
                                                <Box 
                                                    display="flex"
                                                    alignItems="center"
                                                    border={`1px solid ${shades.neutral[500]}`}
                                                >
                                                    <IconButton onClick={()=>dispatch(decreaseCount({id: item.id}))}><RemoveIcon/></IconButton>
                                                    <Typography>{item.count}</Typography>
                                                    <IconButton onClick={()=>dispatch(increaseCount({id: item.id}))}><AddIcon/></IconButton>
                                                </Box>
                                                {/* price*/}
                                                <Typography fontWeight="bold">${item.attributes.price}</Typography>
                                            </FlexBox>
                                        </Box>
                                    </FlexBox>
                                    <Divider/>
                                </Box>
                            ))}
                            {/*ACTIONS*/}
                            <Box m="20px 0">
                                <FlexBox m="20px 0">
                                    <Typography fontWeight="bold">Subtotal</Typography>
                                    <Typography fontWeight="bold">${totalPrice}</Typography>
                                </FlexBox>
                                <Button
                                  sx={{
                                    backgroundColor: shades.primary[400],
                                    color: "white",
                                    borderRadius: 0,
                                    minWidth: "100%",
                                    padding:"20px 40px",
                                    m: "20px 0",
                                  }}
                                  onClick={() =>{
                                    navigate("/checkout");
                                    dispatch(setIsCartOpen({}));
                                  }}
                                >CHECKOUT</Button>
                            </Box>
                        </Box>
                    </FlexBox>
                </Box>

            </Box>
        </Box>
    )
};

export default CartMenu;