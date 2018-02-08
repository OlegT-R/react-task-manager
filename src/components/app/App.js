import React, {Component} from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Router from '../../services/router';
import '../../styles/base-styles.scss';

class App extends Component {

    constructor(props) {
        super(props);
        const router = Router(this);

        this.state = {
            Component: router.getCurrentScene(),
        }

    }

    render() {
        const {Component} = this.state;
        return (
            <section className="app">
                <Grid>
                    <Row>
                        <div className="app-scene">
                            <Component/>
                        </div>
                    </Row>
                </Grid>
            </section>
        );
    }
}

export default App;
