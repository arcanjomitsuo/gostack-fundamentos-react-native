import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useCart } from '../../hooks/cart';
import formatValue from '../../utils/formatValue';
import {
  CartButton,
  CartButtonText,
  CartPricing,
  CartTotalPrice,
  Container,
} from './styles';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    const total = products.reduce((accumulator, product) => {
      const productsSubtotal = product.price * product.quantity;

      return accumulator + productsSubtotal;
    }, 0);

    return formatValue(total);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const total = products.reduce((accumulator, product) => {
      const productsQuantity = product.quantity;

      return accumulator + productsQuantity;
    }, 0);

    return total;

    return 0;
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
