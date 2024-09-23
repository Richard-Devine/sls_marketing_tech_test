import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Form from './components/form/Form';
import './app.css';

function App() {
    return (
        <div className={'app-container'} data-testid={'app-container'}>
            <Header/>
            <Form/>
            <Footer/>
        </div>
    );
}

export default App;
