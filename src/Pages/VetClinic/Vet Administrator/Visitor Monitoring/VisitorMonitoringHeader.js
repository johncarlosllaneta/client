import React from 'react';
import { Button } from '@mui/material';

function VisitorMonitoringHeader() {
    return (
        <div
            style={{
                display: 'inline-flex',
                justifyContent: 'space-between',
                width: '100%'
            }}
        >
            <div>

                <h1>Visitor Monitoring</h1>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '50%'
                }}
            >
                <Button

                    style={{
                        height: '50%',
                        width: '25%'
                    }}
                >
                    QR Code
                </Button>

            </div>


        </div>
    )
}

export default VisitorMonitoringHeader