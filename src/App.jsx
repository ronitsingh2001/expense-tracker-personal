import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
const App = () => {

    return (
        <Provider store={appStore}>
            <Header />
            <Outlet />
        </Provider>
    );
};
export default App;