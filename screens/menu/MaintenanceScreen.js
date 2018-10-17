import { createSwitchNavigator } from 'react-navigation';
import Schedule from './maintenance/Schedule';
import MyReservation from './maintenance/MyReservation';
import History from './maintenance/History';

const MaintenanceScreen = createSwitchNavigator({
    Schedule: { screen: Schedule },
    MyReservation: {screen: MyReservation},
    History: {screen: History},
});

export default MaintenanceScreen;