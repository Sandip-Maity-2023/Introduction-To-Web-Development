import './App.css';
import Newsapp from './components/Newsapp';
import Sidebar from './components/Side';
import Footer from './components/Footer';
import Email from './components/Email'; 
import WeatherWidget from './components/Weather';
// import Camera from './components/Camera';

function App(){
  return (
    <>
      <Newsapp/>
      <WeatherWidget city="Delhi" />
      {/* <Route path="/camera" element={<Camera />} /> */}
      <Sidebar/>
      <Email/>
      <Footer/>
    </>
  );
}
export default App;