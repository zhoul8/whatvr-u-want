import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Stuff from './Stuff.jsx';
import MyDemo from './MyDemo.jsx';
import Clock from './Clock.jsx';

function App(){

    return(
    <>
        <Header/>
        <Clock/>
        <MyDemo/>
        <Stuff name="william liang" title="professional idiot"/>
        <Stuff name="sarah hill" title="professional idiot"/>
        <Stuff/>
        <Footer/>
    </> 
    );
}

export default App