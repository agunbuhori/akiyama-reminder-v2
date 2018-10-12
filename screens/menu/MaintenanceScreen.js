import { createSwitchNavigator } from 'react-navigation';
import Schedule from './maintenance/Schedule';
import MyReservation from './maintenance/MyReservation';

const MaintenanceScreen = createSwitchNavigator({
    Schedule: { screen: Schedule },
    MyReservation: {screen: MyReservation}
});

export default MaintenanceScreen;