import { createSwitchNavigator } from 'react-navigation';
import CouponList from './coupon/CouponList';
import MyCoupon from './coupon/MyCoupon';
import CouponScanner from './coupon/CouponScanner';

const CouponScreen = createSwitchNavigator({
    CouponList: {screen: CouponList},
    MyCoupon: {screen: MyCoupon},
    CouponScanner: {screen: CouponScanner}
});

export default CouponScreen;