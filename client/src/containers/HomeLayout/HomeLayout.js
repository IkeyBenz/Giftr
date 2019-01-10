import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import { AppHeader } from '@coreui/coreui';

const DefaultHeader = React.lazy(() => import('../DefaultLayout/DefaultHeader'));

class HomeLayout extends Component {

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    signOut(e) {
        e.preventDefault()
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="app">
                {/* <AppHeader fixed>
                    <Suspense fallback={this.loading()}>
                        <DefaultHeader onLogout={e => this.signOut(e)} />
                    </Suspense>
                </AppHeader> */}
                <div className="app-body">
                    <main className="main">
                        <Container fluid>
                            <Suspense fallback={this.loading()}>

                            </Suspense>
                        </Container>
                    </main>
                </div>
            </div>
        );
    }
}

export default HomeLayout;