import { Provider} from 'react-redux';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import appStore from './Redux/appStore';
import Layout from './components/pages/Layout';


function App() {
  
  return (
     
     <Provider store={appStore}>
        <Layout/>
        <ToastContainer />
     </Provider>
  );
}

export default App;
