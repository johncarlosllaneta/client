import React from 'react'
import { Container } from 'react-bootstrap'
import NavBarVet from '../NavBarVet'
import ThreadList from './ThreadList'

function Thread() {
    return (
        <div
            style={{
                backgroundColor: '#F5F6FA',
                height: '100vh'
            }}
        >
            <Container
                style={{
                    backgroundColor: 'white',
                    padding: 0
                }}
            >
                <NavBarVet showMessage={true} />
                <div
                    style={{
                        display: 'flex',
                        height: '100%'

                    }}
                >
                    <ThreadList />
                    <div
                        style={{
                            backgroundColor: 'white',
                            width: '80%',
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <p>No Coversation Selected</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Thread