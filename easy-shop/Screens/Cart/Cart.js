import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Text,
  Left,
  Right,
  H1
} from "native-base";
import { SwipeListView } from 'react-native-swipe-list-view'
import CartItem from './CartItem'

import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../Shared/StyledComponents/EasyButton"

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import AuthGlobal from "../../Context/store/AuthGlobal"
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage"

var { height, width } = Dimensions.get("window");

const Cart = (props) => {

  const context = useContext(AuthGlobal);

  // Add this
  const [productUpdate, setProductUpdate] = useState()
  const [totalPrice, setTotalPrice] = useState()
  useEffect(() => {
    getProducts()
    return () => {
      setProductUpdate()
      setTotalPrice()
    }
  }, [props])
  
    const getProducts = () => {
      var products = [];
      props.cartItems.forEach(cart => {
        axios.get(`${baseURL}products/${cart.product}`).then(data => {
          products.push(data.data)
          setProductUpdate(products)
          var total = 0;
          products.forEach(product => {
            const price = (total += product.price)
              setTotalPrice(price)
          });
        })
        .catch(e => {
          console.log(e)
        })
      })
    }

  return (
    <>
      {productUpdate ? (
        <Container>
          <H1 style={{ alignSelf: "center" }}>Cart</H1>
          <SwipeListView
            data={productUpdate}
            renderItem={(data) => (
             <CartItem item={data} />
            )}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity 
                style={styles.hiddenButton}
                onPress={() => props.removeFromCart(data.item)}
                >
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
          <View style={styles.bottomContainer}>
            <Left>
                <Text style={styles.price}>$ {totalPrice}</Text>
            </Left>
            <Right>
                <EasyButton
                  danger
                  medium
                  onPress={() => props.clearCart()}
                >
                  <Text style={{ color: 'white' }}>Clear</Text>
                </EasyButton>
            </Right>
            <Right>
              {context.stateUser.isAuthenticated ? (
                <EasyButton
                  primary
                  medium
                  onPress={() => props.navigation.navigate('Checkout')}
                >
                <Text style={{ color: 'white' }}>Checkout</Text>
                </EasyButton>
              ) : (
                <EasyButton
                  secondary
                  medium
                  onPress={() => props.navigation.navigate('Login')}
                >
                <Text style={{ color: 'white' }}>Login</Text>
                </EasyButton>
              )}
                
            </Right>
          </View>
        </Container>
      ) : (
        <Container style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
  emptyContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      left: 0,
      backgroundColor: 'white',
      elevation: 20
  },
  price: {
      fontSize: 18,
      margin: 20,
      color: 'red'
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  hiddenButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    height: 70,
    width: width / 1.2
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
