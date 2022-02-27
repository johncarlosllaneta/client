import React, { useEffect, useState } from 'react'
import { threadList } from '../../../../Components/Functions/GetThreadVetAdmin'
import ThreadUser from './ThreadUser'

function ThreadList() {

    const [threads, setthreads] = useState([]);
    useEffect(() => {
        setTimeout(() => {
            setthreads(threadList);
            console.log(threadList)
        }, 1000);


    }, [])


    return (
        <div
            style={{
                backgroundColor: 'white',
                width: '20%',
                height: '100vh',
                borderRight: '1px solid grey',
                overflowY: 'auto'
            }}
        >

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    height: 'auto',
                    padding: 10,
                    borderBottom: '1px solid grey',
                }}
            >
                <h3
                    style={{
                        margin: 0
                    }}
                >Inbox</h3>

            </div>


            {threadList.length >= 1 ?
                threadList[0].map((item) => {
                    return <ThreadUser convoUser={item} />
                }
                )
                : <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '90%'
                    }}
                >
                    <p>No Thread Available</p>
                </div>
            }


        </div>
    )
}

export default ThreadList